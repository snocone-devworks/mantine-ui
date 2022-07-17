import { ColorScheme, MantineColor, MantineGradient, MantineThemeOverride } from "@mantine/core";
import React from "react";

export type ThemeColor = 'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warn';
export type NotifyType = 'error' | 'info' | 'loading' | 'success';
export type NotifyPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
export type MessageWrapper = (message: string) => string;

export type NotifyConfig = {
  autoClose: number;
  limit: number;
  position: NotifyPosition;
  icons: Partial<{ error: React.ReactNode, info: React.ReactNode, success: React.ReactNode }>
  messageWrappers: Partial<{ error: MessageWrapper, info: MessageWrapper, loading: MessageWrapper, success: MessageWrapper }>
}

export type ColorConfig = Record<ThemeColor, MantineColor>;
export type GradientConfig = Record<ThemeColor, MantineGradient>;
export type Colors = Record<ThemeColor, string>;
export type ThemeContext = {
  applyGradients: boolean;
  colors: ColorConfig;
  colorScheme: ColorScheme;
  gradients: GradientConfig;
  notify: NotifyConfig;
  schemeOverrides: Record<string, MantineThemeOverride>;
  toggleColorScheme(): void;
}

export type ThemeProviderProps = {
  applyGradients?: boolean;
  appThemeName: string;
  children?: React.ReactNode;
  colors?: Partial<ColorConfig>;
  gradients?: Partial<GradientConfig>;
  notify?: Partial<NotifyConfig>;
  schemeOverrides?: Record<string, MantineThemeOverride>;
}