import { ActionIcon, ActionIconVariant, LoaderProps, MantineColor, MantineGradient, MantineNumberSize, ThemeIconVariant, Tooltip } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../theme';
import { ThemeColor } from '../theme/types';
import ThemedIcon from './ThemedIcon';

type Props = {
  children: React.ReactNode;
  color: ThemeColor;
  disabled?: boolean;
  radius?: MantineNumberSize;
  size?: MantineNumberSize;
  loading?: boolean;
  loaderProps?: LoaderProps;
  tooltip?: string;
  variant?: ActionIconVariant | 'gradient';
  onClick(): void | Promise<void>;
}

const ThemedActionIcon = (props: Props) => {
  if (props.tooltip && !props.disabled) {
    return (
      <Tooltip
        withArrow
        label={props.tooltip}
        title={props.tooltip}
      >
        <IconButton {...props}>
          {props.children}
        </IconButton>
      </Tooltip>
    )
  }
  return (
    <IconButton {...props}>
      {props.children}
    </IconButton>
  )
}

const IconButton = (props: Props) => {
  const { colors, gradients, applyGradients } = useThemeContext();
  const [gradient, setGradient] = useState<MantineGradient>({ from: 'cyan', to: 'indigo' });
  const [actionVariant, setActionVariant] = useState<ActionIconVariant | undefined>(undefined);
  const [iconVariant, setIconVariant] = useState<ThemeIconVariant | undefined>(undefined);
  const [color, setColor] = useState<MantineColor>('blue');

  useEffect(() => {
    setColor(colors[props.color]);
  }, [props.color, colors])

  useEffect(() => {
    setGradient(gradients[props.color]);
  }, [props.color, gradients])

  useEffect(() => {
    switch(props.variant) {
      case 'hover':
        setActionVariant('hover');
        break;
      case 'light':
        setActionVariant('light');
        break;
      case 'outline':
        setActionVariant('outline');
        break;
      case 'gradient':
      case 'transparent':
        setActionVariant('transparent');
        break;
      default:
        setActionVariant('filled');
        break;
    }

  }, [props.variant])

  const isGradient = (): boolean => {
    if (!gradient || props.disabled) return false;
    if (props.variant === 'gradient' || (!props.variant && applyGradients)) return true;
    return false;
  }

  if (props.tooltip) {
    return (
      <ActionIcon
        disabled={props.disabled}
        size={props.size}
        color={color}
        radius={props.radius ?? 'md'}
        loaderProps={props.loaderProps}
        loading={props.loading}
        variant={actionVariant}
        onClick={() => props.onClick()}
      >
        {isGradient() && (
          <ThemedIcon
            color={props.color}
            variant='gradient'
            radius={props.radius}
            size={props.size}
            loading={props.loading}
            loaderProps={props.loaderProps}
            tooltip={props.tooltip}
          >
            {props.children}
          </ThemedIcon>
        )}
        {!isGradient() && (
          <>
          {props.children}
          </>
        )}
      </ActionIcon>
    )
  }


  return (
    <ActionIcon
      disabled={props.disabled}
      size={props.size}
      color={color}
      radius={props.radius ?? 'md'}
      loaderProps={props.loaderProps}
      loading={props.loading}
      variant={actionVariant}
      onClick={() => props.onClick()}
    >
      {isGradient() && (
        <ThemedIcon
          color={props.color}
          variant='gradient'
          radius={props.radius}
          size={props.size}
          loading={props.loading}
          loaderProps={props.loaderProps}
          tooltip={props.tooltip}
        >
          {props.children}
        </ThemedIcon>
      )}
      {!isGradient() && (
        <>
        {props.children}
        </>
      )}
    </ActionIcon>

  )
}

export default ThemedActionIcon