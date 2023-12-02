import styled from '@emotion/native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { bottom } from 'styled-system'
import { colors } from 'styles'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from 'styles/helpers'

export const Container = styled.View({
  padding: 10,
  flex: 1,
  backgroundColor: colors.WHITE,
  ...ifIphoneX(
    {
      paddingTop: 50,
    },
    {
      paddingTop: 20,
    }
  ),
})
export const ScrollContainer = styled.ScrollView({})

export const ContainerSimple = styled.Pressable({
  width: 100,
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  padding: 5,
  borderRadius: 50,
  left: 14,
  height: 100,
  bottom: 94,
  shadowColor: 'rgba(27, 147, 96, 0.1)',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 1,
  shadowRadius: 10,
  elevation: 1,
  paddingHorizontal: 20,
  paddingVertical: 10,
})
