import { Button, useMantineTheme } from '@mantine/core';
import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useThemeColors } from '../../hooks/useThemeColors';

type Props = {
  condensed?: boolean;
  disabled?: boolean;
  exact?: boolean;
  icon?: React.ReactNode;
  path: string;
  title: string;
}

const NavItem = (props: Props) => {
  const theme = useMantineTheme();
  const { primary } = useThemeColors();
  const { pathname } = useLocation();
  const active = useMemo<boolean>(() => {
    if (props.exact) return pathname === props.path
    return pathname.toLocaleLowerCase().includes(props.path.toLocaleLowerCase());
  }, [pathname, props.path, props.exact])
  const color = useMemo<string>(() => {
    return active ? primary : theme.colorScheme === 'dark' ? theme.white : theme.black;
  }, [active, theme])

  if (props.disabled) {
    return (
      <Button
        disabled
        leftIcon={props.icon}
        variant='subtle'
        size={props.condensed ? 'sm' : 'md'}
        styles={(theme) => ({
          inner: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          },
          label: {
            color: color
          },
          leftIcon: {
            color: color
          }
        })}
      >
        {props.title}
      </Button>
    )
  }

  return (
    <Button
      component={Link}
      to={props.path}
      leftIcon={props.icon}
      variant='subtle'
      size={props.condensed ? 'sm' : 'md'}
      style={{width: '100%'}}
      styles={(theme) => ({
        inner: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        },
        label: {
          color: color
        },
        leftIcon: {
          color: color
        }
      })}
    >
      {props.title}
    </Button>
  )
}

export default NavItem