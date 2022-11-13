import React from 'react';
import { MantineUIThemeContextInfo } from '../theme/Context';

export const useMantineUITheme = () => {
  const context = React.useContext(MantineUIThemeContextInfo);

  if (context === undefined) throw new Error('useMantineUITheme must be within a MantineUIThemeProvider');

  return context;
}