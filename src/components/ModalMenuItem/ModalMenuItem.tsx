import DmText from 'components/UI/DmText'
import DmView from 'components/UI/DmView'
import React from 'react'

// Components
import { Text, TouchableOpacityProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import { colors } from 'styles'

// Styles
import * as S from './styled.components'

interface Props extends TouchableOpacityProps {
  iconName?: string
  label: string
  withBorder?: boolean
  color?: string
}

const ModalMenuItem: React.FC<Props> = ({
  withBorder = true,
  iconName,
  label,
  children,
  color,
  onPress,
}) => {
  return (
    <S.ItemWrap borderWidth={withBorder ? 1 : 0} onPress={onPress}>
      {!!iconName && (
        <DmView marginRight={10}>
          <Icon name={iconName} size={20} color={color || colors.DARK_GREY} />
        </DmView>
      )}
      <DmText fontSize={15} color={color || colors.DARK_GREY}>
        {label}
      </DmText>
      {children}
    </S.ItemWrap>
  )
}

export default ModalMenuItem
