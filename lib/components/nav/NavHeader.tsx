import { Avatar, Burger, Center, Grid, Header, Title, useMantineTheme } from '@mantine/core';
import React from 'react'
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { Callback } from '../../types/Callback';
import { useStyles } from '../appContainer/styles';
import ThemeToggle from '../appContainer/ThemeToggle';
import NavDrawer from './NavDrawer';
import { useDrawerState } from './useDrawerState';

type Props = {
  appName?: string;
  avatarUrl?: string;
  avatarAction?(): Callback<void>;
  displayThemeToggle?: boolean;
  logo?: React.ReactNode;
  headerContent?: React.ReactNode;
  navbarContent?: React.ReactNode;
}

const NavHeader = (props: Props) => {
  const [drawerOpened, setDrawerOpened] = useDrawerState(state => [state.drawerOpened, state.setDrawerOpened]);
  const breakpoints = useBreakpoints();
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Header
      height='fit-content'
      p='md'
      style={{color: theme.colorScheme === 'dark' ? theme.white : theme.black}}
    >
      <div style={{display: 'flex', alignItems: 'center', height: '100%', paddingRight: '1rem'}}>
        <Burger 
          opened={drawerOpened}
          size='md'
          color={theme.colorScheme === 'dark' ? theme.white : theme.black}
          mr='xl'
          onClick={() => setDrawerOpened(!drawerOpened)}
        />
        {breakpoints.breakpointExcludes(['xs', 'sm']) && (
          <>
          {props.logo}
          </>
        )}
        {props.appName && breakpoints.breakpointExcludes(['xs', 'sm']) && (
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
          {props.displayThemeToggle && breakpoints.breakpointExcludes(['xs', 'sm']) && (
            <ThemeToggle />
          )}
          {props.avatarUrl && breakpoints.breakpointExcludes(['xs', 'sm']) && (
            <Avatar 
              src={props.avatarUrl}
              size={45}
              style={{marginRight: '1rem'}}
            />
          )}
          {breakpoints.breakpointIncludes(['xs', 'sm']) && (
            <>
            {props.logo}
            </>
          )}
        </Grid>
      </div>
      <NavDrawer 
        appName={props.appName}
        avatarUrl={props.avatarUrl}
        displayThemeToggle={props.displayThemeToggle}
        isOpen={drawerOpened}
        navbarContent={props.navbarContent}
        onClose={() => setDrawerOpened(false)}
      />
    </Header>
  )
}

export default NavHeader