import { createSelector } from 'reselect'
import { AppState } from '../index'

export const selectTimerTask = createSelector(
  (state: AppState) => state.tasks.allTasks,
  (state: AppState) => state.timer.taskId,
  (tasks, timerTaskId) => tasks.find(item => item._id == timerTaskId)
)
