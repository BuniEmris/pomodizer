import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  useEffect(() => {
    const onKeyboardShow = (e: any) => {
      setKeyboardHeight(e.endCoordinates.height)
    }
    const onKeyboardHide = (e: any) => {
      setKeyboardHeight(0)
    }

    const keyboardShow = Keyboard.addListener('keyboardDidShow', onKeyboardShow)
    const keyboardHide = Keyboard.addListener('keyboardDidHide', onKeyboardHide)

    return () => {
      keyboardShow.remove()
      keyboardHide.remove()
    }
  }, [])

  return { keyboardHeight, isHidden: keyboardHeight === 0 }
}

export default useKeyboardHeight
