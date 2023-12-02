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
    backgroundColor: colors.WHITE,
    paddingHorizontal: 20,
  },
  taskItemContainer: {
    borderLeftWidth: 4,
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
    lineHeight: 21,
    color: colors.DARK_GREY,
    // paddingTop: 5,
  },
  taskNameFinished: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  hashtagText: {
    ...typo.bodyB12,
    letterSpacing: 0.3,
    lineHeight: 16,
  },
  taskStatsText: {
    ...typo.bodyM14,
    lineHeight: 18,
    color: colors.DARK_GREY,
  },
  timetoEndText: {
    ...typo.bodyM18,
    color: colors.GREEN,
    lineHeight: 23,
  },
  dash: {
    opacity: 0.5,
    marginHorizontal: 20,
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
  dueDateUncompleted: {
    color: colors.LIGHT_RED,
  },
})
