import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'
import { SCREEN_HEIGHT } from 'styles/helpers'

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.FAUX_GHOST,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: colors.FAUX_GHOST,
    paddingTop: 30,
  },
  itemsContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
    // backgroundColor: colors.FAUX_GHOST,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  text: {
    ...typo.bodyR18,
    lineHeight: 21,
    color: colors.BLACK,
    textAlignVertical: 'center',
    padding: 0,
    width: '100%',
  },
  rightIcon: {
    width: 20,
    height: 20,
    marginLeft: -20,
  },
})
