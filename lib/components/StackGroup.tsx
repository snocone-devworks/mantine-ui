import { Group, GroupPosition, MantineNumberSize, Stack } from '@mantine/core';
import React, { useMemo } from 'react'
import { useDeviceSize } from '../hooks/useDeviceSize';
import { BreakpointName } from '../types';

type Props = {
  align?: React.CSSProperties['alignItems'];
  breakpoint: BreakpointName;
  children: React.ReactNode;
  grow?: boolean;
  noWrap?: boolean;
  position?: GroupPosition;
  spacing?: MantineNumberSize;
  style?: React.CSSProperties;
}

const StackGroup = (props: Props) => {
  const { deviceSize } = useDeviceSize();
  const direction = useMemo<'row' | 'column'>(() => {
    if (deviceSize === 'xs' && props.breakpoint === 'xs') return 'column';
    if (props.breakpoint === 'sm' && ['xs', 'sm'].includes(deviceSize)) return 'column';
    if (props.breakpoint === 'md' && ['xs', 'sm', 'md'].includes(deviceSize)) return 'column';
    if (props.breakpoint === 'lg' && ['xs', 'sm', 'md', 'lg'].includes(deviceSize)) return 'column';
    if (props.breakpoint === 'xl') return 'column';
    return 'row'
  }, [props.breakpoint, deviceSize])

  if (direction === 'column') {
    return (
      <Stack
        align={props.position}
        justify={props.align}
        spacing={props.spacing}
        style={props.style}
      >
        {props.children}
      </Stack>
    )
  }

  return (
    <Group
      align={props.align}
      grow={props.grow}
      noWrap={props.noWrap}
      position={props.position}
      spacing={props.spacing}
      style={props.style}
    >
      {props.children}
    </Group>
  )
}

export default StackGroup