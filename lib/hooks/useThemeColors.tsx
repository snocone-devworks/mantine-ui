import { MantineColor, MantineTheme, useMantineTheme } from "@mantine/core";
import { useMemo } from "react";
import { defaultColors } from "../theme/defaults";
import { Colors } from "../types";
import { useMantineUITheme } from "./useMantineUITheme"

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

export const useThemeColors = () => {
  const theme = useMantineTheme();
  const uiTheme = useMantineUITheme();
  const colors = useMemo<Colors>(() => {
    if (!uiTheme) return {...defaultColors};
    if (!theme) return {...defaultColors};

    const index = theme.colorScheme === 'dark' ? 5 : 7;

    let returnItem = {
      brand: getMantineColor(theme, uiTheme.colors.brand, index),
      error: getMantineColor(theme, uiTheme.colors.error, index),
      info: getMantineColor(theme, uiTheme.colors.info, index),
      primary: getMantineColor(theme, uiTheme.colors.primary, index),
      secondary: getMantineColor(theme, uiTheme.colors.secondary, index),
      success: getMantineColor(theme, uiTheme.colors.success, index),
      textPrimary: theme.colorScheme === 'dark' ? theme.white : theme.black,
      warn: getMantineColor(theme, uiTheme.colors.warn, index),
    }

    return returnItem;
  }, [theme, uiTheme]);

  if (!uiTheme) throw new Error('useThemeColors must be used within a MantineUIThemeProvider');

  return colors;
}