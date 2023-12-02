/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useMemo, useRef, useState } from 'react'

// Components
import { Text, Share } from 'react-native'
import DmText from 'components/UI/DmText'
import DmView from 'components/UI/DmView'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormHeader from 'components/Header'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import ModalControls, { BottomSheetModal } from './components/ModalControls'
import InlineInput from 'components/UI/InlineInput'
import ModalMenuItem from 'components/ModalMenuItem'
import Checklist from 'components/CheckList'
import Icon from 'react-native-vector-icons/Feather'

// Utils & Hooks
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
import { selectNoteById } from 'store/notes/selectors'
import { useDispatch } from 'react-redux'
import { patchNote, removeNote } from 'store/notes/thunkActions'
import { useTypedSelector } from 'store'

// Types
import { NoteRouteProps } from 'navigation/DashboardNavigator'
import { CheckList } from 'types'

// Styles & Assets
import * as S from './styled.components'
import layoutStyles from 'styles/layoutStyles'

import SettingsIcon from 'assets/images/icons/settings.svg'
import { createTask } from 'store/tasks/thunkActions'
import { colors } from 'styles'
import DeleteModalDetails from 'components/UI/DeleteModalDetails'
import i18n from 'locales/i18n'

type Props = NoteRouteProps

type FormState = {
  title: string
  description: string
  dueDate: Date
  dueTime: Date
}

const NoteDetailScreen: React.FC<Props> = ({ route }) => {
  const menuModalRef = useRef<BottomSheetModal>(null)
  const [isDeleteModalsVisible, setIsDeleteModalsVisible] = useState(false)
  const [taskTitleValue, setTaskTitleValue] = useState('')
  const dispatch = useDispatch()

  const noteId = route?.params?.noteId
  const back = route?.params?.back

  const note = useTypedSelector((state) => selectNoteById(state, noteId))!

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isDirty },
    watch,
    setValue,
  } = useForm<FormState>({
    defaultValues: {
      title: note?.title || '',
      description: note?.description || '',
      dueDate: getDateFromApi(note?.dueDate),
      dueTime: note?.dueTime ? getDateFromApiTime(note.dueTime) : new Date(),
    },
  })

  const { state, updateState } = useSimpleReducer({
    datePickerVisible: false,
    timePickerVisible: false,
    projectPickerVisible: false,
  })

  const saveNote = async () => {
    if (!isDirty) {
      return
    }

    const dueDate = getValues('dueDate')
    const dueTime = getValues('dueTime')

    dispatch(
      patchNote(note._id, {
        title: getValues('title'),
        description: getValues('description'),
        dueDate: toDayFormat(dueDate),
        dueTime: dueTime ? toTimeFormat(dueTime) : undefined,
      })
    )
  }

  const handleBack = () => {
    saveNote()

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

  const handleCheckListChange = (checklist: CheckList['items']) => {
    dispatch(
      patchNote(noteId, {
        checkListId: note.checkListId,
        checklist: {
          items: checklist,
        },
      })
    )
  }

  const handleChangeDueTime = (date: Date) => {
    setValue('dueTime', date)
    setValue('dueDate', date)
    updateState({
      timePickerVisible: false,
    })

    dispatch(
      patchNote(noteId, {
        dueTime: toTimeFormat(date),
        dueDate: toDayFormat(date),
      })
    )
  }

  const handleShare = async () => {
    menuModalRef.current?.close()

    await Share.share({
      message: note.title,
    })
  }

  const handleDelete = () => {
    menuModalRef.current?.close()
    setIsDeleteModalsVisible(true)
    // dispatch(removeNote(noteId))
  }
  const deleteNote = async () => {
    setIsDeleteModalsVisible(false)
    dispatch(removeNote(noteId))
    handleBack()
  }

  const handleFinish = () => {
    menuModalRef.current?.close()
    dispatch(
      patchNote(noteId, {
        status: isDone ? 'active' : 'done',
      })
    )
  }

  const handleConvertToTask = async () => {
    const task = await dispatch(
      createTask({
        name: note.title,
        description: note.description,
        dueDate: note.dueDate
          ? toDayFormat(note.dueDate)
          : toDayFormat(new Date()),
        dueTime: note.dueTime ? toTimeFormat(note.dueTime) : undefined,
        checklist: note.checklist?.items?.length
          ? {
              items: note.checklist?.items,
            }
          : undefined,
      })
    )

    handleDelete()

    navigationService.navigate('Home', {
      screen: 'Home_Task',
      params: {
        // @ts-ignore
        taskId: task._id,
      },
    })
  }

  const isDone = useMemo(() => {
    return note?.status === 'done'
  }, [note])

  const reminderTime = useMemo(() => {
    if (!note?.dueDate || !note?.dueTime) return undefined

    return note?.dueDate + ' ' + note?.dueTime
  }, [note])

  if (!note) {
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
                placeholder={i18n.t('note')}
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

          <DmView mt={10}>
            {isDone && (
              <DmView mt={10} flexDirection="row">
                <DmView marginRight={10}>
                  <Icon
                    name="check-circle"
                    size={20}
                    color={colors.DARK_GREY}
                  />
                </DmView>

                <DmText fontSize={15}>
                  {i18n.t('completed') + toDateTimeFormat(note.doneAt)}
                </DmText>
              </DmView>
            )}
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
            onPress={handleFinish}
            label={!isDone ? i18n.t('markdone') : i18n.t('repeat')}
            iconName={!isDone ? 'check-circle' : 'rotate-cw'}
            // withBorder={false}
          >
            <DmView alignItems="flex-end" flexGrow={1}>
              <DmText fontSize={13} fontWeight="500">
                {/* {reminderTime} */}
              </DmText>
            </DmView>
          </ModalMenuItem>
          <ModalMenuItem
            onPress={handleConvertToTask}
            label={i18n.t('convert')}
            iconName="play"
            // withBorder={false}
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
                timePickerVisible: true,
              })
            }
            label={reminderTime ? i18n.t('reminder') : i18n.t('addReminder')}
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
            checklistItems={note?.checklist?.items || []}
            onListChange={handleCheckListChange}
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
        <ModalControls
          ref={menuModalRef}
          onShare={handleShare}
          onDelete={handleDelete}
          onFinish={handleFinish}
        />
        <DeleteModalDetails
          title={i18n.t('note')}
          onCancel={() => setIsDeleteModalsVisible(false)}
          onDelete={deleteNote}
          isDeleteModalsVisible={isDeleteModalsVisible}
        />
      </S.ScrollContainer>
    </SafeAreaView>
  )
}

export default NoteDetailScreen
