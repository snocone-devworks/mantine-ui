import { LoaderProps, MantineColor, MantineGradient, MantineNumberSize, ThemeIcon, ThemeIconVariant, Tooltip } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../theme';
import { ThemeColor } from '../theme/types';

type Props = {
  children: React.ReactNode;
  color: ThemeColor;
  disabled?: boolean;
  radius?: MantineNumberSize;
  size?: MantineNumberSize;
  loading?: boolean;
  loaderProps?: LoaderProps;
  tooltip?: string;
  variant?: ThemeIconVariant;
}

const ThemedIcon = (props: Props) => {
  const { colors, gradients, applyGradients } = useThemeContext();
  const [gradient, setGradient] = useState<MantineGradient>({ from: 'cyan', to: 'indigo' });
  const [color, setColor] = useState<MantineColor>('blue');

  useEffect(() => {
    if (props.color === 'error') setColor(colors.error);
    if (props.color === 'info') setColor(colors.info);
    if (props.color === 'primary') setColor(colors.primary);
    if (props.color === 'secondary') setColor(colors.secondary);
    if (props.color === 'success') setColor(colors.success);
    if (props.color === 'warn') setColor(colors.warn);
  }, [props.color, colors])

  useEffect(() => {
    if (props.color === 'error') setGradient(gradients.error);
    if (props.color === 'info') setGradient(gradients.info);
    if (props.color === 'primary') setGradient(gradients.primary);
    if (props.color === 'secondary') setGradient(gradients.secondary);
    if (props.color === 'success') setGradient(gradients.success);
    if (props.color === 'warn') setGradient(gradients.warn);
  }, [props.color, gradients])

  const iconVariant = (): ThemeIconVariant => {
    if (props.variant) return props.variant;
    if (!props.variant && applyGradients) return 'gradient';
    return 'filled';
  }

  if (props.tooltip) {
    return (
      <Tooltip
        withArrow
        title={props.tooltip}
        label={props.tooltip}
      >
        <ThemeIcon
          size={props.size}
          radius={props.radius ?? 'md'}
          color={props.variant !== 'gradient' ? color : undefined}
          gradient={props.variant === 'gradient' ? gradient : undefined}
          variant={iconVariant()}
        >
          {props.children}
        </ThemeIcon>
      </Tooltip>
    )
  }
  return (
    <ThemeIcon
      size={props.size}
      radius={props.radius ?? 'md'}
      color={props.variant !== 'gradient' ? color : undefined}
      gradient={props.variant === 'gradient' ? gradient : undefined}
      variant={iconVariant()}
    >
      {props.children}
    </ThemeIcon>
  )
}

export default ThemedIcon