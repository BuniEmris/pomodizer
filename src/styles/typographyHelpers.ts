import { TextStyle } from 'react-native'

import * as FONTS from './fontFamily'

// Bold
export const bodyBold: TextStyle = {
  fontFamily: FONTS.IBMPlexSans_Bold,
}

export const bodyB12: TextStyle = {
  fontSize: 12,
  fontFamily: FONTS.IBMPlexSans_Bold,
}
export const bodyB13: TextStyle = {
  fontSize: 13,
  fontFamily: FONTS.IBMPlexSans_Bold,
}

export const bodyB14: TextStyle = {
  fontSize: 14,
  fontFamily: FONTS.IBMPlexSans_Bold,
}
export const bodyB15: TextStyle = {
  fontSize: 15,
  fontFamily: FONTS.IBMPlexSans_Bold,
}
export const bodyB16: TextStyle = {
  fontSize: 16,
  fontFamily: FONTS.IBMPlexSans_Bold,
}
export const bodyB22: TextStyle = {
  fontSize: 22,
  fontFamily: FONTS.IBMPlexSans_Bold,
}

export const bodyB23: TextStyle = {
  fontSize: 23,
  fontFamily: FONTS.IBMPlexSans_Bold,
}

// Medium
export const bodyMedium: TextStyle = {
  fontFamily: FONTS.IBMPlexSans_Medium,
}

export const bodyM11: TextStyle = {
  fontSize: 11,
  fontFamily: FONTS.IBMPlexSans_Medium,
}
export const bodyM12: TextStyle = {
  fontSize: 12,
  fontFamily: FONTS.IBMPlexSans_Medium,
}

export const bodyM13: TextStyle = {
  fontSize: 13,
  fontFamily: FONTS.IBMPlexSans_Medium,
}
export const bodyM14: TextStyle = {
  fontSize: 14,
  fontFamily: FONTS.IBMPlexSans_Medium,
}

export const bodyM16: TextStyle = {
  fontSize: 16,
  fontFamily: FONTS.IBMPlexSans_Medium,
}

export const bodyM17: TextStyle = {
  fontSize: 17,
  fontFamily: FONTS.IBMPlexSans_Medium,
}

export const bodyM18: TextStyle = {
  fontSize: 18,
  fontFamily: FONTS.IBMPlexSans_Medium,
}

export const bodyM24: TextStyle = {
  fontSize: 24,
  fontFamily: FONTS.IBMPlexSans_Medium,
}

export const bodyM48: TextStyle = {
  fontSize: 48,
  fontFamily: FONTS.IBMPlexSans_Medium,
}

// Regular
export const bodyRegular: TextStyle = {
  fontFamily: FONTS.IBMPlexSans_Regular,
}

export const bodyR11: TextStyle = {
  fontSize: 11,
  fontFamily: FONTS.IBMPlexSans_Regular,
}
export const bodyR12: TextStyle = {
  fontSize: 12,
  fontFamily: FONTS.IBMPlexSans_Regular,
}
export const bodyR13: TextStyle = {
  fontSize: 13,
  fontFamily: FONTS.IBMPlexSans_Regular,
}

export const bodyR14: TextStyle = {
  fontSize: 14,
  fontFamily: FONTS.IBMPlexSans_Regular,
}

export const bodyR16: TextStyle = {
  fontSize: 16,
  fontFamily: FONTS.IBMPlexSans_Regular,
}
export const bodyR17: TextStyle = {
  fontSize: 17,
  fontFamily: FONTS.IBMPlexSans_Regular,
}

export const bodyR18: TextStyle = {
  fontSize: 18,
  fontFamily: FONTS.IBMPlexSans_Regular,
}

// SemiBold
export const bodySemiBold: TextStyle = {
  fontFamily: FONTS.IBMPlexSans_SemiBold,
}

export const bodySB14: TextStyle = {
  fontSize: 14,
  fontFamily: FONTS.IBMPlexSans_SemiBold,
}

export const bodySB16: TextStyle = {
  fontSize: 16,
  fontFamily: FONTS.IBMPlexSans_SemiBold,
}
export const bodySB20: TextStyle = {
  fontSize: 20,
  fontFamily: FONTS.IBMPlexSans_SemiBold,
}
export const bodySB26: TextStyle = {
  fontSize: 26,
  fontFamily: FONTS.IBMPlexSans_SemiBold,
}
export const bodySB35: TextStyle = {
  fontSize: 25,
  fontFamily: FONTS.IBMPlexSans_SemiBold,
}
export const bodySB40: TextStyle = {
  fontSize: 40,
  fontFamily: FONTS.IBMPlexSans_SemiBold,
}
export const bodySB48: TextStyle = {
  fontSize: 48,
  fontFamily: FONTS.IBMPlexSans_SemiBold,
}

export const bodyLight: TextStyle = {
  fontFamily: FONTS.IBMPlexSans_Light,
}

export type BodyFontWeight = '300' | '400' | '500' | '600' | '700'

export const getBodyFontByFontWeight = (
  fontWeight: BodyFontWeight
): TextStyle => {
  switch (fontWeight) {
    case '300':
      return bodyLight
    case '400':
      return bodyRegular
    case '500':
      return bodyMedium
    case '600':
      return bodySemiBold
    case '700':
      return bodyBold
    default:
      return bodyRegular
  }
}
