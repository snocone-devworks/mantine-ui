import { Collapse, Divider, SimpleGrid, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { useThemeColors } from '../../hooks/useThemeColors';

type Props = {
  defaultState?: 'collapsed' | 'expanded';
  displayBottomDivider?: boolean;
  displayTopDivider?: boolean;
  children?: React.ReactNode;
  title: string;
  titleColor?: string;
}

const NavSection = (props: Props) => {
  const [opened, setOpened] = useState<boolean>(true);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const { textPrimary } = useThemeColors();

  useEffect(() => {
    if (!hasChanged) {
      setOpened(props.defaultState === 'collapsed' ? false : true);
      setHasChanged(true);
    }
  },[props.defaultState])

  return (
    <>
    {props.displayTopDivider && (<Divider />)}
    <SimpleGrid 
      cols={1} 
      style={{display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer', margin: '0', padding: '0.6rem'}}
      onClick={() => setOpened(!opened)}
    >
      {
        opened
        ? <MdExpandLess color={textPrimary} size='1.2rem' />
        : <MdExpandMore color={textPrimary} size='1.2rem' />
      }
      <Text size='sm' style={{marginLeft: '0.6rem', color: props.titleColor ?? textPrimary}}>
        {props.title}
      </Text>
    </SimpleGrid>
    <Collapse in={opened} style={{paddingLeft: '2rem', margin: '0'}}>
      {props.children}
    </Collapse>
    {props.displayBottomDivider && (<Divider />)}
    </>
  )
}

export default NavSection