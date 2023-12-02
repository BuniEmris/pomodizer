import React from 'react'
import { TextInputProps, TextStyle, ViewStyle, Text } from 'react-native'
import styles from './styles'

interface Props extends TextInputProps {
  style?: TextStyle | TextStyle[]
  fontSize?: number
  color?: string
}

const Title: React.FC<Props> = ({
  style,
  fontSize,
  color,
  children,
  ...restProps
}) => {
  return (
    <Text
      style={[styles.text, { fontSize, color }, style && style]}
      {...restProps}
    >
      {children}
    </Text>
  )
}

export default Title
