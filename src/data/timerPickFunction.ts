import { useTypedSelector } from 'store'
import breakLength from './breakLengthData'
import longBreakAfter from './LongBreakAfterData'
import pomodoroLength from './pomodoroLengthData'

export const dataTimePicker = (key: string) => {
  switch (key) {
    case 'pomodoroTimeLength':
      return pomodoroLength
    case 'breakLength':
      return breakLength
    case 'longBreakLength':
      return breakLength
    case 'longBreakAfter':
      return longBreakAfter

    default:
      return pomodoroLength
  }
}
