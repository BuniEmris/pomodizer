import { Dimensions, Platform, StatusBar } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

const HIT_SLOT_DEFAULT = {
  top: 20,
  left: 20,
  bottom: 20,
  right: 20,
}

const isAndroid = Platform.OS === 'android'
const isIOs = Platform.OS === 'ios'

const isLargeDevice = SCREEN_WIDTH >= 400
const isSmallDevice = SCREEN_WIDTH <= 375
const isVSmallDevice = SCREEN_WIDTH <= 400
const isSmallHeight = SCREEN_HEIGHT <= 700
const isMaxHeight = SCREEN_HEIGHT >= 850
const bottomMenuHeight = getBottomSpace() + 50
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0

const responsiveHeight = Number(SCREEN_HEIGHT * 0.1231) / 100
export {
  STATUS_BAR_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  HIT_SLOT_DEFAULT,
  isSmallDevice,
  isVSmallDevice,
  isIOs,
  isAndroid,
  isSmallHeight,
  isLargeDevice,
  isMaxHeight,
  bottomMenuHeight,
  responsiveHeight,
}
