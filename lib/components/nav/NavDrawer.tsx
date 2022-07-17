import { Drawer, Grid, ScrollArea } from '@mantine/core';
import React from 'react'
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { useThemeColors } from '../../theme';
import SmallDrawerFooter from './SmallDrawerFooter';

type Props = {
  appName?: string;
  avatarUrl?: string;
  displayThemeToggle?: boolean;
  isOpen?: boolean;
  navbarContent?: React.ReactNode;
  onClose(): void;
}

const NavDrawer = (props: Props) => {
  const breakpoints = useBreakpoints();
  const colors = useThemeColors();

  return (
    <Drawer
      title={['xs', 'sm'].includes(breakpoints.deviceSize) ? props.appName : undefined}
      opened={props.isOpen ?? false}
      size={['xs', 'sm'].includes(breakpoints.deviceSize) ? 'full' : breakpoints.deviceSize === 'md' ? 'lg' : '20vw'}
      styles={{
        drawer: {
          display: 'flex',
          flexDirection: 'column'
        },
        title: {
          color: '#fc2929',
          fontSize: '1.6rem',
          padding: '0.4rem',
          fontWeight: 'bold'
        }
      }}
      onClose={() => props.onClose()}
    >
      {breakpoints.breakpointIncludes(['xs', 'sm']) && (
        <ScrollArea style={{position: 'relative', display: 'flex', flexDirection: 'column', flex: '1 1 auto', overflowY: 'auto', padding: '0.6rem'}}>
          <div
            style={{
              padding: '0.6rem 0.4rem',
              margin: '0',
              display: 'flex',
              flexDirection: 'column',
              flex: '1 1 auto',
              overflowY: 'auto',
            }}
          >
            <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', margin: '0'}}>
              {props.navbarContent}
            </Grid>
          </div>
          <SmallDrawerFooter 
            avatarUrl={props.avatarUrl}
            displayThemeToggle={props.displayThemeToggle}
          />
        </ScrollArea>
      )}
      {breakpoints.breakpointExcludes(['xs', 'sm']) && (
        <ScrollArea>
          <div style={{position: 'relative', display: 'flex', flexDirection: 'column', flex: '1 1 auto', overflowY: 'auto', padding: '0.6rem'}}>
            <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', margin: '0'}}>
              {props.navbarContent}
            </Grid>
          </div>
        </ScrollArea>
      )}
    </Drawer>
  )
}

export default NavDrawer