import React, { useState } from 'react'
// Components
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from 'components/UI/Input'
import Button from 'components/UI/Button'
import CustomModal from 'components/UI/CustomModal'

// Libs & utils
import navigationService from 'navigation/navigationService'
import logger from 'utils/logger'

// Hooks
import useForm from 'hooks/useFormHooks'

// Types & Redux
import { useDispatch } from 'react-redux'
import { resetPassword } from 'store/auth/thunkActions'

// Helpers
import validateEmail from 'helpers/validateEmail'

// Styles & Assets
import styles from './styles'
import { colors, positionStyles, spacingStyles } from 'styles'
import layoutStyles from 'styles/layoutStyles'
import BackArrow from 'assets/images/icons/backArrow.svg'
import i18n from 'locales/i18n'

const initialState = {
  email: '',
}

const ForgotPasswordScreen = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckMailModalVisible, setIsCheckMailModalVisible] = useState(false)

  const { formState, updateFormValuesAction, updateFormErrors } =
    useForm(initialState)
  const { email, errors } = formState
  const [authErrorText, setErrorText] = useState('')

  const onBack = () => {
    navigationService.goBack()
  }

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
    return valid
  }

  const onForgotPasswordPress = async () => {
    if (!validateForm()) {
      setErrorText('')
      return
    }

    setIsLoading(true)
    try {
      setErrorText('')
      await dispatch(resetPassword(email))
      setIsCheckMailModalVisible(true)
    } catch (e) {
      logger.error('Forgot password error message', e)
      setErrorText(e as string)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLoginPress = () => {
    setIsCheckMailModalVisible(false)
    navigationService.navigate('Onboarding_SignIn')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={[positionStyles.fill, { backgroundColor: colors.WHITE }]}
        >
          <TouchableOpacity
            style={[spacingStyles.pH30, spacingStyles.mT30]}
            onPress={onBack}
          >
            <BackArrow />
          </TouchableOpacity>
          <View style={layoutStyles.onboardingContainer}>
            <Text style={styles.titleText}>{i18n.t('forgotPassword')}</Text>
            <Text style={[styles.instructionsText, spacingStyles.mT30]}>
              {i18n.t('link')}
            </Text>
            <Input
              placeholder={i18n.t('email')}
              error={errors.email}
              autoCapitalize="none"
              value={email}
              onChangeText={(value) =>
                updateFormValuesAction({ email: value.replace(/\s/g, '') })
              }
              style={[spacingStyles.mT30, positionStyles.width100]}
              placeholderTextColor={colors.GREY_PLACEHOLDER}
            />
            {!!authErrorText && (
              <Text style={styles.errorText}>{authErrorText}</Text>
            )}
            <Button
              text={i18n.t('sendlink')}
              isLoading={isLoading}
              textStyle={styles.buttonText}
              backgroundColor={colors.LIME}
              style={[spacingStyles.mT30, positionStyles.width100]}
              onPress={onForgotPasswordPress}
            />
          </View>
          <CustomModal
            visible={isCheckMailModalVisible}
            onClose={() => setIsCheckMailModalVisible(false)}
          >
            <View style={positionStyles.width100}>
              <Text style={styles.modalTitle}>
                {i18n.t('success_sign_up_title')}
              </Text>
              <Text style={styles.modalText}>
                {i18n.t('success_reset_pass_desc')}
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
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default ForgotPasswordScreen
