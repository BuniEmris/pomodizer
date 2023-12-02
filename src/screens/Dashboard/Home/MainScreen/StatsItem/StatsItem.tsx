import React, { useMemo, useState } from 'react'

// Components
import { Text, TouchableOpacity } from 'react-native'
import DmView from 'components/UI/DmView'
import DmText from 'components/UI/DmText'

// Hooks
import usePremium from 'hooks/usePremium'

// Styles
import * as S from './styled.components'
import { colors, typo } from 'styles'
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { isIOs } from 'styles/helpers'
import navigationService from 'navigation/navigationService'

interface Props {
  value: number
  label: string
}

const valInitYPosition = isIOs ? 28.5 : 31

const StatsItem: React.FC<Props> = ({ value, label }) => {
  const { checkPremium } = usePremium()

  const handlePress = () => {
    checkPremium(() =>
      navigationService.navigate('Profile', {
        screen: 'Statistics',
      })
    )
  }

  return (
    <DmView alignItems="center">
      <TouchableOpacity onPress={handlePress}>
        <DmText
          marginBottom={9}
          color={colors.DARK_GREY}
          style={{ ...typo.bodyB13 }}
        >
          {`${label}    `}
          <DmText style={{ ...typo.bodySB16 }} color={colors.GREEN}>
            {value}
          </DmText>
        </DmText>
      </TouchableOpacity>
    </DmView>
  )
}

export default StatsItem
