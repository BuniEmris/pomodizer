import { StyleSheet } from 'react-native'
import { typo, colors } from 'styles'

export default StyleSheet.create({
  emptyBar: {
    backgroundColor: colors.LIGHT_GREY,
    height: 7,
    borderRadius: 13,
    opacity: 0.5,
    width: '100%',
  },
  progressBar: {
    backgroundColor: colors.LIME,
    height: 7,
    borderRadius: 13,
    width: '50%',
    position: 'absolute',
  },
})
