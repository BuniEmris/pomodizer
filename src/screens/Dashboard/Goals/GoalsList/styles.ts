import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'
import { SCREEN_HEIGHT } from 'styles/helpers'

export default StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT - 300,
    flex: 1,
  },
  emptyText: {
    ...typo.bodyM18,
    lineHeight: 23,
    color: colors.LIGHT_GREY,
    textAlign: 'center',
    paddingHorizontal: 50,
  },
  greenArrow: {
    position: 'absolute',
    right: 40,
  },
  goalsContainer: {
    flex: 1,
    backgroundColor: colors.FAUX_GHOST,
    paddingHorizontal: 20,
    paddingBottom: 66,
  },
  container: {
    height: SCREEN_HEIGHT,
    backgroundColor: colors.WHITE,
  },
  archiveContainer: {
    height: 40,
    borderRadius: 6,
    backgroundColor: 'rgba(105, 194, 98, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  archiveText: {
    ...typo.bodyB13,
    color: colors.LIME,
  },
})
