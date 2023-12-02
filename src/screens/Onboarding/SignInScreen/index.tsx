/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
// Components
import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TextInput,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from 'components/UI/Input'
import Title from 'components/UI/Title'
import Button from 'components/UI/Button'

// Libs & utils
import navigationService from 'navigation/navigationService'
import logger from 'utils/logger'

// Hooks
import useForm from 'hooks/useFormHooks'
import { useDispatch } from 'react-redux'

// Types & Redux
import { SignInForm } from 'types'
import { signIn, setIsAuth } from 'store/auth'

// Helpers
import validateEmail from 'helpers/validateEmail'

// Styles & Assets
import styles from './styles'
import { colors, positionStyles, spacingStyles } from 'styles'
import layoutStyles from 'styles/layoutStyles'
import i18n from 'locales/i18n'
import Header from 'components/Header'

const initialState: SignInForm = {
  email: '',
  password: '',
}

const SignInScreen = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const { formState, updateFormValuesAction, updateFormErrors } =
    useForm(initialState)
  const { email, password, errors } = formState
  const [authErrorText, setErrorText] = useState('')

  const validateForm = () => {
    let valid = true
    if (email === '') {
      updateFormErrors({ email: true })
      valid = false
    }
    if (email !== '' && !validateEmail(email)) {
      updateFormErrors({ email: true })
      valid = false
    }
    if (password === '') {
      updateFormErrors({ password: true })
      valid = false
    }
    return valid
  }

  const onLogInPress = async () => {
    if (!validateForm()) {
      setErrorText('')
      return
    }

    setIsLoading(true)
    try {
      setErrorText('')
      await dispatch(signIn(email, password))
    } catch (e) {
      logger.error('SignIn error message', e)
      setErrorText(typeof e === 'string' ? e : 'Invalid login')
    } finally {
      setIsLoading(false)
    }
  }

  const onSignUpPress = () => {
    navigationService.navigate('Onboarding_SignUp')
  }

  const onForgotPasswordPress = () => {
    navigationService.navigate('Onboarding_ForgotPassword')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
    >
      <Header onBack={() => navigationService.goBack()} isOnboarding />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={layoutStyles.onboardingContainer}>
          <Text style={styles.titleText}>{i18n.t('loginsmall')}</Text>
          <View
            style={[
              styles.inputContainer,
              errors.email && { borderColor: colors.LIGHT_RED },
            ]}
          >
            <TextInput
              placeholder={i18n.t('email')}
              autoCapitalize="none"
              value={email}
              onChangeText={(value) =>
                updateFormValuesAction({ email: value.replace(/\s/g, '') })
              }
              style={styles.inputStyle}
              testID="login_email"
              placeholderTextColor={colors.GREY_PLACEHOLDER}
            />
          </View>
          <View
            style={[
              styles.inputContainer,
              errors.password && { borderColor: colors.LIGHT_RED },
            ]}
          >
            <TextInput
              placeholder={i18n.t('password')}
              autoCapitalize="none"
              secureTextEntry={true}
              value={password}
              onChangeText={(value) =>
                updateFormValuesAction({ password: value.replace(/\s/g, '') })
              }
              style={styles.inputStyle}
              testID="login_password"
              placeholderTextColor={colors.GREY_PLACEHOLDER}
            />
          </View>
          {!!authErrorText && (
            <Text style={styles.errorText}>{authErrorText}</Text>
          )}
          <Text style={styles.forgotText} onPress={onForgotPasswordPress}>
            {i18n.t('forgotPasswordCapital')}
          </Text>
          <Button
            text={i18n.t('login')}
            isLoading={isLoading}
            textStyle={styles.buttonText}
            backgroundColor={colors.LIME}
            style={[spacingStyles.mT30, positionStyles.width100]}
            onPress={onLogInPress}
            testID="login_btn"
          />
          <Text style={styles.haveAccountText}>
            {i18n.t('donthaveaccount')}

            <Text style={styles.loginText} onPress={onSignUpPress}>
              {i18n.t('signupsmall')}
            </Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default SignInScreen
