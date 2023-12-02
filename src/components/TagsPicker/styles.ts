import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  addNew: {
    ...typo.bodyM16,
    lineHeight: 20,
    color: colors.LIME,
  },
  all: {
    ...typo.bodyM16,
    lineHeight: 22,
    // color: colors.LIME,
  },
  circleStyle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginRight: 5,
    backgroundColor: colors.YELLOW,
  },
  allContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  dash: {
    height: 58,
    width: 3,
  },
  allCircle: {
    backgroundColor: 'black',
  },
})
