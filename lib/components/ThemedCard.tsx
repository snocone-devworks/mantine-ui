import { Card, Group, GroupPosition, MantineShadow, Text, Title, useMantineTheme } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { subscribeWithSelector } from 'zustand/middleware';
import { ExpandButtonProps, useExpand } from '../hooks/useExpand';
import { useThemeColors, useThemeContext } from '../theme';

type Elevation = 1 | 2 | 3 | 4;

type ExpandableProps = ExpandButtonProps & {
  initialState?: boolean;
}

type Props = {
  action?: React.ReactNode;
  children: React.ReactNode;
  elevation?: Elevation;
  expandable?: boolean | ExpandableProps;
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
  style?: React.CSSProperties;
  ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined;
}

const ThemedCard = ({ action, children, elevation, expandable, subtitle, title, style, ref}: Props) => {
  const theme = useMantineTheme();
  const [shadow, setShadow] = useState<MantineShadow>('xs');
  const [bg, setBg] = useState<string | undefined>(undefined);
  const [headerPosition, setHeaderPosition] = useState<GroupPosition>('apart');
  const { hasChanged, expanded, setExpanded, ExpandButton } = useExpand();
  const { applyGradients } = useThemeContext();
  const { primary } = useThemeColors();

  useEffect(() => {
    if (typeof expandable === 'boolean' || hasChanged) return;
    if (expandable?.initialState !== undefined) setExpanded(expandable.initialState);
  }, [expandable])

  useEffect(() => {
    switch(elevation) {
      case 2:
        setShadow('md');
        setBg(theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]);
        break;
      case 3:
        setShadow('lg');
        setBg(theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]);
        break;      
      case 4:
        setShadow('xl');
        setBg(theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]);
        break;      
      default:
        setShadow('sm');
        setBg(theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white);
        break;        
    }
  }, [elevation, theme])

  useEffect(() => {
    if (subtitle || title) {
      setHeaderPosition(action || expandable ? 'apart' : 'left');
    } else if (action || expandable) {
      setHeaderPosition('right');
    }
  }, [action, subtitle, title, expandable])

  return (
    <Card
      ref={ref}
      shadow={shadow}
      radius={'md'}
      style={style ? {...style, backgroundColor: bg} : {width: '100%', backgroundColor: bg}}
    >
      {(title || subtitle || action || expandable) && (
        <Group
          direction='row'
          align='flex-start'
          position={headerPosition}
          style={{marginBottom: '1rem', gap: '0.2rem'}}
        >
          {(title || subtitle) && (
            <Group direction='column' style={{gap: '0.2rem'}}>
              <Title order={4} style={{ color: primary }}>
                {title}
              </Title>
              <Text size='sm'>
                {subtitle}
              </Text>
            </Group>
          )}
          {(action || expandable) && (
            <Group style={{gap: '0.2rem'}}>
              {action && (
                <>
                {action}
                </>
              )}
              {expandable && (
                <ExpandButton 
                  color={typeof expandable === 'boolean' ? undefined : expandable.color}
                  size={typeof expandable === 'boolean' ? undefined : expandable.size}
                  radius={typeof expandable === 'boolean' ? undefined : expandable.radius}
                  variant={typeof expandable !== 'boolean' ? expandable.variant : applyGradients ? 'gradient' : 'filled'}
                  iconSize={typeof expandable === 'boolean' ? undefined : expandable.iconSize}
                />
              )}
            </Group>
          )}
        </Group>
      )}
      <Card.Section style={{padding: '0rem 0.6rem 1rem 0.6rem'}}>
        {(!expandable || expanded) && (
          <>
          {children}
          </>
        )}
      </Card.Section>
    </Card>
  )
}

export default ThemedCard