import { Box, Sx, useMantineTheme } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import { MotionConfig } from '../../types'
import NavHeader from '../nav/NavHeader';
import { useDrawerState } from '../nav/useDrawerState';
import { useBodyRef } from './AppContainerContext';

type AppContainerProps = {
  animateRoutes?: boolean | Partial<MotionConfig>;
  appName?: React.ReactNode;
  avatar?: React.ReactNode;
  closeAfterRoute?: boolean;
  displayThemeToggle?: boolean;
  drawerTitle?: React.ReactNode;
  logo?: React.ReactNode;
  headerContent?: React.ReactNode;
  navbarContent?: React.ReactNode;
  rootClassName?: string;
  rootStyles?: Sx | (Sx | undefined)[];
  headerClassName?: string;
  headerStyles?: Sx | (Sx | undefined)[];
  children: React.ReactNode;
}

const AppContainer = (props: AppContainerProps) => {
  const setDrawerOpened = useDrawerState(state => state.setOpened);
  const { pathname } = useLocation();
  const theme = useMantineTheme();
  const bodyRef = useBodyRef();
  const rootStyles = useMemo<Sx | (Sx | undefined)[]>(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
      ...props.rootStyles
    }
  }, [props.rootStyles, theme]);

  const motionConfig = useMemo<MotionConfig>(() => {
    let returnValue: MotionConfig = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      mode: 'wait',
      transition: { duration: 0.6 },
      variants: undefined
    };

    if (!props.animateRoutes) {
      returnValue.initial = { opacity: 1 };
      returnValue.exit = { opacity: 1 };
      returnValue.transition = { duration: 0 };
      returnValue.mode = undefined;
      returnValue.variants = undefined;
    } else if (typeof props.animateRoutes === 'object') {
      returnValue = {...returnValue, ...props.animateRoutes}
    }

    return returnValue;
  }, [props.animateRoutes])

  useEffect(() => {
    if (props.closeAfterRoute) setDrawerOpened(false);
  }, [pathname])

  return (
    <Box sx={rootStyles}>
      <NavHeader 
        appName={props.appName}
        avatar={props.avatar}
        className={props.headerClassName}
        displayThemeToggle={props.displayThemeToggle}
        drawerTitle={props.drawerTitle}
        logo={props.logo}
        headerContent={props.headerContent}
        drawerContent={props.navbarContent}
        sx={props.headerStyles}
      />
        {props.animateRoutes && (
          <AnimatePresence mode={motionConfig.mode}>
            <motion.div
              key={pathname}
              ref={bodyRef}
              initial={motionConfig.initial}
              animate={motionConfig.animate}
              exit={motionConfig.exit}
              variants={motionConfig.variants}
              transition={motionConfig.transition}
              style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flex: '1 1 auto', overflowY: 'auto', padding: '1rem'}}
            >
              {props.children}
            </motion.div>
          </AnimatePresence>
        )}
        {!props.animateRoutes && (
          <div ref={bodyRef} style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flex: '1 1 auto', overflowY: 'auto', padding: '1rem'}}>
            {props.children}
          </div>
        )}
    </Box>
  )
}

export default AppContainer