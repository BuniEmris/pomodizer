import React from 'react'

// Components
import { Text } from 'react-native'
import DmView from 'components/UI/DmView'
import DmText from 'components/UI/DmText'

// Styles
import * as S from './styled.components'
import { colors, typo } from 'styles'

interface Props {
  value: number
  label: string
}

const StatsItemHorizontal: React.FC<Props> = ({ value, label }) => {
  return (
    <DmView marginY={20} flexDirection="row" alignItems="center">
      <DmText
        marginRight={5}
        color={colors.DARK_GREY}
        style={{ ...typo.bodyB15 }}
      >
        {label}
      </DmText>
      <DmText style={{ ...typo.bodySB16 }} color={colors.GREEN}>
        {value}
      </DmText>
    </DmView>
  )
}

export default StatsItemHorizontal
