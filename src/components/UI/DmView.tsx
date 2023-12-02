import React from 'react'
import styled from '@emotion/native'
import {
  space,
  layout,
  flexbox,
  SpaceProps,
  FlexboxProps,
  LayoutProps,
} from 'styled-system'
import { ViewProps } from 'react-native'

const PressableEL = styled.Pressable<SpaceProps | FlexboxProps | LayoutProps>(
  space,
  layout,
  flexbox
)
const ViewEL = styled.View<SpaceProps | FlexboxProps | LayoutProps>(
  space,
  layout,
  flexbox
)

interface Props extends SpaceProps, FlexboxProps, LayoutProps, ViewProps {
  onPress?: () => void
  disabled?: boolean
}

const DmView: React.FC<Props> = ({
  onPress,
  disabled,
  ...restProps
}: Props) => {
  if (onPress) {
    return <PressableEL onPress={onPress} disabled={disabled} {...restProps} />
  }

  return <ViewEL {...restProps} />
}

export default DmView
