import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'rgba(153, 168, 177, 0.5)',
    borderRadius: 6,
    height: 34,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  multilineContainer: {
    alignItems: 'flex-start',
    height: 165,
  },
  multilineText: {
    textAlignVertical: 'top',
    height: '100%',
    width: '100%',
  },
  text: {
    ...typo.bodyR16,
    lineHeight: 21,
    color: colors.BLACK,
    textAlignVertical: 'center',
    width: '100%',
    padding: 0,
  },
  rightIcon: {
    marginLeft: -19,
  },
})
