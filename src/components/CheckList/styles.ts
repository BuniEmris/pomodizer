import { StyleSheet } from 'react-native'
import { typo, colors } from 'styles'
import { responsiveHeight } from 'styles/helpers'

export default StyleSheet.create({
  planningText: {
    ...typo.bodyM18,
    color: colors.LIGHT_GREY,
  },
  percentText: {
    ...typo.bodyM16,
    color: colors.LIGHT_GREY,
  },
  closeIcon: {
    marginTop: 3 * responsiveHeight,
    marginLeft: 10,
  },
  taskText: {
    ...typo.bodyR14,
    color: colors.BLACK,
    marginHorizontal: 10,
    flexShrink: 1,
    flexGrow: 1,
  },
  checkBoxStyle: {
    transform: [{ scaleX: 1.29 }, { scaleY: 1.29 }],
  },
  addChecklistWr: {
    marginVertical: 10 * responsiveHeight,
  },
  addChecklistText: {
    ...typo.bodyB14,
    color: colors.LIME,
  },
})
