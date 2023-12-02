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
import { patchUser, signOut } from 'store/auth/thunkActions'
import { useTypedSelector } from 'store'

// Styles & Assets
import { colors, positionStyles, spacingStyles } from 'styles'
import styles from './styles'
import Logout from 'assets/images/icons/logout.svg'
import MockProfilePhoto from 'assets/images/Dashboard/mockProfile.png'
import logger from 'utils/logger'
import i18n from 'locales/i18n'
import { DmView } from 'components/UI'
import { User } from 'types'

const PersonalSettingScreen: React.FC = (props) => {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()
  const { user } = useTypedSelector((store) => store.auth)

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    },
  })

  useEffect(() => {
    if (isFocused) {
      isAndroid && StatusBar.setBackgroundColor('white')
      StatusBar.setBarStyle('dark-content')
    }
  }, [isFocused])

  const onSubmit = async (data: Partial<User>) => {
    if (!isDirty) {
      return
    }

    try {
      await dispatch(
        patchUser({
          firstName: data.firstName,
          email: data.email,
          phone: data.phone || undefined,
        })
      )

      navigationService.goBack()
    } catch (e: any) {
      Alert.alert(e?.message || '')
    }
  }

  return (
    <>
      <SafeAreaView style={styles.safeAreaHeader}>
        <View style={styles.container}>
          <Header
            onBack={() => navigationService.goBack()}
            text={i18n.t('profileSettings')}
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
                    placeholder={i18n.t('name')}
                    style={spacingStyles.mT30}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.firstName}
                  />
                )}
                name="firstName"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder={i18n.t('email')}
                    style={spacingStyles.mT30}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.email}
                  />
                )}
                name="email"
              />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder={i18n.t('phone')}
                    style={spacingStyles.mT30}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.email}
                  />
                )}
                name="phone"
              />
              <View style={[styles.greyLineSeparator, spacingStyles.mT30]} />
              <DmView
                onPress={() =>
                  navigationService.navigate('Profile', {
                    screen: 'Change_password',
                  })
                }
              >
                <Text style={[styles.changePassHeader, spacingStyles.mT30]}>
                  {i18n.t('change_password')}
                </Text>
              </DmView>
              <Button
                text={i18n.t('change')}
                // eslint-disable-next-line react-native/no-inline-styles
                textStyle={{ color: colors.WHITE, fontSize: 14 }}
                backgroundColor={colors.LIME}
                style={[spacingStyles.mT30, positionStyles.width100]}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </KeyboardAvoidingScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}

export default PersonalSettingScreen
