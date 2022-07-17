import { Avatar, Group, useMantineTheme } from '@mantine/core';
import React from 'react'
import ThemeToggle from '../appContainer/ThemeToggle';

type Props = {
  avatarUrl?: string;
  displayThemeToggle?: boolean;
}

const SmallDrawerFooter = (props: Props) => {
  const theme = useMantineTheme();

  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        margin: 0,
        padding: '0.4rem 0rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'wrap',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]
      }}
    >
      <Group grow position='apart' align='center' style={{ padding: '0.6rem 0.8rem 2rem 0.8rem', width: '100%' }}>
        {props.avatarUrl && (
          <Avatar 
            src={props.avatarUrl}
            radius='xl'
            size={50}
          />
        )}
        {props.displayThemeToggle && (
          <ThemeToggle />
        )}
      </Group>
    </div>
  )
}

export default SmallDrawerFooter