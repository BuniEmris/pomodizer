/* eslint-disable prettier/prettier */
/* eslint-disable no-extra-parens */
import createCachedSelector from 're-reselect'
import { Task } from 'types'
import { createSelector } from 'reselect'

import { AppState } from '../index'
import moment from 'moment'
import { dueDateToUnix, dueDateToMoment } from 'utils/date'

export const getTasksForColumn = createCachedSelector(
  (state: AppState) => state.tasks.allTasks,
  (state: AppState, dueDate: string) => dueDate,
  (tasks, dueDate) => {
    if (Array.isArray(tasks) && tasks.length === 0) return []

    const active = tasks.filter((el) => el.dueDate === dueDate)

    const sortedActiveTasks = active
      .sort((a, b) => {
        // if (a.notificationTime && b.notificationTime) {
        //   return new Date(a.notificationTime).getTime() - new Date(b.notificationTime).getTime()
        // }

        // if (a.notificationTime && a.status !== 'done' && !b.notificationTime) {
        //   return -1
        // }

        // if (b.notificationTime && b.status !== 'done' && !a.notificationTime) {
        //   return 1
        // }

        // if (a.status == 'done' && b.status !== 'done') {
        //   return 1
        // }

        // if (b.status == 'done') {
        //   return -1
        // }

        return a.position - b.position
      })

    const res = [
      ...sortedActiveTasks
        .reduce((a, c) => {
          a.set(c._id, c)
          return a
        }, new Map())
        .values(),
    ]

    return res
  }
)(
  (state, dueDate) => dueDate // Cache selectors by state name
)

export const getTasksForTag = createCachedSelector(
  (state: AppState) => state.tasks.allTasks,
  (state: AppState, tagId: string) => tagId,
  (tasks, tagId) => {
    if (Array.isArray(tasks) && tasks.length === 0) return []

    const tagTasks = tasks.reduce<Task[]>((acc, item) => {
      const isActive = item.tagsIds?.includes(tagId)

      if (isActive) {
        acc.push(item)
      }

      return acc
    }, [] as Task[])

    tagTasks
      .sort((a, b) => {
        if (!a.dueDate) {
          return -1
        }

        return 1
      })
      .sort((a, b) =>
        dueDateToUnix(b.dueDate) - dueDateToUnix(a.dueDate)
      )

    return tagTasks
  }
)(
  (state, tagId) => tagId // Cache selectors by state name
)

export const getTasksForDay = createCachedSelector(
  (state: AppState) => state.tasks.allTasks,
  (state: AppState, dueDate: string) => dueDate,
  (tasks, dueDate) => {
    if (Array.isArray(tasks) && tasks.length === 0) return []

    const { active, transferred } = tasks.reduce<{
      active: Task[]
      transferred: Task[]
    }>(
      (obj, item) => {
        if (item.dueDate !== dueDate) {
          obj.transferred.push(item)
        } else {
          obj.active.push(item)
        }
        return obj
      },
      { active: [], transferred: [] }
    )

    const sortedActiveTasks = active
      .sort((x, y) => x.position - y.position)
      .sort((x, y) => {
        if (x.status === 'done') {
          return 1
        }

        return -1
      })
    return sortedActiveTasks.concat(transferred)
  }
)(
  (state, dueDate) => dueDate // Cache selectors by state name
)

export const getHoldedTasks = createSelector(
  (state: AppState) => state.tasks.holdedTasks,
  (holdedTasks) => holdedTasks.slice().sort((a, b) => a.position - b.position)
)

export const selectTaskById = createCachedSelector(
  (state: AppState) => state.tasks.allTasks,
  (state: AppState, taskId: string) => taskId,
  (tasks, taskId) => {
    return tasks.find((item) => item._id === taskId)
  }
)((state, taskId) => taskId)

export const selectInboxTask = createSelector(
  (state: AppState) => state.tasks.allTasks,
  (taskList) => {
    // const inboxTasks = taskList
    //   .filter((item) => !item.dueDate && item.status !== 'done')
    //   .sort((a, b) => {
    //     return new Date(a.createdAt).getTime()
    //   })
    const taskWithDates = taskList
      .filter((item) => {
        if (item.status == 'done') {
          return false
        }

        if (!item.dueDate) {
          return true
        }

        const isPrev =
          dueDateToMoment(item.dueDate).isBefore(moment(), 'day')

        if (isPrev) {
          return true
        }

        return false
      })
      .sort((a, b) => {
        if (!a.dueDate) {
          return 1
        }

        if (!b.dueDate) {
          return -1
        }
        return dueDateToUnix(b.dueDate) - dueDateToUnix(a.dueDate)
      })

    return taskWithDates
  }
)


export const selectDashboardInboxTask = createSelector(
  (state: AppState) => state.tasks.allTasks,
  (taskList) => {
    const inboxTasks = taskList
      .filter((item) => !item.dueDate && item.status !== 'done')
      .sort((a, b) => {
        return new Date(a.createdAt).getTime()
      }).slice(0, 3)

    return inboxTasks
  }
)

