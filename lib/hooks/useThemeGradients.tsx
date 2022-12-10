import { MantineColor, MantineTheme, useMantineTheme } from "@mantine/core"
import { useMemo } from "react";
import { defaultGradients } from "../theme/defaults";
import { Gradients } from "../types";
import { useMantineUITheme } from "./useMantineUITheme";

const getMantineColor = (theme: MantineTheme, themeColor: MantineColor, index: number): MantineColor => {
  if (themeColor === 'blue') return theme.colors.blue[index];
  if (themeColor === 'red') return theme.colors.red[index];
  if (themeColor === 'cyan') return theme.colors.cyan[index];
  if (themeColor === 'dark') return theme.colors.dark[index];
  if (themeColor === 'grape') return theme.colors.grape[index];
  if (themeColor === 'gray') return theme.colors.gray[index];
  if (themeColor === 'green') return theme.colors.green[index];
  if (themeColor === 'lime') return theme.colors.lime[index];
  if (themeColor === 'indigo') return theme.colors.indigo[index];
  if (themeColor === 'orange') return theme.colors.orange[index];
  if (themeColor === 'pink') return theme.colors.pink[index];
  if (themeColor === 'teal') return theme.colors.teal[index];
  if (themeColor === 'violet') return theme.colors.violet[index];
  if (themeColor === 'yellow') return theme.colors.yellow[index];

  return theme.colors.blue[index];
}

export const useThemeGradients = () => {
  const theme = useMantineTheme();
  const uiTheme = useMantineUITheme();
  const gradients = useMemo<Gradients>(() => {
    if (!uiTheme) return {...defaultGradients};
    if (!theme) return {...defaultGradients};

    const index = theme.colorScheme === 'dark' ? 5 : 7;

    let returnItem = {
      brand: { from: getMantineColor(theme, uiTheme.gradients.brand.from, index), to: getMantineColor(theme, uiTheme.gradients.brand.to, index)},
      error: { from: getMantineColor(theme, uiTheme.gradients.error.from, index), to: getMantineColor(theme, uiTheme.gradients.error.to, index)},
      info: { from: getMantineColor(theme, uiTheme.gradients.info.from, index), to: getMantineColor(theme, uiTheme.gradients.info.to, index)},
      primary: { from: getMantineColor(theme, uiTheme.gradients.primary.from, index), to: getMantineColor(theme, uiTheme.gradients.primary.to, index)},
      secondary: { from: getMantineColor(theme, uiTheme.gradients.secondary.from, index), to: getMantineColor(theme, uiTheme.gradients.secondary.to, index)},
      success: { from: getMantineColor(theme, uiTheme.gradients.success.from, index), to: getMantineColor(theme, uiTheme.gradients.success.to, index)},
      warn: { from: getMantineColor(theme, uiTheme.gradients.warn.from, index), to: getMantineColor(theme, uiTheme.gradients.warn.to, index)},
    }

    return returnItem;
  }, [theme, uiTheme])

  if (!uiTheme) throw new Error('useThemeColors must be used within a MantineUIThemeProvider');

  return gradients;
}