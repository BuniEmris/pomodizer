import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  text: {
    ...typo.bodyM14,
    lineHeight: 18,
    color: colors.LIME,
    textAlign: 'center',
    marginTop: 5,
  },
  container: {
    alignItems: 'flex-end',
  },
})
