import styled from '@emotion/native'
import DmView from 'components/UI/DmView'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { colors } from 'styles'

export const ScrollContainer = styled(KeyboardAwareScrollView)({
  backgroundColor: colors.FAUX_GHOST
})

export const ContentWr = styled(DmView)({
  backgroundColor: colors.WHITE,
  paddingHorizontal: 20,
  paddingVertical: 10
})
