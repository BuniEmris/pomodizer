/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
// Components
import { View, StatusBar, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel from 'react-native-snap-carousel'
import TaskItem from './TaskItem'
import TaskItemDrag from 'components/TaskItem'
import CarouselItem, { CarouselContent } from './Carouseltem'
import DmView from 'components/UI/DmView'
import StatsItem from './StatsItem'
import moment from 'moment'
import 'moment/min/locales'
import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist'
import Modal from 'react-native-modal'

// Libs & Utils
import navigationService from 'navigation/navigationService'

// Helpers
import { HIT_SLOT_DEFAULT, isAndroid, SCREEN_WIDTH } from 'styles/helpers'
import { Task } from 'types'
import {
  apiDateToCalendar,
  calendarDateToCalendar,
  getTodayCalendar,
} from 'utils/date'

// Hooks & Store
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from 'store'
import { getTasksForColumn } from 'store/tasks/selectors'
import { pauseTimer, startTaskTimer } from 'store/timer/thunkActions'
import {
  finishTask,
  removeTask,
  syncLastTasks,
  updateTasksPositions,
} from 'store/tasks/thunkActions'
import useAppState from 'hooks/useAppState'
import usePremium from 'hooks/usePremium'
import useSyncWidgetData from 'hooks/useSyncWidgetData'
import NetInfo, { useNetInfo } from '@react-native-community/netinfo'
import { syncLocalDataWithApi } from 'store/auth/thunkActions'

// Assets & Styles
import DownArrow from 'assets/images/icons/calendarDown.svg'
import styles from './styles'
import layoutStyles from 'styles/layoutStyles'
import { colors, positionStyles, spacingStyles } from 'styles'
import i18n from 'locales/i18n'
import { DmText } from 'components/UI'
import CalendarModal from 'components/CalendarModal'
import { setCalendarDayThunk } from 'store/tasks/thunkActions'
import {
  CalendarProvider,
  DateData,
  ExpandableCalendar,
  LocaleConfig,
} from 'react-native-calendars'
import { flexDirection, overflowY } from 'styled-system'
import { expandedCalendarTheme } from 'styles/calendarTheme'
// import { localeRu, localeUkr, localeUz } from 'styles/CalendarLocales'
import useAppUserInfo from 'hooks/useAppUserInfo'
import useNotifications from 'hooks/useNotifications'
import AddButton from 'components/AddButton/AddButton'
import ProIcon from 'assets/images/icons/proIcon.svg'
import Icon from 'react-native-vector-icons/Feather'
import useTrackingTransparency from 'hooks/useTrackingTransparency'
import Crown from 'assets/images/icons/crown.svg'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Arrow from 'assets/images/icons/play.svg'
import logger from 'utils/logger'

const MainScreen = () => {
  // Props
  // State
  const [showCalendarModal, setShowCalendarModal] = useState(false)

  const today = moment()

  const todayFormatted = moment(today).format('YYYY-MM-DD')
  const isFocused = useIsFocused()

  // Global store
  const { calendarDay } = useTypedSelector(
    (store) => store.tasks.calendarDayTask
  )
  const tasks = useTypedSelector((state) =>
    getTasksForColumn(state, calendarDay)
  )

  const { taskId: activeTaskId, isPaused } = useTypedSelector(
    (state) => state.timer
  )

  const { isPremium } = usePremium()

  useAppState({
    onForeground: () => {
      dispatch(syncLastTasks())
    },
  })

  useAppUserInfo()

  useNotifications()

  useTrackingTransparency()

  const netInfo = useNetInfo()

  // Variables
  const statsInfo = useMemo(() => {
    const tomatoSpend = tasks.reduce(
      (acc, item) => {
        acc.tomatoFact += item.tomatoFact
        acc.tomatoPlan += item.tomatoPlan || 0
        return acc
      },
      { tomatoFact: 0, tomatoPlan: 0 }
    )

    const completedTask = tasks.filter((item) => item.status === 'done').length

    return {
      ...tomatoSpend,
      completedTask,
      allTasks: tasks.length,
    }
  }, [tasks])

  // Refs
  const dateStripRef = useRef<any>(null)

  // Hooks
  const dispatch = useDispatch()

  // Methods

  // Handlers
  const handleTaskPress = (item: Task) => {
    navigationService.navigate('Home', {
      screen: 'Home_Task',
      params: {
        taskId: item._id,
        back: { rootRoutes: 'Home', screen: 'Home_Main' },
      },
    })
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
  const handlePausePress = () => {
    dispatch(pauseTimer())
  }

  const handleStartTask = (task: Task) => {
    dispatch(startTaskTimer(task._id))
  }

  const handleTodayPress = () => {
    dateStripRef.current?.onTodayPress()
  }

  const handleDateChange = (date: any) => {
    dispatch(setCalendarDayThunk(calendarDateToCalendar(date)))
  }

  const handleDateChangeCalendar = (date: string) => {
    dateStripRef?.current?.onSelectedPress(date)
    dispatch(setCalendarDayThunk(calendarDateToCalendar(date)))
    setShowCalendarModal(false)
  }

  const handleFinishTask = (task: Task) => {
    dispatch(finishTask(task))
  }

  const handleTasksPosition = (taskList: Task[]) => {
    dispatch(updateTasksPositions(taskList))
  }

  const handleProPress = () => {
    if (!isPremium) {
      navigationService.navigate('Premium')
    } else {
      navigationService.navigate('Profile', {
        screen: 'Statistics',
      })
    }
  }

  const handleCreateTask = () => {
    navigationService.navigate('Home', {
      screen: 'Task_Create',
      params: {
        back: { rootRoutes: 'Home', screen: 'Home_Main' },
        dueDate: apiDateToCalendar(calendarDay)
          ? new Date(apiDateToCalendar(calendarDay)).toISOString()
          : new Date().toISOString(),
      },
    })
  }

  // Listeners

  useSyncWidgetData()
  useEffect(() => {
    if (isFocused) {
      isAndroid && StatusBar.setBackgroundColor('white')
      StatusBar.setBarStyle('dark-content')
    }
  }, [isFocused])

  useEffect(() => {
    dispatch(setCalendarDayThunk(calendarDateToCalendar(getTodayCalendar())))
  }, [])

  useEffect(() => {
    const unsubscribeNetIfo = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        dispatch(syncLocalDataWithApi())
      }
    })

    return unsubscribeNetIfo()
  }, [])

  const handleOnStop = () => {
    handleCreateTask()
  }

  const renderDragItem = ({ item, drag, isActive }: RenderItemParams<Task>) => {
    return (
      <ScaleDecorator>
        <ShadowDecorator>
          <TaskItem
            onLongPress={drag}
            item={item}
            isActive={item._id === activeTaskId}
            isPaused={isPaused}
            onPausePress={handlePausePress}
            onStartTask={() => handleStartTask(item)}
            onTaskPress={() => handleTaskPress(item)}
            onFinishTask={() => handleFinishTask(item)}
            onDeletePress={() => handleDeleteTaskPress(item)}
            onEditPress={() => handleEditTaskPress(item)}
          />
        </ShadowDecorator>
      </ScaleDecorator>
    )
  }

  const renderText = () => {
    if (apiDateToCalendar(calendarDay) != todayFormatted) {
      return (
        <DmView
          flexDirection={
            apiDateToCalendar(calendarDay) > todayFormatted
              ? 'row-reverse'
              : 'row'
          }
          alignItems="center"
          onPress={handleTodayPress}
        >
          <DmText style={styles.todayBtnStyle}>{i18n.t('today')}</DmText>
          <DmView
            style={
              apiDateToCalendar(calendarDay) > todayFormatted
                ? styles.prevArrow
                : styles.nextArrow
            }
          >
            <Arrow />
          </DmView>
        </DmView>
      )
    }
    return null
  }

  return (
    <SafeAreaView
      style={[layoutStyles.safeAreaView]}
      edges={['right', 'top', 'left']}
      testID="dashboard_screen"
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <DmView style={[styles.header, positionStyles.rowFill]}>
        <StatsItem label={i18n.t('alltasks')} value={statsInfo.allTasks} />
        <StatsItem
          label={i18n.t('completedtask')}
          value={statsInfo.completedTask}
        />
        <StatsItem label={i18n.t('tomatoes')} value={statsInfo.tomatoFact} />
        <TouchableOpacity style={styles.proIcon} onPress={handleProPress}>
          <ProIcon />
        </TouchableOpacity>
      </DmView>
      <View style={styles.calendarStyle}>
        <DmView marginBottom={40} height={100}>
          <CalendarProvider
            ref={dateStripRef}
            date={getTodayCalendar()}
            onDateChanged={handleDateChange}
            theme={expandedCalendarTheme}
          >
            <ExpandableCalendar
              firstDay={1}
              hideArrows
              hideKnob
              theme={expandedCalendarTheme}
              renderHeader={() => (
                <DmView style={styles.calendarHeaderContainer}>
                  <DmView
                    onPress={() => {
                      setShowCalendarModal(true)
                    }}
                    style={styles.calendarHeaderName}
                  >
                    <DmText style={styles.monthTextHeader}>
                      {moment(apiDateToCalendar(calendarDay)).format('MMMM')}{' '}
                      <DmText style={styles.calendarMainText}>
                        {moment(apiDateToCalendar(calendarDay)).format(
                          'DD/YYYY'
                        )}{' '}
                      </DmText>
                    </DmText>
                    <DownArrow />
                  </DmView>

                  {renderText()}
                </DmView>
              )}
              allowShadow={false}
              disablePan
            />
          </CalendarProvider>
        </DmView>
      </View>
      {/* <Animated.ScrollView
        onLayout={(e) => {
          setContentHeight(e.nativeEvent.layout.height)
          setContentPosition(e.nativeEvent.layout.y)
        }}
        ref={scrollViewRef}
        scrollEventThrottle={1}
        bounces={false}
        contentContainerStyle={[
          styles.contentContainerStyleAnimatedFlatList,
          {
            minHeight: 360,
            height: tasks.length * 127 + 130,
          },
        ]}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
      >
        {(tasks.length ? tasks : ['empty']).map((item, index) => {
          return (
            <RenderItems
              key={String(item._id) + String(index)}
              {...{ item, index }}
            />
          )
        })}
      </Animated.ScrollView> */}
      <DraggableFlatList
        data={tasks}
        onDragEnd={({ data }) => handleTasksPosition(data)}
        keyExtractor={(item) => item._id}
        renderItem={renderDragItem}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{i18n.t('notask')}</Text>
          </View>
        )}
        ListFooterComponent={<DmView height={220} width={100} />}
      />
      <CalendarModal
        isVisible={showCalendarModal}
        getToday={getTodayCalendar()}
        handleDateChange={handleDateChangeCalendar}
        onClose={() => setShowCalendarModal(false)}
      />
      <AddButton
        onPress={() => {
          handleCreateTask()
        }}
      />
    </SafeAreaView>
  )
}

export default MainScreen
