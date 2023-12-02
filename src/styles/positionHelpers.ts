import { ViewStyle } from 'react-native'

export const fill: ViewStyle = {
  flex: 1,
}

export const center: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
}

export const fillCenter: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}

export const columnSpaceBetwen: ViewStyle = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
}

export const alighCenter: ViewStyle = {
  alignItems: 'center',
}

export const row: ViewStyle = {
  flexDirection: 'row',
}

export const rowStart: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
}

export const rowCenter: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}

export const rowEnd: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
}

export const rowFill: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export const rowAround: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
}

export const absolute: ViewStyle = {
  position: 'absolute',
}

export const absoluteCenter: ViewStyle = {
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 100,
}

export const width100: ViewStyle = {
  width: '100%',
}
