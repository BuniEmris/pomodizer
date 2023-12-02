import React, { Component } from 'react'

// Components
import { Text } from 'react-native'
import DmText from './DmText'

// Styles
import * as S from './styled.components'
import { colors } from 'styles'
import { HIT_SLOT_DEFAULT } from 'styles/helpers'

interface Props {
  onPress?: () => void
  Icon: React.ComponentType<any>
  label?: string
  reverse?: boolean
}

const IconBtn: React.FC<Props> = ({ reverse, label, onPress, Icon }) => {
  return (
    <S.IconBtn onPress={onPress} hitSlop={HIT_SLOT_DEFAULT}>
      {reverse && !!label && (
        <DmText color={colors.DARK_GREY} fontSize={14} marginRight={10}>
          {label}
        </DmText>
      )}
      <Icon />
      {!reverse && !!label && (
        <DmText color={colors.DARK_GREY} fontSize={14} marginLeft={10}>
          {label}
        </DmText>
      )}
    </S.IconBtn>
  )
}

export default IconBtn
