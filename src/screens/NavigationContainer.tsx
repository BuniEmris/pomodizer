import React, { useEffect, useState, useRef } from 'react'
// Components
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DashboardNavigator, OnboardingNavigator } from '../navigation'
import { NavigationContainer as NavigationWrap } from '@react-navigation/native'
import UpdateAlert from 'components/UpdateAlert'
import dynamicLinks from '@react-native-firebase/dynamic-links'

// Libs & Utils
import {
  isReadyNavigation,
  navigationRef,
} from '../navigation/navigationService'
import logger from 'utils/logger'
import { useTypedSelector } from 'store'
import linking from 'navigation/linking'
import analytics from '@react-native-firebase/analytics'

// Types & redux
import { authenticate } from 'store/auth'
import { useDispatch } from 'react-redux'
import { PurchaseProvider } from 'context/purchaseContext'

import SplashScreen from 'react-native-splash-screen'

const NavigationContainer = () => {
  const routeNameRef = useRef<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const { isAuth, isNewUser } = useTypedSelector((store) => store.auth)
  // splash hide

  const handleRouteStateChange = async () => {
    try {
      const previousRouteName = routeNameRef.current
      const currentRouteName = navigationRef.current?.getCurrentRoute()?.name

      if (currentRouteName && previousRouteName !== currentRouteName) {
        await analytics().logScreenView({
          screen_name: currentRouteName,
          screen_class: currentRouteName,
        })
        routeNameRef.current = currentRouteName
      }
    } catch (e) {
      //
    }
  }
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  useEffect(() => {
    const auth = async () => {
      setIsLoading(true)
      try {
        await dispatch(authenticate())
      } catch (e) {
        logger.error('Auth', e, false)
      } finally {
        setIsLoading(false)
      }
    }

    auth()

    return () => {
      isReadyNavigation.current = false
    }
  }, [])

  if (isLoading && !isAuth) {
    return null
  }

  return (
    <NavigationWrap
      ref={navigationRef}
      linking={linking}
      onReady={() => {
        isReadyNavigation.current = true
        routeNameRef.current =
          navigationRef.current?.getCurrentRoute()?.name || 'initial'
      }}
      onStateChange={handleRouteStateChange}
    >
      <StatusBar />
      {isAuth ? (
        <PurchaseProvider>
          <DashboardNavigator isNewUser={isNewUser} />
          <UpdateAlert />
        </PurchaseProvider>
      ) : (
        <OnboardingNavigator />
      )}
    </NavigationWrap>
  )
}

export default NavigationContainer
