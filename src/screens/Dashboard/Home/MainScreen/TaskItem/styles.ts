import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    // shadowColor: 'rgba(195, 199, 220, 0.26)',
    // shadowOffset: {
    //   width: 6,
    //   height: 0,
    // },
    // shadowRadius: 30,
    // shadowOpacity: 0.3,
    // elevation: 1,
  },
  background: {
    position: 'absolute',
    marginLeft: 20,
    height: '100%',
    width: '90%',
    backgroundColor: colors.WHITE,
  },
  activeContainer: {
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
  },
  taskItemContainer: {
    borderLeftWidth: 2,
    paddingLeft: 8,
    borderLeftColor: colors.WHITE,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  taskNameText: {
    ...typo.bodyM17,
    lineHeight: 20,
    color: colors.DARK_GREY,
    // paddingTop: 5,
  },
  taskNameDescription: {
    ...typo.bodyR14,
    color: colors.GREY_PLACEHOLDER,
    // paddingTop: 5,
  },
  taskNameFinished: {
    ...typo.bodyR17,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: colors.GREY_PLACEHOLDER,
  },
  hashtagText: {
    ...typo.bodyB12,
    letterSpacing: 0.3,
    lineHeight: 16,
  },
  taskStatsText: {
    ...typo.bodyR14,
    lineHeight: 17,
    color: colors.DARK_GREY,
  },
  timetoEndText: {
    ...typo.bodyM18,
    color: colors.GREEN,
    lineHeight: 23,
  },
  dash: {
    marginHorizontal: 20,
    opacity: 0.5,
  },
  rightContainer: {
    backgroundColor: colors.TRANSPARENT_LIME,
    flexDirection: 'row',
    borderRadius: 10,
  },

  deleteContainer: {
    backgroundColor: colors.TRANSPARENT_RED,
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
  },
  editContainer: {
    backgroundColor: colors.TRANSPARENT_LIME,
    justifyContent: 'center',
    alignItems: 'center',
    width: 74,
  },
  deleteText: {
    ...typo.bodyM12,
    color: colors.LIGHT_RED,
    lineHeight: 16,
  },
  editText: {
    ...typo.bodyM12,
    color: colors.LIME,
    lineHeight: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1.41,
    backgroundColor: '#fff',
  },
})
