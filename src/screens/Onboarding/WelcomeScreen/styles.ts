import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'
import { isSmallDevice, SCREEN_HEIGHT, SCREEN_WIDTH } from 'styles/helpers'

export default StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  whiteBlock: {
    marginTop: SCREEN_HEIGHT * 0.04,
    alignSelf: 'flex-start',
    paddingBottom: isSmallDevice ? 15 : 30,
    borderBottomWidth: 4,
    borderBottomColor: colors.WHITE,
  },
  theBestText: {
    ...typo.bodySemiBold,
    color: colors.DARK_GREY,
    fontSize: isSmallDevice ? 35 : 40,
    lineHeight: isSmallDevice ? 40 : 45,
  },
  logo: {
    width: SCREEN_WIDTH * 0.608,
    height: SCREEN_HEIGHT * 0.263,
    resizeMode: 'contain',
    marginBottom: 20,
  },
})
