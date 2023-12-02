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
  Linking,
} from 'react-native'
import Button from 'components/UI/Button'
import CustomModal from 'components/UI/CustomModal'

// Libs & utils
import navigationService from 'navigation/navigationService'

// Hooks
import useForm from 'hooks/useFormHooks'
import { useDispatch } from 'react-redux'

// Types & Redux
import { SignUpForm } from 'types'
import { signUp } from 'store/auth/thunkActions'

// Helpers
import validateEmail from 'helpers/validateEmail'
import logger from 'utils/logger'

// Styles & Assets
import styles from './styles'
import { colors, positionStyles, spacingStyles, typo } from 'styles'
import layoutStyles from 'styles/layoutStyles'
import i18n from 'locales/i18n'
import { DmText } from 'components/UI'
import Header from 'components/Header'

const initialState: SignUpForm = {
  name: '',
  email: '',
}

const SignUpScreen = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckMailModalVisible, setIsCheckMailModalVisible] = useState(false)
  const { formState, updateFormValuesAction, updateFormErrors } =
    useForm(initialState)
  const { name, email, password, errors } = formState
  const [authErrorText, setAuthErrorText] = useState('')

  const validateForm = () => {
    let valid = true
    if (name === '') {
      updateFormErrors({ name: true })
      valid = false
    }
    if (email === '') {
      updateFormErrors({ email: true })
      valid = false
    }
    if (email !== '' && !validateEmail(email)) {
      updateFormErrors({ email: true })
      valid = false
    }
    return valid
  }

  const onSignUpPress = async () => {
    if (!validateForm()) {
      setAuthErrorText('')
      return
    }

    setIsLoading(true)
    try {
      setAuthErrorText('')
      await dispatch(signUp(name, email))
      setIsCheckMailModalVisible(true)
    } catch (e: any) {
      logger.error('SignIn error message', e)
      setAuthErrorText(typeof e === 'string' ? e : 'Invalid email')
    } finally {
      setIsLoading(false)
    }
  }

  const onLogInPress = () => {
    navigationService.navigate('Onboarding_SignIn')
  }

  const handleBackToLoginPress = () => {
    setIsCheckMailModalVisible(false)
    onLogInPress()
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
    >
      <Header onBack={() => navigationService.goBack()} isOnboarding />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={layoutStyles.onboardingContainer}>
          <Text style={styles.titleText}>{i18n.t('signupsmall')}</Text>
          <View
            style={[
              styles.inputContainer,
              errors.name && { borderColor: colors.LIGHT_RED },
            ]}
          >
            <TextInput
              placeholder={i18n.t('name')}
              autoCapitalize="none"
              value={name}
              onChangeText={(value) =>
                updateFormValuesAction({ name: value.replace(/\s/g, '') })
              }
              style={styles.inputStyle}
              placeholderTextColor={colors.GREY_PLACEHOLDER}
            />
          </View>
          <View
            style={[
              styles.inputContainer,
              errors?.email && { borderColor: colors.GREY_PLACEHOLDER },
            ]}
          >
            <TextInput
              placeholder={i18n.t('email')}
              autoCapitalize="none"
              value={email}
              onChangeText={(value) =>
                updateFormValuesAction({ email: value.replace(/\s/g, '') })
              }
              placeholderTextColor={colors.GREY_PLACEHOLDER}
              style={styles.inputStyle}
            />
          </View>
          {!!authErrorText && (
            <Text style={styles.errorText}>{authErrorText}</Text>
          )}
          <Button
            text={i18n.t('signup')}
            isLoading={isLoading}
            disabled={isLoading}
            textStyle={styles.buttonText}
            backgroundColor={colors.LIME}
            style={[spacingStyles.mT30, positionStyles.width100]}
            onPress={onSignUpPress}
          />
          <Text style={styles.haveAccountText}>
            {i18n.t('alreadyhaveanaccount')}
            <Text style={styles.loginText} onPress={onLogInPress}>
              {i18n.t('loginsmall')}
            </Text>
          </Text>
          <DmText marginTop={30}>
            By clicking to sign up, you agree with our Terms. Learn how we
            process your data in our
            <DmText
              color="black"
              onPress={() =>
                Linking.openURL(
                  'https://pomodizer.com/Privacy_Policy_pomodizer.pdf'
                )
              }
            >
              {' '}
              Privacy Policy{' '}
            </DmText>
            and{' '}
            <DmText
              color="black"
              onPress={() =>
                Linking.openURL(
                  'https://pomodizer.com/Terms_of_Service_pomodizer.pdf'
                )
              }
            >
              Terms of use
            </DmText>
          </DmText>
          <CustomModal
            visible={isCheckMailModalVisible}
            onClose={() => setIsCheckMailModalVisible(false)}
          >
            <View style={positionStyles.width100}>
              <Text style={styles.modalTitle}>
                {i18n.t('success_sign_up_title')}
              </Text>
              <Text style={styles.modalText}>
                {i18n.t('success_sign_up_desc')}
              </Text>
              <Button
                text={i18n.t('login')}
                textStyle={styles.buttonText}
                backgroundColor={colors.LIME}
                style={[spacingStyles.mT30]}
                onPress={() => handleBackToLoginPress()}
              />
            </View>
          </CustomModal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen
