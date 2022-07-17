import { Button, useMantineTheme } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useThemeColors } from '../../theme';

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
  const location = useLocation();
  const [active, setActive] = useState<boolean>();
  const { primary } = useThemeColors();

  useEffect(() => {
    if (props.exact) {
      setActive(location.pathname === props.path);
    } else {
      setActive(location.pathname.includes(props.path))
    }
  }, [props.exact, props.path, location.pathname]);

  const color = (): string => {
    return active 
    ? primary
    : theme.colorScheme === 'dark' ? theme.white : theme.black;
  }

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
            color: color(),
          },
          leftIcon: {
            color: color(),
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
          color: color(),
        },
        leftIcon: {
          color: color(),
        }
      })}
    >
      {props.title}
    </Button>
  )
}

export default NavItem