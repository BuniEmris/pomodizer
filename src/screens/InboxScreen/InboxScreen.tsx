/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-extra-parens */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useMemo, useState } from 'react'

// Components
import {
  View,
  FlatList,
  Alert,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TaskItem from 'screens/Dashboard/Home/MainScreen/TaskItem'
import Header from 'components/Header'
import { DmText, DmView } from 'components/UI'
import Icon from 'react-native-vector-icons/Feather'

// Hooks & Redux
import { useDispatch } from 'react-redux'
import { useTypedSelector } from 'store'
import { selectInboxTask } from 'store/tasks/selectors'
import { useForm } from 'react-hook-form'
import useSimpleReducer from 'hooks/useSimpleReducer'
import usePremium from 'hooks/usePremium'

// Libs & Utils
import navigationService from 'navigation/navigationService'

// Types
import { ProjectRouteProps } from 'navigation/DashboardNavigator'
import { Tag, Task } from 'types'

// Assets & Styles
import styles from './styles'
import layoutStyles from 'styles/layoutStyles'
import { colors, spacingStyles } from 'styles'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import ProjectPicker from 'components/ProjectPicker'
import { finishTask, removeTask } from 'store/tasks/thunkActions'
import i18n from 'locales/i18n'
import { pauseTimer, startTaskTimer, stopTimer } from 'store/timer/thunkActions'
import DDSortableList from 'components/DDSortableList'
import logger from 'utils/logger'
import { SCREEN_WIDTH } from 'styles/helpers'

import AddButton from 'components/AddButton/AddButton'
import TagsPicker from 'components/TagsPicker'

type Props = ProjectRouteProps

type FormState = {
  tags?: Tag[]
}

const InboxScreen: React.FC<Props> = ({ route }) => {
  // Global Store
  const tasks = useTypedSelector(selectInboxTask)
  const [showUncompleted, setShowUncompleted] = useState(true)
  const { checkPremium } = usePremium()
  const isFocused = useIsFocused()

  const [selectedProjectID, setSelectedProjectID] = useState('all')
  const all = {
    _id: 'all',
    name: i18n.t('all'),
    description: '',
    color: 'black',
    isArchived: false,
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormState>({
    defaultValues: {
      tags: [all],
    },
  })

  const filteredTasks = useMemo(() => {
    let taskList = tasks

    if (!selectedProjectID.includes('all')) {
      taskList = tasks?.filter((item) =>
        item.tagsIds.includes(selectedProjectID)
      )
    }

    if (!showUncompleted) {
      taskList = taskList.filter((item) => !item.dueDate)
    }

    return taskList
  }, [selectedProjectID, showUncompleted, tasks])

  const uncompletedCount = useMemo(() => {
    const count = tasks.reduce((acc, item) => (item.dueDate ? acc + 1 : acc), 0)

    return count
  }, [selectedProjectID, tasks])

  const { state, updateState } = useSimpleReducer({
    projectPickerVisible: false,
  })

  // Hooks
  const dispatch = useDispatch()
  const navigation = useNavigation()

  // Handlers
  const handleOnStop = () => {
    navigationService.navigate('Goals')
  }

  const handleTaskPress = (item: Task) => {
    // @ts-ignore
    navigation.navigate('Inbox', {
      screen: 'Inbox_task_detail',
      params: {
        taskId: item._id,
      },
    })
  }
  const handleDeleteInboxPress = async (item: Task) => {
    dispatch(removeTask(item))
  }
  const handleEditInboxPress = (item: Task) => {
    // @ts-ignore
    navigation.navigate('Inbox', {
      screen: 'Inbox_task_detail',
      params: {
        taskId: item._id,
        isEdit: true,
      },
    })
  }

  const handleRightPress = () => {
    // @ts-ignore
    navigation.navigate('Inbox', {
      screen: 'Inbox_Task_Create',
      params: { dueDate: undefined, fromInbox: true },
    })
  }
  const handleStartTask = (task: Task) => {
    dispatch(startTaskTimer(task._id))
  }

  const handlePausePress = () => {
    dispatch(pauseTimer())
  }

  const handleFinishTask = (task: Task) => {
    dispatch(finishTask(task))
  }

  const handleProjectPicker = () => {
    checkPremium(() =>
      updateState({
        projectPickerVisible: true,
      })
    )
  }

  const handleProjectSelect = (tag: Tag) => {
    setValue('tags', [tag])
    setSelectedProjectID(tag?._id)
    updateState({
      projectPickerVisible: false,
    })
  }

  // Render Methods
  const renderTask: React.FC<any> = ({ item, index }) => {
    const prevTask = filteredTasks[index - 1]
    const prevTaskDate = prevTask?.dueDate
    const nextTask = filteredTasks[index + 1]
    const nextTaskDueDate = nextTask?.dueDate

    return (
      <View>
        {item.dueDate && index === 0 && (
          <DmView style={{ backgroundColor: colors.FAUX_GHOST }} paddingY={15}>
            <DmText
              marginLeft={25}
              fontSize={12}
              fontWeight="500"
              color={colors.LIGHT_RED}
            >
              {i18n.t('uncompleted_tasks')}
            </DmText>
          </DmView>
        )}

        {!item.dueDate && (!prevTask || prevTaskDate) && (
          <DmView style={{ backgroundColor: colors.FAUX_GHOST }} paddingY={15}>
            <DmText marginLeft={25} fontSize={12} fontWeight="500">
              {i18n.t('inbox_tasks')}
            </DmText>
          </DmView>
        )}

        <TaskItem
          item={item}
          // onLongPressTask={() => setEditing(false)}
          onTaskPress={() => handleTaskPress(item)}
          isHasBorderBottom={nextTaskDueDate === item.dueDate}
          onDeletePress={() => handleDeleteInboxPress(item)}
          onEditPress={() => handleEditInboxPress(item)}
          onFinishTask={() => handleFinishTask(item)}
          onPausePress={handlePausePress}
          onStartTask={() => handleStartTask(item)}
          isShowPrev
        />
      </View>
    )
  }

  return (
    <>
      <SafeAreaView
        style={[layoutStyles.safeAreaView]}
        edges={['left', 'right', 'top']}
      >
        <Header text={i18n.t('inbox')} isBackHiden={true} />
        <DmView height={10} />
        <DmView
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
          paddingLeft={12}
          paddingRight={20}
        >
          <DmView onPress={handleProjectPicker} flex={0.5}>
            {tasks?.length > 0 && (
              <ProjectPicker
                projects={watch('tags') || []}
                onPress={handleProjectPicker}
              />
            )}
          </DmView>
          {tasks?.length > 0 && (
            <DmView
              onPress={() => setShowUncompleted(!showUncompleted)}
              flexDirection="row"
              alignItems="center"
              flex={0.5}
              justifyContent="flex-end"
            >
              <Icon
                name={showUncompleted ? 'eye' : 'eye-off'}
                size={15}
                color="grey"
              />
              <DmText fontWeight="500" fontSize={14} marginLeft={5}>
                {i18n.t('uncompleted')} ({uncompletedCount})
              </DmText>
            </DmView>
          )}
        </DmView>

        <View style={[layoutStyles.dashBoardContainer, spacingStyles.mT15]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredTasks}
            keyExtractor={(item) => String(item._id)}
            renderItem={renderTask}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{i18n.t('addInbox')}</Text>
              </View>
            )}
            ListFooterComponent={() => {
              if (showUncompleted && uncompletedCount === 0) {
                return (
                  <DmView
                    style={{ backgroundColor: colors.FAUX_GHOST }}
                    paddingY={15}
                  >
                    <DmText
                      marginLeft={25}
                      fontSize={12}
                      fontWeight="500"
                      color={colors.LIGHT_RED}
                    >
                      {i18n.t('uncompleted_tasks')}
                    </DmText>
                  </DmView>
                )
              }

              return null
            }}
          />
        </View>
        <TagsPicker
          isInbox
          isVisible={state.projectPickerVisible}
          onSelect={handleProjectSelect}
          onClose={() =>
            updateState({
              projectPickerVisible: false,
            })
          }
        />

        <AddButton onPress={handleRightPress} />
      </SafeAreaView>
    </>
  )
}

export default InboxScreen
