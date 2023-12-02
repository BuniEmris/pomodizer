import styled, { css } from '@emotion/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const ModalStyle = css({
  justifyContent: 'flex-end',
  margin: 0,
})

export const Container = styled.View({
  backgroundColor: '#fff',
  borderTopRightRadius: 8,
  borderTopLeftRadius: 8,
  paddingBottom: 15 + getBottomSpace(),
  paddingTop: 10,
})
