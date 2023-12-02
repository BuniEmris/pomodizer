import i18n from 'locales/i18n'
import { Locale } from 'locales/locale'

const languageData = [
  {
    value: Locale.EN,
    label: i18n.t('english'),
  },
  {
    value: Locale.UK,
    label: i18n.t('ukraine'),
  },
  {
    value: Locale.RU,
    label: i18n.t('russia'),
  },
  {
    value: Locale.UZ,
    label: i18n.t('uzbek'),
  },

  {
    value: Locale.IT,
    label: 'Italiano',
  },
  {
    value: Locale.DE,
    label: 'Deutsch',
  },
  {
    value: Locale.PT,
    label: 'Portugues',
  },
  {
    value: Locale.FR,
    label: 'Français',
  },
  {
    value: Locale.ES,
    label: 'Español',
  },
]

export default languageData
