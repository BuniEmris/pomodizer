import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  text: {
    ...typo.bodyM24,
    fontWeight: '500',
    lineHeight: 31,
    color: colors.DARK_GREY,
  },
})
