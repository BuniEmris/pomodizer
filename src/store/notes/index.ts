import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from 'types';

const notesSlice = createSlice({
  name: 'notes',
  initialState: [] as Note[],
  reducers: {
    setNotes: (state, { payload }: PayloadAction<Note[]>) => {
      return payload;
    },

    updateNote: (state, { payload }: PayloadAction<Partial<Note>>) => {
      return state.map(note => {
        if (note._id === payload._id) {
          return {
            ...note,
            ...payload
          };
        }
        return note;
      });
    },

    addNote: (state, { payload }: PayloadAction<Note>) => {
      state.unshift(payload);
    },

    deleteNote: (state, { payload }: PayloadAction<string>) => {
      return state.filter(note => note._id !== payload);
    },
  },
});

export const { setNotes, updateNote, addNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
