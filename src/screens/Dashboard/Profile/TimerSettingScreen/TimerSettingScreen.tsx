/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useMemo, useRef, useState } from 'react'

// Components
import { Text, TouchableOpacity } from 'react-native'
import DmText from 'components/UI/DmText'
import DmView from 'components/UI/DmView'
import { SafeAreaView } from 'react-native-safe-area-context'
import ReactNativePickerModule from 'react-native-picker-module'

// Utils
import navigationService from 'navigation/navigationService'
// Types
import {} from 'types'
// Helpers && Hooks
import { useDispatch } from 'react-redux'
import { HIT_SLOT_DEFAULT } from 'styles/helpers'

// Styles
import layoutStyles from 'styles/layoutStyles'
import i18n from 'locales/i18n'
import * as S from './styled.components'
import ToggleSwitch from 'toggle-switch-react-native'
import { colors, spacingStyles, typo } from 'styles'
import { dataTimePicker } from 'data/timerPickFunction'
import {
  cancelTask,
  setAutoStartBreak,
  setAutoStartSoundPerSecond,
  setBreakLength,
  setLongBreakAfter,
  setLongBreakLength,
  setPomodoLength,
} from 'store/timer'
import { useTypedSelector } from 'store'
import { getTimerTimeSettings } from 'utils/date'
import styles from './styles'
import BackArrow from 'assets/images/icons/backArrow.svg'
import Dash from 'react-native-dash'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import SignOutModalDetails from 'components/UI/SignOutModalDetails'

interface Props {
  //
}

type PickerType =
  | 'pomodoroTimeLength'
  | 'breakLength'
  | 'longBreakLength'
  | 'longBreakAfter'

const TimerSettingScreen: React.FC<Props> = (props) => {
  const pickerRef = useRef<ReactNativePickerModule>(null)
  const menuModalRef = useRef<BottomSheetModal>(null)

  const [isStopTimer, setIsStopTimer] = useState(false)

  const [pickerType, setPickerType] = useState<PickerType>('pomodoroTimeLength')
  const [pickerData, setPickerData] = useState(
    dataTimePicker('pomodoroTimeLength')
  )

  const { isStarted } = useTypedSelector((store) => store.timer)

  const {
    pomodoroTimeLength,
    breakLength,
    longBreakLength,
    autoStartBreak,
    autoSoundPerSeconds,
    longBreakAfter,
  } = useTypedSelector((state) => state.timer)

  const pickerValue = useMemo(() => {
    switch (pickerType) {
      case 'pomodoroTimeLength':
        return pomodoroTimeLength
      case 'breakLength':
        return breakLength
      case 'longBreakLength':
        return longBreakLength
      case 'longBreakAfter':
        return longBreakAfter
      default:
        return ''
    }
  }, [
    pickerType,
    pomodoroTimeLength,
    breakLength,
    longBreakLength,
    longBreakAfter,
  ])

  const pickerTitle = useMemo(() => {
    switch (pickerType) {
      case 'pomodoroTimeLength':
        return `${i18n.t('pomodoroLength')} (${i18n.t('minutes')})`
      case 'breakLength':
        return `${i18n.t('shortBreakLengh')} (${i18n.t('minutes')})`
      case 'longBreakLength':
        return `${i18n.t('longBreakLength')} (${i18n.t('minutes')})`
      case 'longBreakAfter':
        return `${i18n.t('longAfter')} (${i18n.t('pomodoros')})`
      default:
        return ''
    }
  }, [
    pickerType,
    pomodoroTimeLength,
    breakLength,
    longBreakLength,
    longBreakAfter,
  ])

  const dispatch = useDispatch()

  const handleStopTimerModal = () => {
    menuModalRef.current?.close()
    setIsStopTimer(true)
  }
  const handleStopTimer = () => {
    dispatch(cancelTask())
    setIsStopTimer(false)
    navigationService.navigate('Profile', {
      screen: 'Timer_Details',
    })
  }

  const handleSetPicker = (type: PickerType) => {
    if (isStarted) {
      handleStopTimerModal()
      return
    }
    setPickerType(type)
    setPickerData(dataTimePicker(type))

    setTimeout(() => pickerRef.current?.show(), 100)
  }

  const handleChangePickerValue = (pickerValue: string) => {
    const numVal = Number(pickerValue)
    if (!numVal) {
      return
    }

    switch (pickerType) {
      case 'pomodoroTimeLength':
        return dispatch(setPomodoLength(numVal))
      case 'breakLength':
        return dispatch(setBreakLength(numVal))
      case 'longBreakLength':
        return dispatch(setLongBreakLength(numVal))
      case 'longBreakAfter':
        return dispatch(setLongBreakAfter(numVal))
    }
  }

  return (
    <SafeAreaView style={layoutStyles.safeAreaView}>
      <DmView style={styles.headerTextContainer}>
        <TouchableOpacity
          style={spacingStyles.pR14half}
          onPress={() => navigationService.goBack()}
          hitSlop={HIT_SLOT_DEFAULT}
        >
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerText}>{i18n.t('timerSettings')}</Text>
      </DmView>
      <S.ContentWr>
        {/* 1 */}
        <DmView onPress={() => handleSetPicker('pomodoroTimeLength')}>
          <DmView
            justifyContent="space-between"
            alignItems="center"
            height={68}
            flexDirection="row"
          >
            <DmText style={{ ...typo.bodyM16 }} color={colors.DARK_GREY}>
              {i18n.t('pomodoroLength')}
            </DmText>
            <DmText style={{ ...typo.bodyB16 }} color={colors.DARK_GREY}>
              {getTimerTimeSettings(pomodoroTimeLength)} {i18n.t('minutes')}
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
        {/* 2 */}
        <DmView onPress={() => handleSetPicker('breakLength')}>
          <DmView
            justifyContent="space-between"
            alignItems="center"
            height={68}
            flexDirection="row"
          >
            <DmText style={{ ...typo.bodyM16 }} color={colors.DARK_GREY}>
              {i18n.t('shortBreakLengh')}
            </DmText>
            <DmText style={{ ...typo.bodyB16 }} color={colors.DARK_GREY}>
              {getTimerTimeSettings(breakLength)} {i18n.t('minutes')}
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
        {/* 3 */}
        <DmView onPress={() => handleSetPicker('longBreakLength')}>
          <DmView
            justifyContent="space-between"
            alignItems="center"
            height={68}
            flexDirection="row"
          >
            <DmText style={{ ...typo.bodyM16 }} color={colors.DARK_GREY}>
              {i18n.t('longBreakLengh')}
            </DmText>
            <DmText style={{ ...typo.bodyB16 }} color={colors.DARK_GREY}>
              {getTimerTimeSettings(longBreakLength)} {i18n.t('minutes')}
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
        {/* 4 */}
        <DmView onPress={() => handleSetPicker('longBreakAfter')}>
          <DmView
            justifyContent="space-between"
            alignItems="center"
            height={68}
            flexDirection="row"
          >
            <DmText style={{ ...typo.bodyM16 }} color={colors.DARK_GREY}>
              {i18n.t('longAfter')}
            </DmText>
            <DmText style={{ ...typo.bodyB16 }} color={colors.DARK_GREY}>
              {longBreakAfter}{' '}
              {longBreakAfter == 1 ? i18n.t('pomodoro') : i18n.t('pomodoros')}
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
        <DmView>
          <DmView
            justifyContent="space-between"
            alignItems="center"
            height={68}
            flexDirection="row"
          >
            <DmText style={{ ...typo.bodyM16 }} color={colors.DARK_GREY}>
              {i18n.t('autoStartBreak')}
            </DmText>
            <ToggleSwitch
              isOn={autoStartBreak}
              onColor={colors.LIME}
              offColor={colors.GREY}
              size="medium"
              onToggle={(isOn) => {
                if (isStarted) {
                  handleStopTimerModal()
                } else {
                  dispatch(setAutoStartBreak(isOn))
                }
              }}
            />
          </DmView>
          <Dash
            style={styles.dash}
            dashGap={5}
            dashLength={5}
            dashThickness={1}
            dashColor={colors.LIGHT_GREY}
          />
        </DmView>
        <DmView>
          <DmView
            justifyContent="space-between"
            alignItems="center"
            height={68}
            flexDirection="row"
          >
            <DmText style={{ ...typo.bodyM16 }} color={colors.DARK_GREY}>
              {i18n.t('autoStartSoundSeconds')}
            </DmText>
            <ToggleSwitch
              isOn={autoSoundPerSeconds}
              onColor={colors.LIME}
              offColor={colors.GREY}
              size="medium"
              onToggle={(isOn) => {
                if (isStarted) {
                  handleStopTimerModal()
                } else {
                  dispatch(setAutoStartSoundPerSecond(isOn))
                }
              }}
            />
          </DmView>
        </DmView>
      </S.ContentWr>

      <ReactNativePickerModule
        pickerRef={pickerRef}
        value={String(pickerValue)}
        title={pickerTitle}
        // @ts-ignore
        items={pickerData}
        onValueChange={handleChangePickerValue}
      />
      <SignOutModalDetails
        title={i18n.t('timerStopAlert')}
        isTimer
        onCancel={() => setIsStopTimer(false)}
        onDelete={handleStopTimer}
        isDeleteModalsVisible={isStopTimer}
      />
    </SafeAreaView>
  )
}

export default TimerSettingScreen
