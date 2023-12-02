import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'
import { SCREEN_HEIGHT } from 'styles/helpers'

export default StyleSheet.create({
  header: {
    backgroundColor: colors.WHITE,
  },
  swipeableContainer: {
    backgroundColor: colors.FAUX_GHOST,
    marginTop: 20,
  },
  pomidorsContainer: {
    flex: 1,
    height: SCREEN_HEIGHT,
    backgroundColor: colors.WHITE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: 'rgba(195, 199, 220, 0.26)',
  },
  contextMenuContainer: {
    width: 142,
    height: 90,
    borderRadius: 12,
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
    position: 'absolute',
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    right: 20,
    top: -20,
  },
  contextMenuText: {
    ...typo.bodyM14,
    color: colors.DARK_GREY,
    lineHeight: 18,
  },
  displayNone: {
    display: 'none',
  },
  flexHalf: {
    flex: 0.5,
  },
  modalHeaderText: {
    ...typo.bodyM18,
    color: colors.DARK_GREY,
    textAlign: 'center',
    lineHeight: 23,
  },
  modalText: {
    ...typo.bodyR14,
    color: colors.DARK_GREY,
    textAlign: 'center',
    lineHeight: 18,
  },
})
