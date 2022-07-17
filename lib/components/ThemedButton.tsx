import { Button, ButtonVariant, MantineColor, MantineGradient, SharedButtonProps, Tooltip } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../theme';
import { ThemeColor } from '../theme/types';
import { Callback } from '../types/Callback';

interface Props extends SharedButtonProps {
  children: React.ReactNode;
  color: ThemeColor;
  disabled?: boolean;
  tooltip?: string;
  onClick(): Callback<void>;
}

const ThemedButton = (props: Props) => {
  if (props.tooltip && !props.disabled) {
    return (
      <Tooltip
        withArrow
        title={props.tooltip}
        label={props.tooltip}
      >
        <ButtonComponent {...props}>
          {props.children}
        </ButtonComponent>
      </Tooltip>
    )
  }
  return (
    <ButtonComponent {...props}>
      {props.children}
    </ButtonComponent>
  )
}

const ButtonComponent = (props: Props) => {
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

  const buttonVariant = (): ButtonVariant | undefined => {
    if (props.disabled) return 'default';
    if (props.variant) return props.variant;
    if (applyGradients) return 'gradient';
    if (!props.variant) return 'filled';
    return undefined;
  }

  if (props.tooltip) {
    return (
      <Tooltip
        withArrow
        title={props.tooltip}
        label={props.tooltip}
      >
        <Button
          color={props.variant !== 'gradient' ? color : undefined}
          size={props.size}
          type={props.type}
          leftIcon={props.leftIcon}
          rightIcon={props.rightIcon}
          fullWidth={props.fullWidth}
          radius={props.radius ?? 'md'}
          variant={buttonVariant()}
          gradient={buttonVariant() === 'gradient' ? gradient : undefined}
          uppercase={props.uppercase}
          compact={props.compact}
          loading={props.loading}
          loaderProps={props.loaderProps}
          loaderPosition={props.loaderPosition}
          disabled={props.disabled}
          onClick={() => props.onClick()}
        >
          {props.children}
        </Button>
      </Tooltip>
    )
  }

  return (
    <Button
      color={props.variant !== 'gradient' ? color : undefined}
      size={props.size}
      type={props.type}
      leftIcon={props.leftIcon}
      rightIcon={props.rightIcon}
      fullWidth={props.fullWidth}
      radius={props.radius ?? 'md'}
      variant={buttonVariant()}
      gradient={buttonVariant() === 'gradient' ? gradient : undefined}
      uppercase={props.uppercase}
      compact={props.compact}
      loading={props.loading}
      loaderProps={props.loaderProps}
      loaderPosition={props.loaderPosition}
      disabled={props.disabled}
      onClick={() => props.onClick()}
    >
      {props.children}
    </Button>
  )
}

export default ThemedButton