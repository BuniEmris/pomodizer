import React, { useRef } from 'react'

// Components
import { Text, Alert } from 'react-native'
import DmText from 'components/UI/DmText'
import DmView from 'components/UI/DmView'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from 'components/Header'

// Utils
import navigationService from 'navigation/navigationService'
// Hooks
import { useDispatch } from 'react-redux'

// Types
import {} from 'types'

// Styles
import * as S from './styled.components'
import layoutStyles from 'styles/layoutStyles'
import i18n from 'locales/i18n'
import { Locale } from 'locales/locale'
import styles from './styles'
import { updateLanguage } from 'store/auth/thunkActions'
import { colors, typo } from 'styles'
import Dash from 'react-native-dash'
import ReactNativePickerModule from 'react-native-picker-module'
import { useTypedSelector } from 'store'
import languageData from 'data/languageData'

interface Props {
  //
}

const AppSettingScreen: React.FC<Props> = (props) => {
  const pickerRef = useRef<ReactNativePickerModule>(null)
  const dispatch = useDispatch()
  const { language } = useTypedSelector((store) => store.auth)

  const SwitchLabelSelector = (key: string) => {
    switch (key) {
      case 'en':
        return i18n.t('english')
      case 'ru':
        return i18n.t('russia')
      case 'uk':
        return i18n.t('ukraine')
      case 'uz':
        return i18n.t('uzbek')
    }
  }
  return (
    <SafeAreaView style={layoutStyles.safeAreaView}>
      <Header
        text={i18n.t('appSettings')}
        onBack={() => navigationService.goBack()}
      />

      <S.ContentWr>
        <DmView
          onPress={() => {
            pickerRef.current?.show()
          }}
        >
          <DmView
            justifyContent="space-between"
            alignItems="center"
            height={68}
            flexDirection="row"
          >
            <DmText style={{ ...typo.bodyM16 }} color={colors.DARK_GREY}>
              {i18n.t('chooseLang')}
            </DmText>
            <DmText style={{ ...typo.bodyB16 }} color={colors.DARK_GREY}>
              {SwitchLabelSelector(language)}
            </DmText>
          </DmView>
          <Dash
            style={styles.dash}
            dashGap={5}
            dashLength={5}
            dashThickness={1}
            dashColor={colors.LIGHT_GREY}
          />
        </DmView>
      </S.ContentWr>
      <ReactNativePickerModule
        pickerRef={pickerRef}
        title={i18n.t('chooseLang')}
        // @ts-ignore
        items={languageData}
        onValueChange={(value) => {
          dispatch(updateLanguage(value))
        }}
      />
    </SafeAreaView>
  )
}

export default AppSettingScreen
