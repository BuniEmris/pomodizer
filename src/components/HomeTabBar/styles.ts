import { StyleSheet } from 'react-native'
import { colors } from 'styles'
import { isSmallDevice, bottomMenuHeight, isAndroid } from 'styles/helpers'

export default StyleSheet.create({
  container: {
    height: bottomMenuHeight,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 16,
    paddingHorizontal: 25,
    backgroundColor: colors.WHITE,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: '#C3C7DC',
    elevation: 7,
    shadowOpacity: 0.26,
    borderTopWidth: isAndroid ? 1 : 0,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  greyCircle: {
    width: 68,
    height: 68,
    borderRadius: 50,
    marginTop: -38,
    backgroundColor: 'rgba(248,249,254, 0.0)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  greyHalfCircle: {
    position: 'absolute',
    backgroundColor: colors.FAUX_GHOST,
    bottom: 0,
    width: '100%',
    height: 47,
  },
  greenCircle: {
    width: 54,
    height: 54,
    backgroundColor: colors.LIGHT_GREY,
    // borderColor: colors.LIGHT_GREY,
    // borderWidth: 2,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenCircleActive: {
    width: 54,
    height: 54,
    backgroundColor: colors.LIME,
    // borderColor: colors.LIME,
    // borderWidth: 2,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
