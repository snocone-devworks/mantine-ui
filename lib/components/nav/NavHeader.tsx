import { Burger, Center, Grid, Header, Sx, Title, useMantineTheme } from '@mantine/core';
import React, { useEffect, useMemo } from 'react'
import { useDeviceSize } from '../../hooks/useDeviceSize';
import { useContainerStyles } from '../appContainer/containerStyles';
import ThemeToggle from '../appContainer/ThemeToggle';
import NavDrawer from './NavDrawer';
import { useDrawerState } from './useDrawerState';

type Props = {
  appName?: React.ReactNode;
  avatar?: React.ReactNode;
  className?: string;
  displayThemeToggle?: boolean;
  logo?: React.ReactNode;
  headerContent?: React.ReactNode;
  drawerContent?: React.ReactNode;
  sx?: Sx | (Sx | undefined)[];
}

const NavHeader = (props: Props) => {
  const [opened, setOpened] = useDrawerState(state => [state.opened, state.setOpened]);
  const { deviceSize } = useDeviceSize();
  const isSmall = useMemo<boolean>(() => ['xs', 'sm'].includes(deviceSize), [deviceSize]);
  const theme = useMantineTheme();
  const { classes } = useContainerStyles();
  const headerStyles = useMemo<Sx | (Sx | undefined)[]>(() => {
    return {
      color: theme.colorScheme === 'dark' ? '#fff' : '000',
      position: 'sticky',
      ...props.sx
    }
  }, [props.sx, theme])

  const showBurger = useMemo<boolean>(() => {
    if (isSmall) {
      return props.avatar || props.drawerContent || props.displayThemeToggle ? true : false;
    }

    return props.drawerContent !== undefined;
  }, [deviceSize, props])

  return (
    <Header
      className={props.className}
      height='fit-content'
      p='md'
      sx={headerStyles}
    >
      <div style={{display: 'flex', alignItems: 'center', height: '100%', paddingRight: '1rem'}}>
        {showBurger && (
          <Burger 
            opened={opened}
            onClick={() => setOpened(!opened)}
            size='md'
            color={theme.colorScheme === 'dark' ? theme.white : theme.black}
            mr='xl'
          />
        )}
        {props.logo}
        {props.appName && !isSmall && (
          <Center>
            <Title order={2} style={{marginLeft: '1rem'}}>
              {props.appName}
            </Title>
          </Center>
        )}
        <Grid className={classes.headerContent}>
          {props.headerContent}
        </Grid>
        <Grid className={classes.toggleContent}>
          {props.displayThemeToggle && !isSmall && (
            <ThemeToggle />
          )}
          {props.avatar && !isSmall && (
            <>
            {props.avatar}
            </>
          )}
        </Grid>
      </div>
      <NavDrawer 
        avatar={props.avatar}
        displayThemeToggle={props.displayThemeToggle}
        linkContent={props.drawerContent}
        title={props.appName}
      />
    </Header>
  )
}

export default NavHeader