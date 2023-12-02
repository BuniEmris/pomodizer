import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'
import { GREEN } from 'styles/colors'
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
  inboxAdd: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: GREEN,
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
})
