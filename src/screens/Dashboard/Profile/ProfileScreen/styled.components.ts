import styled from '@emotion/native'
import DmView from 'components/UI/DmView'
import { colors } from 'styles'

export const Container = styled.ScrollView({
  // flex: 1,
  backgroundColor: colors.WHITE,
  paddingBottom: 30,
})
export const ContentWr = styled(DmView)({
  backgroundColor: colors.WHITE,
  paddingHorizontal: 18,
  paddingTop: 10,
})
