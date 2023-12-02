import { Task } from 'types'
import base64 from 'react-native-base64'

import { getDateFromApi, getDateFromApiTime } from 'utils/date'

const shareLinkPrefix = 'https://link.pomodizer.com/s/t/'

const createTaskPath = 'pomodizer://tasks/create?'

export const encodeLinkParam = (linkParam: string) => {
  return base64.encode(linkParam)
}

export const decodeLinkParam = (linkParam: string) => {
  return base64.decode(linkParam)
}
