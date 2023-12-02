import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  flexHalf: {
    flex: 0.5,
  },
  modalHeaderText: {
    ...typo.bodyM18,
    color: colors.DARK_GREY,
    textAlign: 'center',
    lineHeight: 23,
  },
  modalHeaderTextDelete: {
    ...typo.bodyM18,
    color: colors.DARK_GREY,
    textAlign: 'center',
    lineHeight: 23,
    width:200
  },
  modalText: {
    ...typo.bodyR14,
    color: colors.DARK_GREY,
    textAlign: 'center',
    lineHeight: 18,
  },
})
