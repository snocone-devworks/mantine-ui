import { Button, ButtonProps, ButtonVariant, MantineColor, MantineGradient, Tooltip } from '@mantine/core'
import React, { useMemo } from 'react'
import { useMantineUITheme } from '../hooks/useMantineUITheme';
import { ThemeColor } from '../types';

interface Props extends ButtonProps {
  children: React.ReactNode;
  color: ThemeColor;
  disabled?: boolean;
  tooltip?: React.ReactNode;
  onClick(): void | Promise<void>;
}

const ThemedButton = React.forwardRef<HTMLButtonElement | null, Props>((props, ref) => {
  const { colors, gradients, applyGradients } = useMantineUITheme();
  const color = useMemo<MantineColor>(() => colors[props.color], [props.color, colors])
  const gradient = useMemo<MantineGradient>(() => gradients[props.color], [props.color, gradients])
  const variant = useMemo<ButtonVariant | undefined>(() => {
    if (props.disabled) return 'default';
    if (props.variant) return props.variant;
    if (applyGradients) return 'gradient';
    if (!props.variant) return 'filled';
    return undefined;
  }, [props.disabled, props.variant, applyGradients])

  return (
    <Tooltip
      withArrow
      withinPortal
      disabled={props.disabled}
      label={props.tooltip}
    >
      <Button
        ref={ref}
        color={props.variant === 'gradient' ? undefined : color}
        disabled={props.disabled}
        gradient={variant === 'gradient' ? gradient : undefined}
        size={props.size}
        radius={props.radius ?? 'md'}
        loading={props.loading}
        loaderProps={props.loaderProps}
        variant={variant}
        uppercase={props.uppercase}
        fullWidth={props.fullWidth}
        leftIcon={props.leftIcon}
        rightIcon={props.rightIcon}
        type={props.type}
        compact={props.compact}
        loaderPosition={props.loaderPosition}
        style={props.style}
        onClick={() => props.onClick()}
      >
        {props.children}
      </Button>
    </Tooltip>
  )
})

ThemedButton.displayName = 'ThemedButton';

export default ThemedButton