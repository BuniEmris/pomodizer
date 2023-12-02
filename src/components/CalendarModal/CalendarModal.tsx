import React, { useEffect } from 'react'

// Components
import DmView from 'components/UI/DmView'
import Modal from 'react-native-modal'
import 'moment/min/locales'
// Styles
import * as S from './styled.components'
import { Calendar } from 'react-native-calendars'
import { CalendarTheme } from 'styles/calendarTheme'

interface Props {
  isVisible: boolean
  onClose: () => void
  handleDateChange: (date: string) => void
  getToday: string
}

const CalendarModal: React.FC<Props> = ({
  getToday,
  isVisible,
  handleDateChange,
  onClose,
}) => {
  return (
    <Modal
      onBackdropPress={onClose}
      isVisible={isVisible}
      style={{ margin: 0 }}
    >
      <S.Container>
        <DmView>
          <Calendar
            current={getToday}
            theme={CalendarTheme}
            firstDay={1}
            onDayPress={(date) => {
              handleDateChange(date.dateString)
            }}
            enableSwipeMonths={true}
          />
        </DmView>
      </S.Container>
    </Modal>
  )
}

export default CalendarModal
