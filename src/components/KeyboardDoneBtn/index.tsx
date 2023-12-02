import { View, Text } from 'react-native'
import React from 'react'
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory'
import { isIOs } from 'styles/helpers'
import styles from './styles'
import useKeyboardHeight from 'hooks/useKeyboardHeight'

type Props = {
  onKeyboardDonePress?: () => void
  isDetailsScreen?: boolean
}

export default function KeyboardDoneBtn({
  onKeyboardDonePress,
  isDetailsScreen,
}: Props) {
  const { keyboardHeight, isHidden } = useKeyboardHeight()
  return (
    <KeyboardAccessoryNavigation
      alwaysVisible
      nextHidden={true}
      previousHidden={true}
      androidAdjustResize
      bumperHeight={0}
      onDone={onKeyboardDonePress}
      hideBorder
      accessoryStyle={[
        isIOs
          ? isDetailsScreen
            ? styles.iosDetailsDone
            : styles.iosDone
          : { ...styles.androidDone, top: -50 },
      ]}
    />
  )
}
