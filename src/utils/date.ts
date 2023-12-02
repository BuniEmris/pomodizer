import moment, { unitOfTime, MomentInput } from 'moment'

//
export const toStringFormat = (date: MomentInput, format: string) =>
  moment(date).format(format)

export const toDateFormat = (dateStr: string, format: string) =>
  moment(dateStr, format).toDate()
//

export const changeFormat = (date: string, from: string, to: string) =>
  moment(date, from).format(to)

export const toDayFormat = (date: MomentInput = undefined) =>
  moment(date).format('DD.MM.YYYY')

export const toTimeFormat = (date: MomentInput = undefined) =>
  moment(date).format('HH:mm')

export const toDateTimeFormat = (date: MomentInput = undefined) =>
  moment(date).format('DD.MM.YYYY HH:mm')

export const isSameDay = (date: MomentInput, compareDate: MomentInput) =>
  moment(date).isSame(moment(compareDate), 'day')

export const isSameWeekOld = (date: string, compareDate: MomentInput) => {
  // moment start week from sunday
  const startOfWeek = moment.utc(date, 'DD.MM.YYYY').startOf('isoWeek')
  const endOfWeek = moment.utc(date, 'DD.MM.YYYY').endOf('isoWeek')
  return moment.utc(compareDate).isBetween(startOfWeek, endOfWeek)
}

export const isSameWeek = (date: MomentInput, compareDate: MomentInput) => {
  // moment start week from sunday
  const startOfWeek = moment(date).startOf('isoWeek')
  const endOfWeek = moment(date).endOf('isoWeek')
  return moment(compareDate).isBetween(startOfWeek, endOfWeek)
}

export const isCurrentWeek = (date: number) => {
  const currentDay = getDay('current', date)
  return isSameWeek(currentDay, new Date())
}

export const isTodayCol = (date: string) =>
  moment(date, 'DD.MM.YYYY').isSame(moment(), 'day')

export const isPreviosDate = (
  date: MomentInput,
  type: unitOfTime.Diff = 'day'
) => moment().diff(moment(date, 'DD.MM.YYYY'), type) > 0

export const isPreviousWeek = (date: number) => {
  const currentMonday = getWeek('current', new Date())[0]
  return date < currentMonday.valueOf()
}

// date must be in DD.MM.YYYY
export const getThreshold = (
  date: string,
  type: unitOfTime.StartOf
): [moment.Moment, moment.Moment] => {
  return [
    moment(date, 'DD.MM.YYYY').startOf(type),
    moment(date, 'DD.MM.YYYY').endOf(type),
  ]
}

export const getWeek = (
  type: 'current' | 'previous' | 'next' = 'current',
  date: MomentInput
) => {
  const weekArray = Array.from({ length: 7 })

  switch (type) {
    case 'current':
      return weekArray.map((_, i) =>
        moment(date).startOf('isoWeek').add(i, 'day')
      )
    case 'previous':
      return weekArray.map((_, i) =>
        moment(date).subtract(1, 'week').startOf('isoWeek').add(i, 'day')
      )
    case 'next':
      return weekArray.map((_, i) =>
        moment(date).add(1, 'week').startOf('isoWeek').add(i, 'day')
      )
    default:
      throw Error('Provide valid type')
  }
}

export const getDay = (
  type: 'current' | 'previous' | 'next' = 'current',
  date: MomentInput
) => {
  switch (type) {
    case 'current':
      return moment(date).startOf('day')
    case 'previous':
      return moment(date).subtract(1, 'day').startOf('day')
    case 'next':
      return moment(date).add(1, 'day').startOf('day')
    default:
      throw Error('Provide valid type')
  }
}

const toTime = (time: number) => {
  return time < 10 ? `0${time}` : `${time}`
}

export const getTimerTime = (seconds: number) => {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  const timeStr = toTime(min) + ':' + toTime(sec)
  return timeStr
}
export const getTimerTimeSettings = (seconds: number) => {
  const min = Math.floor(seconds / 60)
  const timeStr = min
  return timeStr
}

export const getTodayApi = () =>
  getDay('current', new Date()).format('DD.MM.YYYY')
export const getTodayCalendar = () =>
  getDay('current', new Date()).format('YYYY-MM-DD')

export const getDateFromApi = (date: string) => toDateFormat(date, 'DD.MM.YYYY')
export const getDateFromApiTime = (date: string) => toDateFormat(date, 'HH:mm')

export const apiDateToCalendar = (date: string) => {
  const dateArr = date.split('.')
  return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
}

export const calendarDateToCalendar = (date: any) => {
  const dateArr = date.split('-')
  return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`
}

export const dueDateToMoment = (dueDate: string) => {
  return moment(dueDate, 'DD.MM.YYYY')
}

export const dueDateToUnix = (dueDate: string) =>
  dueDateToMoment(dueDate).unix()
