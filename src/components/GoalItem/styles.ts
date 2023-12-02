import { StyleSheet } from 'react-native'
import { colors, typo } from 'styles'

export default StyleSheet.create({
  container: {
    marginBottom: 10,
    shadowColor: 'rgba(195, 199, 220, 0.26)',
    shadowOffset: {
      width: 6,
      height: 0,
    },
    shadowRadius: 30,
    shadowOpacity: 0.3,
    elevation: 1,
  },
  background: {
    position: 'absolute',
    marginLeft: 20,
    height: '100%',
    width: '90%',
    backgroundColor: colors.TRANSPARENT_LIME,
  },
  contentContainer: {
    paddingTop: 0,
    borderRadius: 10,
    paddingHorizontal: 20,
    minHeight: 60,
    paddingBottom: 5,
    backgroundColor: colors.WHITE,
  },
  calendarContainer: {
    width: 30,
    height: 30,
    backgroundColor: colors.LIME,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightContainer: {
    backgroundColor: colors.TRANSPARENT_LIME,
    flexDirection: 'row',
    borderRadius: 10,
  },
  deleteContainer: {
    backgroundColor: colors.TRANSPARENT_RED,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: 64,
  },
  editContainer: {
    backgroundColor: colors.TRANSPARENT_LIME,
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
  },
  goalNameText: {
    ...typo.bodyM18,
    color: colors.DARK_GREY,
    paddingRight: 50,
  },
  editText: {
    ...typo.bodyM12,
    color: colors.LIME,
    lineHeight: 16,
  },
  deleteText: {
    ...typo.bodyM12,
    color: colors.LIGHT_RED,
    lineHeight: 16,
  },
  datesContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  dateText: {
    ...typo.bodyR13,
    color: colors.LIGHT_GREY,
    marginTop: 4,
  },
  icon: {
    fontSize: 20,
  },
  dash: {
    opacity: 0.5,
  },
  dueDateWr: {
    // position: 'absolute',
    // right: 10,
    // top: 0
  },
  goalNameTextDone: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
})
