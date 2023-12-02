/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { Text, TextStyle, StyleProp, TextProps } from 'react-native'

import {
  getBodyFontByFontWeight,
  BodyFontWeight,
} from 'styles/typographyHelpers'
import { colors } from 'styles'

export interface BodyTextProps extends TextProps, TextStyle {
  fontSize?: number
  color?: string
  style?: StyleProp<TextStyle>
  center?: boolean
  lineHeight?: number
  fontWeight?: BodyFontWeight
}

const BodyText: React.FC<BodyTextProps> = ({
  fontSize = 16,
  color = colors.DARK_GREY,
  children,
  fontWeight = '400',
  lineHeight,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  opacity,
  center,
  textAlign,
  textTransform,
  style,
  maxFontSizeMultiplier,
  ...restProps
}) => (
  <Text
    style={[
      {
        fontSize,
        color,
        lineHeight,
        marginTop,
        marginLeft,
        marginRight,
        marginBottom,
        opacity,
        textTransform,
        textAlign: textAlign || (center ? 'center' : 'left'),
        ...getBodyFontByFontWeight(fontWeight),
      },
      style,
    ]}
    maxFontSizeMultiplier={maxFontSizeMultiplier || (fontSize < 20 ? 2 : 1.5)}
    {...restProps}
  >
    {children}
  </Text>
)

export default BodyText
