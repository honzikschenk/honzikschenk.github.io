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
    {/* <p>E<br/>S<br/>I<br/>M<br/>N<br/>I<br/>O<br/>e<br/>s<br/>m<br/>o<br/>i<br/>e<br/>m<br/>c<br/>o<br/>c<br/>e<br/>a<br/>m<br/>c<br/>o<br/>i<br/>a<br/>m<br/>c<br/>o<br/>i<br/>m<br/>o<br/>i<br/>c<br/>e<br/>m<br/>i<br/>v<br/>o<br/>m<br/>S<br/>I<br/>M<br/>N<br/>I<br/>O<br/>e<br/>s<br/>m<br/>o<br/>i<br/>e<br/>m<br/>c<br/>o<br/>c<br/>e<br/>a<br/>m<br/>c<br/>o<br/>i<br/>a<br/>m<br/>c<br/>o<br/>i<br/>m<br/>o<br/>i<br/>c<br/>e<br/>m<br/>i<br/>v<br/>o<br/>m<br/>S<br/>I<br/>M<br/>N<br/>I<br/>O<br/>e<br/>s<br/>m<br/>o<br/>i<br/>e<br/>m<br/>c<br/>o<br/>c<br/>e<br/>a<br/>m<br/>c<br/>o<br/>i<br/>a<br/>m<br/>c<br/>o<br/>i<br/>m<br/>o<br/>i<br/>c<br/>e<br/>m<br/>i<br/>v<br/>o<br/>m<br/>S<br/>I<br/>M<br/>N<br/>I<br/>O<br/>e<br/>s<br/>m<br/>o<br/>i<br/>e<br/>m<br/>c<br/>o<br/>c<br/>e<br/>a<br/>m<br/>c<br/>o<br/>i<br/>a<br/>m<br/>c<br/>o<br/>i<br/>m<br/>o<br/>i<br/>c<br/>e<br/>m<br/>i<br/>v<br/>o<br/>m<br/>S<br/>I<br/>M<br/>N<br/>I<br/>O<br/>e<br/>s<br/>m<br/>o<br/>i<br/>e<br/>m<br/>c<br/>o<br/>c<br/>e<br/>a<br/>m<br/>c<br/>o<br/>i<br/>a<br/>m<br/>c<br/>o<br/>i<br/>m<br/>o<br/>i<br/>c<br/>e<br/>m<br/>i<br/>v<br/>o<br/>m</p> */}
      {/* <BackgroundEffects /> */}
      <Home/>
    </>
  )
}

export default App
