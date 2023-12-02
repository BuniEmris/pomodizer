/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { setGoals, updateGoal, addGoal, deleteGoal } from 'store/goals'
import { Paginated } from '@feathersjs/feathers'

import { getNewPosition } from 'utils'
import { getWeek } from 'utils/date'
import apiClient from 'utils/apiClient'

import { Goal } from 'types'
import { PromiseThunk } from '../index'
import analytics from '@react-native-firebase/analytics'
import uuid from 'react-native-uuid'
import NetInfo from '@react-native-community/netinfo'
import logger from 'utils/logger'

export const fetchGoals =
  (currentWeek?: number): PromiseThunk<Goal[]> =>
  async (dispatch) => {
    // if (!currentWeek) return [];

    // const startOfWeek = getWeek('current', currentWeek)[0];
    // const endOfWeek = getWeek('current', currentWeek)[6];

    const query = {
      // $or: [
      //   { isMonthly: true },
      //   {
      //     isMonthly: false,
      //     dueDate: { $gte: startOfWeek, $lte: endOfWeek },
      //   },
      // ],
      $limit: 100,
    }
    const { data: goals }: Paginated<Goal> = await apiClient
      .service('goals')
      .find({ query })
    goals.sort((a, b) => a.status == 'done' ? 1 : -1)
    dispatch(setGoals(goals))

    return goals
  }

export const patchGoal =
  (id: string, values: Partial<Goal>): PromiseThunk<Goal> =>
  async (dispatch) => {
    const goalPayload = values

    if (!goalPayload.localId) {
      goalPayload.localId = uuid.v4() as string
    }

    dispatch(updateGoal({ ...goalPayload, isLocalEdited: true }))

    const netinfo = await NetInfo.fetch()

    if (netinfo.isConnected) {
      const goal: Goal = await apiClient.service('goals').patch(id, goalPayload)
      dispatch(updateGoal({ ...goal, isLocalEdited: false }))

      analytics().logEvent('goal_created')

      return goal
    }

    return goalPayload as Goal
  }

export const createGoal =
  (values: Partial<Goal>): PromiseThunk<Goal> =>
  async (dispatch) => {
    const localId = uuid.v4() as string
    const localGoal = {
      ...values,
      localId,
      isLocalCreated: true,
      _id: localId,
    } as Goal

    dispatch(addGoal(localGoal))

    const netinfo = await NetInfo.fetch()

    if (netinfo.isConnected) {
      const goal: Goal = await apiClient
        .service('goals')
        .create({ ...localGoal, _id: undefined })
      dispatch(addGoal({ ...goal, isLocalCreated: false }))

      return goal
    }

    return localGoal
  }

export const removeGoal =
  (id: string): PromiseThunk<Goal | undefined> =>
  async (dispatch) => {
    try {
      const goal: Goal = await apiClient.service('goals').remove(id)
      dispatch(deleteGoal(goal._id))

      return goal
    } catch (e) {
      logger.error('removeGoal', e)
    }
  }

export const syncLocalGoalWithApi =
  (): PromiseThunk => async (dispatch, getState) => {
    const allGoals = getState().goals

    const localCreatedGoals = allGoals.filter((el) => el.isLocalCreated)

    const localEditedGoals = allGoals.filter((el) => el.isLocalEdited)

    // Promise.all not working for sync task
    if (localCreatedGoals.length) {
      for (const localGoal of localCreatedGoals) {
        try {
          const createdGoal = await apiClient
            .service('goals')
            .create({ ...localGoal, _id: undefined })

          dispatch(addGoal(createdGoal))
        } catch (e) {
          logger.error('sync goal', e)
        }
      }
    }

    // Promise.all not working for sync task
    if (localEditedGoals.length) {
      for (const localGoal of localEditedGoals) {
        try {
          const updatedGoal: Goal = await apiClient
            .service('goals')
            .patch(localGoal._id, { ...localGoal, _id: undefined })

          dispatch(updateGoal({ ...updatedGoal, isLocalEdited: false }))
        } catch (e) {
          logger.error('sync task', e)
        }
      }
    }
  }
