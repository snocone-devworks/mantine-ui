import { Group, Stack, Text } from '@mantine/core';
import React, { useMemo } from 'react'
import { useMantineUITheme, useThemeColors, useThemeGradients } from '../lib'

const HomePage = () => {
  const colors = useThemeColors();
  const gradients = useThemeGradients();
  const swatches = useMemo<{name: string, color: string, gradient?: { from: string, to: string }}[]>(() => {
    let returnItems: {name: string; color: string, gradient?: { from: string, to: string }}[] = [];
    returnItems.push({ name: 'brand', color: colors.brand, gradient: gradients.brand });
    returnItems.push({ name: 'error', color: colors.error, gradient: gradients.error });
    returnItems.push({ name: 'info', color: colors.info, gradient: gradients.info });
    returnItems.push({ name: 'primary', color: colors.primary, gradient: gradients.primary });
    returnItems.push({ name: 'secondary', color: colors.secondary, gradient: gradients.secondary });
    returnItems.push({ name: 'success', color: colors.success, gradient: gradients.success });
    returnItems.push({ name: 'textPrimary', color: colors.textPrimary });
    returnItems.push({ name: 'warn', color: colors.warn, gradient: gradients.warn });
    return returnItems;
  }, [colors, gradients])

  return (
    <Group position='apart' style={{gap: '1rem', padding: '4rem'}}>
      <Stack style={{gap: '1rem'}}>
        {swatches.map((color, index) => (
          <Stack style={{gap: '0rem'}} key={index}>
            <Text>
              {color.name}
            </Text>
            <div 
              style={{height: '40px', width: '80px', borderRadius: '0.4rem', backgroundColor: color.color}}
            />
          </Stack>
        ))}
      </Stack>
      <Stack style={{gap: '1rem'}}>
          {swatches.filter(s => s.gradient).map((color, index) => (
            <Stack style={{gap: '0rem'}} key={index}>
              <Text>
                {color.name}
              </Text>
              <div 
                style={{height: '40px', width: '80px', borderRadius: '0.4rem', background: `linear-gradient(45deg, ${color.gradient?.from}, ${color.gradient?.to})`}}
              />
            </Stack>
          ))}
      </Stack>
    </Group>
  )
}

export default HomePage