import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  container: {
    // marginRight: 20,
  },
  background: {
    position: 'absolute',
    height: '100%',
    width: '90%',
    backgroundColor: colors.TRANSPARENT_LIME,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  contentContainer: {
    padding: 15,
    backgroundColor: colors.WHITE,
  },
  rightContainer: {
    backgroundColor: colors.TRANSPARENT_LIME,
    flexDirection: 'row',
  },
  deleteContainer: {
    backgroundColor: colors.TRANSPARENT_RED,
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: '100%',
  },
  editContainer: {
    backgroundColor: colors.TRANSPARENT_LIME,
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: '100%',
  },
  noteNameText: {
    ...typo.bodyR16,
    color: colors.DARK_GREY,
    paddingRight: 50,
  },
  editText: {
    ...typo.bodyM12,
    color: colors.LIME,
    lineHeight: 16,
  },
  deleteText: {
    ...typo.bodyM12,
    color: colors.LIGHT_RED,
    lineHeight: 16,
  },
  datesContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  dateText: {
    ...typo.bodyM12,
    color: colors.DARK_GREY,
    opacity: 0.5,
  },
  dash: {
    opacity: 0.5,
  },
  noteNameTextDone: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  }
})
