/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useRef, useMemo, useState } from 'react'
// Components
import { View, Text, Share, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormHeader from 'components/Header'
import Button from 'components/UI/Button'
import ToggleSwitch from 'components/ToggleSwitch'
import DmText from 'components/UI/DmText'
import DmView from 'components/UI/DmView'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import ModalControls, { BottomSheetModal } from './components/ModalControls'
import InlineInput from 'components/UI/InlineInput'
import ModalMenuItem from 'components/ModalMenuItem'
import Checklist from 'components/CheckList'
import EmojiModal from 'components/EmojiModal'
import Icon from 'react-native-vector-icons/Feather'

// Utils
import navigationService from 'navigation/navigationService'
import { useForm, Controller } from 'react-hook-form'
import {
  toDayFormat,
  toTimeFormat,
  getDateFromApi,
  getDateFromApiTime,
  toDateTimeFormat,
} from 'utils/date'
import useSimpleReducer from 'hooks/useSimpleReducer'
import { selectGoalById } from 'store/goals/selectors'
import { useDispatch } from 'react-redux'
import { patchGoal, removeGoal } from 'store/goals/thunkActions'
import { useTypedSelector } from 'store'

// Types
import { GoalRouteProps } from 'navigation/DashboardNavigator'

// Assets & Styles
import CheckButton from 'assets/images/Dashboard/check.svg'
import styles from './styles'
import layoutStyles from 'styles/layoutStyles'
import InformationIcon from 'assets/images/icons/information.svg'
import SettingsIcon from 'assets/images/icons/settings.svg'
import { colors, positionStyles, spacingStyles } from 'styles'
import * as S from './styled.components'
import DeleteModalDetails from 'components/UI/DeleteModalDetails'
import i18n from 'locales/i18n'
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory'
import { isIOs } from 'styles/helpers'
import useKeyboardHeight from 'hooks/useKeyboardHeight'
import KeyboardDoneBtn from 'components/KeyboardDoneBtn'

type Props = GoalRouteProps

type FormState = {
  title: string
  description: string
  dueDate: Date
}

const GoalDetailsScreen: React.FC<Props> = ({ route }) => {
  const menuModalRef = useRef<BottomSheetModal>(null)
  const goalId = route?.params?.goalId
  const dispatch = useDispatch()
  const back = route?.params?.back

  const [isDeleteModalsVisible, setIsDeleteModalsVisible] = useState(false)
  const { keyboardHeight, isHidden } = useKeyboardHeight()
  const goal = useTypedSelector((state) => selectGoalById(state, goalId))!
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isDirty },
    watch,
    setValue,
  } = useForm<FormState>({
    defaultValues: {
      title: goal?.title || '',
      description: goal?.description || '',
      dueDate: getDateFromApi(goal?.dueDate),
    },
  })

  const { state, updateState } = useSimpleReducer({
    datePickerVisible: false,
    emojiModalVisible: false,
    projectPickerVisible: false,
  })

  const saveGoal = async () => {
    if (!isDirty) {
      return
    }

    dispatch(
      patchGoal(goal._id, {
        title: getValues('title'),
        description: getValues('description'),
      })
    )
  }

  const handleBack = () => {
    saveGoal()

    if (back?.rootRoutes) {
      return navigationService.navigate(back?.rootRoutes, {
        screen: back?.screen,
      })
    }

    navigationService.goBack()
  }

  const handleShowMenu = () => {
    menuModalRef.current?.present()
  }

  const handleChangeDueTime = (date: Date) => {
    setValue('dueDate', date)
    updateState({
      datePickerVisible: false,
    })

    dispatch(
      patchGoal(goalId, {
        dueDate: toDayFormat(date),
      })
    )
  }

  const handleChangeEmoji = (emoji: string) => {
    dispatch(
      patchGoal(goal._id, {
        emoji: {
          icon: emoji,
          name: emoji,
        },
      })
    )

    updateState({
      emojiModalVisible: false,
    })
  }

  const handleShare = async () => {
    menuModalRef.current?.close()

    await Share.share({
      message: goal.title,
    })
  }

  const handleDelete = () => {
    menuModalRef.current?.close()
    setIsDeleteModalsVisible(true)
  }

  const deleteGoal = async () => {
    setIsDeleteModalsVisible(false)
    dispatch(removeGoal(goalId))
    handleBack()
  }
  const handleFinish = () => {
    dispatch(
      patchGoal(goalId, {
        status: isDone ? 'active' : 'done',
      })
    )
    menuModalRef.current?.close()
  }

  const isDone = useMemo(() => {
    return goal?.status === 'done'
  }, [goal])

  if (!goal) {
    return null
  }

  return (
    <SafeAreaView
      style={[layoutStyles.safeAreaView]}
      edges={['right', 'top', 'left']}
    >
      <FormHeader
        onBack={handleBack}
        rightIcon={<SettingsIcon />}
        onRightPress={handleShowMenu}
      />
      <S.ScrollContainer>
        <S.ContentWr>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InlineInput
                placeholder={i18n.t('goal')}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                fontSize={24}
                fontWeight="500"
                multiline
                style={
                  isDone && {
                    textDecorationLine: 'line-through',
                  }
                }
              />
            )}
            name="title"
          />

          <DmView mt={10} />
          {isDone && !!goal.doneAt && (
            <DmView mt={10} flexDirection="row">
              <DmView marginRight={10}>
                <Icon name="check-circle" size={20} color={colors.DARK_GREY} />
              </DmView>

              <DmText fontSize={15}>
                {i18n.t('achieved') + toDateTimeFormat(goal.doneAt)}
              </DmText>
            </DmView>
          )}
        </S.ContentWr>
        <S.ContentWr marginTop={20}>
          <ModalMenuItem
            onPress={handleFinish}
            label={!isDone ? i18n.t('markachieved') : i18n.t('repeat')}
            iconName={!isDone ? 'check-circle' : 'rotate-cw'}
          >
            <DmView alignItems="flex-end" flexGrow={1}>
              <DmText fontSize={13} fontWeight="500">
                {/* {reminderTime} */}
              </DmText>
            </DmView>
          </ModalMenuItem>
          <ModalMenuItem
            onPress={() =>
              updateState({
                datePickerVisible: true,
              })
            }
            label={
              goal?.dueDate ? i18n.t('finishdate') : i18n.t('addFinishdate')
            }
            iconName="calendar"
            withBorder={false}
          >
            <DmView alignItems="flex-end" flexGrow={1}>
              <DmText fontSize={13} fontWeight="500">
                {goal.dueDate}
              </DmText>
            </DmView>
          </ModalMenuItem>
          <ModalMenuItem
            onPress={() =>
              updateState({
                emojiModalVisible: true,
              })
            }
            label={goal.emoji?.icon ? i18n.t('emoji') : i18n.t('addEmoji')}
            iconName="smile"
            withBorder={false}
          >
            <DmView alignItems="flex-end" flexGrow={1}>
              <DmText>{goal.emoji?.icon}</DmText>
            </DmView>
          </ModalMenuItem>
        </S.ContentWr>
        <S.ContentWr minHeight={100} marginTop={20}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InlineInput
                placeholder={i18n.t('description')}
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
        <DateTimePickerModal
          mode="date"
          isVisible={state.datePickerVisible}
          onConfirm={handleChangeDueTime}
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
        />
        <ModalControls
          ref={menuModalRef}
          onShare={handleShare}
          onDelete={handleDelete}
          onFinish={handleFinish}
        />
      </S.ScrollContainer>
      <EmojiModal
        isVisible={state.emojiModalVisible}
        onEmojiSelect={handleChangeEmoji}
        onClose={() =>
          updateState({
            emojiModalVisible: false,
          })
        }
      />
      <DeleteModalDetails
        title={i18n.t('goal')}
        noBodyText
        onCancel={() => setIsDeleteModalsVisible(false)}
        onDelete={deleteGoal}
        isDeleteModalsVisible={isDeleteModalsVisible}
      />
      {(!isHidden || isIOs) && (
        <KeyboardDoneBtn
          isDetailsScreen
          onKeyboardDonePress={() => Keyboard.dismiss()}
        />
      )}
    </SafeAreaView>
  )
}

export default GoalDetailsScreen
