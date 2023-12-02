import { Theme } from 'react-native-calendars/src/types'
import { opacity } from 'styled-system'
import * as colors from './colors'
import * as FONTS from './fontFamily'

export const expandedCalendarTheme: Theme = {
  selectedDayBackgroundColor: colors.TRANSPARENT_LIME,
  todayTextColor: colors.YELLOW,
  todayBackgroundColor: colors.WHITE,
  selectedDayTextColor: colors.LIME,
  textDayFontFamily: FONTS.IBMPlexSans_Medium,
  textMonthFontFamily: FONTS.IBMPlexSans_Medium,
  textDayFontWeight: '500',
  // textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '400',
  textDayFontSize: 18,
  textMonthFontSize: 14,
  textDayHeaderFontSize: 14,

  contentStyle: {
    width: 50,
    height: 64,
  },
  agendaKnobColor: 'blue',
  calendarBackground: colors.WHITE,
  container: {
    paddingLeft: 5,
    paddingRight: 5,

    backgroundColor: colors.TRANSPARENT_LIME,
  },
  dayTextColor: colors.DARK_GREY,
  textColor: colors.LIME,
  textDefaultColor: colors.DARK_GREY,
  textSectionTitleColor: colors.DARK_GREY,
}
export const CalendarTheme: Theme = {
  selectedDayBackgroundColor: colors.LIME,
  todayTextColor: colors.WHITE,
  todayBackgroundColor: colors.LIME,

  contentStyle: {
    width: 50,
    height: 64,
  },
  agendaKnobColor: 'blue',
  calendarBackground: colors.WHITE,
  container: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: colors.TRANSPARENT_LIME,
  },
  dayTextColor: colors.DARK_GREY,
  textColor: colors.DARK_GREY,
  textDefaultColor: colors.DARK_GREY,
  textSectionTitleColor: colors.DARK_GREY,
}
