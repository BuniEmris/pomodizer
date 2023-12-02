import React, { useState } from 'react'
// Components
import { Image, Alert, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from 'components/UI/Button'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin'

// Libs & Utils
import navigationService from 'navigation/navigationService'
import { colors, positionStyles, spacingStyles } from 'styles'
import { useDispatch } from 'react-redux'

// Assets & Styles
import TomatoLogo from 'assets/images/Onboarding/tomatoLogo.png'
import styles from './styles'
import i18n from 'locales/i18n'
import config from 'config'
import logger from 'utils/logger'
import AppleLogo from '../../../assets/images/icons/apple-logo.svg'
import GoogleLogo from 'assets/images/icons/google-logo.svg'
import { DmText, DmView } from 'components/UI'
import { socialSignIn } from 'store/auth/thunkActions'
import { isIOs } from 'styles/helpers'
import { useTypedSelector } from 'store'
import { TouchableOpacity } from 'react-native-gesture-handler'

GoogleSignin.configure({
  webClientId: config.FIREBASE_WEB_CLIENT_ID,
  offlineAccess: true,
})

const WelcomeScreen = () => {
  const { isLoading } = useTypedSelector((store) => store.auth)
  const [authType, setAuthType] = useState('')
  const dispatch = useDispatch()

  const handleSignUpPress = () => {
    navigationService.navigate('Onboarding_SignUp')
  }
  const handleLoginPress = () => {
    navigationService.navigate('Onboarding_SignIn')
  }

  async function onAppleButtonPress() {
    setAuthType('apple')
    // performs login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })

      const token = appleAuthRequestResponse.identityToken

      logger.log('Apple token', token)
      if (token) {
        await dispatch(
          socialSignIn(
            appleAuthRequestResponse.email || '',
            token,
            'apple',
            appleAuthRequestResponse?.fullName?.givenName || ''
          )
        )
      }
    } catch (e: any) {
      if (e?.code !== appleAuth.Error.CANCELED) {
        logger.error('apple login', e)
        Alert.alert('Something went wrong.')
      }
    }
  }

  const handleGoogleButtonPress = async () => {
    try {
      setAuthType('google')
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      const token = userInfo.idToken
      logger.log('user info', userInfo)

      if (token) {
        await dispatch(
          socialSignIn(
            userInfo.user.email,
            token,
            'google',
            userInfo?.user?.givenName || ''
          )
        )
      }
    } catch (error: any) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error?.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Google sign in is not available')
      } else {
        // Alert.alert(i18n.t('error:something_wrong'))
        logger.error('Google Auth', error)
        Alert.alert('Something went wrong.')
      }
    }
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.WHITE }]}
      testID="welcome_screen"
    >
      <View style={styles.whiteBlock}>
        <Text style={styles.theBestText}>
          <Text style={{ color: colors.LIGHT_RED }}>{'Pomodizer\n'}</Text>
          {i18n.t('the_best_planner')}
        </Text>
      </View>
      <Image source={TomatoLogo} style={styles.logo} />
      <View style={[spacingStyles.mB50, positionStyles.width100]}>
        {isIOs && appleAuth.isSupported && (
          <Button
            text={i18n.t('apple_auth')}
            backgroundColor={colors.BLACK}
            onPress={() => onAppleButtonPress()}
            Icon={AppleLogo}
            isLoading={isLoading && authType === 'apple'}
            disabled={isLoading}
            preloaderColor="white"
          />
        )}

        <Button
          text={i18n.t('google_auth')}
          backgroundColor={colors.WHITE}
          style={[spacingStyles.mT20, { borderColor: colors.LIME }]}
          textStyle={{ color: colors.LIME }}
          onPress={() => handleGoogleButtonPress()}
          Icon={GoogleLogo}
          isLoading={isLoading && authType === 'google'}
          disabled={isLoading}
          preloaderColor={colors.BLACK_GREY}
        />

        <DmView flexDirection="row" marginTop={25} justifyContent="center">
          <TouchableOpacity onPress={handleLoginPress}>
            <DmText fontWeight="500">{i18n.t('email_sign_in')}</DmText>
          </TouchableOpacity>
          <DmText marginLeft={10} marginRight={10}>
            or
          </DmText>
          <TouchableOpacity onPress={handleSignUpPress}>
            <DmText fontWeight="500">{i18n.t('email_sign_up')}</DmText>
          </TouchableOpacity>
        </DmView>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen
