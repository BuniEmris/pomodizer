import { combineReducers } from 'redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from 'types'
import moment from 'moment'

export type CalendarState = {
  calendarDay: string
  fetchedTaskDates?: string[]
}
const today = moment()
const todayFormatted = moment(today).format('YYYY-MM-DD')

const initialState: CalendarState = {
  calendarDay: todayFormatted,
  fetchedTaskDates: [],
}

type State = Task[]

const initState: State = []

const tasksSlice = createSlice({
  name: 'allTasks',
  initialState: initState,
  reducers: {
    setTasks: (state: State, { payload }: PayloadAction<Task[]>) => {
      payload.forEach((el) => {
        const existIdx = state.findIndex((savedEl) => {
          if (el._id === savedEl._id) {
            return true
          }

          if (el.localId && el.localId === savedEl.localId) {
            return true
          }

          return false
        })

        if (existIdx > -1) {
          state[existIdx] = el
        } else {
          state.push(el)
        }
      })

      return state
    },

    updateTask: (state: State, { payload }: PayloadAction<Partial<Task>>) => {
      return state.map((task) => {
        if (task._id === payload._id || task.localId === payload.localId) {
          return {
            ...task,
            ...payload,
          }
        }
        return task
      })
    },

    addTask: (state: State, { payload }: PayloadAction<Task>) => {
      if (payload.localId) {
        const localTaskIdx = state.findIndex(
          (el) => el.localId === payload.localId
        )

        if (localTaskIdx > -1) {
          state[localTaskIdx] = payload
          return
        }
      }

      const existTaskId = state.findIndex((el) => el._id === payload._id)

      if (existTaskId > -1) {
        state[existTaskId] = payload
        return
      }

      state.push(payload)
      return state
    },
    addTasksList: (state: State, { payload }: PayloadAction<Task[]>) => {
      return state.concat(payload)
    },
    deleteTask: (state: State, { payload }: PayloadAction<string>) => {
      return state.filter((task) => task._id !== payload)
    },
    resetTaskState: () => {
      return initState
    },
  },
})

const CalendarDaySlice = createSlice({
  name: 'calendarDay',
  initialState,
  reducers: {
    setCalendarDay(state: CalendarState, action: PayloadAction<string>) {
      state.calendarDay = action.payload
    },
    setFetchedTaskDates(state, action: PayloadAction<string[]>) {
      state.fetchedTaskDates = action.payload
    },
    addFetchedTaskDates(state, action: PayloadAction<string>) {
      state.fetchedTaskDates?.push(action.payload)
    },
  },
})

const holdedTasksSlice = createSlice({
  name: 'holdedTasks',
  initialState: [] as Task[],
  reducers: {
    setHoldedTasks: (state: Task[], { payload }: PayloadAction<Task[]>) => {
      return payload
    },
    updateHoldedTask: (state: Task[], { payload }: PayloadAction<Task>) => {
      return state.map((task) => {
        if (task._id === payload._id) {
          return payload
        }
        return task
      })
    },
    addHoldedTask: (state: Task[], { payload }: PayloadAction<Task>) => {
      state.push(payload)
    },
    deleteHoldedTask: (state: Task[], { payload }: PayloadAction<string>) => {
      return state.filter((task) => task._id !== payload)
    },
  },
})

export const {
  setTasks,
  updateTask,
  addTask,
  addTasksList,
  deleteTask,
  resetTaskState,
} = tasksSlice.actions
export const { setCalendarDay, setFetchedTaskDates, addFetchedTaskDates } =
  CalendarDaySlice.actions

export const {
  setHoldedTasks,
  updateHoldedTask,
  addHoldedTask,
  deleteHoldedTask,
} = holdedTasksSlice.actions

export default combineReducers({
  allTasks: tasksSlice.reducer,
  holdedTasks: holdedTasksSlice.reducer,
  calendarDayTask: CalendarDaySlice.reducer,
})
