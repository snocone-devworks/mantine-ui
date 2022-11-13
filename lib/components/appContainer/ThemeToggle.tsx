import { Box, Group, Switch, Text, useMantineTheme } from '@mantine/core';
import React from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useDeviceSize } from '../../hooks/useDeviceSize';
import { useMantineUITheme } from '../../hooks/useMantineUITheme';
import { useThemeColors } from '../../hooks/useThemeColors'
import { useContainerStyles } from './containerStyles';

const ThemeToggle = () => {
  const { textPrimary } = useThemeColors();
  const { toggleColorScheme } = useMantineUITheme();
  const { deviceSize } = useDeviceSize();
  const { classes } = useContainerStyles();
  const theme = useMantineTheme();

  if (['xs', 'sm'].includes(deviceSize)) {
    return (
      <Group style={{gap: '0rem'}}>
        <MdLightMode className={classes.smallIcon} style={{color: theme.colors.yellow[5]}} />
        <Switch 
          checked={true}
          size='md'
          color={theme.colorScheme === 'dark' ? 'violet' : 'yellow'}
          style={{marginLeft: '0.6rem', transform: theme.colorScheme === 'light' ? 'rotate(180deg)' : undefined}}
          onClick={() => toggleColorScheme()}
        />
        <MdDarkMode className={classes.smallIcon} style={{color: theme.colors.violet[5]}} />
      </Group>
    )
  }

  return (
    <Box
      sx={{
        border: theme.colorScheme === 'dark' ? `1px solid #fff` : `1px solid #000`,
        borderRadius: '1.2rem',
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.4rem 0.8rem',
        cursor: 'pointer'
      }}
      onClick={() => toggleColorScheme()}
    >
      <Text style={{color: textPrimary}}>
        {theme.colorScheme === 'dark' ? 'Light Theme' : 'Dark Theme'}
      </Text>
      {theme.colorScheme === 'dark' && (<MdLightMode className={classes.icon} />)}
      {theme.colorScheme === 'light' && (<MdDarkMode className={classes.icon} />)}
    </Box>
  )
}

export default ThemeToggle