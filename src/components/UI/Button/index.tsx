import React from 'react'
// Components
import {
  TouchableOpacity,
  ViewStyle,
  Text,
  TextStyle,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native'
import { colors } from 'styles'
import DmView from '../DmView'

// Styles & Assets
import styles from './styles'

interface Props extends TouchableOpacityProps {
  text?: string
  style?: ViewStyle | ViewStyle[]
  textStyle?: TextStyle | TextStyle[]
  backgroundColor?: string
  color?: string
  isLoading?: boolean
  green?: boolean
  Icon?: React.ComponentType<any>
  preloaderColor?: string
}

const Button: React.FC<Props> = ({
  text,
  backgroundColor,
  color,
  textStyle,
  style,
  isLoading,
  green,
  Icon,
  preloaderColor,
  ...restProps
}) => {
  return (
    <TouchableOpacity
      disabled={!!isLoading}
      activeOpacity={0.8}
      {...restProps}
      style={[
        styles.container,
        backgroundColor
          ? { backgroundColor }
          : green
          ? { backgroundColor: colors.LIME }
          : null,
        style,
      ]}
    >
      <DmView flexDirection="row" justifyContent="center" alignItems="center">
        {Icon && <Icon />}
        {isLoading && (
          <ActivityIndicator color={preloaderColor || colors.WHITE} />
        )}
        {!isLoading && (
          <Text style={[styles.text, Icon && styles.textIcon, textStyle]}>
            {text}
          </Text>
        )}
      </DmView>
    </TouchableOpacity>
  )
}

export default Button
