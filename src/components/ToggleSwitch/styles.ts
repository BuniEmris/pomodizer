import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  labelText: {
    ...typo.bodyM14,
    lineHeight: 18,
    color: colors.DARK_GREY,
  },
  customCircle: {
    backgroundColor: colors.WHITE,
    width: 20,
    height: 20,
    borderRadius: 100,
  },
})
