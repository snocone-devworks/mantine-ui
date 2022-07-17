import { Chip, Group, Switch, useMantineTheme } from '@mantine/core';
import React from 'react'
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { useToggleTheme } from '../../theme'
import { useStyles } from './styles';

type Props = {}

const ThemeToggle = (props: Props) => {
  const toggleTheme = useToggleTheme();
  const { deviceSize } = useBreakpoints();
  const { classes } = useStyles();
  const theme = useMantineTheme();

  if (['xs', 'sm'].includes(deviceSize)) {
    return (
      <Group style={{ gap: '0rem' }}>
        <RiSunFill className={classes.smallIcon} style={{color: theme.colors.yellow[5]}} />
        <Switch 
          checked={true}
          size='md'
          color={theme.colorScheme === 'dark' ? 'violet' : 'yellow'}
          style={{marginLeft: '0.6rem', marginRight: '0.6rem', transform: theme.colorScheme === 'light' ? 'rotate(180deg)' : undefined}}
          onChange={() => {}}
          onClick={() => toggleTheme()}
        />
        <RiMoonFill className={classes.smallIcon} style={{color: theme.colors.violet[5]}} />
      </Group>
    )
  }
  return (
    <Chip
      value='chip'
      checked={false}
      variant='outline'
      size='lg'
      styles={(theme) => ({
        label: {
          paddingLeft: '0.8rem',
          paddingRight: '0.4rem',
        }
      })}
      onChange={() => toggleTheme()}
    >
      <div className={classes.chipContent}>
        {theme.colorScheme === 'dark' ? 'Light Theme' : 'Dark Theme'}
        {
          theme.colorScheme === 'dark'
          ? <RiSunFill className={classes.icon} />
          : <RiMoonFill className={classes.icon} />
        }
      </div>
    </Chip>
  )
}

export default ThemeToggle