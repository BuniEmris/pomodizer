/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useMemo, useEffect } from 'react'

// Components
import { Keyboard, Share } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormHeader from 'components/Header'
import ChecklistComponent from 'components/CheckList'
import DmView from 'components/UI/DmView'
import DmText from 'components/UI/DmText'
import IconBtn from 'components/UI/IconBtn'
import InlineInput from 'components/UI/InlineInput'
import { useForm, Controller } from 'react-hook-form'
import ProjectList from 'components/ProjectList'
import BottomSheet, {
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import ReactNativePickerModule from 'react-native-picker-module'
import Icon from 'react-native-vector-icons/Feather'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TagsPicker from 'components/TagsPicker'

import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {
  toDayFormat,
  toTimeFormat,
  getDateFromApi,
  getDateFromApiTime,
  toDateTimeFormat,
} from 'utils/date'

// Utils & Hooks
import navigationService from 'navigation/navigationService'
import { useDispatch } from 'react-redux'
import { startTaskTimer } from 'store/timer/thunkActions'
import { patchTask, finishTask, removeTask } from 'store/tasks/thunkActions'
import useSimpleReducer from 'hooks/useSimpleReducer'
import moment from 'moment'
import { useIsFocused } from '@react-navigation/native'

// Types
import { HomeRouteProps } from 'navigation/DashboardNavigator'
import { CheckList, Task, Tag } from 'types'
import tomatoDataSet from 'data/tomatoDataSet'

// Assets & Styles
import * as S from './styled.components'
import PlayButton from 'assets/images/Dashboard/play.svg'
import CheckButton from 'assets/images/Dashboard/check.svg'
import PauseButton from 'assets/images/Dashboard/pause.svg'
import CancelButton from 'assets/images/Dashboard/cross.svg'
import TomatoIcon from 'assets/images/icons/tomato.svg'
import ClockIcon from 'assets/images/icons/clock.svg'
import styles from './styles'
import layoutStyles from 'styles/layoutStyles'
import { useTypedSelector } from 'store'
import { selectTaskById } from 'store/tasks/selectors'
import SettingsIcon from 'assets/images/icons/settings.svg'

import ModalMenuItem from 'components/ModalMenuItem'
import { colors } from 'styles'
import { getTimeStrFromTomato } from 'helpers/dates'
import { pauseTimer, stopTimer } from 'store/timer/thunkActions'
import DeleteModalDetails from 'components/UI/DeleteModalDetails'
import i18n, { getPickerLocale } from 'locales/i18n'
import { PlaySound } from 'utils/sounds'
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory'
import usePremium from 'hooks/usePremium'
import { isAndroid, isIOs } from 'styles/helpers'
import useKeyboardHeight from 'hooks/useKeyboardHeight'
import KeyboardDoneBtn from 'components/KeyboardDoneBtn'
import { createTaskDeepLink } from 'utils/firebaseDeeplink'

type Props = HomeRouteProps

type FormState = {
  name: string
  description: string
  dueDate: Date | undefined
  dueTime: Date | undefined
  tomatoPlan: number
}

const TaskDetailScreen: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch()
  const menuModalRef = useRef<BottomSheetModal>(null)
  const pickerRef = useRef<ReactNativePickerModule>(null)
  const checkListRef = useRef<React.ElementRef<typeof ChecklistComponent>>(null)
  const [isDeleteModalsVisible, setIsDeleteModalsVisible] = useState(false)
  const [taskTitleValue, setTaskTitleValue] = useState('')
  const taskId = route?.params?.taskId
  const back = route?.params?.back

  const { keyboardHeight, isHidden } = useKeyboardHeight()
  const task = useTypedSelector((state) => selectTaskById(state, taskId))!
  const {
    isStarted,
    taskId: timerTaskId,
    isPaused,
  } = useTypedSelector((state) => state.timer)

  const { checkPremium } = usePremium()
  const isFocused = useIsFocused()

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isDirty },
    watch,
    setValue,
  } = useForm<FormState>({
    defaultValues: {
      name: task?.name || '',
      description: task?.description || '',
      dueDate: task?.dueDate ? getDateFromApi(task.dueDate) : undefined,
      dueTime: task?.dueTime ? getDateFromApiTime(task.dueTime) : undefined,
      tomatoPlan: task?.tomatoPlan || 0,
    },
  })

  const { state, updateState } = useSimpleReducer({
    datePickerVisible: false,
    timePickerVisible: false,
    projectPickerVisible: false,
  })

  const onBack = () => {
    if (back?.rootRoutes) {
      return navigationService.navigate(back?.rootRoutes, {
        screen: back?.screen,
      })
    }

    navigationService.goBack()
  }

  const handleOnStop = () => {
    handlePlay()
  }

  const handleCheckListChange = (checklist: CheckList['items']) => {
    dispatch(
      patchTask(task._id, {
        checkListId: task.checkListId,
        checklist: {
          items: checklist,
        },
      })
    )
  }

  const handlePlay = () => {
    if (isDone) {
      dispatch(
        patchTask(task._id, {
          status: 'inProcess',
        })
      )
    }

    menuModalRef.current?.close()
    dispatch(startTaskTimer(task._id))
  }

  const handlePausePress = () => {
    dispatch(pauseTimer())
  }

  const handleStop = () => {
    dispatch(stopTimer())
  }

  const handleFinish = () => {
    menuModalRef.current?.close()
    dispatch(finishTask(task))
  }

  const saveTask = async () => {
    if (!isDirty) {
      return
    }

    const dueDate = getValues('dueDate')
    const dueTime = getValues('dueTime')
    let timeReminder

    if (dueDate && dueTime) {
      timeReminder = moment(dueDate)
        .set({
          hour: moment(dueTime).get('hour'),
          minute: moment(dueTime).get('minute'),
        })
        .toDate()
    }

    dispatch(
      patchTask(task._id, {
        name: getValues('name').trim(),
        description: getValues('description').trim(),
        dueDate: dueDate ? toDayFormat(dueDate) : undefined,
        dueTime: dueTime ? toTimeFormat(dueTime) : undefined,
        notificationTime: timeReminder ? timeReminder.toISOString() : undefined,
        tomatoPlan: getValues('tomatoPlan'),
      })
    )
  }

  const handleBack = () => {
    saveTask()
    onBack()
  }

  const handleShowMenu = () => {
    menuModalRef.current?.present()
  }

  const handleDuplicate = () => {}

  const handleChangeDueDate = (date: Date) => {
    setValue('dueDate', date)
    updateState({
      datePickerVisible: false,
    })
    dispatch(
      patchTask(task._id, {
        dueDate: toDayFormat(date),
      })
    )
  }

  const handleChangeDueTime = (time: Date) => {
    setValue('dueTime', time)
    updateState({
      timePickerVisible: false,
    })

    const timeReminder = moment(getValues('dueDate'))
      .set({
        hour: moment(time).get('hour'),
        minute: moment(time).get('minute'),
      })
      .toDate()

    dispatch(
      patchTask(task._id, {
        dueTime: toTimeFormat(time),
        notificationTime: timeReminder.toISOString(),
      })
    )
  }

  const handleRemoveDueTime = () => {
    setValue('dueTime', undefined)
    dispatch(
      patchTask(task._id, {
        dueTime: undefined,
        notificationTime: undefined,
      })
    )
  }

  const handleChangeTomatoPlan = (value: string) => {
    setValue('tomatoPlan', Number(value))

    dispatch(
      patchTask(task._id, {
        tomatoPlan: Number(value),
      })
    )
  }

  const handleDelete = () => {
    menuModalRef.current?.close()
    setIsDeleteModalsVisible(true)
  }
  const deleteTask = async () => {
    setIsDeleteModalsVisible(false)
    dispatch(removeTask(task))
    onBack()
  }
  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  )

  const handleProjectSelect = (tag: Tag) => {
    updateState({
      projectPickerVisible: false,
    })

    dispatch(
      patchTask(task._id, {
        tags: [tag],
      })
    )
  }

  const handleShare = async () => {
    menuModalRef.current?.close()

    const taskUrl = await createTaskDeepLink(task)

    await Share.share({
      message: taskUrl,
      url: taskUrl,
    })
  }

  const handleDueTimePress = () => {
    checkPremium(() =>
      updateState({
        timePickerVisible: true,
      })
    )
  }

  const handleMoveInbox = () => {
    setValue('dueDate', undefined)

    dispatch(
      patchTask(task._id, {
        dueDate: null,
      })
    )
    menuModalRef.current?.close()
  }

  const onKeyboardDonePress = () => {
    if (taskTitleValue) {
      checkListRef.current?.onDonePress()
    } else {
      Keyboard.dismiss()
    }
  }

  const isDone = useMemo(() => {
    return task?.status === 'done'
  }, [task])

  const tomatoText = useMemo(() => {
    if (!task) {
      return ''
    }

    let str =
      task.tomatoFact > 0
        ? `${task.tomatoFact} = ${getTimeStrFromTomato(task.tomatoFact)}`
        : 0

    if (task.tomatoPlan) {
      str = `${str} / ${task.tomatoPlan} = ${getTimeStrFromTomato(
        task.tomatoPlan
      )}`
    }

    return str
  }, [task])

  const isActive = useMemo(() => {
    return timerTaskId === taskId
  }, [taskId, timerTaskId])

  const reminderTime = useMemo(() => {
    const dueTime = watch('dueTime')
    const dueDate = watch('dueDate')

    if (dueTime) {
      return dueTime
    }

    if (moment(dueDate).isSame(new Date(), 'day')) {
      return moment().add(1, 'hour').toDate()
    } else {
      return moment(dueDate).hour(12).toDate()
    }
  }, [watch('dueTime'), watch('dueDate')])

  if (!task) {
    return null
  }

  return (
    <SafeAreaView
      style={[layoutStyles.safeAreaView]}
      edges={['left', 'right', 'top']}
    >
      <FormHeader
        onBack={handleBack}
        rightIcon={<SettingsIcon />}
        onRightPress={handleShowMenu}
      />
      <KeyboardAwareScrollView
        style={[
          styles.scrollContainer,
          isAndroid && { marginBottom: keyboardHeight - 20 },
        ]}
      >
        <S.ContentWr>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InlineInput
                placeholder={i18n.t('taskTitle')}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                fontSize={24}
                fontWeight="500"
                numberOfLines={2}
                multiline
                style={
                  isDone && {
                    textDecorationLine: 'line-through',
                  }
                }
              />
            )}
            name="name"
          />

          {isDone && (
            <DmView mt={10} flexDirection="row">
              <DmView marginRight={10}>
                <Icon name="check-circle" size={20} color={colors.GREEN} />
              </DmView>

              <DmText fontSize={15} color={colors.GREEN}>
                {i18n.t('completed') + toDateTimeFormat(task.doneAt)}
              </DmText>
            </DmView>
          )}

          <DmView
            mt={20}
            flexDirection="row"
            justifyContent="space-between"
            ml={isDone ? -0.5 : 0}
          >
            {isActive && (
              <>
                <IconBtn
                  onPress={handlePausePress}
                  Icon={isPaused ? PlayButton : PauseButton}
                  label={isPaused ? i18n.t('continue') : i18n.t('pause')}
                />
                {isStarted && (
                  <IconBtn
                    onPress={handleStop}
                    Icon={CancelButton}
                    label={i18n.t('stop')}
                  />
                )}
                <IconBtn
                  onPress={handleFinish}
                  Icon={CheckButton}
                  label={i18n.t('markdone')}
                  reverse
                />
              </>
            )}
            {!isActive && (
              <>
                <IconBtn
                  onPress={handlePlay}
                  Icon={PlayButton}
                  label={isDone ? i18n.t('continueTask') : i18n.t('start')}
                />
                {!isDone && (
                  <IconBtn
                    onPress={handleFinish}
                    Icon={CheckButton}
                    label={i18n.t('markdone')}
                    reverse
                  />
                )}
              </>
            )}
          </DmView>
        </S.ContentWr>
        <S.ContentWr marginTop={20}>
          <ModalMenuItem
            label={i18n.t('project')}
            onPress={() =>
              updateState({
                projectPickerVisible: true,
              })
            }
            iconName="package"
            withBorder={false}
          >
            <DmView alignItems="flex-end" flexGrow={1}>
              <ProjectList
                projects={task.tags}
                onPress={() =>
                  updateState({
                    projectPickerVisible: true,
                  })
                }
              />
            </DmView>
          </ModalMenuItem>

          <ModalMenuItem
            label={i18n.t('tomatoFact')}
            onPress={() => pickerRef.current?.show()}
            iconName="copy"
            withBorder={false}
          >
            <DmView alignItems="flex-end" flexGrow={1}>
              <DmText fontSize={13} fontWeight="500">
                {tomatoText}
              </DmText>
            </DmView>
          </ModalMenuItem>
          <ModalMenuItem
            label={i18n.t('dueDate')}
            onPress={() => {
              updateState({
                datePickerVisible: true,
              })
            }}
            iconName="calendar"
            withBorder={false}
          >
            <DmView justifyContent="flex-end" flexGrow={1} flexDirection="row">
              <DmText
                fontSize={13}
                fontWeight="500"
                marginRight={task?.dueDate ? 10 : 0}
              >
                {task?.dueDate || i18n.t('someDay')}
              </DmText>
              {!!task.dueDate && (
                <IconBtn
                  Icon={() => <Icon name="x-circle" size={18} color="grey" />}
                  onPress={handleMoveInbox}
                />
              )}
            </DmView>
          </ModalMenuItem>

          <ModalMenuItem
            onPress={handleDueTimePress}
            label={task?.dueTime ? i18n.t('reminder') : i18n.t('addReminder')}
            iconName="clock"
            withBorder={false}
          >
            <DmView justifyContent="flex-end" flexGrow={1} flexDirection="row">
              <DmText
                fontSize={13}
                fontWeight="500"
                marginRight={task?.dueTime ? 10 : 0}
              >
                {task?.dueTime}
              </DmText>

              {!!task?.dueTime && (
                <IconBtn
                  Icon={() => <Icon name="x-circle" size={18} color="grey" />}
                  onPress={handleRemoveDueTime}
                />
              )}
            </DmView>
          </ModalMenuItem>
        </S.ContentWr>
        <S.ContentWr marginY={20}>
          <ChecklistComponent
            checklistItems={task.checklist?.items || []}
            onListChange={handleCheckListChange}
            taskTitleValue={taskTitleValue}
            setTaskTitleValue={setTaskTitleValue}
            ref={checkListRef}
          />
        </S.ContentWr>
        <S.ContentWr minHeight={100} paddingBottom={20} marginBottom={50}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InlineInput
                placeholder={i18n.t('addtaskDesc')}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                fontSize={16}
                fontWeight="400"
                multiline
                minHeight={100}
              />
            )}
            name="description"
          />
        </S.ContentWr>
        <BottomSheetModal
          ref={menuModalRef}
          index={0}
          snapPoints={[300]}
          backdropComponent={renderBackdrop}
        >
          <DmView paddingX={12}>
            <DmText fontSize={14} fontWeight="500" marginBottom={10}>
              {i18n.t('task') + i18n.t('options')}
            </DmText>
            {/* <ModalMenuItem label="Duplicate" onPress={handleDuplicate} iconName="copy" /> */}
            <ModalMenuItem
              label={i18n.t('start')}
              onPress={handlePlay}
              iconName="play"
            />
            <ModalMenuItem
              label={i18n.t('markdone')}
              onPress={handleFinish}
              iconName="check-circle"
            />
            <ModalMenuItem
              label={i18n.t('move_to_inbox')}
              onPress={handleMoveInbox}
              iconName="list"
            />
            <ModalMenuItem
              label={i18n.t('share')}
              onPress={handleShare}
              iconName="share-2"
            />
            <ModalMenuItem
              label={i18n.t('delete')}
              onPress={handleDelete}
              iconName="trash-2"
            />
          </DmView>
        </BottomSheetModal>
      </KeyboardAwareScrollView>
      <DateTimePickerModal
        headerTextIOS={i18n.t('pickDate')}
        mode="date"
        isVisible={state.datePickerVisible}
        onConfirm={handleChangeDueDate}
        onCancel={() =>
          updateState({
            datePickerVisible: false,
          })
        }
        onLayout={() =>
          updateState({
            datePickerVisible: false,
          })
        }
        date={watch('dueDate')}
      />
      <DateTimePickerModal
        headerTextIOS={i18n.t('pickTime')}
        mode="time"
        isVisible={state.timePickerVisible}
        onConfirm={handleChangeDueTime}
        onCancel={() =>
          updateState({
            timePickerVisible: false,
          })
        }
        onLayout={() =>
          updateState({
            timePickerVisible: false,
          })
        }
        is24Hour
        locale={getPickerLocale()}
        date={reminderTime}
      />
      <TagsPicker
        isVisible={state.projectPickerVisible}
        onSelect={handleProjectSelect}
        onClose={() =>
          updateState({
            projectPickerVisible: false,
          })
        }
      />
      <ReactNativePickerModule
        pickerRef={pickerRef}
        value={String(watch('tomatoPlan'))}
        title={i18n.t('estimatedPomo')}
        // @ts-ignore
        items={tomatoDataSet}
        onValueChange={handleChangeTomatoPlan}
      />
      <DeleteModalDetails
        title={i18n.t('taskDelete')}
        noBodyText
        onCancel={() => setIsDeleteModalsVisible(false)}
        onDelete={deleteTask}
        isDeleteModalsVisible={isDeleteModalsVisible}
      />
      {(!isHidden || isIOs) && (
        <KeyboardDoneBtn
          isDetailsScreen
          onKeyboardDonePress={onKeyboardDonePress}
        />
      )}
    </SafeAreaView>
  )
}

export default TaskDetailScreen
