import { Alert } from 'react-native'
import Sound from 'react-native-sound'
import { isAndroid } from 'styles/helpers'

Sound.setCategory('Playback')

export const androidPathPlay = 'start_timer.mp3'
export const iosPathPlay = 'start_timer.wav'

export const androidPathLong = 'long_timer_finish.mp3'
export const iosPathLong = 'long_timer_finish.wav'

export const androidPathFinish = 'pause_finish.mp3'
export const iosPathFinish = 'pause_finish.wav'

export const PlaySound = (numberOfLoop = 0) => {
  Sound.setCategory('Playback')

  const startSound = new Sound(
    isAndroid ? androidPathPlay : iosPathPlay,
    Sound.MAIN_BUNDLE,
    (error) => {
      if (error) {
        Alert.alert(error)
        return
      }
      startSound.setVolume(3)
      startSound.setNumberOfLoops(numberOfLoop)
      startSound.play((success) => {
        // console.log('play', success)
      })

      // when loaded successfully
    }
  )

  return startSound
}

export const PlayAfterLongSound = () => {
  Sound.setCategory('Playback')
  const longTimer = new Sound(
    isAndroid ? androidPathLong : iosPathLong,
    Sound.MAIN_BUNDLE,
    (error) => {
      if (error) {
        Alert.alert(error)
        return
      }
      longTimer.setVolume(3)
      longTimer.play((success) => {
        // console.log('playLong', success)
      })
    }
  )
}

export const AfterFinishSound = () => {
  Sound.setCategory('Playback')

  const pauseFinish = new Sound(
    isAndroid ? androidPathFinish : iosPathFinish,

    Sound.MAIN_BUNDLE,
    (error) => {
      if (error) {
        Alert.alert(error)
        return
      }
      pauseFinish.setVolume(3)
      pauseFinish.play((success) => {
        // console.log('playFinish', success)
      })
    }
  )
}
