import React, { useMemo } from 'react'

// Components
import { Text, TouchableOpacityProps, ViewProps } from 'react-native'
import DmView from './DmView'

// Styles
import { stylesActionBtn } from './styled.components'

interface Props extends TouchableOpacityProps, ViewProps {
  title?: string
  wrapperStyle?: object
  textStyle?: object
  onPress?: () => void
}

const ActionBtn: React.FC<Props> = ({
  title,
  wrapperStyle,
  textStyle,
  onPress,
}) => {
  return (
    <DmView style={[stylesActionBtn.wrapper, wrapperStyle]} onPress={onPress}>
      <Text style={[stylesActionBtn.text, textStyle]}>{title}</Text>
    </DmView>
  )
}

export default ActionBtn
