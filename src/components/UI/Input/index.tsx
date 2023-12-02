import React, { ReactNode } from 'react'
// Components
import {
  TextInputProps,
  TextInput,
  TextStyle,
  ViewStyle,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

// Styles
import { colors } from 'styles'
import styles from './styles'

interface Props extends TextInputProps {
  style?: ViewStyle | ViewStyle[] | TextStyle
  placeholderTextColor?: string
  error?: boolean
  rightIcon?: ReactNode
  isMultiline?: boolean
  onRightIconPress?: () => void
  ref?: any
}

const Input: React.FC<Props> = ({
  style,
  placeholderTextColor,
  error,
  rightIcon,
  onRightIconPress,
  isMultiline,
  ref,
  ...restProps
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isMultiline && styles.multilineContainer,
        error && { borderColor: colors.LIGHT_RED },
        style,
      ]}
      onPress={onRightIconPress}
      activeOpacity={0.9}
      disabled={!onRightIconPress}
    >
      {!onRightIconPress && (
        <TextInput
          ref={ref}
          placeholderTextColor={colors.LIGHT_GREY}
          multiline={isMultiline}
          style={[styles.text, isMultiline && styles.multilineText]}
          {...restProps}
        />
      )}
      {onRightIconPress && (
        <Text
          style={[
            styles.text,
            !restProps.value && { color: colors.LIGHT_GREY },
            isMultiline && styles.multilineText,
          ]}
        >
          {!restProps.value && restProps.placeholder}
          {restProps.value && restProps.value}
        </Text>
      )}
      {rightIcon && (
        <TouchableOpacity style={styles.rightIcon} onPress={onRightIconPress}>
          {rightIcon}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}

export default Input
