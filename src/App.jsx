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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=' bg-black min-h-screen w-full max-w-screen relative'>
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
      </div >
    </>
  )
}

export default App
