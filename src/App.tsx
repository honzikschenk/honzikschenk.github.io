import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Home from './components/home';
import BackgroundEffects from './components/BackgroundEffects';

function App() {
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    console.log(current)
  })

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <BackgroundEffects />
      <Home/>
    </motion.div>
  )
}

export default App
