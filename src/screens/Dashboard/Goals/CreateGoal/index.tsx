/* eslint-disable react-native/no-inline-styles */
import React, { useMemo, useState } from 'react'
// Components
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import FormHeader from 'components/Header'
import Button from 'components/UI/Button'
import Input from 'components/UI/Input'
import Picker from 'components/UI/PickerModal'
import ToggleSwitch from 'components/ToggleSwitch'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

// Libs & Utils
import navigationService from 'navigation/navigationService'
import moment from 'moment'
import logger from 'utils/logger'

// Hooks
import { useCreateRequest, usePatchRequest } from 'hooks/apiClientHooks'
import useForm from 'hooks/useFormHooks'

// Types
import { GoalRouteProps } from 'navigation/DashboardNavigator'
import { Goal } from 'types'
import { createGoal } from 'store/goals/thunkActions'

// Assets & Styles
import InformationIcon from 'assets/images/icons/information.svg'
import ArrowDownIcon from 'assets/images/icons/arrowDown.svg'
import styles from './styles'
import layoutStyles from 'styles/layoutStyles'
import CalendarGreyIcon from 'assets/images/icons/calendarGrey.svg'
import { colors, positionStyles, spacingStyles } from 'styles'
import EmojiModal from 'components/EmojiModal'
import { useDispatch } from 'react-redux'
import ModalMenuItem from 'components/ModalMenuItem'
import { DmText, DmView } from 'components/UI'
import { toDayFormat } from 'utils/date'
import i18n from 'locales/i18n'

type Props = GoalRouteProps

const CreateGoalScreen: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch()

  const back = route.params?.back
  const goal = route.params?.goal
  const isEdit = route.params?.isEdit

  const [isEmodziPickerVisible, setIsEmodziPickerVisible] = useState(false)
  const [datePickerVisible, setDatePickerVisible] = useState(false)

  const initialState = useMemo(() => {
    logger.log('goal', goal)
    if (isEdit) {
      return {
        title: goal.title,
        datePickerValue: {
          label: goal.dueDate,
          date: null,
        },
        description: goal.description,
        isMonthlyChecked: goal.isMonthly,
        emoji: goal.emoji,
      }
    } else {
      return {
        title: '',
        isMonthlyChecked: false,
        description: '',
        datePickerValue: {
          label: '',
          date: null,
        },
        emoji: {
          icon: null,
          name: null,
        },
      }
    }
  }, [goal])

  const { formState, updateFormValuesAction, updateFormErrors } =
    useForm(initialState)
  const {
    title,
    isMonthlyChecked,
    datePickerValue,
    description,
    emoji,
    errors,
  } = formState

  const onBack = () => {
    if (back?.rootRoutes) {
      return navigationService.navigate(back?.rootRoutes, {
        screen: back?.screen,
      })
    }

    navigationService.goBack()
  }

  const onCancelPress = () => {
    onBack()
  }

  const validateForm = () => {
    let valid = true
    if (title === '') {
      updateFormErrors({ title: true })
      valid = false
    }
    if (isMonthlyChecked && datePickerValue.label === '') {
      updateFormErrors({ datePickerValue: true })
      valid = false
    }
    return valid
  }

  const onCreatePress = async () => {
    if (!validateForm()) {
      return
    }

    try {
      dispatch(
        createGoal({
          title,
          description,
          dueDate: datePickerValue?.label || undefined,
          isMonthly: !!datePickerValue?.label,
        })
      )
    } catch (e) {
      logger.error('Goal create error', e)
    } finally {
      onBack()
    }
  }

  const handleSelectEmoji = (emoji: string) => {
    setIsEmodziPickerVisible(false)
    updateFormValuesAction({
      emoji: {
        icon: emoji,
        name: emoji,
      },
    })
  }

  return (
    <>
      <SafeAreaView style={[layoutStyles.safeAreaView]}>
        <FormHeader
          text={`${isEdit ? i18n.t('edit') : i18n.t('create')} ${i18n.t(
            'goal'
          )}`}
          onBack={onBack}
        />
        <View
          style={[
            styles.contentContainer,
            spacingStyles.pH20,
            spacingStyles.mT15,
          ]}
        >
          <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
            <Input
              placeholder={i18n.t('title')}
              error={errors.title}
              style={[spacingStyles.mT20, spacingStyles.mB10]}
              value={title}
              onChangeText={(value) => updateFormValuesAction({ title: value })}
            />
            <ModalMenuItem
              onPress={() => setIsEmodziPickerVisible(true)}
              label={emoji?.icon ? i18n.t('emoji') : i18n.t('addEmoji')}
              iconName={emoji?.icon ? undefined : 'frown'}
              withBorder={false}
            >
              <DmView alignItems="flex-end" flexGrow={1}>
                <DmText>{emoji?.icon}</DmText>
              </DmView>
            </ModalMenuItem>
            <Input
              placeholder="Description (optional)"
              style={spacingStyles.mT30}
              value={description}
              onChangeText={(value) =>
                updateFormValuesAction({ description: value })
              }
              isMultiline={true}
            />
            <View
              style={[
                positionStyles.row,
                spacingStyles.mT30,
                positionStyles.alighCenter,
              ]}
            >
              <ToggleSwitch
                label={i18n.t('finishdate')}
                value={isMonthlyChecked}
                onValueChange={(value: boolean) => {
                  updateFormValuesAction({ isMonthlyChecked: value })
                  if (!value) {
                    updateFormValuesAction({
                      datePickerValue: {
                        label: '',
                        date: null,
                      },
                    })
                  }
                }}
              />
              <InformationIcon style={spacingStyles.mL7} />
            </View>
            {isMonthlyChecked && (
              <Input
                placeholder="Date"
                style={spacingStyles.mT30}
                error={errors.datePickerValue}
                value={datePickerValue.label}
                rightIcon={<CalendarGreyIcon />}
                onRightIconPress={() => {
                  setDatePickerVisible(true)
                }}
                editable={false}
              />
            )}
          </KeyboardAvoidingScrollView>
          <View style={[positionStyles.rowFill, spacingStyles.mB25]}>
            <Button
              text={i18n.t('cancel')}
              style={styles.flexHalf}
              textStyle={{ color: colors.WHITE, fontSize: 14 }}
              backgroundColor={colors.LIGHT_RED}
              onPress={onCancelPress}
            />
            <View style={{ width: 25 }} />
            <Button
              text={`${isEdit ? i18n.t('edit') : i18n.t('create')}`}
              style={styles.flexHalf}
              textStyle={{ color: colors.WHITE, fontSize: 14 }}
              backgroundColor={colors.LIME}
              onPress={onCreatePress}
            />
          </View>
        </View>
        <DateTimePickerModal
          mode="date"
          isVisible={datePickerVisible}
          onConfirm={(date) => {
            updateFormValuesAction({
              datePickerValue: {
                label: toDayFormat(date),
                date: new Date(date.setUTCHours(0, 0, 0, 0)),
              },
            })
            setDatePickerVisible(false)
          }}
          onCancel={() => setDatePickerVisible(false)}
        />
        <EmojiModal
          isVisible={isEmodziPickerVisible}
          onClose={() => setIsEmodziPickerVisible(false)}
          onEmojiSelect={handleSelectEmoji}
        />
      </SafeAreaView>
    </>
  )
}

export default CreateGoalScreen
