import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  container: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    backgroundColor: 'rgba(153, 168, 177, 0.3)',
    borderRadius: 8,
  },
  text: {
    ...typo.bodyM14,
    lineHeight: 18,
    color: colors.DARK_GREY,
  },
})
