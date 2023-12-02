import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'styles/helpers'

export default StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  titleText: {
    ...typo.bodyM24,
    lineHeight: 31,
    color: colors.DARK_GREY,
    textAlign: 'center',
  },
  errorText: {
    ...typo.bodyB12,
    marginTop: 30,
    color: colors.LIGHT_RED,
    lineHeight: 16,
    letterSpacing: 0.3,
    alignSelf: 'center',
    textAlign: 'center',
  },
  forgotText: {
    ...typo.bodyB12,
    marginTop: 30,
    color: colors.LIME,
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  haveAccountText: {
    ...typo.bodyR14,
    color: colors.BLACK,
    marginTop: 30,
    alignSelf: 'center',
    textAlign: 'center',
  },
  loginText: {
    color: colors.LIME,
    ...typo.bodyM16,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 14,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'rgba(153, 168, 177, 0.5)',
    borderRadius: 6,
    height: 34,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  inputStyle: {
    width: '100%',
    height: 'auto',
    padding: 0,
  },
  modalTitle: {
    ...typo.bodyM18,
    textAlign: 'center',
    color: colors.DARK_GREY,
    marginBottom: 20,
  },
  modalText: {
    ...typo.bodyR18,
    textAlign: 'center',
    color: colors.DARK_GREY,
  },
})
