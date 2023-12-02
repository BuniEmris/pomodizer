import { useState, useEffect } from 'react'
import { AppState, AppStateStatus } from 'react-native'

export interface AppStateHookSettings {
  onChange?: (status: AppStateStatus) => void
  onForeground?: () => void
  onBackground?: () => void
}

export default function useAppState(settings: AppStateHookSettings) {
  const { currentState } = AppState
  const { onChange, onForeground, onBackground } = settings || {}
  const [curAppState, setAppState] = useState<AppStateStatus>(currentState)

  function handleAppStateChange(nextAppState: AppStateStatus) {
    if (nextAppState === 'active' && curAppState !== 'active') {
      onForeground && onForeground()
    } else if (
      curAppState === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      onBackground && onBackground()
    }
    setAppState(nextAppState)
    onChange && onChange(nextAppState)
  }

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    )

    return () => {
      // @ts-expect-error - React Native >= 0.65
      if (typeof subscription?.remove === 'function') {
        // @ts-expect-error - need update @types/react-native@0.65.x
        subscription.remove()
      } else {
        // React Native < 0.65
        AppState.removeEventListener('change', handleAppStateChange)
      }
    }
  }, [onChange, onForeground, onBackground])

  return curAppState
}
