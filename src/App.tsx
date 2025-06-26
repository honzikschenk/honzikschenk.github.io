import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import Home from './components/home';
import BackgroundEffects from './components/BackgroundEffects';

function App() {
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    console.log(current)
  })

  return (
    <>
      <BackgroundEffects scrollYProgress={scrollYProgress} />
      <Home/>
    </>
  )
}

export default App
