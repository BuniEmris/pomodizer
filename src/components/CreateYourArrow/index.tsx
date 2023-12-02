import React from 'react'
// Components
import { ViewStyle, View, Text } from 'react-native'

// Styles & Assets
import styles from './styles'
import GreenArrow from 'assets/images/Dashboard/greenArrow.svg'
import i18n from 'locales/i18n'

interface Props {
  style?: ViewStyle | ViewStyle[]
  text?: string
}

const CreateYourArrow: React.FC<Props> = ({ style, text }) => {
  return (
    <View style={[styles.container, style]}>
      <GreenArrow />
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default CreateYourArrow
