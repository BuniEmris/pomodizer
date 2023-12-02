import React, { useMemo, useState } from 'react'
// Components
import { ViewStyle, View, Text, TouchableOpacity } from 'react-native'

// Helpers
import { getWeekShortName } from 'helpers/dates'

// Styles & Assets
import { colors, positionStyles } from 'styles'
import styles from './styles'

interface Props {
  styleContainer?: ViewStyle | ViewStyle[]
  onChangeDate?: (date: Date, index: number) => void
  initialDate: Date
  activeDate?: number
}

const FiveDaysCalendar: React.FC<Props> = ({
  styleContainer,
  onChangeDate,
  initialDate,
}) => {
  const [activeDateIndex, setActiveDateIndex] = useState(0)

  const onDatePress = (date: Date, index: number) => {
    if (onChangeDate) {
      onChangeDate(date, index)
    }
    setActiveDateIndex(index)
  }

  const datesToShow = useMemo(() => {
    const tempDates = []
    for (let i = 0; i < 5; ++i) {
      const tempDate = new Date(initialDate.getTime() + 24 * 60 * 60 * 1000 * i)
      const tempWeekName = getWeekShortName(tempDate)
      tempDates.push({
        week: tempWeekName,
        date: tempDate.getDate(),
        fullDate: tempDate,
      })
    }
    return tempDates
  }, [initialDate])

  return (
    <View style={[styles.container, positionStyles.rowFill, styleContainer]}>
      {datesToShow.map((item, index) => (
        <TouchableOpacity
          key={`${item.date}_${item.week}`}
          onPress={() => onDatePress(item.fullDate, index)}
          style={[
            styles.dateItemContainer,
            activeDateIndex === index
              ? [{ backgroundColor: colors.YELLOW }, styles.shadow]
              : {},
          ]}
        >
          <Text
            style={[
              styles.weekText,
              activeDateIndex === index ? { color: colors.WHITE } : {},
            ]}
          >
            {item.week}
          </Text>
          <Text
            style={[
              styles.dateText,
              activeDateIndex === index ? { color: colors.WHITE } : {},
            ]}
          >
            {item.date}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default FiveDaysCalendar
