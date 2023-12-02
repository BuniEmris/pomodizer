import { isAndroid } from './helpers'

export const IBMPlexSans_Light = 'IBMPlexSans-Light'
export const IBMPlexSans_Medium = 'IBMPlexSans-Medium'
export const IBMPlexSans_Bold = 'IBMPlexSans-SemiBold'
export const IBMPlexSans_Regular = isAndroid
  ? 'IBMPlexSans-Regular'
  : 'IBMPlexSans' // @TODO check in android
export const IBMPlexSans_SemiBold = 'IBMPlexSans-SemiBold' // @TODO check in android
