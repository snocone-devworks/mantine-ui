import React from 'react'
import { ActionIconVariant, ColorScheme, MantineColor, MantineGradient, MantineNumberSize, MantineThemeOverride } from '@mantine/core';
import { AnimationControls, Target, TargetAndTransition, Transition, VariantLabels, Variants } from 'framer-motion';

export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ExpansionProps = {
  className?: string;
  color: ThemeColor;
  iconSize?: string | number;
  initialState?: 'collapsed' | 'expanded';
  radius?: MantineNumberSize;
  size?: MantineNumberSize;
  style?: React.CSSProperties;
  variant?: ActionIconVariant | 'gradient';
}

export type ExpansionButtonProps = {
  className?: string;
  color: ThemeColor;
  iconSize?: string | number;
  radius?: MantineNumberSize;
  size?: MantineNumberSize;
  style?: React.CSSProperties;
  variant?: ActionIconVariant | 'gradient';
}

export type ThemeColor = 'brand' | 'error' | 'info' | 'primary' | 'secondary' | 'success' | 'textPrimary' | 'warn';
export type ThemeGradient = 'brand' | 'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warn';
export type NotifyType = 'error' | 'info' | 'loading' | 'success';
export type NotifyPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type MessageWrapper = (message: string) => string;

export type IconsConfig = {
  error: React.ReactNode;
  info: React.ReactNode;
  success: React.ReactNode;
}

export type MessageWrappersConfig = {
  error: MessageWrapper;
  info: MessageWrapper;
  loading: MessageWrapper;
  success: MessageWrapper;
}

export type MotionConfig = {
  initial?: boolean | Target | VariantLabels;
  animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean;
  exit?: TargetAndTransition | VariantLabels;
  mode?: 'wait' | 'sync' | 'popLayout';
  variants?: Variants;
  transition: Transition;
}

export type NotifyConfig = {
  autoClose: number;
  limit: number;
  position: NotifyPosition;
  icons: Partial<IconsConfig>;
  messageWrappers: Partial<MessageWrappersConfig>;
}

export type ColorConfig = Record<ThemeColor, MantineColor>;
export type GradientConfig = Record<ThemeColor, MantineGradient>;
export type Colors = Record<ThemeColor, string>;
export type Gradients = Record<ThemeGradient, { from: string, to: string }>;

export type MantineUIThemeContext = {
  applyGradients: boolean;
  colors: ColorConfig;
  colorScheme: ColorScheme;
  gradients: GradientConfig;
  notify: NotifyConfig;
  schemeOverrides: Record<string, MantineThemeOverride>;
  toggleColorScheme(): void | Promise<void>;
}

export type MantineUIThemeProviderProps = {
  applyGradients?: boolean;
  appThemeName: string;
  children?: React.ReactNode;
  colors?: Partial<ColorConfig>;
  gradients?: Partial<GradientConfig>;
  notify?: Partial<NotifyConfig>;
  schemeOverrides?: Record<string, MantineThemeOverride>;
}