import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateItemContainer: {
    paddingVertical: 10,
    width: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekText: {
    ...typo.bodyR14,
    lineHeight: 18,
    color: colors.DARK_GREY,
    textAlign: 'center',
  },
  dateText: {
    ...typo.bodyM18,
    lineHeight: 23,
    marginTop: 5,
    color: colors.DARK_GREY,
    textAlign: 'center',
  },
  shadow: {
    shadowColor: 'rgba(195, 199, 220, 0.25)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
})
