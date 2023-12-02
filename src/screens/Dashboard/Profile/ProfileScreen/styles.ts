import { StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { colors, typo } from 'styles'
import { SCREEN_HEIGHT } from 'styles/helpers'

export default StyleSheet.create({
  safeAreaHeader: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  headerContainer: {
    backgroundColor: colors.LIME,
    height: SCREEN_HEIGHT * 0.13,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  headerTextContainer: {
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
    fontSize: 30,
    color: colors.DARK_GREY,
  },
  photoContainer: {
    alignItems: 'center',
    marginTop: -57,
  },
  photo: {
    width: 114,
    height: 114,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
  greyLineSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: colors.LIGHT_GREY,
    opacity: 0.3,
  },
  changePassHeader: {
    ...typo.bodyM18,
    color: colors.DARK_GREY,
    lineHeight: 23,
  },
  container: {
    // height: SCREEN_HEIGHT,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 20,
  },
  dash: {
    opacity: 0.5,
  },
})
