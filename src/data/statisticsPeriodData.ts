import i18n from 'locales/i18n'

const periodData = [
  { value: 'thisW', label: i18n.t('thisWeek') },
  { value: 'prevW', label: i18n.t('prevWeek') },
  { value: 'thisM', label: i18n.t('thisMonth') },
  { value: 'prevM', label: i18n.t('prevMonth') },
]
export default periodData

export const emptyWeekData = [0, 0, 0, 0, 0, 0, 0]
export const emptyMonthData = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0,
]
