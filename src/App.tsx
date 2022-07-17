import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { AppContainer, NavItem } from '../lib';
import { Grid } from '@mantine/core';
import ComponentsPage from './pages/ComponentsPage';

function App() {
  return (
    <AppContainer
      appName='@snoconedev/mantine-ui'
      closeAfterRoute
      displayThemeToggle
      navbarContent={
        <>
        <NavItem 
          exact
          path='/'
          title='Home'
        />
        <NavItem 
          path='/components'
          title='Components'
        />
        </>
      }
    >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/components' element={<ComponentsPage />} />
      </Routes>
    </AppContainer>

  )
}

export default App