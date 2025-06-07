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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=' bg-black min-h-screen w-full relative'>
        <header>
          <Nav />
          <Header />
          <Bg />
          <Text />
        </header>
        <br />
        <main>
          <Mid />
          <Visual source="https://polytech-assets.polygon.technology/videos/horizon_wide1.mp4"/>
        </main>
      </div >
    </>
  )
}

export default App
