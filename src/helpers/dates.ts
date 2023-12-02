import i18n from 'locales/i18n'
import moment from 'moment'

const arrayOfWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const getWeekShortName = (date: Date) => {
  const dayOfWeekNumber = date.getDay()
  return arrayOfWeekdays[dayOfWeekNumber]
}

export const formatAMPM = (date: Date) => {
  let hours: number | string = date.getHours()
  let minutes: number | string = date.getMinutes()
  const appm = hours >= 12 ? 'PM' : 'AM'
  hours %= 12
  hours = hours || 12
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  const strTime = hours + ':' + minutes + ' ' + appm
  return strTime
}

export const getTimeStrFromTomato = (tomato: number, timeLength = 30) => {
  if (tomato < 2) {
    return timeLength + 'm'
  }
  const minutesLength = tomato * timeLength
  const hour = Math.floor(minutesLength / 60)

  const minutesModule = minutesLength % 60

  let timeStr = hour + 'h'

  if (minutesModule > 0) {
    timeStr += ' ' + minutesModule + 'm'
  }

  return timeStr
}

export const getArrayDates = (dateStart: Date, dateEnd: Date) => {
  const days = []
  const start = moment()
  const end = moment().add(30, 'days')

  while (end.diff(start, 'days') >= 0) {
    days.push(start.format('YYYY-MM-DD'))
    start.add(1, 'days')
  }

  return days
}
