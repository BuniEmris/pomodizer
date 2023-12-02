import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    marginLeft: 12,
  },
  text: {
    paddingLeft: 5,
    paddingRight: 10,
    paddingVertical: 5,
    color: colors.DARK_GREY,
    ...typo.bodyB15,
  },
  circleStyle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginRight: 5,
    backgroundColor: colors.YELLOW,
  },
})
