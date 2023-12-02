import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    height: 78,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  noteNameText: {
    ...typo.bodyM18,
    color: colors.DARK_GREY,
    lineHeight: 23,
    paddingRight: 50,
  },
  noteNameTextSimple: {
    ...typo.bodyM16,
    lineHeight: 20,
  },
  noteNameTextArcheved: {
    color: '#ccc',
  },
  dash: {
    height: 58,
    width: 3,
  },
})
