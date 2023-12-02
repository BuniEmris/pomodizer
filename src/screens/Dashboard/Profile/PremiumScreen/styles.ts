import { StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { colors, typo } from 'styles'
import { responsiveHeight, SCREEN_HEIGHT } from 'styles/helpers'

export default StyleSheet.create({
  safeAreaHeader: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  headerTextContainer: {
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerText: {
    ...typo.bodyB23,
    color: colors.BLACK,
  },
  CarouselContainer: {
    marginTop: 10,
    // height: 115,
    backgroundColor: colors.GOLDEN_OPACITY,
  },
  CarouselText: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    lineHeight: 21,
    letterSpacing: 0.2,
    ...typo.bodyM16,
    textAlign: 'center',
    color: colors.DARK_GREY,
  },
  tarrifHeaderTextContainer: {
    alignItems: 'center',
  },
  tarrifHeaderText: {
    ...typo.bodySB20,
    color: colors.BLACK,
    paddingVertical: 10,
  },
  tarrifDetailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  tarrifDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  tarrifDetailText: {
    paddingLeft: 8,
    lineHeight: 18,
    letterSpacing: 0.1,
    ...typo.bodyM16,
    color: colors.DARK_GREY,
  },
  priceBtn: {
    height: 52,
    marginBottom: 20,
    backgroundColor: colors.GREEN,
    borderRadius: 71,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceBtnAccent: {
    backgroundColor: colors.LIME,
    opacity: 1,
  },
  priceBtnText: {
    ...typo.bodyB16,
    color: colors.WHITE,
  },
  priceBtnDesc: {
    ...typo.bodyM14,
    color: colors.WHITE,
  },
  buyLink: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyLinkText: {
    ...typo.bodyM13,
    color: colors.LIME,
    textDecorationLine: 'underline',
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  notes: {
    paddingTop: 10,
    paddingHorizontal: 4,
  },
  notesText: {
    ...typo.bodyR12,
    color: colors.DARK_GREY,
    // textAlign: 'center',
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  termsText: {
    ...typo.bodyB13,
    color: colors.BLACK_GREY,
    // textAlign: 'center',
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  dash: {
    opacity: 0.5,
  },
})
