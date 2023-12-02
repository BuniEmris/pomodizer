import { StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { colors, typo } from 'styles'
import { responsiveHeight, SCREEN_WIDTH } from 'styles/helpers'

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: SCREEN_WIDTH - 32,
  },
  body: {
    flex: 10,
  },
  ProgressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...ifIphoneX(
      {
        marginTop: 50,
      },
      {
        marginTop: 20 * responsiveHeight,
      }
    ),
    paddingBottom: 50 * responsiveHeight,
  },
  breakSkip: {
    position: 'absolute',
    top: 180,
  },
  ProgressInsideWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  playPause: {
    position: 'absolute',
    top: 180,
  },
  footerContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markDoneContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 180,
    height: 46,
    flexDirection: 'row',
    backgroundColor: colors.LIME,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  overFlowIcon: {
    zIndex: 1,
  },
  timerText: {
    color: colors.DARK_GREY,
    fontSize: 35 * responsiveHeight,
    fontWeight: '500',
    width: 110 * responsiveHeight,
    textAlign: 'center',
  },
  markDoneText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  settingsBtn: {
    position: 'absolute',
    left: 15,
  },
  roundTimerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundTimerText: {
    marginTop: 5 * responsiveHeight,
    color: colors.DARK_GREY,
    fontSize: 18,
    fontWeight: '500',
  },
})
