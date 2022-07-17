import { ColorScheme, ColorSchemeProvider, MantineColor, MantineProvider, MantineThemeOverride, useMantineTheme } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import { createContext, useEffect, useState } from "react";
import { useBreakpoints } from "../hooks/useBreakpoints";
import { defaultColors, defaultGradients, defaultNotify } from "./defaults";
import { ColorConfig, Colors, GradientConfig, NotifyConfig, ThemeContext, ThemeProviderProps } from "./types";

export const ThemeContextInfo = createContext<ThemeContext>({
  applyGradients: false,
  colors: {...defaultColors},
  colorScheme: 'dark',
  gradients: {...defaultGradients},
  notify: {...defaultNotify},
  schemeOverrides: {} as Record<string, MantineThemeOverride>,
  toggleColorScheme: () => {}
});

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [shouldUseGradients, setShouldUseGradients] = useState<boolean>(false);
  const [colors, setColors] = useState<ColorConfig>({...defaultColors});
  const [gradients, setGradients] = useState<GradientConfig>({...defaultGradients});
  const [notify, setNotify] = useState<NotifyConfig>({...defaultNotify});
  const [scheme, setScheme] = useState<ColorScheme>('dark');
  const [overrides, setOverrides] = useState<Record<string, MantineThemeOverride>>({});
  const { deviceSize } = useBreakpoints();
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  
  const setColorScheme = (colorScheme: ColorScheme) => setScheme(colorScheme);

  const toggleColorScheme = () => {
    setColorScheme(scheme === 'dark' ? 'light' : 'dark');
    window.localStorage.setItem(props.appThemeName, scheme === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    setShouldUseGradients(props.applyGradients ? true : false);
    if (props.colors) setColors({...defaultColors, ...props.colors});
    if (props.gradients) setGradients({...defaultGradients, ...props.gradients});
    if (props.notify) setNotify({...defaultNotify, ...props.notify});
    setOverrides(props.schemeOverrides ? {...props.schemeOverrides} : {});

    if (!hasChanged) {
      let preference: string | null = window.localStorage.getItem(props.appThemeName);

      if (!preference) {
        preference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        window.localStorage.setItem(props.appThemeName, preference);
      }

      setScheme(preference === 'light' ? 'light' : 'dark');
      setHasChanged(true);
    }
  }, [props])

  return (
    <ThemeContextInfo.Provider
      value={{
        applyGradients: shouldUseGradients,
        colors: colors,
        colorScheme: scheme,
        gradients: gradients,
        notify: notify,
        schemeOverrides: overrides,
        toggleColorScheme: toggleColorScheme
      }}
    >
      <ColorSchemeProvider colorScheme={scheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            colorScheme: scheme
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider
            autoClose={notify.autoClose}
            limit={notify.limit}
            position={notify.position}
            containerWidth = {['xs', 'sm'].includes(deviceSize) ? 300 : 440}
          >
            {hasChanged && (
              <>
              {props.children}
              </>
            )}
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </ThemeContextInfo.Provider>
  )
}

export const useThemeContext = () => {
  const context = React.useContext(ThemeContextInfo);

  if (context === undefined) throw new Error('useThemeContext must be within a ThemeProvider');
  return context;
}

export const useToggleTheme = () => {
  const context = React.useContext(ThemeContextInfo);

  if (context === undefined) throw new Error('useToggleTheme must be within a ThemeProvider');
  return context.toggleColorScheme;
}

export const useThemeColors = () => {
  const theme = useMantineTheme();
  const context = useThemeContext();
  const [colors, setColors] = useState<Colors>({
    error: '#ffffff',
    info: '#ffffff',
    primary: '#ffffff',
    secondary: '#ffffff',
    success: '#ffffff',
    warn: '#ffffff',
  });

  const getMantineColor = (themeColor: MantineColor, index: number): MantineColor => {
    let returnColor = Object.entries(theme.colors).find(([key, value]) => key === themeColor);
    if (!returnColor || returnColor.length < 2) return theme.colors.blue[index];
    return returnColor[1][index];
  }

  const populateColors = () => {
    if (!context && !theme) return;
    const index: number = theme.colorScheme === 'dark' ? 5 : 7;

    if (context && theme) {
      setColors({
        error: getMantineColor(context.colors.error, index),
        info: getMantineColor(context.colors.info, index),
        primary: getMantineColor(context.colors.primary, index),
        secondary: getMantineColor(context.colors.secondary, index),
        success: getMantineColor(context.colors.success, index),
        warn: getMantineColor(context.colors.warn, index),
      })
    } else if (theme) {
      setColors({
        error: theme.colors.red[index],
        info: theme.colors.violet[index],
        primary: theme.colors.blue[index],
        secondary: theme.colors.pink[index],
        success: theme.colors.teal[index],
        warn: theme.colors.yellow[index]
      });
    }
  }

  useEffect(() => {
    populateColors();
  }, [])

  useEffect(() => {
    populateColors();
  }, [theme.colorScheme, context.colors])

  if (context === undefined) {
    throw new Error('useThemeColors must be within a ThemeProvider');
  }

  return colors;
}