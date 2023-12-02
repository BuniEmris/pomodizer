import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Tag } from 'types'

const tagsSlice = createSlice({
  name: 'tags',
  initialState: [] as Tag[],
  reducers: {
    setTags: (state, { payload }: PayloadAction<Tag[]>) => {
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

    updateTag: (state, { payload }: PayloadAction<Tag>) => {
      return state.map((tag) => {
        if (tag._id === payload._id || tag.localId === payload.localId) {
          return payload
        }

        return tag
      })
    },

    addTag: (state, { payload }: PayloadAction<Tag>) => {
      if (payload.localId) {
        const localTagIdx = state.findIndex(
          (el) => el.localId === payload.localId
        )

        if (localTagIdx > -1) {
          state[localTagIdx] = payload
          return
        }
      }

      const existTagId = state.findIndex((el) => el._id === payload._id)

      if (existTagId > -1) {
        state[existTagId] = payload
        return
      }

      state.push(payload)
      return state
    },

    deleteTag: (state, { payload }: PayloadAction<string>) => {
      return state.filter((tag) => tag._id !== payload)
    },

    resetTagState: () => {
      return []
    },
  },
})

export const { setTags, updateTag, addTag, deleteTag, resetTagState } =
  tagsSlice.actions

export default tagsSlice.reducer
