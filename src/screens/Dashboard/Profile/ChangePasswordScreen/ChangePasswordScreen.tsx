import React, { useEffect } from 'react'
// Components
import {
  Image,
  TouchableOpacity,
  StatusBar,
  Text,
  View,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from 'components/UI/Input'
import Button from 'components/UI/Button'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import Header from 'components/Header'

// Hooks
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'

// Helpers
import { isAndroid } from 'styles/helpers'
import navigationService from 'navigation/navigationService'

// Types & Redax
import { signOut } from 'store/auth/thunkActions'
import { useTypedSelector } from 'store'

// Styles & Assets
import { colors, positionStyles, spacingStyles } from 'styles'
import styles from './styles'
import Logout from 'assets/images/icons/logout.svg'
import MockProfilePhoto from 'assets/images/Dashboard/mockProfile.png'
import logger from 'utils/logger'
import i18n from 'locales/i18n'
import { DmText } from 'components/UI'
import { newPasswordService } from 'utils/apiClient'
import { useCreateRequest } from 'hooks/apiClientHooks'

type FormState = {
  oldPassword: string
  newPassword: string
}

const ChangePasswordScreen: React.FC = (props) => {
  const isFocused = useIsFocused()

  const { createEntity, isPending } = useCreateRequest('new-password')

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FormState>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  })

  const onSubmit = async (data: FormState) => {
    try {
      await createEntity({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })

      navigationService.goBack()
    } catch (e) {
      Alert.alert('Incorrect old password')
    }
  }

  useEffect(() => {
    if (isFocused) {
      isAndroid && StatusBar.setBackgroundColor('white')
      StatusBar.setBarStyle('dark-content')
    }
  }, [isFocused])

  return (
    <>
      <SafeAreaView style={styles.safeAreaHeader}>
        <View style={styles.container}>
          <Header
            onBack={() => navigationService.goBack()}
            text={i18n.t('change_password')}
          />
          <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.formContainer}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder={i18n.t('oldPassword')}
                    style={spacingStyles.mT30}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.oldPassword}
                  />
                )}
                name="oldPassword"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 5,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder={i18n.t('newPassword')}
                    style={spacingStyles.mT30}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.newPassword}
                  />
                )}
                name="newPassword"
              />
              {(errors.newPassword || errors.oldPassword) && (
                <DmText color="red" marginTop={10}>
                  {i18n.t('password_validation')}
                </DmText>
              )}
              <Button
                text={i18n.t('change')}
                // eslint-disable-next-line react-native/no-inline-styles
                textStyle={{ color: colors.WHITE, fontSize: 14 }}
                backgroundColor={colors.LIME}
                style={[spacingStyles.mT30, positionStyles.width100]}
                onPress={handleSubmit(onSubmit)}
                isLoading={isPending}
              />
            </View>
          </KeyboardAvoidingScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}

export default ChangePasswordScreen
