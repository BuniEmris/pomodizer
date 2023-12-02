import { useEffect } from 'react'

import SharedGroupPreferences from 'react-native-shared-group-preferences'
import { useTypedSelector } from 'store'
import { getTasksForColumn } from 'store/tasks/selectors'
import moment from 'moment'
import { Task } from 'types'
import logger from 'utils/logger'
import RNWidgetCenter from 'react-native-widget-center'
import { isIOS } from 'react-native-draggable-flatlist/lib/constants'

type SharedTask = {
  id: string
  title: string
  time?: string
}

const useSyncWidgetData = () => {
  const today = moment(new Date()).format('DD.MM.YYYY')

  const todayTask: Task[] = useTypedSelector((state) =>
    getTasksForColumn(state, today)
  )

  const saveUserDataToSharedStorage = async () => {
    // if (!todayTask.length) {
    //   return
    // }

    const sharedTasks: SharedTask[] = todayTask
      .filter((el) => el.status !== 'done')
      .map((el) => {
        const task: SharedTask = {
          title: el.name,
          id: el._id,
        }

        if (el.dueTime) {
          task.time = el.dueTime
        }

        return task
      })

    try {
      const appGroupIdentifier = 'group.com.oidmtruk.pomodizer'

      const tasksData = {
        tasks: sharedTasks,
        allTasks: String(todayTask.length),
        completedTasks: String(todayTask.length - sharedTasks.length),
      }

      await SharedGroupPreferences.setItem(
        'tasksData',
        tasksData,
        appGroupIdentifier
      )
    } catch (errorCode) {
      logger.error('widthget_err', errorCode)
    }

    if (isIOS) {
      RNWidgetCenter.reloadAllTimelines()
    }
  }

  useEffect(() => {
    saveUserDataToSharedStorage()
  }, [todayTask])
}

export default useSyncWidgetData
