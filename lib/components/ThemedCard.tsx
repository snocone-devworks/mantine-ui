import { Card, Group, GroupPosition, MantineNumberSize, MantineShadow, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo } from 'react'
import { useExpansion } from '../hooks/useExpansion';
import { useMantineUITheme } from '../hooks/useMantineUITheme';
import { useThemeColors } from '../hooks/useThemeColors';
import { ExpansionProps } from '../types';

type Props = {
  action?: React.ReactNode;
  children: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3 | 4;
  expansion?: boolean | ExpansionProps;
  radius?: MantineNumberSize;
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
  style?: React.CSSProperties;
}

const shadows: MantineShadow[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const ThemedCard = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { primary } = useThemeColors();
  const theme = useMantineTheme();
  const initialExpandedState = useMemo<'collapsed' | 'expanded'>(() => {
    if (!props.expansion) return 'expanded';
    if (typeof props.expansion === 'boolean') return props.expansion === true ? 'expanded' : 'collapsed';
    return props.expansion.initialState ? 'expanded' : 'collapsed';
  }, [props.expansion])
  const { expanded, setExpanded, hasChanged, ExpandButton } = useExpansion(initialExpandedState);
  const { applyGradients } = useMantineUITheme();
  const headerPosition = useMemo<GroupPosition>(() => {
    if (props.subtitle || props.title) {
      return props.action || props.expansion ? 'apart' : 'left';
    }

    return props.action || props.expansion ? 'right' : 'apart';
  }, [props.action, props.subtitle, props.title, props.expansion])
  const backgroundColor = useMemo<string>(() => {
    const styleColor = props.style?.backgroundColor;
    const themeColor = theme.colorScheme === 'dark' ? theme.colors.dark : theme.colors.gray;

    if (props.elevation === 0) {
      return styleColor ?? themeColor[theme.colorScheme === 'dark' ? 8 : 0];
    }

    if (props.elevation === 2) {
      return styleColor ?? themeColor[theme.colorScheme === 'dark' ? 6 : 0];
    }

    if (props.elevation === 3) {
      return styleColor ?? themeColor[theme.colorScheme === 'dark' ? 5 : 0];
    }

    if (props.elevation === 4) {
      return styleColor ?? themeColor[theme.colorScheme === 'dark' ? 4 : 0];
    }

    return styleColor ?? theme.colorScheme === 'dark' ? themeColor[7] : theme.white;
  }, [props.elevation, theme, props.style])

  useEffect(() => {
    if (typeof props.expansion === 'boolean' || hasChanged) return;
    if (props.expansion?.initialState !== undefined) setExpanded(props.expansion.initialState === 'expanded');
  }, [props.expansion])

  return (
    <Card
      ref={ref}
      shadow={shadows[props.elevation ?? 0]}
      radius={props.radius}
      style={props.style ? {...props.style, backgroundColor: backgroundColor} : { width: '100%', backgroundColor: backgroundColor}}
    >
      {(props.title || props.subtitle || props.action || props.expansion) && (
        <Group
          align='flex-start'
          position={headerPosition}
          noWrap
          style={{gap: '0.2rem'}}
        >
          {(props.title || props.subtitle) && (
            <Stack style={{gap: '0.2rem', flexWrap: 'wrap'}}>
              {typeof props.title === 'string' && (
                <Title order={4} style={{color: primary}}>
                  {props.title}
                </Title>
              )}
              {typeof props.title !== 'string' && (
                <>
                {props.title}
                </>
              )}
              {typeof props.subtitle === 'string' && (
                <Text size='sm'>
                  {props.subtitle}
                </Text>
              )}
              {typeof props.subtitle !== 'string' && (
                <>
                {props.subtitle}
                </>
              )}
            </Stack>
          )}
          {(props.action || props.expansion) && (
            <Group style={{gap: '0.2rem'}}>
              {props.action}
              {props.expansion && (
                <ExpandButton                
                  className={typeof props.expansion === 'boolean' ? undefined : props.expansion.className}
                  color={typeof props.expansion === 'boolean' ? 'primary' : props.expansion.color}
                  iconSize={typeof props.expansion === 'boolean' ? undefined : props.expansion.size}
                  radius={typeof props.expansion === 'boolean' ? undefined : props.expansion.radius}
                  size={typeof props.expansion === 'boolean' ? undefined : props.expansion.size}
                  style={typeof props.expansion === 'boolean' ? undefined : props.expansion.style}
                  variant={typeof props.expansion === 'boolean' ? undefined : props.expansion.variant}
                />
              )}
            </Group>
          )}
        </Group>
      )}
      <AnimatePresence mode='sync'>
        <motion.div
          key={String(expanded)}
          initial={{ opacity: 0, height: 0}}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
        >
          {(!props.expansion || expanded) && (
            <>
            {props.children}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </Card>
  )
});

ThemedCard.displayName = 'ThemedCard';

export default ThemedCard