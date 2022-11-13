import { ActionIcon, ActionIconVariant, LoaderProps, MantineColor, MantineGradient, MantineNumberSize, Tooltip } from '@mantine/core';
import React, { useMemo } from 'react'
import { useMantineUITheme } from '../hooks/useMantineUITheme';
import { ThemeColor } from '../types';
import ThemedIcon from './ThemedIcon';

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
  variant?: ActionIconVariant | 'gradient';
  onClick(): void | Promise<void>;
}

const ThemedActionIcon = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { colors, gradients, applyGradients } = useMantineUITheme();
  const color = useMemo<MantineColor>(() => colors[props.color], [props.color, colors])
  const gradient = useMemo<MantineGradient>(() => gradients[props.color], [props.color, gradients])
  const variant = useMemo<ActionIconVariant | undefined>(() => {
    if (props.variant === 'subtle') return 'subtle';
    if (props.variant === 'light') return 'light';
    if (props.variant === 'outline') return 'outline';
    if (props.variant && ['gradient', 'transparent'].includes(props.variant)) return 'transparent';
    return 'filled';
  }, [props.variant])
  const isGradient = useMemo<boolean>(() => {
    if (!gradient || props.disabled) return false;
    if (props.variant === 'gradient' || (!props.variant && applyGradients)) return true;
    return false;
  }, [gradient, props.disabled, props.variant, applyGradients])

  return (
    <Tooltip
      withArrow
      withinPortal
      label={props.tooltip}
      disabled={props.disabled}
    >
      <ActionIcon
        ref={ref}
        className={props.className}
        color={color}
        disabled={props.disabled}
        size={props.size}
        radius={props.radius ?? 'md'}
        loading={props.loading}
        loaderProps={props.loaderProps}
        variant={variant}
        style={props.style}
        onClick={() => props.onClick()}
      >
        {isGradient && (
          <ThemedIcon
            color={props.color}
            variant='gradient'
            radius={props.radius}
            size={props.size}
            loading={props.loading}
            loaderProps={props.loaderProps}
          >
            {props.children}  
          </ThemedIcon>
        )}
        {!isGradient && (
          <>
          {props.children}
          </>
        )}
      </ActionIcon>
    </Tooltip>
  )
});

ThemedActionIcon.displayName = 'ThemedActionIcon';

export default ThemedActionIcon