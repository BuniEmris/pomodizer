/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { patchTask } from 'store/tasks/thunkActions'
import {
  setTimer,
  decreaseTimer,
  setIsTimerPaused,
  resetTimer,
  startBreak,
  startTimer,
  pressStartTimer,
  cancelTask,
  startLongBreak,
  setTimeIsSeconds,
  finishTimerTask,
} from 'store/timer'

import { Task } from 'types'
import { AppThunk, PromiseThunk } from 'store'
import { selectTimerTask } from './selector'

import { AfterFinishSound, PlayAfterLongSound, PlaySound } from 'utils/sounds'
import {
  notifee,
  createFinishTimerNotification,
  createFinishPauseNotification,
} from 'utils/pushNotifications'

export const pauseTimer =
  (newTime?: number): AppThunk =>
  (dispatch, getState) => {
    const { timer } = getState()

    if (timer.isPaused) {
      dispatch(setIsTimerPaused(false))
      if (newTime) {
        dispatch(setTimeIsSeconds(newTime))
      }
    } else {
      dispatch(setIsTimerPaused(true))
    }
  }

export const stopTimer = (): PromiseThunk => async (dispatch, getState) => {
  const { taskId, notificationId } = getState().timer
  // const { soundSettings } = getState().authUser.user;

  // await dispatch(patchTask(taskId, { tomatoFact: tomatoFact + 1 }));

  if (notificationId) {
    await notifee.cancelNotification(notificationId)
  }

  dispatch(resetTimer())
}

export const finishBreak = (): AppThunk => async (dispatch, getState) => {
  const { taskId, notificationId } = getState().timer
  if (notificationId) {
    await notifee.cancelNotification(notificationId)
  }

  dispatch(pressStartTimer(taskId))
}
export const closeTask = (): AppThunk => async (dispatch, getState) => {
  const { notificationId } = getState().timer

  if (notificationId) {
    await notifee.cancelNotification(notificationId)
  }
  dispatch(cancelTask())
}

export const tickTimer = (): AppThunk => async (dispatch, getState) => {
  const store = getState()
  const {
    timeInSeconds,
    timerType,
    taskId,
    longBreakAfter,
    notificationId,
    breakLength,
    longBreakLength,
    autoStartBreak,
  } = store.timer

  if (timeInSeconds <= 0 && timerType === 'task') {
    const timerTask = selectTimerTask(store)

    // if (notificationId) {
    //   await notifee.cancelNotification(notificationId)
    // }

    dispatch(
      patchTask(taskId, {
        tomatoFact: (timerTask?.tomatoFact || 0) + 1,
      })
    )
    const isLongBreak =
      Number(timerTask?.tomatoFact) % longBreakAfter === 0 &&
      timerTask?.tomatoFact !== 0

    if (autoStartBreak) {
      dispatch(startTaskBreak())
    }

    if (!autoStartBreak) {
      dispatch(
        finishTimerTask({
          breakLength: isLongBreak ? longBreakLength : breakLength,
          isLongBrakeActive: isLongBreak,
        })
      )
    }

    PlayAfterLongSound()
  } else if (timeInSeconds <= 0 && timerType === 'break') {
    // if (notificationId) {
    //   await notifee.cancelNotification(notificationId)
    // }

    dispatch(finishBreak())
    AfterFinishSound()
  } else {
    dispatch(decreaseTimer())
  }
}

export const startTaskTimer =
  (taskId: string): AppThunk =>
  async (dispatch, getState) => {
    const { pomodoroTimeLength } = getState().timer

    const notificationId = await createFinishTimerNotification(
      pomodoroTimeLength,
      taskId
    )

    dispatch(startTimer({ taskId, notificationId }))
  }

export const startTaskBreak = (): AppThunk => async (dispatch, getState) => {
  const store = getState()
  const { taskId, longBreakAfter, breakLength, longBreakLength } = store.timer

  const timerTask = selectTimerTask(store)

  const isLongBreak =
    Number(timerTask?.tomatoFact) % longBreakAfter === 0 &&
    timerTask?.tomatoFact !== 0

  const breakNotificationId = await createFinishPauseNotification(
    isLongBreak ? longBreakLength : breakLength,
    taskId
  )

  if (!isLongBreak) {
    dispatch(startBreak({ notificationId: breakNotificationId }))
  }

  if (isLongBreak) {
    dispatch(startLongBreak({ notificationId: breakNotificationId }))
  }
}
