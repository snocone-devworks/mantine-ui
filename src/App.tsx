import React from 'react'
import { MdHome, MdInfo } from 'react-icons/md'
import { Route, Routes } from 'react-router-dom'
import { AppContainer, NavItem } from '../lib'
import AboutPage from './AboutPage'
import HomePage from './HomePage'

function App() {
  return (
    <AppContainer
      animateRoutes
      appName='Test App'
      closeAfterRoute
      displayThemeToggle
      navbarContent={
        <>
        <NavItem path='/' title='Home' exact icon={<MdHome />} />
        <NavItem path='/about' title='About' icon={<MdInfo />} />
        </>
      }
    >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </AppContainer>
  )
}

export default App