import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Goal } from 'types'

const goalsSlice = createSlice({
  name: 'goals',
  initialState: [] as Goal[],
  reducers: {
    setGoals: (state, { payload }: PayloadAction<Goal[]>) => {
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

    updateGoal: (state, { payload }: PayloadAction<Partial<Goal>>) => {
      return state.map((goal) => {
        if (goal._id === payload._id || goal.localId === payload.localId) {
          return {
            ...goal,
            ...payload,
          }
        }
        return goal
      })
    },

    addGoal: (state, { payload }: PayloadAction<Goal>) => {
      if (payload.localId) {
        const localIdx = state.findIndex((el) => el.localId === payload.localId)

        if (localIdx > -1) {
          state[localIdx] = payload
          return
        }
      }

      const existIdx = state.findIndex((el) => el._id === payload._id)

      if (existIdx > -1) {
        state[existIdx] = payload
        return
      }

      state.push(payload)
      return state
    },

    deleteGoal: (state, { payload }: PayloadAction<string>) => {
      return state.filter((goal) => goal._id !== payload)
    },

    resetGoalState: () => {
      return []
    },
  },
})

export const { setGoals, updateGoal, addGoal, deleteGoal, resetGoalState } =
  goalsSlice.actions

export default goalsSlice.reducer
