import { useEffect, useState } from 'react'
import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency'
import logger from 'utils/logger'

const useTrackingTransparency = () => {
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const trackingStatus = await getTrackingStatus()

        if (
          trackingStatus === 'authorized' ||
          trackingStatus === 'unavailable'
        ) {
          setIsAllowed(true)
          return
        }

        if (trackingStatus === 'not-determined') {
          setTimeout(async () => {
            const requestedTrackingStatus = await requestTrackingPermission()
            if (
              requestedTrackingStatus === 'authorized' ||
              requestedTrackingStatus === 'unavailable'
            ) {
              setIsAllowed(true)
            }
          }, 2 * 1000 * 60)
        }
      } catch (e) {
        logger.error('tracking-transparency', e)
      }
    }
    checkStatus()
  }, [])

  return { isAllowed }
}

export default useTrackingTransparency
