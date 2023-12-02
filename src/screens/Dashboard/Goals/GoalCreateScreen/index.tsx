/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useRef, useState } from 'react'
// Components
import { View, Text, Share, Alert, Keyboard } from 'react-native'
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
import { createGoal } from 'store/goals/thunkActions'

// Utils
import navigationService from 'navigation/navigationService'
import { useForm, Controller } from 'react-hook-form'
import {
  toDayFormat,
  toTimeFormat,
  getDateFromApi,
  getDateFromApiTime,
  toDateFormat,
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
import logger from 'utils/logger'
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory'
import i18n from 'locales/i18n'
import { isAndroid, isIOs } from 'styles/helpers'
import useKeyboardActive from 'hooks/useKeyboardActive'
import useKeyboardHeight from 'hooks/useKeyboardHeight'
import KeyboardDoneBtn from 'components/KeyboardDoneBtn'

type Props = GoalRouteProps

type FormState = {
  title: string
  description: string
  dueDate?: Date
  emoji?: {
    icon: string
    name: string
  }
}

const CreateGoalScreen: React.FC<Props> = ({ route }) => {
  const menuModalRef = useRef<BottomSheetModal>(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const { keyboardHeight, isHidden } = useKeyboardHeight()

  const back = route?.params?.back

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isDirty },
    watch,
    setValue,
  } = useForm<FormState>({
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const { state, updateState } = useSimpleReducer({
    datePickerVisible: false,
    emojiModalVisible: false,
    projectPickerVisible: false,
  })

  const handleBack = () => {
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
  }

  const handleChangeEmoji = (emoji: string) => {
    setValue('emoji', {
      icon: emoji,
      name: emoji,
    })

    updateState({
      emojiModalVisible: false,
    })
  }

  const onSubmit = async (data: FormState) => {
    try {
      setIsLoading(true)
      dispatch(
        createGoal({
          title: data.title,
          description: data.description,
          dueDate: data?.dueDate ? toDayFormat(data.dueDate) : undefined,
          emoji: data.emoji || undefined,
        })
      )
    } catch (e) {
      logger.error('Goal create error', e)
      Alert.alert('Something went wrong, please try again')
    } finally {
      setIsLoading(false)
      handleBack()
    }
  }
  const renderButtons = () => {
    if (!isHidden && isAndroid) {
      return
    }
    return (
      <DmView flexDirection="row" marginBottom={25} px={20}>
        <Button
          text={i18n.t('cancel')}
          textStyle={{ color: colors.WHITE, fontSize: 14 }}
          backgroundColor={colors.LIGHT_RED}
          onPress={() => handleBack()}
          style={{ flex: 0.5 }}
        />
        <DmView width={25} />
        <Button
          text={i18n.t('create')}
          textStyle={{ color: colors.WHITE, fontSize: 14 }}
          backgroundColor={colors.LIME}
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
          style={{ flex: 0.5 }}
        />
      </DmView>
    )
  }

  return (
    <SafeAreaView style={[layoutStyles.safeAreaView]}>
      <FormHeader
        onBack={handleBack}
        // rightIcon={<SettingsIcon />}
        onRightPress={handleShowMenu}
        text={`${i18n.t('create')} ${i18n.t('goalsmall')}`}
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
                placeholder={i18n.t('title')}
                autoFocus={true}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                fontSize={24}
                fontWeight="500"
                multiline
              />
            )}
            name="title"
          />

          <DmView mt={10} />
        </S.ContentWr>
        <S.ContentWr marginTop={20}>
          <ModalMenuItem
            onPress={() =>
              updateState({
                datePickerVisible: true,
              })
            }
            label={
              watch('dueDate') ? i18n.t('finishdate') : i18n.t('addFinishdate')
            }
            iconName="calendar"
            withBorder={false}
          >
            <DmView alignItems="flex-end" flexGrow={1}>
              <DmText fontSize={13} fontWeight="500">
                {watch('dueDate') ? toDayFormat(watch('dueDate')) : undefined}
              </DmText>
            </DmView>
          </ModalMenuItem>
          <ModalMenuItem
            onPress={() =>
              updateState({
                emojiModalVisible: true,
              })
            }
            label={watch('emoji.icon') ? i18n.t('emoji') : i18n.t('addEmoji')}
            iconName="smile"
            withBorder={false}
          >
            <DmView alignItems="flex-end" flexGrow={1}>
              <DmText>{watch('emoji.icon')}</DmText>
            </DmView>
          </ModalMenuItem>
        </S.ContentWr>
        <S.ContentWr minHeight={100} marginTop={20}>
          <Controller
            control={control}
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
      </S.ScrollContainer>
      {renderButtons()}

      <EmojiModal
        isVisible={state.emojiModalVisible}
        onEmojiSelect={handleChangeEmoji}
        onClose={() =>
          updateState({
            emojiModalVisible: false,
          })
        }
      />
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
      {(!isHidden || isIOs) && (
        <KeyboardDoneBtn onKeyboardDonePress={() => Keyboard.dismiss()} />
      )}
    </SafeAreaView>
  )
}

export default CreateGoalScreen
