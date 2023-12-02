/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react-native/no-inline-styles */
import React, { useMemo, useState, useRef, useEffect } from 'react'
// Components
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Keyboard,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import FormHeader from 'components/Header'
import Button from 'components/UI/Button'
import Input from 'components/UI/Input'
import ChecklistComponent from 'components/CheckList'
import TagsPicker from 'components/TagsPicker'
import { DmText, DmView, IconBtn } from 'components/UI'
import ReactNativePickerModule from 'react-native-picker-module'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory'
import Icon from 'react-native-vector-icons/Feather'

// Libs & Utils
import navigationService from 'navigation/navigationService'

// Types
import { HomeRouteProps } from 'navigation/DashboardNavigator'
import { Tag, ChecklistItem } from 'types'

// Helpers && Hooks
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createTask } from 'store/tasks/thunkActions'
import { toDayFormat, toTimeFormat } from 'utils/date'
import { useTypedSelector } from 'store'
import i18n, { getPickerLocale } from 'locales/i18n'
import usePremiumPromo from 'hooks/usePremiumPromo'
import { useIsFocused } from '@react-navigation/native'

// Assets & Styles
import styles from './styles'
import layoutStyles from 'styles/layoutStyles'
import { colors, positionStyles, spacingStyles } from 'styles'
import CalendarGreyIcon from 'assets/images/icons/calendarGrey.svg'
import ClockIcon from 'assets/images/icons/clock.svg'
import BackArrow from 'assets/images/icons/backArrow.svg'
import useSimpleReducer from 'hooks/useSimpleReducer'
import * as S from './styled.components'
import InlineInput from 'components/UI/InlineInput'
import ProjectList from 'components/ProjectList'
import ModalMenuItem from 'components/ModalMenuItem'
import { getTimeStrFromTomato } from 'helpers/dates'
import tomatoDataSet from 'data/tomatoDataSet'
import CloseIcon from 'assets/images/icons/close.svg'
import moment from 'moment'
import usePremium from 'hooks/usePremium'
import { isAndroid, isIOs } from 'styles/helpers'
import useKeyboardHeight from 'hooks/useKeyboardHeight'
import KeyboardDoneBtn from 'components/KeyboardDoneBtn'
import logger from 'utils/logger'
import { useInAppReview } from 'hooks/useInAppReview'
import { absolute } from 'styles/positionHelpers'

type Props = HomeRouteProps

type FormState = {
  name: string
  description: string
  dueDate?: any
  dueTime: Date | undefined
  tags?: Tag[]
  tomatoPlan: number
  fromInbox: boolean
}

const CreateTaskScreen: React.FC<Props> = ({ route }) => {
  // Params

  // State for Param

  const {
    dueDate,
    fromInbox,
    project,
    isEdit,
    isHome,
    name,
    description,
    dueTime,
    notificationTime,
    taskId,
    userId,
    isShare,
  } = route?.params || {}

  const tagsList = useTypedSelector((store) => store.tags)
  const authUserId = useTypedSelector((store) => store.auth.user._id)

  const { checkReview } = useInAppReview()

  const { checkShowPremium } = usePremiumPromo()

  if (userId === authUserId && taskId) {
    Keyboard.dismiss()
    navigationService.navigate('Home', {
      screen: 'Home_Task',
      params: {
        taskId,
        back: { rootRoutes: 'Home', screen: 'Home_Main' },
      },
    })
  }

  const pickerRef = useRef<ReactNativePickerModule>(null)
  const checkListRef = useRef<React.ElementRef<typeof ChecklistComponent>>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormState>({
    defaultValues: {
      name: name || '',
      description: description || '',
      dueDate: dueDate ? new Date(dueDate) : undefined,
      dueTime: dueTime ? new Date(dueTime) : undefined,
      tags: isEdit ? [project] : [],
      tomatoPlan: 1,
    },
  })

  const { state, updateState } = useSimpleReducer({
    datePickerVisible: false,
    timePickerVisible: false,
    projectPickerVisible: false,
  })

  const back = route.params?.back

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [taskTitleValue, setTaskTitleValue] = useState('')
  const { isHidden } = useKeyboardHeight()

  const { checkPremium } = usePremium()

  const dispatch = useDispatch()

  const { allTasks } = useTypedSelector((store) => store.tasks)

  const isFocused = useIsFocused()

  const reminderTime = useMemo(() => {
    const dueTime = watch('dueTime')
    const dueDateParsed = watch('dueDate')

    if (dueTime) {
      return dueTime
    }

    if (moment(dueDateParsed).isSame(new Date(), 'day')) {
      return moment().add(1, 'hour').toDate()
    } else {
      return moment(dueDateParsed).hour(12).toDate()
    }
  }, [watch('dueTime'), watch('dueDate')])

  const onBack = () => {
    if (back?.rootRoutes) {
      return navigationService.navigate(back?.rootRoutes, {
        screen: back?.screen,
        params: back?.params,
      })
    }

    navigationService.goBack()
  }

  const onCancelPress = () => {
    onBack()
  }

  const onKeyboardDonePress = () => {
    if (taskTitleValue) {
      checkListRef.current?.onDonePress()
    } else {
      Keyboard.dismiss()
    }
  }

  const handleProjectSelect = (tag: Tag) => {
    setValue('tags', [tag])

    updateState({
      projectPickerVisible: false,
    })
  }

  const handleProjectPicker = () => {
    if (!tagsList.length) {
      navigationService.navigate('Projects', {
        screen: 'Project_Create',
        params: { taskNew: true },
      })
    } else {
      updateState({
        projectPickerVisible: true,
      })
    }
  }

  const handleDueTimePress = () => {
    checkPremium(() =>
      updateState({
        timePickerVisible: true,
      })
    )
  }

  const onSubmit = async (data: FormState) => {
    try {
      // TODO add loading state
      setIsLoading(true)

      let timeReminder
      if (data.dueDate && data.dueTime) {
        timeReminder = moment(data.dueDate)
          .set({
            hour: moment(data.dueTime).get('hour'),
            minute: moment(data.dueTime).get('minute'),
          })
          .toDate()
      }

      dispatch(
        createTask({
          ...data,
          name: data?.name.trim(),
          description: data?.description.trim(),
          dueDate: data.dueDate ? toDayFormat(data.dueDate) : undefined,
          dueTime: timeReminder ? toTimeFormat(data.dueTime) : undefined,
          tomatoFact: 0,
          notificationTime: timeReminder
            ? timeReminder.toISOString()
            : undefined,
          checklist: checklistItems.length
            ? {
                items: checklistItems,
              }
            : undefined,
        })
      )
      checkReview()

      if (isEdit && !isHome) {
        navigationService.navigate('Projects', { screen: 'Project_Details' })
      } else {
        onBack()
      }

      checkShowPremium()
    } catch (e) {
      logger.error('create task', e)
      Alert.alert('Something went wrong, please try again')
      // TODO show alert with text Something when wrong, please try again letter
    } finally {
      setIsLoading(false)
    }
  }

  const renderButtons = () => {
    if (!isHidden && isAndroid) {
      return
    }
    return (
      <View
        style={[positionStyles.rowFill, spacingStyles.mB25, spacingStyles.pH20]}
      >
        <Button
          text={i18n.t('cancel')}
          style={styles.flexHalf}
          textStyle={{ color: colors.WHITE, fontSize: 14 }}
          backgroundColor={colors.LIGHT_RED}
          onPress={onCancelPress}
        />
        <View style={{ width: 25 }} />
        <Button
          text={i18n.t('create')}
          style={styles.flexHalf}
          textStyle={{ color: colors.WHITE, fontSize: 14 }}
          backgroundColor={colors.LIME}
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    )
  }

  useEffect(() => {
    if (isEdit) {
      setValue('tags', [project])
    }
  }, [project])

  const tomatoText = useMemo(() => {
    const tomato = watch('tomatoPlan')
    const str = tomato > 0 ? `${tomato} = ${getTimeStrFromTomato(tomato)}` : 0

    return str
  }, [watch('tomatoPlan')])

  return (
    <SafeAreaView style={[layoutStyles.safeAreaView]}>
      <FormHeader onBack={onBack} />
      <KeyboardAwareScrollView
        style={[
          styles.scrollContainer,
          // isAndroid && { marginBottom: keyboardHeight },
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
                style={{ margin: 0, padding: 0 }}
                placeholder={i18n.t('taskTitle')}
                value={value}
                onBlur={onBlur}
                autoFocus={false}
                onChangeText={onChange}
                fontSize={24}
                fontWeight="500"
                numberOfLines={2}
                multiline
                minHeight={60}
              />
            )}
            name="name"
          />
        </S.ContentWr>

        <S.ContentWr marginTop={20}>
          <ModalMenuItem
            label={i18n.t('project')}
            onPress={handleProjectPicker}
            iconName="package"
            withBorder={false}
          >
            <DmView alignItems="flex-end" flexGrow={1}>
              <ProjectList
                projects={watch('tags') || []}
                addIfEmpty
                onPress={handleProjectPicker}
              />
            </DmView>
          </ModalMenuItem>
          <ModalMenuItem
            label={i18n.t('tomatoPlan')}
            iconName="copy"
            withBorder={false}
            onPress={() => pickerRef.current?.show()}
          >
            <DmView alignItems="flex-end" flexGrow={1}>
              <DmText fontSize={13} fontWeight="500">
                {watch('tomatoPlan')}
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
            <DmView alignItems="flex-end" flexGrow={1}>
              {watch('dueDate') ? (
                <DmView flexDirection="row" alignItems="center">
                  <DmText
                    fontSize={13}
                    fontWeight="500"
                    marginRight={watch('dueDate') ? 10 : 0}
                  >
                    {toDayFormat(watch('dueDate'))}
                  </DmText>
                  {!!watch('dueDate') && (
                    <IconBtn
                      Icon={() => (
                        <Icon name="x-circle" size={18} color="grey" />
                      )}
                      onPress={() => setValue('dueDate', undefined)}
                    />
                  )}

                  {fromInbox && (
                    <DmView
                      paddingLeft={20}
                      onPress={() => setValue('dueDate', undefined)}
                    >
                      <CloseIcon />
                    </DmView>
                  )}
                </DmView>
              ) : (
                <DmText fontSize={13} fontWeight="500">
                  {i18n.t('someDay')}
                </DmText>
              )}
            </DmView>
          </ModalMenuItem>
          {!!watch('dueDate') && (
            <ModalMenuItem
              onPress={handleDueTimePress}
              label={
                watch('dueTime') ? i18n.t('reminder') : i18n.t('addReminder')
              }
              iconName="clock"
              withBorder={false}
            >
              <DmView
                justifyContent="flex-end"
                flexGrow={1}
                flexDirection="row"
              >
                <DmText
                  fontSize={13}
                  fontWeight="500"
                  marginRight={watch('dueTime') ? 10 : 0}
                >
                  {watch('dueTime') ? toTimeFormat(watch('dueTime')) : null}
                </DmText>
                {!!watch('dueTime') && (
                  <IconBtn
                    Icon={() => <Icon name="x-circle" size={18} color="grey" />}
                    onPress={() => setValue('dueTime', undefined)}
                  />
                )}
              </DmView>
            </ModalMenuItem>
          )}
        </S.ContentWr>
        <S.ContentWr marginY={20}>
          <ChecklistComponent
            checklistItems={checklistItems || []}
            onListChange={setChecklistItems}
            taskTitleValue={taskTitleValue}
            setTaskTitleValue={setTaskTitleValue}
            ref={checkListRef}
          />
        </S.ContentWr>

        <S.ContentWr minHeight={100} marginBottom={50}>
          <Controller
            control={control}
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
      </KeyboardAwareScrollView>

      <DateTimePickerModal
        // headerTextIOS={i18n.t('pickDate')}
        locale={i18n?.currentLocale() || 'en'}
        mode="date"
        isVisible={state.datePickerVisible}
        onConfirm={(date) => {
          setValue('dueDate', date)
          updateState({
            datePickerVisible: false,
          })
        }}
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
        date={watch('dueDate') || new Date()}
      />
      <DateTimePickerModal
        // headerTextIOS={i18n.t('pickTime')}
        locale={getPickerLocale()}
        mode="time"
        isVisible={state.timePickerVisible}
        onConfirm={(date) => {
          setValue('dueTime', date)
          updateState({
            timePickerVisible: false,
          })
        }}
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
        date={reminderTime}
        is24Hour
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
        onValueChange={(value) => setValue('tomatoPlan', Number(value))}
      />
      {renderButtons()}

      {(!isHidden || isIOs) && (
        <KeyboardDoneBtn onKeyboardDonePress={onKeyboardDonePress} />
      )}
    </SafeAreaView>
  )
}

export default CreateTaskScreen
