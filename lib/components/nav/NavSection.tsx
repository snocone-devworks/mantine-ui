import { Collapse, Divider, Grid, Text, useMantineTheme } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

type SectionState = 'collapsed' | 'expanded';

type Props = {
  defaultState?: SectionState;
  displayBottomDivider?: boolean;
  displayTopDivider?: boolean;
  children?: React.ReactNode;
  title: string;
  titleColor?: string;
}

const NavSection = (props: Props) => {
  const [open, setOpen] = useState<boolean>(true);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const theme = useMantineTheme();

  useEffect(() => {
    if (!hasChanged) {
      setOpen(props.defaultState === 'collapsed' ? false : true);
      setHasChanged(true);
    }
  }, [props.defaultState])

  return (
    <>
    {props.displayTopDivider && (
      <Divider />
    )}
    <Grid.Col
      span={12}
      style={{display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer'}}
    >
      {
        open
        ? <RiArrowUpSFill color={theme.colorScheme === 'dark' ? 'white' : 'black'} style={{height: '1.2rem', width: '1.2rem'}} />
        : <RiArrowDownSFill color={theme.colorScheme === 'dark' ? 'white' : 'black'} style={{height: '1.2rem', width: '1.2rem'}} />
      }
      <Text size='sm' style={{ marginLeft: '0.6rem', color: props.titleColor ?? theme.colorScheme === 'dark' ? theme.white : theme.black}}>
        {props.title}
      </Text>
    </Grid.Col>
    <Collapse in={open} style={{ paddingLeft: '2rem' }}>
      {props.children}
    </Collapse>
    {props.displayBottomDivider && (
      <Divider />
    )}
    </>
  )
}

export default NavSection