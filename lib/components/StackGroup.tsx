import { Group, GroupPosition, MantineNumberSize } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { BreakpointName, useBreakpoints } from '../hooks/useBreakpoints';

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

const StackGroup = ({align, breakpoint, children, grow, noWrap, position, spacing, style}: Props) => {
  const { deviceSize } = useBreakpoints();
  const [direction, setDirection] = useState<'row' | 'column'>('row');
  
  useEffect(() => {
    let newDirection: 'row' | 'column' = 'row';

    if (breakpoint === 'xs' && deviceSize === 'xs') newDirection = 'column';
    if (breakpoint === 'sm' && ['xs', 'sm'].includes(deviceSize)) newDirection = 'column';
    if (breakpoint === 'md' && ['xs', 'sm', 'md'].includes(deviceSize)) newDirection = 'column';
    if (breakpoint === 'lg' && ['xs', 'sm', 'md', 'lg'].includes(deviceSize)) newDirection = 'column';
    if (breakpoint === 'xl') newDirection = 'column';

    setDirection(newDirection);
  }, [deviceSize, breakpoint])

  return (
    <Group
      align={align}
      direction={direction}
      grow={grow}
      noWrap={noWrap}
      position={position}
      spacing={spacing}
      style={style}
    >
      {children}
    </Group>
  )
}

export default StackGroup