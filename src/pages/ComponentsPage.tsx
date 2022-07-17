import { ActionIconVariant, Button, ButtonVariant, SimpleGrid, Stack, ThemeIconVariant, Title } from '@mantine/core'
import React from 'react'
import { RiRocketFill } from 'react-icons/ri';
import { StackGroup, ThemeColor, ThemedActionIcon, ThemedButton, ThemedCard, ThemedIcon } from '../../lib'

const actionIcons: Array<ActionIconVariant | 'gradient'> = [
  'default', 'filled', 'gradient', 'hover', 'light', 'outline', 'transparent'
];

const icons: Array<ThemeIconVariant> = [
  'filled', 'gradient', 'light', 'outline'
];

const buttons: Array<ButtonVariant> = [
  'default', 'filled', 'gradient', 'light', 'outline', 'subtle'
]

const colors: ThemeColor[] = [
  'primary', 'secondary', 'info', 'success', 'warn', 'error'
];

function ComponentsPage() {
  return (
    <Stack>
      <ThemedCard
        title='ThemedActionIcon Component'
        expandable={false}
      >
        {actionIcons.map((iconType, index) => (
          <Stack key={index} style={{gap: '0.2rem'}}>
            <SimpleGrid cols={1}>
              <Title order={5}>
                {iconType}
              </Title>
            </SimpleGrid>
            <StackGroup breakpoint='xs' align='center' style={{paddingLeft: '1rem', marginBottom: '1rem'}}>
              {colors.map((color, colorIndex) => (
                <Stack key={colorIndex} align='center' style={{gap: '0.2rem'}}>
                  <Title order={6}>
                    {color}
                  </Title>
                  <ThemedActionIcon
                    color={color}
                    tooltip={`${iconType}: ${color}`}
                    variant={iconType}
                    onClick={() => {}}
                  >
                    <RiRocketFill />
                  </ThemedActionIcon>
                </Stack>
              ))}
            </StackGroup>
          </Stack>
        ))}
      </ThemedCard>
      <ThemedCard title='ThemedIcon Component'>
      {icons.map((iconType, index) => (
          <Stack key={index} style={{gap: '0.2rem'}}>
            <SimpleGrid cols={1}>
              <Title order={5}>
                {iconType}
              </Title>
            </SimpleGrid>
            <StackGroup breakpoint='xs' align='center' style={{paddingLeft: '1rem', marginBottom: '1rem'}}>
              {colors.map((color, colorIndex) => (
                <Stack key={colorIndex} align='center' style={{gap: '0.2rem'}}>
                  <Title order={6}>
                    {color}
                  </Title>
                  <ThemedIcon
                    color={color}
                    tooltip={`${iconType}: ${color}`}
                    variant={iconType}
                  >
                    <RiRocketFill />
                  </ThemedIcon>
                </Stack>
              ))}
            </StackGroup>
          </Stack>
        ))}
      </ThemedCard>
      <ThemedCard title='ThemedButton Component'>
        {buttons.map((buttonType, index) => (
          <Stack key={index} style={{gap: '0.2rem'}}>
            <SimpleGrid cols={1}>
              <Title order={5}>
                {buttonType}
              </Title>
            </SimpleGrid>
            <StackGroup breakpoint='xs' align='center' style={{paddingLeft: '1rem', marginBottom: '1rem'}}>
              {colors.map((color, colorIndex) => (
                <Stack key={colorIndex} align='center' style={{gap: '0.2rem'}}>
                  <ThemedButton
                    tooltip={`${buttonType}: ${color}`}
                    color={color}
                    variant={buttonType}
                    onClick={() => {}}
                  >
                    {color}
                  </ThemedButton>
                </Stack>
              ))}
              <Stack align='center' style={{gap: '0.2rem'}}>
                <ThemedButton
                  tooltip={`${buttonType}: disabled`}
                  color={'primary'}
                  variant={buttonType}
                  disabled
                  onClick={() => {}}
                >
                  Disabled
                </ThemedButton>
              </Stack>
            </StackGroup>
          </Stack>
        ))}
      </ThemedCard>
    </Stack>
  )
}

export default ComponentsPage