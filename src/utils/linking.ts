import { Linking } from 'react-native'
import logger from './logger'

import config from 'config'
import { isIOs } from 'styles/helpers'

export const openUrl = async (url: string) => {
  try {
    await Linking.openURL(url)
  } catch (e) {
    logger.log('Open url error', e)
  }
}

export const goToAppMarket = async () => {
  await openUrl(isIOs ? config.IOS_APP_LINK : config.ANDROID_APP_LINK)
}

export const openPrivacyAndTerms = (type: 'privacy' | 'terms') => {
  openUrl(type === 'privacy' ? config.PRIVACY_LINK : config.TERMS_LINK)
}
