import dynamicLinks from '@react-native-firebase/dynamic-links'
import { Task } from 'types'
import { encodeLinkParam, decodeLinkParam } from './base64'
import { getDateFromApi, getDateFromApiTime } from 'utils/date'

const appDomain = 'pomodizer://'

const shareLinkPrefix = 'https://link.pomodizer.com/s/'

const shareTypes = {
  SHARE_TASK: 'share_task',
}

const generateTaskUrl = (task: Task) => {
  let linkParams = ''

  linkParams += `?type=${shareTypes.SHARE_TASK}&name=${task.name}&isShare=true`

  if (task._id) {
    linkParams += `&taskId=${task._id}`
  }

  if (task.description) {
    linkParams += `&description=${task.description}`
  }

  if (task.dueDate) {
    linkParams += `&dueDate=${getDateFromApi(task.dueDate).toISOString()}`
  }

  if (task.dueTime) {
    linkParams += `&dueTime=${getDateFromApiTime(task.dueTime).toISOString()}`
  }

  if (task.userId) {
    linkParams += `&userId=${task.userId}`
  }

  linkParams = encodeLinkParam(encodeURI(linkParams))

  return shareLinkPrefix + linkParams
}

export const createTaskDeepLink = async (task: Task) => {
  const url = generateTaskUrl(task)

  const link = await dynamicLinks().buildShortLink({
    link: url,
    domainUriPrefix: 'https://link.pomodizer.com',
    // optional setup which updates Firebase analytics campaign
    // "banner". This also needs setting up before hand
    // analytics: {
    //   campaign: 'banner',
    // },
  })

  return link
}

export const readDeepLink = (firebaseLink: string) => {
  if (!firebaseLink.includes(shareLinkPrefix)) {
    return firebaseLink
  }

  const linkData = firebaseLink.slice(shareLinkPrefix.length)

  // @TODO check initial prefix
  const appLink = appDomain + 'tasks/create' + decodeLinkParam(linkData)
  return appLink
}
