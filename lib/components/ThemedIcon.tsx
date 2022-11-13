import { LoaderProps, MantineColor, MantineGradient, MantineNumberSize, ThemeIcon, ThemeIconVariant, Tooltip } from '@mantine/core';
import React, { useMemo } from 'react'
import { useMantineUITheme } from '../hooks/useMantineUITheme';
import { ThemeColor } from '../types';

type Props = {
  children: React.ReactNode;
  className?: string;
  color: ThemeColor;
  disabled?: boolean;
  loading?: boolean;
  loaderProps?: LoaderProps;
  radius?: MantineNumberSize;
  size?: MantineNumberSize;
  style?: React.CSSProperties;
  tooltip?: React.ReactNode;
  variant?: ThemeIconVariant;
}

const ThemedIcon = React.forwardRef<HTMLDivElement | null, Props>((props, ref) => {
  const { colors, gradients, applyGradients } = useMantineUITheme();
  const color = useMemo<MantineColor>(() => colors[props.color], [props.color, colors])
  const gradient = useMemo<MantineGradient>(() => gradients[props.color], [props.color, gradients])
  const variant = useMemo<ThemeIconVariant>(() => {
    if (props.variant) return props.variant;
    return applyGradients ? 'gradient' : 'filled';
  }, [props.variant, applyGradients])

  return (
    <Tooltip
      withArrow
      withinPortal
      disabled={props.disabled}
      label={props.tooltip}
    >
      <ThemeIcon
        ref={ref}
        size={props.size ?? 'md'}
        radius={props.size ?? 'md'}
        color={variant === 'gradient' ? undefined : color}
        variant={variant}
        style={props.style}
        gradient={variant === 'gradient' ? gradient : undefined}
      >
        {props.children}
      </ThemeIcon>
    </Tooltip>
  )
})

ThemedIcon.displayName = 'ThemedIcon';

export default ThemedIcon