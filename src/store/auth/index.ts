import { authService } from 'utils/apiClient'
import authSlice from './slice'
import { signIn, authenticate } from './thunkActions'

export const {
  setAuthError,
  setIsAuth,
  setIsLoading,
  setUser,
  updateUser,
  resetAuthState,
  setLanguage,
  setIsNewUser,
  setApiSyncing,
} = authSlice.actions

export const AuthReducer = authSlice.reducer

export { signIn, authenticate }
