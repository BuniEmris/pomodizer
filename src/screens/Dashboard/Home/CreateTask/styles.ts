import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  minutes25Text: {
    ...typo.bodyM16,
    color: colors.LIGHT_GREY,
  },
  flexHalf: {
    flex: 0.5,
  },
  addChecklistText: {
    ...typo.bodyB14,
    color: colors.LIME,
  },

  scrollContainer: {
    backgroundColor: colors.FAUX_GHOST,
  },
})
