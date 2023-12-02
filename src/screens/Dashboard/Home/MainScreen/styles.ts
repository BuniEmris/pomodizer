import { minHeight } from 'styled-system'
import { Platform, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { colors, typo } from 'styles'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'styles/helpers'

const CAROUSEL__HEIGHT = 142
const DEVICE_HEIGHT = Platform.OS === 'ios' ? 345 : 295
export const bottomSheetHeight =
  SCREEN_HEIGHT - CAROUSEL__HEIGHT - getStatusBarHeight() - DEVICE_HEIGHT
export const bottomSheetHeight2 =
  SCREEN_HEIGHT - getStatusBarHeight() - DEVICE_HEIGHT

export default StyleSheet.create({
  header: {
    backgroundColor: colors.WHITE,
    paddingTop: 10,
    paddingHorizontal: 25,
  },
  carouselContainer: {
    // minHeight: CAROUSEL__HEIGHT,
    backgroundColor: colors.FAUX_GHOST,
    // width: SCREEN_WIDTH,
    // justifyContent: 'flex-start'
  },
  carouselItemContainer: {
    minHeight: CAROUSEL__HEIGHT,
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    shadowColor: 'rgba(195, 199, 220, 0.26)',
  },
  contentContainerStyleAnimatedFlatList: {
    paddingBottom: 126,
  },
  carouselContainerCon: {
    // backgroundColor: colors.FAUX_GHOST,
    alignItems: 'flex-start',
    // position: 'absolute',
    // top: 120,
    zIndex: -1,
  },
  calendarHeaderContainer: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarMainText: {
    ...typo.bodyR16,
    color: colors.LIGHT_GREY,
  },
  monthTextHeader: {
    ...typo.bodyB16,
    lineHeight: 21,
    color: colors.DARK_GREY,
  },
  todayBtnStyle: {
    // marginTop: 10,
    ...typo.bodyB13,
    color: colors.LIME,
  },
  calendarStripContainer: {
    height: 100,
    // marginTop: 10,
  },
  calendarHeaderName: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateNameStyle: {
    marginBottom: 6,
    color: colors.DARK_GREY,
    ...typo.bodyR14,
  },
  dateNumberStyle: {
    color: colors.DARK_GREY,
    ...typo.bodyM18,
    lineHeight: 23,
  },
  highlightDateNameStyle: {
    marginBottom: 6,
    ...typo.bodyR14,
    color: colors.LIME,
  },
  highlightDateContainerStyle: {
    backgroundColor: '#E0F9DE',
    height: 64,
    width: 50,
    borderRadius: 6,
  },
  highlightDateNumberStyle: {
    color: colors.LIME,
    ...typo.bodyM18,
  },
  itemHeaderText: {
    ...typo.bodyM14,
    lineHeight: 18,
    color: colors.DARK_GREY,
  },
  theme: {
    backgroundColor: 'red',
  },
  itemGreenHeaderText: {
    ...typo.bodyM14,
    lineHeight: 18,
    color: colors.LIME,
  },
  itemGoalsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameOfGoalsNotesText: {
    ...typo.bodyR16,
    lineHeight: 21,
    color: colors.DARK_GREY,
  },
  noteDateText: {
    ...typo.bodyB12,
    marginTop: 2,
    lineHeight: 16,
    letterSpacing: 0.3,
    color: colors.DARK_GREY,
    opacity: 0.5,
  },
  swipeableContainer: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  pomidorsContainer: {
    // height: SCREEN_HEIGHT,
    backgroundColor: colors.WHITE,
    marginTop: 20,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: 'rgba(195, 199, 220, 0.26)',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // height: SCREEN_HEIGHT - 400,
    // flex: 1,
    paddingTop: (bottomSheetHeight / 2) * 0.7,
  },
  emptyText: {
    ...typo.bodyM18,
    lineHeight: 23,
    color: colors.LIGHT_GREY,
    textAlign: 'center',
    paddingHorizontal: 50,
  },
  bottomSheetHandle: {
    // width: 30,
    // height: 4,
    backgroundColor: colors.DARK_GREY,
    borderRadius: 3,
    alignSelf: 'center',
    // marginTop: 10,
  },
  taskListContainer: {
    backgroundColor: '#fff',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // paddingBottom: 30,
    // flex: 1,
    // height: '100%'
  },
  proIcon: {
    // backgroundColor: colors.YELLOW,
    // paddingHorizontal: 8,
    // paddingVertical: 3,
    // borderRadius: 15,
    flexDirection: 'row',
    paddingBottom: 5,
    // marginTop: 20,
  },
  calendarStyle: {
    // height: 110,
    // backgroundColor: 'white',
    // transform: [
    //   {
    //     translateY: 0,
    //   },
    // ],
  },
  prevArrow: {
    top: 0,
    left: 4,
    transform: [{ rotate: '180deg' }],
  },
  nextArrow: {
    top: 0,
    right: -4,
  },
})
