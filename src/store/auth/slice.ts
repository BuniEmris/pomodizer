import { createSlice, isAllOf, PayloadAction } from '@reduxjs/toolkit'
import { Loading, ErrorState, User } from 'types'
import { AppStateStatus } from 'react-native'

export type AuthState = {
  isAuth: boolean
  isLoading: Loading
  error: ErrorState
  user: User
  language: string
  appState: AppStateStatus
  isNewUser: boolean
  isApiSyncing?: boolean
}

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  error: null,
  user: {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
  },
  language: '',
  appState: 'active',
  isNewUser: false,
  isApiSyncing: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
      return state
    },
    setIsNewUser(state, action: PayloadAction<boolean>) {
      state.isNewUser = action.payload
      return state
    },
    setIsLoading(state, action: PayloadAction<Loading>) {
      state.isLoading = action.payload
      return state
    },
    setAuthError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload
      return state
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
      return state
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      state.user = {
        ...state.user,
        ...action.payload,
      }

      return state
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload
      return state
    },
    setAppState(state, action: PayloadAction<AppStateStatus>) {
      state.appState = action.payload
      return state
    },
    setApiSyncing(state, action: PayloadAction<boolean>) {
      state.isApiSyncing = action.payload
      return state
    },
    resetAuthState(state) {
      state = initialState
      return state
    },
  },
})

export default authSlice
