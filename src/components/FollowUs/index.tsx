import React from 'react'

import { DmView } from 'components/UI'
import { Linking } from 'react-native'
import IconLogo from 'react-native-vector-icons/Feather'

import styles from './styles'
import { colors } from 'styles'

const FollowUs = () => {
  const handleFacebook = () => {
    Linking.openURL('https://www.facebook.com/pomodizer')
  }

  const handleInstagram = () => {
    Linking.openURL('https://www.instagram.com/pomodizerapp/')
  }

  const handleLinkedIn = () => {
    Linking.openURL('https://www.linkedin.com/company/pomodizer/')
  }

  const handleTwitter = () => {
    Linking.openURL('https://twitter.com/pomodizer')
  }
  return (
    <DmView
      flexDirection="row"
      justifyContent="center"
      marginLeft="5%"
      paddingBottom={30}
    >
      <DmView
        width={32}
        height={32}
        style={styles.logoWrapper}
        onPress={handleFacebook}
      >
        <IconLogo name="facebook" size={20} color={colors.WHITE} />
      </DmView>
      <DmView
        width={32}
        height={32}
        style={styles.logoWrapper}
        onPress={handleInstagram}
      >
        <IconLogo name="instagram" size={20} color={colors.WHITE} />
      </DmView>
      <DmView
        width={32}
        height={32}
        style={styles.logoWrapper}
        onPress={handleLinkedIn}
      >
        <IconLogo name="linkedin" size={20} color={colors.WHITE} />
      </DmView>
      <DmView
        width={32}
        height={32}
        style={styles.logoWrapper}
        onPress={handleTwitter}
      >
        <IconLogo name="twitter" size={20} color={colors.WHITE} />
      </DmView>
    </DmView>
  )
}

export default FollowUs
