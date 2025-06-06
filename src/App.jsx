import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './Nav'
import Header from './Header'
import Text from './Text'
import Bg from './Bg'
import Mid from './Mid'

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
        </main>
      </div >
    </>
  )
}

export default App
