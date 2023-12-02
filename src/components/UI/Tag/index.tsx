import React from 'react'
// Components
import {
  ViewStyle,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

// Styles
import styles from './styles'

interface Props extends TouchableOpacityProps {
  style?: ViewStyle | ViewStyle[]
  text?: string
}

const Tag: React.FC<Props> = ({ style, text, ...restProps }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Tag
