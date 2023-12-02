import styled from '@emotion/native'
import { minHeight } from 'styled-system'

export const ItemWrap = styled.TouchableOpacity<{ borderWidth?: number }>(({ borderWidth = 1 }) => ({
  flexDirection: 'row',
  borderBottomWidth: borderWidth,
  borderBottomColor: '#ccc',
  alignItems: 'center',
  minHeight: 45
}))
