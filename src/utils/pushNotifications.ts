import notifee, {
  TimestampTrigger,
  TriggerType,
  EventType,
  Notification,
  AndroidImportance,
} from '@notifee/react-native'
import i18n from 'locales/i18n'
import { Task } from 'types'
import logger from './logger'

const DEFAULT_CHANNEL_ID = 'default'

const createFinishTimerNotification = async (
  pomodoroTimeLength: number,
  taskId: string
) => {
  const timeFinish = Date.now() + pomodoroTimeLength * 1000 + 2 * 1000
  try {
    const notificationId = await notifee.createTriggerNotification(
      {
        title: i18n.t('pomodoro_has_finished'),
        data: {
          link: 'pomodizer://timer',
          type: 'timer',
          taskId,
        },
        android: {
          channelId: DEFAULT_CHANNEL_ID,
          importance: AndroidImportance.HIGH,
        },
        ios: {
          sound: 'default',
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: timeFinish,
      }
    )
    logger.log('notification', notificationId)
    return notificationId
  } catch (e) {
    logger.error('createFinishTimerNotification', e)
  }
}

const createFinishPauseNotification = async (
  breakLength: number,
  taskId: string
) => {
  const breakNotificationFinishTime = Date.now() + breakLength * 1000 + 2 * 1000

  try {
    const notificationId = await notifee.createTriggerNotification(
      {
        title: i18n.t('break_has_ended'),
        data: {
          link: 'pomodizer://timer',
          type: 'timer',
          taskId,
        },
        android: {
          channelId: DEFAULT_CHANNEL_ID,
          importance: AndroidImportance.HIGH,
        },
        ios: {
          sound: 'default',
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: breakNotificationFinishTime,
      }
    )
    logger.log('notification', notificationId)
    return notificationId
  } catch (e) {
    logger.error('createFinishTimerNotification', e)
  }
}

export { createFinishTimerNotification, createFinishPauseNotification, notifee }
