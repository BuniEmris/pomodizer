import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'
import { SCREEN_HEIGHT } from 'styles/helpers'

export default StyleSheet.create({
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
    textAlign: 'center',
    paddingHorizontal: 50,
  },
  greenArrow: {
    position: 'absolute',
    right: 40,
  },
  notesContainer: {
    flex: 1,
    backgroundColor: colors.FAUX_GHOST,
  },
  container: {
    height: SCREEN_HEIGHT,
    backgroundColor: colors.WHITE,
  },
})
