import React, { useState } from 'react'
// Components
import { Text, View, ViewStyle } from 'react-native'
// import { Switch } from 'react-native-switch'

// Styles
import { colors, positionStyles, spacingStyles } from 'styles'
import styles from './styles'

interface Props {
  style?: ViewStyle | ViewStyle[]
  value?: boolean
  onValueChange?: (value: boolean) => void
  label?: string
}

const ToogleSwitch: React.FC<Props> = ({
  style,
  label,
  value,
  onValueChange,
}) => {
  return (
    <View style={[positionStyles.rowStart, style]}>
      <Switch
        value={value}
        onValueChange={(val) => onValueChange(val)}
        backgroundInactive={colors.LIGHT_GREY}
        backgroundActive={colors.LIME}
        activeText=""
        inActiveText=""
        circleBorderWidth={0}
        circleSize={20}
        switchWidthMultiplier={2.3}
        barHeight={26}
        switchBorderRadius={25}
        switchLeftPx={3}
        switchRightPx={3}
      />
      <Text style={[styles.labelText, spacingStyles.mL13]}>{label}</Text>
    </View>
  )
}

export default ToogleSwitch
