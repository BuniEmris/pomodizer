import { StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { colors, typo } from 'styles'
import { SCREEN_HEIGHT } from 'styles/helpers'

export default StyleSheet.create({
  safeAreaHeader: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 21,
    marginBottom: 6,
    ...ifIphoneX(
      {
        paddingTop: 0,
      },
      {
        paddingTop: 22,
      }
    ),
  },
  headerText: {
    ...typo.bodyM24,
    color: colors.DARK_GREY,
  },
  dash: {
    opacity: 0.5,
  },
})
