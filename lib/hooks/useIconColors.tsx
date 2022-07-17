import { useMantineTheme } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useThemeColors } from '../theme';
import { ThemeColor } from '../theme/types'

export const useIconColors = (primary: ThemeColor | 'textPrimary' | undefined, secondary: ThemeColor | 'textPrimary' | undefined) => {
  const theme = useMantineTheme();
  const colors = useThemeColors();
  const [textColor, setTextColor] = useState<string>(theme.colorScheme === 'dark' ? theme.white : theme.black);
  const [textColor2, setTextColor2] = useState(theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.gray[6])
  const [primaryColor, setPrimaryColor] = useState<string>(colors.primary);
  const [secondaryColor, setSecondaryColor] = useState<string>(colors.secondary);

  useEffect(() => {
    setTextColor(theme.colorScheme === 'dark' ? theme.white : theme.black);
  }, [theme])

  useEffect(() => {
    setTextColor2(theme.colorScheme === 'dark' ? theme.colors.gray[6] : theme.colors.gray[4]);
  }, [theme])

  useEffect(() => {
    if (!primary) {
      setPrimaryColor(colors.primary);
      return;
    }

    let color: string = primary !== 'textPrimary' ? colors[primary] : theme.colorScheme === 'dark' ? theme.white : theme.black;
    console.log({ primary: primary, color: color });
    if (primary) setPrimaryColor(color);
  }, [primary, theme, colors])

  useEffect(() => {
    if (!secondary) {
      setSecondaryColor(colors.secondary)
      return;
    }

    let color: string = secondary !== 'textPrimary' ? colors[secondary] : theme.colorScheme === 'dark' ? theme.white : theme.black;
    console.log({ secondary: secondary, color: color });
    if (secondary) setSecondaryColor(color);
  }, [secondary, theme, colors])

  return { primaryColor, secondaryColor, textColor, textColor2 }


}