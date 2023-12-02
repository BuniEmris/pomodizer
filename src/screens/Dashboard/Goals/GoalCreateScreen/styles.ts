import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  descriptionText: {
    ...typo.bodyR16,
    textAlign: 'left',
    lineHeight: 21,
    color: colors.DARK_GREY,
  },
  youCanCreateText: {
    ...typo.bodyM14,
    color: colors.DARK_GREY,
    lineHeight: 18,
  },
  taskItemContainer: {
    marginTop: 20,
    borderLeftWidth: 4,
    paddingLeft: 16,
  },
  taskNameText: {
    ...typo.bodyR16,
    lineHeight: 21,
    color: colors.DARK_GREY,
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
  flexHalf: {
    flex: 0.5,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 14,
  },
  separator: {
    width: 25,
  },
})
