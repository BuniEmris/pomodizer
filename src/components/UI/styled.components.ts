import styled from '@emotion/native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { bottom } from 'styled-system'
import { colors, typo } from 'styles'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from 'styles/helpers'
import { space, SpaceProps } from 'styled-system'
import { StyleSheet } from 'react-native'

export const IconBtn = styled.TouchableOpacity({
  flexDirection: 'row',
  alignItems: 'center',
  // paddingRight: 5,
})

export const InlineTextInput = styled.TextInput(space, {
  ...typo.bodyR14,
  color: colors.DARK_GREY,
})

export const stylesActionBtn = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.LIME,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: -4,
    ...typo.bodyM16,
    letterSpacing: 0.2,
    color: colors.WHITE,
  },
})
