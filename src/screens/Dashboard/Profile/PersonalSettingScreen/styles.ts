import { StyleSheet } from 'react-native'
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
    ...typo.bodyM16,
    color: colors.BLUE,
    lineHeight: 23,
  },
  container: {
    height: SCREEN_HEIGHT,
    backgroundColor: colors.WHITE,
  },
})
