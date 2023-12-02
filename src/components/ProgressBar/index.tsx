import React from 'react'
// Components
import { ViewStyle, View } from 'react-native'

// Styles & Assets
import styles from './styles'

interface Props {
  style?: ViewStyle | ViewStyle[]
  percent?: number
}

const ProgressBar: React.FC<Props> = ({ style, percent }) => {
  return (
    <View style={style}>
      <View style={[styles.emptyBar]} />
      <View style={[styles.progressBar, { width: `${percent}%` }]} />
    </View>
  )
}

export default ProgressBar
