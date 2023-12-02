import moment from 'moment';
import { setNotes, updateNote, addNote, deleteNote } from 'store/notes';

import apiClient from 'utils/apiClient';
import { getWeek, getDay } from 'utils/date';

import { Note } from 'types';
import { AppThunk, PromiseThunk } from '../index'
import { Paginated } from '@feathersjs/feathers';

export const fetchLastNotes = (): PromiseThunk<Note[]> => async dispatch => {
  const query = {
    $limit: 100,
    $sort: {
      createdAt: -1
    }
  };
  const { data: notes }: Paginated<Note> = await apiClient.service('notes').find({ query });
  notes.sort((a, b) => a.status == 'done' ? 1 : -1)
  dispatch(setNotes(notes));

  return notes;
};

export const fetchWeekNotes = (currentWeek: number): PromiseThunk<Note[]> => async dispatch => {
  const [startOfWeek, , , , , , endOfWeek] = getWeek('current', currentWeek);

  const query = {
    $limit: 100,
    $or: [
      { status: 'active' },
      { isReminded: true, dueDate: { $gte: startOfWeek, $lte: endOfWeek } },
      { status: 'done', doneAt: { $gte: startOfWeek, $lte: endOfWeek } },
    ],
  };
  const { data: notes }: Paginated<Note> = await apiClient.service('notes').find({ query });
  dispatch(setNotes(notes));

  return notes;
};

export const fetchDayNotes = (currentDay: number): PromiseThunk<Note[]> => async dispatch => {
  const day = getDay('current', currentDay);

  const query = {
    $limit: 100,
    $or: [
      { status: 'active' },
      { isReminded: true, dueDate: { $gte: day, $lte: day } },
      { status: 'done', doneAt: { $gte: day, $lte: day } },
    ],
  };
  const { data: notes }: Paginated<Note> = await apiClient.service('notes').find({ query });

  dispatch(setNotes(notes));

  return notes;
};

export const patchNote = (
  id: string,
  values: Partial<Note>,
): PromiseThunk<Note> => async dispatch => {
  dispatch(updateNote({ _id: id, ...values }))

  const note: Note = await apiClient.service('notes').patch(id, values);
  dispatch(updateNote(note));

  return note;
};

export const createNote = (
  values: Partial<Note>,
): PromiseThunk<Note> => async dispatch => {
  // schedule notification on task if dueTime is present
  const query =
    values.isReminded && values.dueTime && values.dueDate
      ? { $scheduleDate: moment(`${values.dueDate} ${values.dueTime}`, 'DD.MM.YYYY HH:mm') }
      : {};

  const note: Note = await apiClient.service('notes').create(values, { query });
  dispatch(addNote(note));

  return note;
};

export const removeNote = (
  id: string,
): PromiseThunk<Note> => async dispatch => {
  const note: Note = await apiClient.service('notes').remove(id);
  dispatch(deleteNote(note._id));

  return note;
};
