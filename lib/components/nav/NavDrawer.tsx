import { Drawer, Group, ScrollArea, useMantineTheme } from '@mantine/core';
import React, { useMemo } from 'react'
import { useDeviceSize } from '../../hooks/useDeviceSize';
import ThemeToggle from '../appContainer/ThemeToggle';
import { useDrawerState } from './useDrawerState';

type Props = {
  avatar?: React.ReactNode;
  displayThemeToggle?: boolean;
  linkContent?: React.ReactNode;
  title?: React.ReactNode;
}

const NavDrawer = (props: Props) => {
  const theme = useMantineTheme();
  const { deviceSize } = useDeviceSize();
  const isSmall = useMemo<boolean>(() => ['xs', 'sm'].includes(deviceSize), [deviceSize]);
  const [opened, setOpened] = useDrawerState(state => [state.opened, state.setOpened]);

  return (
    <Drawer
      opened={opened}
      size={isSmall ? 'full' : deviceSize === 'md' ? 'lg' : '20vw'}
      title={props.title}
      styles={{
        drawer: {
          display: 'flex',
          flexDirection: 'column',
          margin: '0'
        }
      }}
      onClose={() => setOpened(false)}
    >
      {isSmall && (
        <div style={{position: 'relative', display: 'flex', flexDirection: 'column', flex: '1 1 auto', overflowY: 'auto', justifyContent: 'space-between', margin: '0'}}>
          <div style={{ padding: '0.6rem 0.4rem', margin: '0', display: 'flex', flexDirection: 'column', flex: '1 1 auto', overflowY: 'auto'}}>
            {props.linkContent}
          </div>
          <div
            style={{
              padding: '0.4rem 0rem',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              flexWrap: 'wrap',
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
              borderTopLeftRadius: '1rem',
              borderTopRightRadius: '1rem'
            }}
          >
            <Group position='apart' align='center' style={{ padding: '0.6rem 0.8rem 2rem 0.8rem', width: '100%'}}>
              {props.avatar}
              {props.displayThemeToggle && (<ThemeToggle />)}
            </Group>
          </div>
        </div>
      )}
      {!isSmall && (
        <ScrollArea style={{margin: '0'}}>
          <div style={{position: 'relative', margin: '0', display: 'flex', flexDirection: 'column', flex: '1 1 auto', overflowY: 'auto', padding: '0.6rem'}}>
            {props.linkContent}
          </div>
        </ScrollArea>
      )}
    </Drawer>
  )
}

export default NavDrawer