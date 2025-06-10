import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './Nav'
import Header from './Header'
import Text from './Text'
import Bg from './Bg'
import Mid from './Mid'
import Visual from './Visual'
import InfoVisual from './InfoVisuals'
import ScrolVisuals from './ScrolVisuals'
import End from './End'
import Foot from './Foot'
import { Route, Routes } from 'react-router-dom'
import Prices from './Prices'

function App() {
  return (
      <div className=' bg-black min-h-screen w-full max-w-screen relative'>
        <Routes>
          <Route
          path='/'
          element={
            <>
        <header>
          <Nav />
          <Header />
          <Bg />
          <Text />
        </header>
        <br />
        <main>
          <Mid />
          <Visual source="https://polytech-assets.polygon.technology/videos/Lemon_wide.mp4"/>
          <InfoVisual/>
          <ScrolVisuals/>
        </main>
        <footer>
          <End/>
          <Foot/>
        </footer>
        </>
        }
        />
        <Route element={<Prices/>} path='/prices'/>
        </Routes>
      </div >
  )
}

export default App
