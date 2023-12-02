import i18n from 'react-native-i18n'
import en from 'locales/en'
import ru from 'locales/ru'
import uk from 'locales/uk'
import uz from 'locales/uz'
import de from 'locales/de'

import fr from 'locales/fr'
import it from 'locales/it'
import pt from 'locales/pt'
import es from './es'

import './react-native-calendars-locale'

i18n.fallbacks = true

// console.log('i18n.currentLocale()', i18n.currentLocale())

i18n.translations = {
  en,
  ru,
  uk,
  uz,
  es,
  it,
  pt,
  de,
  fr,
}

// For 24-hours format https://github.com/mmazzarolo/react-native-modal-datetime-picker#how-to-set-a-24-hours-format-in-ios
export const getPickerLocale = () =>
  i18n?.currentLocale() === 'en' ? 'en_GB' : i18n?.currentLocale()

export default i18n
