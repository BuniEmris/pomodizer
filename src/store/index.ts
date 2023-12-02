import {
  createStore,
  applyMiddleware,
  combineReducers,
  Action,
  AnyAction,
} from 'redux'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AuthReducer } from './auth'
import TaskReducer from './tasks'
import TimerReducer from './timer'
import TagsReducer from './tags'
import NotesReducer from './notes'
import GoalsReducer from './goals'

const rootReducer = combineReducers({
  auth: AuthReducer,
  tasks: TaskReducer,
  timer: TimerReducer,
  tags: TagsReducer,
  notes: NotesReducer,
  goals: GoalsReducer,
})

export type AppState = ReturnType<typeof rootReducer>
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector

export type ReduxState = ReturnType<typeof rootReducer>

export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>
export type PromiseThunk<ReturnType = void> = ThunkAction<
  Promise<ReturnType>,
  AppState,
  unknown,
  Action<string>
>

// persist

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// <<<<

export default function configureStore() {
  const middlewares = [thunkMiddleware]

  const middleWareEnhancer = applyMiddleware(...middlewares)

  const store = createStore(persistedReducer, middleWareEnhancer)
  const persistor = persistStore(store)

  return { store, persistor }
}
