/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import moment from 'moment'

import {
  setTasks,
  updateTask,
  addTask,
  deleteTask,
  updateHoldedTask,
  deleteHoldedTask,
  setCalendarDay,
  addTasksList,
  setFetchedTaskDates,
  addFetchedTaskDates,
} from 'store/tasks'

import apiClient from 'utils/apiClient'
import { getWeek, getDay, toDayFormat } from 'utils/date'
import { getNewPosition } from 'utils'

import { Task } from 'types'
import { AppThunk, PromiseThunk } from '../index'
import {
  ChangeTasksPositionArgs,
  ChangeHoldedTasksPositionArgs,
} from 'types/store/tasks'

import { Paginated } from '@feathersjs/feathers'
import { closeTask } from 'store/timer/thunkActions'
import { getArrayDates } from 'helpers/dates'
import logger from 'utils/logger'
import uuid from 'react-native-uuid'
import analytics from '@react-native-firebase/analytics'
import NetInfo from '@react-native-community/netinfo'

export const fetchTaskForPeriod =
  (from: Date, to: Date): PromiseThunk<Task[] | undefined> =>
  async (dispatch) => {
    const query = {
      $or: [
        { dueDate: null },
        { dueDate: { $gte: from.toISOString(), $lte: to.toISOString() } },
      ],
      status: { $ne: 'hold' },
      $limit: 500,
      $sort: {
        createdAt: -1,
        dueDate: -1,
      },
    }

    const netinfo = await NetInfo.fetch()

    if (netinfo.isConnected) {
      const { data: tasks, limit }: Paginated<Task> = await apiClient
        .service('tasks')
        .find({ query })

      dispatch(setTasks(tasks))

      return tasks
    }

    return undefined
  }

export const fetchWeekTasks =
  (currentWeek: number): PromiseThunk<Task[] | undefined> =>
  async (dispatch) => {
    if (!currentWeek) return

    const week = getWeek('current', currentWeek)
    const [startOfWeek, , , , , , endOfWeek] = week
    const weekDays = week.map((day) => day.format('DD.MM.YYYY'))

    const query = {
      $or: [
        { dueDate: { $gte: startOfWeek, $lte: endOfWeek } },
        { dueDateHistory: { $in: weekDays } },
      ],
      status: { $ne: 'hold' },
      $limit: 100,
    }
    const { data: tasks }: Paginated<Task> = await apiClient
      .service('tasks')
      .find({ query })

    dispatch(setTasks(tasks))

    return tasks
  }

export const fetchDayTasks =
  (day: number): PromiseThunk<Task[] | undefined> =>
  async (dispatch) => {
    if (!day) return

    const currentDay = getDay('current', day)
    const dayTimestamp = moment(day).format('DD.MM.YYYY')

    const query = {
      $or: [
        {
          dueDate: {
            $gte: currentDay.startOf('day').toISOString(),
            $lte: currentDay.endOf('day').toISOString(),
          },
        },
        // { dueDateHistory: { $in: [dayTimestamp] } },
      ],
      status: { $ne: 'hold' },
      $limit: 100,
    }
    const { data: tasks }: Paginated<Task> = await apiClient
      .service('tasks')
      .find({ query })

    dispatch(addTasksList(tasks))

    return tasks
  }

export const createTask =
  (values: Partial<Task>): PromiseThunk<Task> =>
  async (dispatch) => {
    const localId = uuid.v4() as string
    const localTask = {
      ...values,
      localId,
      isLocalCreated: true,
      tagsIds: values.tags ? values.tags?.map((el) => el._id) : [],
      _id: localId,
    } as Task

    dispatch(addTask(localTask))

    const netinfo = await NetInfo.fetch()

    if (netinfo.isConnected) {
      const newTask: Task = await apiClient
        .service('tasks')
        .create({ ...values, localId })

      dispatch(addTask({ ...newTask, isLocalCreated: false }))

      analytics().logEvent('task_created')

      return newTask
    }

    return localTask
  }

export const patchTask =
  (id: string, values: Partial<Task>): AppThunk =>
  async (dispatch) => {
    try {
      const taskPayload = values

      if (!taskPayload.localId) {
        taskPayload.localId = uuid.v4() as string
      }

      dispatch(updateTask({ _id: id, isLocalEdited: true, ...taskPayload }))

      const netinfo = await NetInfo.fetch()

      if (netinfo.isConnected) {
        const task: Task = await apiClient
          .service('tasks')
          .patch(id, taskPayload)

        dispatch(updateTask({ ...task, isLocalEdited: false }))
        return task
      }

      return { ...taskPayload, _id: id }
    } catch (e) {
      logger.error('patch task', e)
    }
  }

export const finishTask =
  (task: Task): PromiseThunk =>
  async (dispatch, getState) => {
    const { isStarted, taskId } = getState().timer

    dispatch(
      patchTask(task._id, {
        tomatoFact:
          isStarted && taskId === task._id
            ? task.tomatoFact + 1
            : task.tomatoFact,
        status: 'done',
        dueDate: task.dueDate ? task.dueDate : toDayFormat(new Date()),
        doneAt: new Date().toISOString(),
        position: task.position + 1000000,
      })
    )

    if (isStarted && task._id == taskId) {
      dispatch(closeTask())
    }
  }

export const removeTask =
  (task: Task): PromiseThunk<Task | undefined> =>
  async (dispatch) => {
    try {
      dispatch(deleteTask(task._id))
      await apiClient.service('tasks').remove(task._id)
      return task
    } catch (e) {
      logger.error('Delete task', e)
    }
  }

export const changeTaskPosition =
  ({
    taskId,
    isHolded = false,
    destinationColumnDate,
    destinationIndex,
    sourceIndex,
    type,
    extraValuesForChange = {},
  }: ChangeTasksPositionArgs): AppThunk =>
  async (dispatch, getState) => {
    const { allTasks } = getState().tasks
    const { holdedTasks } = getState().tasks

    const currentTask = isHolded
      ? holdedTasks.find((el) => el._id === taskId)
      : allTasks.find((el) => el._id === taskId)

    const columnTasks = allTasks.filter(
      (el) => el.dueDate === destinationColumnDate
    )

    const newTaskPosition = getNewPosition({
      items: columnTasks,
      currentItem: currentTask!,
      type,
      destinationIndex,
      sourceIndex,
    })

    const values = {
      ...currentTask,
      ...extraValuesForChange,
      position: newTaskPosition,
      dueDate: type === 'move' ? destinationColumnDate : currentTask?.dueDate,
      dueDateHistory:
        type === 'move'
          ? currentTask?.dueDateHistory.concat(destinationColumnDate)
          : currentTask?.dueDateHistory,
    }

    // :: with positive attitude and smile on the face
    if (!isHolded) {
      dispatch(updateTask(values as Task))
    }

    await apiClient.service('tasks').patch(taskId, values)
    if (isHolded) {
      dispatch(deleteHoldedTask(values._id!))
      dispatch(addTask(values as Task))
    }
  }

export const changeHoldedTaskPosition =
  ({
    taskId,
    destinationIndex,
    sourceIndex,
  }: ChangeHoldedTasksPositionArgs): AppThunk =>
  async (dispatch, getState) => {
    const { holdedTasks } = getState().tasks

    const currentTask = holdedTasks.find((el) => el._id === taskId)

    const newPosition = getNewPosition({
      items: holdedTasks,
      currentItem: currentTask!,
      destinationIndex,
      sourceIndex,
      type: 'reorder',
    })

    const values = { ...currentTask, position: newPosition }
    dispatch(updateHoldedTask(values as Task))

    await apiClient.service('tasks').patch(taskId, values)
  }

export const syncLastTasks = (): AppThunk => async (dispatch) => {
  const today = Date.now()
  const fourWeekAgo = moment(today).subtract(28, 'days').toDate()
  const forWeekLater = moment(today).add(30, 'days').toDate()
  dispatch(fetchTaskForPeriod(fourWeekAgo, forWeekLater))
  const datesArr = getArrayDates(fourWeekAgo, forWeekLater)
  dispatch(setFetchedTaskDates(datesArr))
}

export const setCalendarDayThunk =
  (date: string): AppThunk =>
  async (dispatch, getState) => {
    const { fetchedTaskDates } = getState().tasks.calendarDayTask
    dispatch(setCalendarDay(date))

    if (fetchedTaskDates?.includes(date)) {
      return
    }

    const dateTime = moment(date, 'YYYY-MM-DD').toDate().getTime()
    dispatch(fetchDayTasks(dateTime))
    dispatch(addFetchedTaskDates(date))
  }

export const updateTasksPositions =
  (tasksList: Task[]): AppThunk =>
  async (dispatch, getState) => {
    if (!tasksList.length) {
      return
    }

    const firstTask = tasksList[0]

    if (!firstTask) {
      return
    }

    tasksList.forEach(({ _id, status }, idx) => {
      // eslint-disable-next-line no-return-await
      dispatch(updateTask({ _id, position: firstTask?.position + idx * 100 }))

      apiClient
        .service('tasks')
        .patch(_id, { position: firstTask?.position + idx * 100 })
    })

    // await Promise.all(
    //   tasksIds.map(async (id, idx) => {
    //     // eslint-disable-next-line no-return-await
    //     return await apiClient
    //       .service('tasks')
    //       .patch(id, { position: firstTask?.position + idx * 100 })
    //   })
    // )
  }

export const syncLocalTaskWithApi =
  (): AppThunk => async (dispatch, getState) => {
    const { allTasks } = getState().tasks

    const localCreatedTask = allTasks.filter((el) => el.isLocalCreated)

    const localEditedTask = allTasks.filter((el) => el.isLocalEdited)

    // Promise.all not working for sync task
    if (localCreatedTask.length) {
      for (const localTask of localCreatedTask) {
        try {
          const createdTak = await apiClient
            .service('tasks')
            .create({ ...localTask, _id: undefined })

          dispatch(addTask(createdTak))
        } catch (e) {
          logger.error('sync task', e)
        }
      }
    }

    // Promise.all not working for sync task
    if (localEditedTask.length) {
      for (const localTask of localEditedTask) {
        try {
          const updatedTask: Task = await apiClient
            .service('tasks')
            .patch(localTask._id, { ...localTask, _id: undefined })

          dispatch(updateTask({ ...updatedTask, isLocalEdited: false }))
        } catch (e) {
          logger.error('sync task', e)
        }
      }
    }
  }
