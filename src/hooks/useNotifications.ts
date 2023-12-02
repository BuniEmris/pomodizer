import { useEffect, useRef, useState } from 'react'
import notifee, {
  TimestampTrigger,
  TriggerType,
  EventType,
  Notification,
  AndroidImportance,
} from '@notifee/react-native'

import messaging from '@react-native-firebase/messaging'
import { openUrl } from 'utils/linking'
import i18n from 'locales/i18n'
import logger from 'utils/logger'

const DEFAULT_CHANNEL_ID = 'default'

// notifee.onBackgroundEvent(async ({ type, detail }) => {
//   const { notification, pressAction } = detail
//   console.log('notification', notification)
//   console.log('pressAction', pressAction)
// })

const useNotifications = () => {
  const lastOpenId = useRef<number | string>()

  const notificationDataHandler = (data: any) => {
    // logger.log('notificationDataHandler', data)
    if (!data) {
      return
    }

    if (data?.link) {
      openUrl(data.link)
    }
  }

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const permissionResp = await notifee.requestPermission()
        // console.log('permissionResp', permissionResp)
      } catch (e) {
        logger.error('PermissionErr', e)
      }
    }
    setTimeout(() => {
      checkPermissions()
    }, 1000 * 30)
  }, [])

  useEffect(() => {
    const createDefaultChannel = async () => {
      try {
        await notifee.createChannel({
          id: DEFAULT_CHANNEL_ID,
          name: 'Default Channel',
          importance: AndroidImportance.HIGH,
          sound: 'push',
        })
      } catch (e) {
        logger.error('Create default channel e', e)
      }
    }

    createDefaultChannel()
  }, [])

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          logger.log('User dismissed notification', detail.notification)
          break
        case EventType.PRESS:
        case EventType.ACTION_PRESS:
          logger.log('User pressed notification', detail.notification)
          notificationDataHandler(detail.notification?.data)
          break
      }
    })
  }, [])

  useEffect(() => {
    const onReceivedFirebaseMessage = async (message: any) => {
      logger.log('recived F message', message)
      const notification = message?.notification || {}
      notification.data = message.data
      displayNotification(notification)
    }
    const onReceivedFirebaseMessageBG = async (message: any) => {
      logger.log('onReceivedFirebaseMessageBG ', message)
      notificationDataHandler(message?.data)
    }

    const unsubscribe = messaging().onMessage(onReceivedFirebaseMessage)
    messaging().onNotificationOpenedApp(onReceivedFirebaseMessageBG)

    return () => unsubscribe()
  }, [])

  const displayNotification = async (
    notificationInfo: Partial<Notification>
  ) => {
    // console.log('notificationInfo', notificationInfo)

    if (notificationInfo?.id && notificationInfo.id === lastOpenId.current) {
      return
    }

    try {
      const notification = notificationInfo

      if (!notification?.android?.channelId) {
        notification.android = {
          channelId: DEFAULT_CHANNEL_ID,
          smallIcon: 'ic_notification',
        }
      }

      if (!notification.android.importance) {
        notification.android.importance = AndroidImportance.HIGH
      }

      if (!notification.android.sound) {
        notification.android.sound = 'push'
      }

      if (notificationInfo.id) {
        lastOpenId.current = notificationInfo.id
      }

      if (notification.ios) {
        notification.ios.sound = 'push.wav'
      } else {
        notification.ios = {
          sound: 'push.wav',
        }
      }

      await notifee.displayNotification(notification)
    } catch (e) {
      logger.error('show notification', e)
    }
  }

  const sendTestNotification = () =>
    displayNotification({
      title: 'Test title',
      body: 'Test body',
      data: {
        link: 'pomodizer://tasks/62d855a92c214e26afa81df2',
      },
    })

  return { displayNotification, sendTestNotification }
}

export default useNotifications
