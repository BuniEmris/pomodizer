import styled from '@emotion/native'
import { DmView } from 'components/UI'
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { SCREEN_WIDTH } from 'styles/helpers'

export const Container = styled(DmView)({
  backgroundColor: 'white',
  paddingHorizontal: 30,
  paddingBottom: 20,
  paddingTop: 30 + getStatusBarHeight(),
  position: 'absolute',
  width: '100%',
  top: 0,
})
