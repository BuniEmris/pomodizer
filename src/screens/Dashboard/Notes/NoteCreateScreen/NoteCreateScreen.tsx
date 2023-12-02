import React, { useMemo, useRef, useState } from 'react'

// Components
import { Text, Share, Keyboard } from 'react-native'
import DmText from 'components/UI/DmText'
import DmView from 'components/UI/DmView'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormHeader from 'components/Header'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import InlineInput from 'components/UI/InlineInput'
import ModalMenuItem from 'components/ModalMenuItem'
import Checklist from 'components/CheckList'

// Utils & Hooks
import navigationService from 'navigation/navigationService'
import { useForm, Controller } from 'react-hook-form'
import { toDayFormat, toTimeFormat, toDateTimeFormat } from 'utils/date'
import useSimpleReducer from 'hooks/useSimpleReducer'
import { selectNoteById } from 'store/notes/selectors'
import { useDispatch } from 'react-redux'
import { createNote, patchNote, removeNote } from 'store/notes/thunkActions'
import { useTypedSelector } from 'store'

// Types
import { NoteRouteProps } from 'navigation/DashboardNavigator'
import { CheckList, ChecklistItem } from 'types'

// Styles & Assets
import * as S from './styled.components'
import layoutStyles from 'styles/layoutStyles'

import Button from 'components/UI/Button'
import { colors } from 'styles'
import i18n from 'locales/i18n'
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory'
import { isIOs } from 'styles/helpers'
import styles from 'screens/Dashboard/Home/CreateTask/styles'
import useKeyboardHeight from 'hooks/useKeyboardHeight'
import KeyboardDoneBtn from 'components/KeyboardDoneBtn'

type Props = NoteRouteProps

type FormState = {
  title: string
  description: string
  dueDate?: Date
}

const NoteCreateScreen: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch()
  const { isHidden } = useKeyboardHeight()
  const back = route?.params?.back
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [taskTitleValue, setTaskTitleValue] = useState('')
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
    timePickerVisible: false,
    projectPickerVisible: false,
  })

  const handleSave = async (data: FormState) => {
    const { title, description, dueDate } = data
    setIsLoading(true)
    await dispatch(
      createNote({
        title,
        description,
        dueDate: dueDate ? toDayFormat(dueDate) : undefined,
        dueTime: dueDate ? toTimeFormat(dueDate) : undefined,
        checklist: checklistItems.length
          ? {
              items: checklistItems,
            }
          : undefined,
      })
    )
    setIsLoading(false)
    handleBack()
  }

  const handleBack = () => {
    if (back?.rootRoutes) {
      return navigationService.navigate(back?.rootRoutes, {
        screen: back?.screen,
      })
    }

    navigationService.goBack()
  }

  const handleChangeDueTime = (date: Date) => {
    setValue('dueDate', date)
    updateState({
      timePickerVisible: false,
    })
  }

  const reminderTime = useMemo(() => {
    return watch('dueDate') ? toDateTimeFormat(watch('dueDate')) : undefined
  }, [watch('dueDate')])

  return (
    <SafeAreaView style={[layoutStyles.safeAreaView]}>
      <FormHeader onBack={handleBack} />
      <S.ScrollContainer>
        <S.ContentWr>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InlineInput
                placeholder={i18n.t('note')}
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

          <DmView mt={10}>
            {/* <ProjectList
              projects={note.tags}
              onPress={() => updateState({
                projectPickerVisible: true
              })}
            /> */}
          </DmView>
        </S.ContentWr>
        <S.ContentWr marginTop={20}>
          <ModalMenuItem
            onPress={() =>
              updateState({
                timePickerVisible: true,
              })
            }
            label={
              watch('dueDate') ? i18n.t('reminder') : i18n.t('addReminder')
            }
            iconName="clock"
            withBorder={false}
          >
            <DmView alignItems="flex-end" flexGrow={1}>
              <DmText fontSize={13} fontWeight="500">
                {reminderTime}
              </DmText>
            </DmView>
          </ModalMenuItem>
        </S.ContentWr>
        <S.ContentWr marginY={20}>
          <Checklist
            taskTitleValue={taskTitleValue}
            setTaskTitleValue={setTaskTitleValue}
            checklistItems={checklistItems}
            onListChange={setChecklistItems}
          />
        </S.ContentWr>
        <S.ContentWr minHeight={100}>
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
        <DateTimePickerModal
          mode="datetime"
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
          date={watch('dueDate')}
        />
      </S.ScrollContainer>
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
          onPress={handleSubmit(handleSave)}
          style={{ flex: 0.5 }}
        />
      </DmView>
      {(!isHidden || isIOs) && (
        <KeyboardDoneBtn
          isDetailsScreen
          onKeyboardDonePress={() => Keyboard.dismiss()}
        />
      )}
    </SafeAreaView>
  )
}

export default NoteCreateScreen
