import { StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  modalBg: {
    margin: 0,
    backgroundColor: colors.TRANSPARENT_LIME,
    justifyContent: 'flex-start',
  },
  wrapper: {
    width: '100%',
    height: 178,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
  },
  divider: {
    borderRadius: 75.9259,
    width: 29,
    height: 1,
    backgroundColor: 'grey',
  },
  title: {
    textAlign: 'center',
    ...typo.bodyM24,
    color: colors.DARK_GREY,
  },
  subTitle: {
    textAlign: 'center',
    ...typo.bodyR16,
    color: colors.DARK_GREY,
  },
  itemTitle: {
    ...typo.bodyB22,
    color: colors.GREEN,
  },
  itemSubTitle: {
    ...typo.bodyB15,
    color: colors.DARK_GREY,
  },
  itemDescr: {
    ...typo.bodyR11,
    color: colors.DARK_GREY,
  },
  footerText: {
    ...typo.bodyM14,
    color: colors.DARK_GREY,
  },
  dot: {
    marginHorizontal: 3,
    ...typo.bodyM12,
    color: colors.DARK_GREY,
  },
})
