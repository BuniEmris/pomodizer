import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  flexHalf: {
    flex: 0.5,
  },
  pickerLabelText: {
    ...typo.bodyR16,
    color: colors.BLACK,
    lineHeight: 30,
  },
  youCanOnlyCreateText: {
    ...typo.bodyR16,
    lineHeight: 21,
    color: colors.DARK_GREY,
  },
  pickerLabel: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
  },
})
