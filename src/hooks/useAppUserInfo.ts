import { useEffect } from 'react'
import { useTypedSelector } from 'store'
import { Platform } from 'react-native'

import { getVersion } from 'react-native-device-info'
import { patchUser } from 'store/auth/thunkActions'
import { useDispatch } from 'react-redux'
import messaging from '@react-native-firebase/messaging'
import i18n from 'locales/i18n'

const useAppUserInfo = () => {
  const { user } = useTypedSelector((store) => store.auth)
  const dispatch = useDispatch()

  const checkAndUpdateInfo = async () => {
    try {
      const deviceToken = await messaging().getToken()

      const payload = {
        deviceOS: Platform.OS,
        appVersion: getVersion(),
        // isNotificationEnabled?: boolean
        deviceToken,
        timeZoneOffset: new Date().getTimezoneOffset(),
        language: i18n?.currentLocale() || 'en',
      }

      if (
        user.appVersion !== payload.appVersion ||
        user.deviceToken !== payload.deviceToken
      ) {
        await dispatch(patchUser(payload))
      }
    } catch (e) {
      //
    }
  }

  useEffect(() => {
    if (!__DEV__) {
      checkAndUpdateInfo()
    }
  }, [])
}

export default useAppUserInfo
