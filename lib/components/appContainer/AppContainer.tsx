import { AppShell } from '@mantine/core';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Callback } from '../../types/Callback';
import NavHeader from '../nav/NavHeader';
import { useDrawerState } from '../nav/useDrawerState';
import { useStyles } from './styles';

type Props = {
  appName?: string;
  avatarUrl?: string;
  avatarAction?(): Callback<void>;
  closeAfterRoute?: boolean;
  displayThemeToggle?: boolean;
  logo?: React.ReactNode;
  headerContent?: React.ReactNode;
  navbarContent?: React.ReactNode;
  children: React.ReactNode;
}

const AppContainer = (props: Props) => {
  const setDrawerOpened = useDrawerState(state => state.setDrawerOpened);
  const { classes } = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (props.closeAfterRoute) setDrawerOpened(false);
  }, [location.pathname])

  return (
    <AppShell
      className={classes.shell}
      styles={(theme) => ({
        body: {
          display: 'flex',
          flex: '1 1 auto',
        },
        main: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
          display: 'flex',
          flexDirection: 'column',
        },
      })}
      header={
        <NavHeader 
          appName={props.appName} 
          avatarUrl={props.avatarUrl}
          avatarAction={props.avatarAction}
          displayThemeToggle={props.displayThemeToggle}
          logo={props.logo}
          headerContent={props.headerContent}
          navbarContent={props.navbarContent}
        />
      }
    >
      <div style={{display: 'flex', flexDirection: 'column', flex: '1 1 auto', overflowY: 'auto'}}>
        {props.children}
      </div>
    </AppShell>
  )
}

export default AppContainer