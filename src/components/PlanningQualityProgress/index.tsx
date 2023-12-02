import React from 'react'
// Components
import { ViewStyle, Text, View } from 'react-native'
import ProgressBar from 'components/ProgressBar'

// Styles & Assets
import { positionStyles, spacingStyles } from 'styles'
import styles from './styles'

interface Props {
  style?: ViewStyle | ViewStyle[]
  percent?: number
}

const PlanningQualityProgress: React.FC<Props> = ({ style, percent }) => {
  return (
    <View style={style}>
      <View style={positionStyles.rowFill}>
        <Text style={styles.planningText}>Planning quality</Text>
        <Text style={styles.percentText}>{`${percent}%`}</Text>
      </View>
      <ProgressBar style={spacingStyles.mT10} percent={percent} />
    </View>
  )
}

export default PlanningQualityProgress
