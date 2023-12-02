import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'
import moment from 'moment'

import { getWeek, getDay } from 'utils/date'

import { Note } from 'types/'
import { AppState } from '../index'
// import { DateState } from 'types/store/date';

export const getSortedNotes = createCachedSelector(
  (state: AppState) => state.notes,
  (state: AppState, dayInMs: number) => dayInMs,
  (notes, dayInMs) => {
    if (Array.isArray(notes) && notes.length === 0) return []

    const filteredNotes = filterNotes(notes, dayInMs)

    const { reminded, notReminded } = filteredNotes.reduce(
      (obj, item) => {
        if (item.isReminded) {
          obj.reminded.push(item)
        } else {
          obj.notReminded.push(item)
        }
        return obj
      },
      { reminded: [] as Note[], notReminded: [] as Note[] }
    )

    return reminded.concat(notReminded)
  }
)(
  (state, dayInMs) => dayInMs // Cache selectors by state name
)

const filterNotes = (notes: Note[], dayInMs: number) => {
  const day = getDay('current', dayInMs)
  return notes.filter(
    (note) =>
      note.status === 'active' ||
      (note.isReminded &&
        moment(note.dueDate, 'DD.MM.YYYY') >= day &&
        moment(note.dueDate, 'DD.MM.YYYY') <= day) ||
      (note.status === 'done' &&
        moment(note.doneAt) >= day &&
        moment(note.doneAt) <= day)
  )
}

export const selectLastNotes = createSelector(
  (state: AppState) => state.notes,
  (notes) => notes.filter((el) => el.status !== 'done').slice(0, 3)
)

// export const selectNoteById = createCachedSelector(
//   (state: AppState) => state.notes,
//   (state: AppState, noteId: string) => noteId,
//   (notes, noteId) => {
//     return notes.find(item => item._id === noteId)
//   })(
//     (state, noteId) => noteId
//   )
export const selectNoteById = createSelector(
  [
    (state: AppState) => state.notes,
    (state: AppState, noteId: string) => noteId,
  ],
  (notes, noteId) => {
    return notes.find((item) => item._id === noteId)
  }
)
