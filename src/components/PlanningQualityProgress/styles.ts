import { StyleSheet } from 'react-native'
import { typo, colors } from 'styles'

export default StyleSheet.create({
  planningText: {
    ...typo.bodyM16,
    color: colors.DARK_GREY,
  },
  percentText: {
    ...typo.bodyM18,
    color: colors.LIME,
  },
})
