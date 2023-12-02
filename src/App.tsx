import React, { useEffect } from 'react'
import NavigationContainer from 'screens/NavigationContainer'
import codePush from 'react-native-code-push'
import { Settings } from 'react-native-fbsdk-next'
import inAppMessaging from '@react-native-firebase/in-app-messaging'
import * as RNLocalize from 'react-native-localize'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import configureStore from 'store'
import { PersistGate } from 'redux-persist/integration/react'
import messaging from '@react-native-firebase/messaging'
import logger from 'utils/logger'
import { LogBox } from 'react-native'
import {
  gestureHandlerRootHOC,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
// import moment from 'moment'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment/min/moment-with-locales.min.js')

const { store, persistor } = configureStore()

const App = () => {
  LogBox.ignoreLogs(['EventEmitter.removeListener'])
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // console.log('Message handled in the background!', remoteMessage)
    if (remoteMessage?.data?.link) {
      // openUrl(remoteMessage?.data?.link)
    }
  })

  useEffect(() => {
    const init = async () => {
      try {
        Settings.initializeSDK()
        Settings.setAdvertiserTrackingEnabled(true)
        await inAppMessaging().setMessagesDisplaySuppressed(true)
        // const installationsForDefaultApp = firebase()
        // const id = await installationsForDefaultApp.getId()
        // console.log('getIdid', id)
      } catch (e) {
        logger.error('init inAppMessaging and FB', e)
      }
    }

    init()
  }, [])
  useEffect(() => {
    const momentLocalize = () => {
      try {
        const localize = RNLocalize.findBestAvailableLanguage([
          'en',
          'ru',
          'uk',
          'uz',
          'de',
          'fr',
          'es',
          'pt',
        ])?.languageTag

        moment.locale(localize)
      } catch (e) {
        logger.error('momentLocalize', e)
      }
    }

    momentLocalize()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
            <NavigationContainer />
            {/* </PersistGate> */}
          </Provider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default codePush(App)
