import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import FeaturesScreen from 'screens/Onboarding/FeaturesScreen'
import WelcomeScreen from 'screens/Onboarding/WelcomeScreen'
import SignInScreen from 'screens/Onboarding/SignInScreen'
import SignUpScreen from 'screens/Onboarding/SignUpScreen'
import ForgotPasswordScreen from 'screens/Onboarding/ForgotPasswordScreen'

import { ONBOARDING_ROUTES } from 'navigation/routes'

const Stack = createStackNavigator()

const OnboardingNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName={ONBOARDING_ROUTES.WELCOME}
  >
    <Stack.Screen name={ONBOARDING_ROUTES.WELCOME} component={WelcomeScreen} />
    <Stack.Screen name={ONBOARDING_ROUTES.SIGN_IN} component={SignInScreen} />
    <Stack.Screen name={ONBOARDING_ROUTES.SIGN_UP} component={SignUpScreen} />
    <Stack.Screen
      name={ONBOARDING_ROUTES.FORGOT_PASSWORD}
      component={ForgotPasswordScreen}
    />
    <Stack.Screen
      name={ONBOARDING_ROUTES.FEATURES}
      component={FeaturesScreen}
    />
  </Stack.Navigator>
)

export default OnboardingNavigator
