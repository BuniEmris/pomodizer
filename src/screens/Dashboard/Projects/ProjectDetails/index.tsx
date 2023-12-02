/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef } from 'react'
// Components
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import TaskItem from 'components/TaskItem'
import FiveDaysCalendar from 'components/FiveDaysCalendar'
import Header from 'components/Header'
import Button from 'components/UI/Button'
import CustomModal from 'components/UI/CustomModal'
import DmText from 'components/UI/DmText'
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet'

// Libs $ Utils
import navigationService from 'navigation/navigationService'

// Types
import { ProjectRouteProps } from 'navigation/DashboardNavigator'
import { Task } from 'types'

// Helpers
import { HIT_SLOT_DEFAULT } from 'styles/helpers'

// Assets & Styles
import SettingsIcon from 'assets/images/icons/settings.svg'
import styles from './styles'
import layoutStyles from 'styles/layoutStyles'
import { colors, positionStyles, spacingStyles } from 'styles'
import { useTypedSelector } from 'store'
import { getTasksForTag } from 'store/tasks/selectors'
import DmView from 'components/UI/DmView'
import ProjectModalControls from './components/ProjectModalControls'
import { useDispatch } from 'react-redux'
import { patchTag, removeTag } from 'store/tags/thunkActions'
import DeleteModalDetails from 'components/UI/DeleteModalDetails'
import i18n from 'locales/i18n'
import { finishTask, removeTask } from 'store/tasks/thunkActions'
import { pauseTimer, startTaskTimer } from 'store/timer/thunkActions'
import { PlaySound } from 'utils/sounds'
import AddButton from 'components/AddButton/AddButton'
// import DeleteModalDetails from 'components/UI/DeleteModalDetails'

type Props = ProjectRouteProps

const ProjectDetailsScreen: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch()
  const [isDeleteModalsVisible, setIsDeleteModalsVisible] = useState(false)

  const menuModalRef = useRef<BottomSheetModal>(null)
  const project = route?.params?.project
  const tasks = useTypedSelector((state) => getTasksForTag(state, project?._id))
  const back = route.params?.back

  const onBack = () => {
    // if (back?.rootRoutes) {
    //   return navigationService.navigate(back?.rootRoutes, {
    //     screen: back?.screen,
    //   })
    // }

    navigationService.goBack()
  }

  const handleEdit = () => {
    menuModalRef.current?.close()
    navigationService.navigate('Projects', {
      screen: 'Project_Create',
      params: {
        isEdit: true,
        project: {
          _id: project?._id,
          color: project?.color,
          name: project?.name,
        },
      },
    })
  }

  const handleDelete = () => {
    menuModalRef.current?.close()
    setIsDeleteModalsVisible(true)
  }

  const handleArchive = async () => {
    menuModalRef.current?.close()

    await dispatch(
      patchTag(project?._id, {
        isArchived: !project?.isArchived,
      })
    )
  }

  const deleteProject = async () => {
    setIsDeleteModalsVisible(false)
    dispatch(removeTag(project?._id))
    navigationService.goBack()
  }

  const onTaskPress = (item: Task) => {
    navigationService.navigate('Home', {
      screen: 'Home_Task',
      params: {
        taskId: item._id,
      },
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

  const handleDeleteTaskPress = async (item: Task) => {
    dispatch(removeTask(item))
  }
  const handleEditTaskPress = (item: Task) => {
    navigationService.navigate('Home', {
      screen: 'Home_Task',
      params: {
        taskId: item._id,
        isEdit: true,
      },
    })
  }

  const onCreateTaskPress = () => {
    navigationService.navigate('Home', {
      screen: 'Task_Create',
      params: {
        project,
        back: {
          rootRoutes: 'Projects',
          screen: 'Project_Details',
          params: { project },
        },
      },
    })
  }
  const renderTask = ({ item, index }: { item: Task; index: number }) => {
    const prevTask = tasks[index - 1]
    const prevTaskDate = prevTask?.dueDate
    const nextTask = tasks[index + 1]
    const nextTaskDueDate = nextTask?.dueDate

    return (
      <>
        {item.dueDate && prevTaskDate !== item.dueDate && (
          <DmView style={{ backgroundColor: colors.FAUX_GHOST }} paddingY={15}>
            <DmText marginLeft={25} fontSize={12} fontWeight="500">
              {item.dueDate}
            </DmText>
          </DmView>
        )}
        {!item.dueDate && index === 0 && (
          <DmView style={{ backgroundColor: colors.FAUX_GHOST }} paddingY={15}>
            <DmText marginLeft={25} fontSize={12} fontWeight="500">
              {i18n.t('taskNoDate')}
            </DmText>
          </DmView>
        )}
        <TaskItem
          item={item}
          onTaskPress={() => onTaskPress(item)}
          onDeletePress={() => handleDeleteTaskPress(item)}
          onEditPress={() => handleEditTaskPress(item)}
          isHasBorderBottom={nextTaskDueDate === item.dueDate}
          onPausePress={handlePausePress}
          onStartTask={() => handleStartTask(item)}
          onFinishTask={() => handleFinishTask(item)}
        />
      </>
    )
  }

  return (
    <SafeAreaView
      edges={['top', 'left', 'left']}
      style={[layoutStyles.safeAreaView]}
    >
      <Header
        text={project?.name}
        rightIcon={<SettingsIcon />}
        onBack={onBack}
        onRightPress={() => menuModalRef.current?.present()}
        style={spacingStyles.pB10}
      />

      <View style={[layoutStyles.dashBoardContainer]}>
        <View style={[styles.pomidorsContainer]}>
          <FlatList
            data={tasks}
            renderItem={renderTask}
            ListFooterComponent={<View />}
          />
        </View>
      </View>
      <ProjectModalControls
        ref={menuModalRef}
        onArchive={handleArchive}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <DeleteModalDetails
        title={i18n.t('project')}
        onCancel={() => setIsDeleteModalsVisible(false)}
        onDelete={deleteProject}
        isDeleteModalsVisible={isDeleteModalsVisible}
      />
      <AddButton onPress={onCreateTaskPress} right />
    </SafeAreaView>
  )
}

export default ProjectDetailsScreen
