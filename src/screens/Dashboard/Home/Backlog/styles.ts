import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'
import { SCREEN_HEIGHT } from 'styles/helpers'

export default StyleSheet.create({
  flex0: {
    flex: 0,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT - 200,
    flex: 1,
  },
  emptyText: {
    ...typo.bodyM18,
    lineHeight: 23,
    color: colors.LIGHT_GREY,
  },
  greenArrow: {
    position: 'absolute',
    right: 70,
    top: 10,
  },
  tasksContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  container: {
    height: SCREEN_HEIGHT,
    backgroundColor: colors.FAUX_GHOST,
  },
  safeContainer: {
    backgroundColor: colors.FAUX_GHOST,
  },
})
