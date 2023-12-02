import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

import { AppState } from '../index'

export const getSortedGoals = createSelector(
  (state: AppState) => state.goals,
  (goals) => goals.slice().sort((a, b) => a.position - b.position)
)

export const selectLastGoals = createSelector(getSortedGoals, (goals) =>
  goals.slice(0, 3)
)

export const selectGoalById = createCachedSelector(
  (state: AppState) => state.goals,
  (state: AppState, goalId: string) => goalId,
  (goals, goalId) => {
    return goals.find((item) => item._id === goalId)
  }
)((state, goalId) => goalId)
