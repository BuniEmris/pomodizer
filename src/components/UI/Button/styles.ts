import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.WHITE,
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  text: {
    ...typo.bodyB12,
    letterSpacing: 0.3,
    color: colors.WHITE,
    textTransform: 'uppercase',
  },
  textIcon: {
    marginLeft: 5,
  },
})
