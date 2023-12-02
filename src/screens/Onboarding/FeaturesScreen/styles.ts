import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'styles/helpers'

export default StyleSheet.create({
  slideContainer: {
    backgroundColor: colors.LIME,
    alignItems: 'center',
  },
  skipText: {
    ...typo.bodyB14,
    lineHeight: 18,
    letterSpacing: 0.3,
    color: colors.WHITE,
  },
  logoImage: {
    width: 139,
    height: 21,
  },
  slideImage: {
    width: SCREEN_WIDTH - 36,
    height: SCREEN_HEIGHT * 0.45,
    marginTop: 80,
    resizeMode: 'contain',
  },
  textSlide: {
    ...typo.bodyM24,
    color: colors.WHITE,
    lineHeight: 31,
    textAlign: 'center',
  },
  dotStyle: {
    width: 5,
    height: 5,
    backgroundColor: colors.GREEN,
  },
  activeDotStyle: {
    width: 15,
    height: 5,
    borderRadius: 24,
    backgroundColor: colors.WHITE,
  },
  dotContainerStyle: {
    marginHorizontal: 2.5,
  },
  paginationContainer: {
    paddingVertical: 0,
    marginTop: 30,
  },
})
