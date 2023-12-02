/* eslint-disable no-extra-parens */
import React, { useEffect, useMemo, useRef, useState } from 'react'

// Components
import { Alert, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import DownArrow from 'assets/images/icons/arrowDownTimer.svg'
import CloseArrow from 'assets/images/icons/close.svg'
import DmText from 'components/UI/DmText'
import DmView from 'components/UI/DmView'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

// Store & Hooks
import { useDispatch } from 'react-redux'
import { useTypedSelector } from 'store'
import {
  closeTask,
  finishBreak,
  pauseTimer,
  startTaskBreak,
  stopTimer,
  tickTimer,
} from 'store/timer/thunkActions'
import { cancelTask, setMode, setTimeIsSeconds } from 'store/timer'
import useInterval from 'hooks/useInterval'
import { getTimerTime } from 'utils/date'
import useAppState from 'hooks/useAppState'
import { useIsFocused } from '@react-navigation/native'

// Helpers & Types
import { patchTask, finishTask } from 'store/tasks/thunkActions'
import { CheckList } from 'types'
import { HIT_SLOT_DEFAULT, isAndroid, responsiveHeight } from 'styles/helpers'
import i18n from 'locales/i18n'

// Styles
import * as S from './styled.components'
import styles from './styles'
import { colors, spacingStyles } from 'styles'
import SettingsIcon from 'assets/images/icons/timerSettings.svg'
import Coffee from 'assets/images/icons/coffee.svg'
import SkipNext from 'assets/images/icons/skipBreak.svg'
import TimerTarget from 'assets/images/icons/timerCross.svg'
import TimerPause from 'assets/images/icons/timerPause.svg'
import TimerPlay from 'assets/images/icons/timerPlay.svg'
import TimerTick from 'assets/images/icons/timerTick.svg'
import Stick from 'assets/images/icons/stick.svg'
import { selectTimerTask } from 'store/timer/selector'
import Checklist from 'components/CheckList'
import navigationService from 'navigation/navigationService'
import { PlaySound } from 'utils/sounds'
import { useSimpleAppState } from 'hooks/useSimpleAppState'

interface Props {
  //
}

const Timer: React.FC<Props> = (props) => {
  const {
    isActive,
    isStarted,
    isPaused,
    timeInSeconds,
    mode,
    breakLength,
    longBreakLength,
    pomodoroTimeLength,
    isLongBrakeActive,
    autoStartBreak,
    autoSoundPerSeconds,
    timerType,
  } = useTypedSelector((store) => store.timer)

  const lastActiveTime = useRef<number>(0)
  const [taskTitleValue, setTaskTitleValue] = useState('')
  const activeTask = useTypedSelector(selectTimerTask)

  const startSoundRef = useRef<any>(null)

  const longBreakCondition = useMemo(() => {
    return timerType === 'task' ? pomodoroTimeLength : longBreakLength
  }, [pomodoroTimeLength, longBreakLength])

  const fillTimer = useMemo(() => {
    return 100 - (timeInSeconds / pomodoroTimeLength) * 100
  }, [timeInSeconds, pomodoroTimeLength, isLongBrakeActive])

  const fillBreakTimer = useMemo(() => {
    if (isLongBrakeActive) {
      return 100 - (timeInSeconds / longBreakCondition) * 100
    }

    return 100 - (timeInSeconds / breakLength) * 100
  }, [timeInSeconds, pomodoroTimeLength, isLongBrakeActive])

  const timerString = useMemo(() => {
    return getTimerTime(timeInSeconds)
  }, [timeInSeconds])

  const dispatch = useDispatch()

  const onBackground = () => {
    if (isStarted && timeInSeconds > 0 && !isPaused) {
      lastActiveTime.current = Date.now()
    } else {
      lastActiveTime.current = 0
    }
  }

  const onForeground = () => {
    if (timeInSeconds > 0 && lastActiveTime.current > 0) {
      const diffTime = Math.round((Date.now() - lastActiveTime.current) / 1000)

      dispatch(
        setTimeIsSeconds(
          diffTime > timeInSeconds ? 1 : timeInSeconds - diffTime
        )
      )
      lastActiveTime.current = 0
    }
  }

  const isFocused = useIsFocused()

  const appState = useSimpleAppState()

  useEffect(() => {
    if ((appState == 'background' || appState === 'inactive') && isStarted) {
      onBackground()
    }

    if (appState === 'active' && timeInSeconds > 0) {
      onForeground()
    }
  }, [appState])

  useInterval(
    () => {
      dispatch(tickTimer())
    },
    isStarted && !isPaused && appState === 'active' ? 1000 : null
  )

  useEffect(() => {
    if (isStarted && !isPaused) {
      if (startSoundRef.current) {
        startSoundRef.current?.stop()
        startSoundRef.current?.release()
      }

      startSoundRef.current = PlaySound(autoSoundPerSeconds ? -1 : 0)
    }
  }, [isStarted, isPaused])

  useEffect(() => {
    if (!isStarted || isPaused) {
      startSoundRef.current?.stop()
      startSoundRef.current?.release()
    }
  }, [isStarted, isPaused, appState])

  const handleSettingsNav = () => {
    if (isPaused) {
      handleClose()
    } else {
      dispatch(setMode('simple'))
    }

    navigationService.navigate('Profile', {
      screen: 'Timer_Details',
    })
  }

  const handleCheckListChange = (checklist: CheckList['items']) => {
    if (!activeTask) {
      return
    }

    dispatch(
      patchTask(activeTask._id!, {
        checkListId: activeTask?.checkListId,
        checklist: {
          items: checklist,
        },
      })
    )
  }

  const handlePause = () => {
    if (timerType === 'break' && !isStarted) {
      dispatch(startTaskBreak())
      return
    }
    dispatch(pauseTimer())
  }

  const handleFinish = () => {
    if (!activeTask) return

    dispatch(finishTask(activeTask))
  }

  function handleStop() {
    dispatch(stopTimer())
    lastActiveTime.current = 0
  }

  const handleChangeMode = () => {
    dispatch(setMode(mode === 'full' ? 'simple' : 'full'))
  }
  const handleClose = () => {
    dispatch(cancelTask())
  }

  const handleSkipBreak = () => {
    dispatch(finishBreak())
  }

  const isBreak = useMemo(() => {
    return timerType === 'break'
  }, [timerType])

  const isStop = useMemo(() => {
    return timerType === 'stop'
  }, [timerType])

  const renderName = () => {
    if (isBreak) {
      return 'Break'
    }

    return activeTask?.name || ''
  }

  const renderTomatoText = () => {
    let text = String(activeTask?.tomatoFact)
    if (activeTask?.tomatoPlan) {
      text = text + '/' + activeTask?.tomatoPlan
    }

    return text
  }

  return (
    <>
      <Modal isVisible={isActive && mode === 'full'} style={{ margin: 0 }}>
        <S.Container>
          <DmView style={styles.header}>
            <DmView maxWidth="85%">
              <DmText
                style={spacingStyles.mL10}
                paddingLeft={10}
                fontSize={24}
                fontWeight="500"
                color={colors.DARK_GREY}
                numberOfLines={3}
              >
                {renderName()}
              </DmText>
            </DmView>
            {!isPaused ? (
              <DmView
                style={styles.overFlowIcon}
                onPress={handleChangeMode}
                hitSlop={HIT_SLOT_DEFAULT}
              >
                <DownArrow />
              </DmView>
            ) : (
              <DmView
                hitSlop={HIT_SLOT_DEFAULT}
                style={styles.overFlowIcon}
                onPress={handleClose}
                marginRight={10}
              >
                <CloseArrow />
              </DmView>
            )}
          </DmView>
          <DmView style={styles.body}>
            <DmView style={styles.ProgressContainer}>
              {!isBreak && (
                <>
                  <AnimatedCircularProgress
                    size={responsiveHeight * 230}
                    width={12}
                    fill={fillTimer}
                    tintColor={colors.LIME}
                    tintColorSecondary={colors.LIME}
                    backgroundColor="#F2F3F8"
                    rotation={215}
                    arcSweepAngle={290}
                    lineCap="round"
                  >
                    {() => (
                      <>
                        <DmView style={styles.ProgressInsideWrapper}>
                          <TimerTarget />
                          <DmView marginTop={10}>
                            <DmText style={styles.timerText}>
                              {timerString}
                            </DmText>
                          </DmView>
                          <DmText color={colors.LIME}>
                            {renderTomatoText()} pomodoro
                          </DmText>
                        </DmView>
                      </>
                    )}
                  </AnimatedCircularProgress>
                  {isPaused ? (
                    <DmView onPress={handlePause} style={styles.playPause}>
                      <TimerPlay />
                    </DmView>
                  ) : (
                    <DmView onPress={handleStop} style={styles.playPause}>
                      <TimerPause />
                    </DmView>
                  )}
                </>
              )}

              {isBreak && (
                <>
                  <AnimatedCircularProgress
                    size={230 * responsiveHeight}
                    width={12}
                    fill={fillBreakTimer}
                    tintColor={colors.YELLOW}
                    tintColorSecondary={colors.YELLOW}
                    backgroundColor="#F2F3F8"
                    rotation={215}
                    arcSweepAngle={290}
                    lineCap="round"
                  >
                    {() => (
                      <>
                        <DmView style={styles.ProgressInsideWrapper}>
                          <Coffee />
                          <DmView marginTop={10}>
                            <DmText style={styles.timerText}>
                              {timerString}
                            </DmText>
                          </DmView>

                          <DmText color={colors.LIGHT_GREY}>break</DmText>
                        </DmView>
                      </>
                    )}
                  </AnimatedCircularProgress>
                  {isPaused ? (
                    <DmView onPress={handlePause} style={styles.playPause}>
                      <TimerPlay />
                    </DmView>
                  ) : (
                    <DmView onPress={handleSkipBreak} style={styles.breakSkip}>
                      <SkipNext />
                    </DmView>
                  )}
                </>
              )}
            </DmView>
            <S.ScrollContainer showsVerticalScrollIndicator={false}>
              {/* <ProjectList projects={activeTask?.tags || []} /> */}
              {!isBreak && (
                <DmView style={[spacingStyles.pH10, spacingStyles.pB20]}>
                  {!!activeTask?.checklist?.items?.length && (
                    <Checklist
                      taskTitleValue={taskTitleValue}
                      setTaskTitleValue={setTaskTitleValue}
                      checklistItems={activeTask.checklist?.items}
                      onListChange={handleCheckListChange}
                    />
                  )}
                </DmView>
              )}
            </S.ScrollContainer>
          </DmView>

          <DmView style={styles.footerContainer}>
            <DmView onPress={handleSettingsNav} style={styles.settingsBtn}>
              <SettingsIcon />
            </DmView>

            <DmView style={styles.markDoneContainer} onPress={handleFinish}>
              <TimerTick />
              <Stick />
              <DmText style={styles.markDoneText}>
                {i18n.t('markdoneCap')}
              </DmText>
            </DmView>
          </DmView>
        </S.Container>
      </Modal>

      {isActive && mode === 'simple' && (
        <S.ContainerSimple onPress={handleChangeMode}>
          <AnimatedCircularProgress
            size={90}
            width={3}
            fill={fillBreakTimer}
            tintColor={!isBreak ? colors.LIME : colors.YELLOW}
            tintColorSecondary={!isBreak ? colors.LIME : colors.YELLOW}
            backgroundColor="#F2F3F8"
            rotation={360}
            // lineCap="round"
          >
            {() => (
              <>
                <DmView style={styles.roundTimerContainer}>
                  {!isBreak ? <TimerTarget /> : <Coffee />}
                  <DmText style={styles.roundTimerText}>{timerString}</DmText>
                </DmView>
              </>
            )}
          </AnimatedCircularProgress>
        </S.ContainerSimple>
      )}
    </>
  )
}

export default Timer
