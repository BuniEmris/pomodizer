export const randomInteger = (min = 9999, max = 9999999) => {
  let rand = min + Math.random() * (max - min)
  rand = Math.round(rand)
  return rand
}
export const clampNumber = (
  min: number,
  max: number,
  val: number | string
): string => {
  if (Number.isNaN(+val)) return '0'

  return Math.min(Math.max(min, +val), max).toString()
}

// export const getTomatoTimeString = (tomatoPlan, tomatoFact, tomatoPeriod = 25, pausePeriod = 5) => {
//   const tomatoSum = tomatoPlan >= tomatoFact ? tomatoPlan : tomatoFact;
//   const tomatoMinutes = (tomatoPeriod + pausePeriod) * tomatoSum;
//   const hours = parseInt(tomatoMinutes / 60, 10);
//   const minutes = tomatoMinutes % 60;
//   return `${hours} : ${minutes > 10 ? minutes : `0${minutes}`}`;
// };

export const isEmail = (email: string) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
  return emailRegex.test(String(email).toLowerCase())
}

export const getMaxTasksInColumn = (date: string, week: string[]) => {
  const weekday = week.findIndex((day) => day === date)
  if (weekday < 5) return 10
  if (weekday === 5) return 4
  if (weekday === 6) return 2
  return 0
}

export const splitFullName = (fullName: string): [string, string] => {
  const splitted = fullName.split(' ')
  const firstName = splitted[0].trim()
  const lastName = splitted.slice(1).join(' ').trim()

  return [firstName, lastName]
}

type GetPositionArgs<T extends { position: number }> = {
  items: T[]
  currentItem: T
  type: 'move' | 'reorder'
  destinationIndex: number
  sourceIndex: number
}

export const getNewPosition = <T extends { position: number }>({
  items,
  currentItem,
  type,
  destinationIndex,
  sourceIndex,
}: GetPositionArgs<T>) => {
  const sortedTasks = items.slice().sort((a, b) => a.position - b.position)
  const [previousTask, nextTask] =
    type === 'move' || destinationIndex < sourceIndex
      ? [sortedTasks[destinationIndex - 1], sortedTasks[destinationIndex]]
      : [sortedTasks[destinationIndex], sortedTasks[destinationIndex + 1]]
  const lastTask = sortedTasks[sortedTasks.length - 1]

  let newTaskPosition
  switch (true) {
    case !!previousTask && !!nextTask:
      newTaskPosition = (previousTask.position + nextTask.position) / 2
      break
    case !!previousTask:
      newTaskPosition = previousTask.position * 2
      break
    case !!nextTask:
      newTaskPosition = nextTask.position / 2
      break
    case !!lastTask:
      newTaskPosition = lastTask.position * 2
      break
    default:
      newTaskPosition = currentItem.position
      break
  }

  console.info(
    'info: ',
    type,
    '\n',
    previousTask,
    nextTask,
    '\n Sorted tasks: ',
    sortedTasks
  )
  console.info(
    'newtaskposition',
    previousTask?.position,
    nextTask?.position,
    newTaskPosition
  )

  return newTaskPosition
}

export const getRandomColor = (): string => {
  const first = ~~(Math.random() * 255)
  const second = ~~(Math.random() * 255)
  const third = ~~(Math.random() * 255)

  return `rgb(${first}, ${second}, ${third})`
}

export const objectHasProperties = (obj: object): boolean =>
  obj && !!Object.keys(obj).length

export const arrayHasItems = (arr: any[]): boolean =>
  Array.isArray(arr) && arr.length > 0

export const capitalize = (word: string): string =>
  word && word[0].toUpperCase() + word.slice(1)

export const getListOfValues = <T>(obj: T) =>
  Object.entries(obj).map((item) => {
    const [key, value] = item
    return { key, value }
  })

export const momentLocales: { [key: string]: string } = {
  en: 'en',
  ru: 'ru',
  uk: 'uk',
  uz: 'uz',
}

export const camelToPascal = (str: string): string => {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}
