import { ColorScheme, ColorSchemeProvider, MantineProvider, MantineThemeOverride } from "@mantine/core";
import { createContext, useEffect, useState } from "react";
import { ColorConfig, GradientConfig, MantineUIThemeContext, MantineUIThemeProviderProps, NotifyConfig } from "../types";
import { defaultColors, defaultGradients, defaultNotify } from "./defaults";
import { useDeviceSize } from '../hooks/useDeviceSize';
import React from "react";
import { NotificationsProvider } from "@mantine/notifications";
import { AppContainerContextProvider } from "../components/appContainer/AppContainerContext";

export const MantineUIThemeContextInfo = createContext<MantineUIThemeContext>({
  applyGradients: false,
  colors: {...defaultColors},
  colorScheme: 'dark',
  gradients: {...defaultGradients},
  notify: {...defaultNotify},
  schemeOverrides: {} as Record<string, MantineThemeOverride>,
  toggleColorScheme: () => {}
});

export const MantineUIThemeProvider = (props: MantineUIThemeProviderProps) => {
  const [applyGradients, setApplyGradients] = useState<boolean>(false);
  const [colors, setColors] = useState<ColorConfig>({...defaultColors});
  const [gradients, setGradients] = useState<GradientConfig>({...defaultGradients});
  const [notify, setNotify] = useState<NotifyConfig>({...defaultNotify});
  const [scheme, setScheme] = useState<ColorScheme>('dark');
  const [overrides, setOverrides] = useState<Record<string, MantineThemeOverride>>({});
  const { deviceSize } = useDeviceSize();
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  const setColorScheme = (colorScheme: ColorScheme) => setScheme(colorScheme);

  const toggleColorScheme = () => {
    setColorScheme(scheme === 'dark' ? 'light' : 'dark');
    window.localStorage.setItem(props.appThemeName, scheme === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    setApplyGradients(props.applyGradients ?? false);
    if (props.colors) setColors({...defaultColors, ...props.colors});
    if (props.gradients) setGradients({...defaultGradients, ...props.gradients});
    if (props.notify) setNotify({...defaultNotify, ...props.notify});
    setOverrides(props.schemeOverrides ? {...props.schemeOverrides} : {});

    if (!hasChanged){
      let userPref: string | null = window.localStorage.getItem(props.appThemeName);

      if (!userPref) {
        userPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        window.localStorage.setItem(props.appThemeName, userPref);
      }

      setScheme(userPref === 'dark' ? 'dark' : 'light');
      setHasChanged(true);
    }

  }, [props])

  return 
  (
    <MantineUIThemeContextInfo.Provider
      value={{
        applyGradients: applyGradients,
        colors: colors,
        colorScheme: scheme,
        gradients: gradients,
        notify: notify,
        schemeOverrides: overrides,
        toggleColorScheme: toggleColorScheme,
      }}
    >
      <ColorSchemeProvider colorScheme={scheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{colorScheme: scheme}} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider
            autoClose={notify.autoClose}
            limit={notify.limit}
            position={notify.position}
            containerWidth={['xs', 'sm'].includes(deviceSize) ? 300 : 440}
          >
            <AppContainerContextProvider>
              {hasChanged && (
                <>
                {props.children}
                </>
              )}
            </AppContainerContextProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </MantineUIThemeContextInfo.Provider>
  );
}