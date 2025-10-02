import { useState } from 'react'
import { Suspense, lazy } from 'react'

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
import { useEffect } from 'react'
// import About from './Components/About'
// import Prices from './Prices'
// import Data from './Data'
// import User from './User'
// import Create from './Create'
// import List from './List'
// import Otp from './Components/Otp'
// import Private from './Components/Private'
// import Otpreset from './Components/Otpreset'
// import Forget from './Forget'


// Lazy-load route components:
const Prices = lazy(() => import('./Prices'))
const Data = lazy(() => import('./Data'))
const User = lazy(() => import('./User'))
const Create = lazy(() => import('./Create'))
const List = lazy(() => import('./List'))
const Otp = lazy(() => import('./Components/Otp'))
const Private = lazy(() => import('./Components/Private'))
const Otpreset = lazy(() => import('./Components/Otpreset'))
const Forget = lazy(() => import('./Forget'))
const About=lazy(()=>import('./Components/About'));


function App() {
  
  return (
    <div className=' bg-black min-h-screen w-full max-w-screen relative'>
      <Suspense fallback={<div className="text-black flex items-center justify-center font-semibold p-4">Loading…</div>}>
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
                <Visual source="https://polytech-assets.polygon.technology/videos/Lemon_wide.mp4" />
                <InfoVisual />
                <ScrolVisuals />
              </main>
              <footer>
                <End />
                <Foot />
              </footer>
            </>
          }
        />

        <Route element={<Private />}>


          <Route element={<Data />} path='/prices/data' />

          <Route element={<List />} path='/user/list' />


        </Route>
        <Route element={<About/>} path='/about' />
        <Route element={<Otp />} path='/user/otp' />
        <Route element={<User />} path='/user' />
        <Route element={<Create />} path='/user/create' />
        <Route element={<Prices />} path='/prices' />
        <Route element={<Otp />} path='/user/otp' />
        <Route element={<Otpreset />} path='/user/otp/reset' />
        <Route element={<Forget />} path='/user/forget' />


      </Routes>
      </Suspense>
    </div >
  )
}

export default App;
