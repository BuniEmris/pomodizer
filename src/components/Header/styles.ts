import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSideContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  centerText: {
    ...typo.bodyM24,
    color: colors.DARK_GREY,
    marginTop: -7,
  },
  rightIcon: {
    marginTop: -7,
  },
  emoji: {
    marginTop: -6,
    fontSize: 22,
  },
  statisticsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -6,
  },
  finishedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  projectContainer: {
    marginTop: -7,
    marginRight: 10,
  },
  addTask: {
    marginTop: -10,
    left: 10,
  },
  onboarding: {
    position: 'absolute',
    top: 40,
    left: 0,
    zIndex: 1,
  },
})
