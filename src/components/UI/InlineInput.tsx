import React from 'react'

// Components
import { TextInputProps } from 'react-native'

// Styles
import {
  BodyFontWeight,
  getBodyFontByFontWeight,
} from 'styles/typographyHelpers'
import { colors } from 'styles'
import * as S from './styled.components'

interface Props extends TextInputProps {
  fontSize?: number
  color?: string
  lineHeight?: number
  minHeight?: number
  fontWeight?: BodyFontWeight
}

const InlineInput: React.FC<Props> = ({
  fontSize = 16,
  color = colors.DARK_GREY,
  fontWeight = '400',
  lineHeight,
  minHeight,
  style,
  ...restProps
}) => {
  return (
    <S.InlineTextInput
      style={[
        style,
        {
          fontSize,
          color,
          fontWeight,
          lineHeight,
          minHeight,

          ...getBodyFontByFontWeight(fontWeight),
        },
      ]}
      {...restProps}
    />
  )
}

export default InlineInput
