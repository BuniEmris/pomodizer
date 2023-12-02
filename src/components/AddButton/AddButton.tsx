import React, { useEffect } from 'react'
import { DmText } from 'components/UI'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native'
import { WHITE } from 'styles/colors'

import styles from './styles'
import { HIT_SLOT_DEFAULT } from 'styles/helpers'

type propsType = {
  onPress?: () => void
  right?: boolean
}
const AddButton: React.FC<propsType> = ({ onPress, right = true }) => {
  const scale = useSharedValue(0)

  useEffect(() => {
    scale.value = withTiming(1, {
      easing: Easing.bounce,
      duration: 2050,
    })
  }, [])

  const addButtonStyle = useAnimatedStyle(() => ({
    [right ? 'right' : 'left']: 20,
    transform: [
      {
        scale: scale.value,
      },
    ],
  }))
  return (
    <Animated.View style={[styles.inboxAdd, addButtonStyle]}>
      <TouchableOpacity onPress={onPress} hitSlop={HIT_SLOT_DEFAULT}>
        <DmText color={WHITE} fontSize={40} lineHeight={47} fontWeight="300">
          +
        </DmText>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default AddButton
