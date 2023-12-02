import { Linking } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import dynamicLinks from '@react-native-firebase/dynamic-links'

import {
  DASHBOARD_ROOT_ROUTES,
  HOME_ROUTES,
  PROJECT_ROUTES,
} from 'navigation/routes'
import { readDeepLink } from 'utils/firebaseDeeplink'

const config = {
  screens: {
    [DASHBOARD_ROOT_ROUTES.HOME]: {
      screens: {
        [HOME_ROUTES.HOME_MAIN]: 'dashboard',
        [HOME_ROUTES.TASK_CREATE]: 'tasks/create',
        [HOME_ROUTES.HOME_TASK]: 'tasks/:taskId',
      },
    },
    [DASHBOARD_ROOT_ROUTES.PROJECTS]: {
      screen: {
        [PROJECT_ROUTES.PROJECTS_LIST]: 'projects',
        [PROJECT_ROUTES.PROJECT_DETAILS]: 'projects/:id',
      },
    },
    [DASHBOARD_ROOT_ROUTES.INBOX]: 'inbox',
    [DASHBOARD_ROOT_ROUTES.GOALS]: 'goals',
    [DASHBOARD_ROOT_ROUTES.PROJECTS]: 'projects',
  },
}

const linking = {
  prefixes: ['pomodizer://', 'https://link.pomodizer.com'],
  async getInitialURL() {
    // First, you would need to get the initial URL from your third-party integration
    // The exact usage depend on the third-party SDK you use
    // For example, to get to get the initial URL for Firebase Dynamic Links:
    const message = await messaging().getInitialNotification()

    if (message?.data?.link) {
      return message?.data?.link
    }

    // As a fallback, you may want to do the default deep link handling

    // BRANCH IO conf
    // const lastParams = await branch.getLatestReferringParams()

    // if (lastParams?.$mobile_link) {
    //   return lastParams.$mobile_link
    // }

    const firebaseInitialUrl = await dynamicLinks().getInitialLink()
    if (firebaseInitialUrl?.url) {
      const encodedTaskUrl = readDeepLink(firebaseInitialUrl?.url)

      if (encodedTaskUrl) {
        return encodedTaskUrl
      } else {
        return firebaseInitialUrl?.url
      }
    }

    const url = await Linking.getInitialURL()

    // return 'pomodizer://tasks/62d855a92c214e26afa81df2'
    return url
  },

  // Custom function to subscribe to incoming links
  subscribe(listener: any) {
    // Listen to incoming links from Firebase Dynamic Links

    const handleFirebaseLink = (linkData: { url: string }) => {
      const encodedTaskUrl = readDeepLink(linkData.url)

      if (encodedTaskUrl) {
        listener(encodedTaskUrl)
      } else {
        listener(linkData.url)
      }
    }

    const unsubscribeFirebase = dynamicLinks().onLink(handleFirebaseLink)

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      // console.log('url', url)
      listener(url)
    })

    return () => {
      // Clean up the event listeners
      // linkingSubscription.remove()
      unsubscribeFirebase()
    }
  },
  config,
}

export default linking
