import styled from '@emotion/native'
import { colors } from 'styles'

export const ItemWr = styled.TouchableOpacity<{ isSimple?: boolean }>(
  ({ isSimple }) => ({
    backgroundColor: colors.WHITE,
    height: isSimple ? 45 : 70,
    borderRadius: 8,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'rgba(195, 199, 220, 0.26)',
    shadowOffset: {
      width: 6,
      height: 0,
    },
    shadowRadius: 30,
    shadowOpacity: 0.3,
    elevation: 1,
  })
)

export const Line = styled.View({})
