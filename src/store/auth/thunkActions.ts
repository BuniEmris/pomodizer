import { AppThunk } from 'store'
import apiClient, { resetPasswordService, usersService } from 'utils/apiClient'
import logger from 'utils/logger'
import {
  setIsAuth,
  setIsLoading,
  setAuthError,
  setUser,
  resetAuthState,
  setLanguage,
  updateUser,
  setIsNewUser,
  setApiSyncing,
} from 'store/auth'
import { syncLastTasks, syncLocalTaskWithApi } from 'store/tasks/thunkActions'
import { fetchTags, syncLocalTagWithApi } from 'store/tags/thunkActions'
import { fetchGoals, syncLocalGoalWithApi } from 'store/goals/thunkActions'
import { fetchLastNotes, fetchWeekNotes } from 'store/notes/thunkActions'
import navigationService from 'navigation/navigationService'
import i18n from 'locales/i18n'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from 'types'
import { removeUserToken } from 'utils/storage'
import crashlytics from '@react-native-firebase/crashlytics'
import inAppMessaging from '@react-native-firebase/in-app-messaging'
import { testTimer } from 'store/timer'
import { resetTaskState } from 'store/tasks'
import { resetTagState } from 'store/tags'
import { resetGoalState } from 'store/goals'

export const authenticate = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true))

  try {
    const resp = await apiClient.authenticate()
    dispatch(setUser(resp.user))
    // logger.log('Auth', resp)
    // locales

    dispatch(setIsAuth(true))
    dispatch(bootstrapData())
    dispatch(setIsNewUser(false))
    return Promise.resolve(resp)
  } catch (e: any) {
    dispatch(setIsAuth(false))
    dispatch(resetAuthState())
    dispatch(resetTaskState())
    dispatch(resetTagState())
    dispatch(resetGoalState())
    removeUserToken()
    logger.error('authenticate jwt', e, false)
    dispatch(setAuthError(e?.message))
    return Promise.reject(e?.message || e)
  } finally {
    dispatch(setIsLoading(false))
  }
}

export const updateLanguage =
  (lang: string): AppThunk =>
  async (dispatch) => {
    try {
      i18n.locale = lang ?? 'en'
      await AsyncStorage.setItem('localeLang', lang ?? 'en')
      dispatch(setLanguage(lang))
      dispatch(
        patchUser({
          language: lang,
        })
      )
    } catch (e) {
      logger.error('updateLanguage', e)
    }
  }

export const signIn =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
      const resp = await apiClient.authenticate({
        email,
        password,
        strategy: 'local',
      })

      logger.log('signIn resp', resp)

      if (!resp?.user?.isVerified) {
        return Promise.reject('NOT_VERIFIED')
      }
      dispatch(setUser(resp?.user))
      dispatch(setIsNewUser(!!resp?.isNewUser))
      dispatch(setIsAuth(true))
      dispatch(bootstrapData())
      return Promise.resolve(resp)
    } catch (e: any) {
      logger.error('sign in', e)
      return Promise.reject(e?.message || e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const socialSignIn =
  (
    email: string,
    token: string,
    strategy: 'apple' | 'google',
    firstName?: string
  ): AppThunk =>
  async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
      const resp = await apiClient.authenticate({
        email,
        token,
        strategy,
        language: i18n?.currentLocale() || 'en',
        firstName: firstName || '',
      })

      logger.log('signIn resp', resp)

      if (!resp.user?.isVerified) {
        return Promise.reject('NOT_VERIFIED')
      }
      dispatch(setUser(resp?.user))
      dispatch(setIsNewUser(resp?.isNewUser))
      dispatch(setIsAuth(true))
      dispatch(bootstrapData())
      return Promise.resolve(resp)
    } catch (e: any) {
      logger.error('socialSignIn', e)
      return Promise.reject(e?.message || e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const signUp =
  (name: string, email: string): AppThunk =>
  async (dispatch) => {
    logger.log('signUp Start')
    dispatch(setIsLoading(true))
    try {
      const resp = await usersService.create({
        firstName: name,
        email,
        mobileEmailAuth: true,
        language: i18n?.currentLocale() || 'en',
      })

      logger.log('signUp resp', resp)
      dispatch(setIsNewUser(true))

      // TODO check user sign in
      return Promise.resolve('Ok')
    } catch (e: any) {
      logger.error('signUp', e)
      return Promise.reject(e?.message || e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const resetPassword =
  (email: string): AppThunk =>
  async (dispatch) => {
    logger.log('resetPasword Start')
    dispatch(setIsLoading(true))
    try {
      const resp = await resetPasswordService.create({
        email,
      })

      logger.log('resetPasword resp', resp)
      return Promise.resolve('Ok')
    } catch (e: any) {
      logger.error('resetPasword resp', e)
      return Promise.reject(e?.message || e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const signOut = (): AppThunk => async (dispatch) => {
  try {
    await apiClient.authentication.logout()
    dispatch(setIsAuth(false))
    dispatch(resetAuthState())
    dispatch(resetTaskState())
    dispatch(resetTagState())
    dispatch(resetGoalState())
    navigationService.navigate('Onboarding_Welcome')
  } catch (e) {
    logger.error('signOut', e)
  }
}

export const bootstrapData = (): AppThunk => async (dispatch, getState) => {
  try {
    const { user } = getState().auth
    const userId = user._id

    const today = Date.now()
    dispatch(syncLastTasks())
    dispatch(fetchTags())
    dispatch(fetchGoals(today))
    dispatch(fetchLastNotes())

    if (user.settings?.testTimer) {
      dispatch(testTimer())
    }

    const lang = await AsyncStorage.getItem('localeLang')
    if (lang) {
      i18n.locale = lang
    }
    await crashlytics().setUserId(userId)
    inAppMessaging().setMessagesDisplaySuppressed(false)
  } catch (e) {
    logger.error('bootstrap data', e)
    //
  }
}

export const patchUser =
  (payload: Partial<User>): AppThunk =>
  async (dispatch, getState) => {
    const userId = getState().auth.user?._id
    try {
      dispatch(updateUser(payload))

      const updatedUser = await usersService.patch(userId, payload)
      logger.log('updatedUser', updatedUser)

      dispatch(updateUser(updatedUser))
    } catch (e) {
      logger.error('updatedUser', e)
      return Promise.reject(e)
    }
  }

export const deleteAccount = (): AppThunk => async (dispatch, getState) => {
  const userId = getState().auth.user._id
  if (!userId) {
    return
  }

  try {
    await usersService.remove(userId)
    dispatch(setIsAuth(false))
    dispatch(resetAuthState())
    await removeUserToken()
  } catch (e) {
    logger.error('Delete account', e)
  } finally {
    dispatch(setIsLoading(false))
  }
}

export const syncLocalDataWithApi =
  (): AppThunk => async (dispatch, getState) => {
    logger.log('try to sync')
    if (getState().auth.isApiSyncing) {
      return
    }
    logger.log('Start sync')

    dispatch(setApiSyncing(true))
    try {
      await dispatch(syncLocalTaskWithApi())
      await dispatch(syncLocalGoalWithApi())
      await dispatch(syncLocalTagWithApi())
    } catch (e) {
      logger.error('syncLocalDataWithApi', e)
    } finally {
      dispatch(setApiSyncing(false))
    }
  }
