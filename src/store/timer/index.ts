import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TimerState } from 'types/store/timer'
import { Task } from 'types'

type StartTimer = {
  taskId: string
  notificationId?: string | undefined
}

const initialState: TimerState = {
  isStarted: false,
  isPaused: false,
  timeInSeconds: 1500,
  taskId: '',
  mode: 'full',
  timerType: 'task',
  isActive: false,
  isLongBrakeActive: false,
  pomodoroTimeLength: 1500,
  breakLength: 300,
  longBreakLength: 900,
  longBreakAfter: 3,
  autoStartBreak: true,
  autoSoundPerSeconds: false,
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimer: (state, { payload }: PayloadAction<TimerState>) => {
      return {
        ...state,
        isStarted: true,
        isPaused: false,
        timeInSeconds: state.pomodoroTimeLength,
        taskId: payload.taskId,
        mode: 'full',
        timerType: 'task',
      }
    },

    startTimer: (state, { payload }: PayloadAction<StartTimer>) => {
      return {
        ...state,
        isStarted: true,
        isPaused: false,
        mode: 'full',
        timeInSeconds: state.pomodoroTimeLength,
        taskId: payload.taskId,
        timerType: 'task',
        isActive: true,
        notificationId: payload.notificationId,
      }
    },

    startBreak: (state, { payload }: PayloadAction<Partial<TimerState>>) => {
      state.timerType = 'break'
      state.isStarted = true
      state.isPaused = false
      state.timeInSeconds = state.breakLength
      state.notificationId = payload.notificationId
      return state
    },

    finishTimerTask: (
      state,
      { payload }: PayloadAction<Partial<TimerState>>
    ) => {
      state.timerType = 'break'
      state.isStarted = false
      state.isPaused = true
      state.isActive = true
      state.timeInSeconds = payload.breakLength || state.breakLength
      state.isLongBrakeActive = payload.isLongBrakeActive
      return state
    },
    startLongBreak: (
      state,
      { payload }: PayloadAction<Partial<TimerState>>
    ) => {
      state.timerType = 'break'
      state.isStarted = true
      state.isLongBrakeActive = true
      state.isPaused = false
      state.timeInSeconds = state.longBreakLength
      state.notificationId = payload.notificationId
    },
    cancelTask: (state) => {
      state = {
        ...state,
        isStarted: false,
        isPaused: false,
        timeInSeconds: state.pomodoroTimeLength,
        taskId: '',
        mode: 'full',
        timerType: 'task',
        isActive: false,
        isLongBrakeActive: false,
      }

      return state
    },

    setTimeIsSeconds: (state, { payload }: PayloadAction<number>) => {
      state.timeInSeconds = payload
    },

    decreaseTimer: (state) => {
      state.timeInSeconds = state.timeInSeconds ? state.timeInSeconds - 1 : 0
    },

    setIsTimerPaused: (state, { payload }: PayloadAction<boolean>) => {
      state.isPaused = payload
    },

    setMode: (state, { payload }: PayloadAction<'full' | 'simple'>) => {
      state.mode = payload
    },
    setPomodoLength: (state, { payload }) => {
      state.pomodoroTimeLength = payload
    },
    setBreakLength: (state, { payload }) => {
      state.breakLength = payload
    },
    setLongBreakLength: (state, { payload }) => {
      state.longBreakLength = payload
    },
    setLongBreakAfter: (state, { payload }) => {
      state.longBreakAfter = payload
    },
    setAutoStartBreak: (state, { payload }: PayloadAction<boolean>) => {
      state.autoStartBreak = payload
    },
    setAutoStartSoundPerSecond: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.autoSoundPerSeconds = payload
    },
    resetTimer: (state) => {
      state.isPaused = true
      state.timeInSeconds = state.pomodoroTimeLength
    },

    testTimer: (state) => {
      state.timeInSeconds = 20
      state.pomodoroTimeLength = 20
      state.breakLength = 5
      state.longBreakLength = 10
    },

    pressStartTimer: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        isStarted: true,
        isPaused: true,
        mode: 'full',
        timeInSeconds: state.pomodoroTimeLength,
        taskId: payload,
        timerType: 'task',
        isActive: true,
      }
    },
  },
})

export const {
  setTimer,
  decreaseTimer,
  setIsTimerPaused,
  setPomodoLength,
  setBreakLength,
  setLongBreakLength,
  setLongBreakAfter,
  setAutoStartBreak,
  setAutoStartSoundPerSecond,
  resetTimer,
  startTimer,
  setMode,
  startBreak,
  cancelTask,
  pressStartTimer,
  startLongBreak,
  setTimeIsSeconds,
  testTimer,
  finishTimerTask,
} = timerSlice.actions

export default timerSlice.reducer
