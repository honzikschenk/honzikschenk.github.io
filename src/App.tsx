import { useMotionValueEvent, useScroll } from 'motion/react';
import Home from './components/home';
// import BackgroundEffects from './components/BackgroundEffects'; // If needed globally
import { Routes, Route } from 'react-router-dom'; // Corrected import
import SolarSystemPage from './components/SolarSystemPage';

function App() {
  // Existing scroll logic can remain if it's for global effects,
  // or be moved to Home if specific to it.
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    console.log(current);
  });

  return (
    <> {/* Or directly return <Routes> if no other global elements here */}
      {/* <BackgroundEffects /> */} 
      {/* <p>E<br/>S<br/>I<br/>M<br/>N<br/>I<br/>O<br/>e<br/>s<br/>m<br/>o<br/>i<br/>e<br/>m<br/>c<br/>o<br/>c<br/>e<br/>a<br/>m<br/>c<br/>o<br/>i<br/>a<br/>m<br/>c<br/>o<br/>i<br/>m<br/>o<br/>i<br/>c<br/>e<br/>m<br/>i<br/>v<br/>o<br/>m<br/>S<br/>I<br/>M<br/>N<br/>I<br/>O<br/>e<br/>s<br/>m<br/>o<br/>i<br/>e<br/>m<br/>c<br/>o<br/>c<br/>e<br/>a<br/>m<br/>c<br/>o<br/>i<br/>a<br/>m<br/>c<br/>o<br/>i<br/>m<br/>o<br/>i<br/>c<br/>e<br/>m<br/>i<br/>v<br/>o<br/>m<br/>S<br/>I<br/>M<br/>N<br/>I<br/>O<br/>e<br/>s<br/>m<br/>o<br/>i<br/>e<br/>m<br/>c<br/>o<br/>c<br/>e<br/>a<br/>m<br/>c<br/>o<br/>i<br/>a<br/>m<br/>c<br/>o<br/>i<br/>m<br/>o<br/>i<br/>c<br/>e<br/>m<br/>i<br/>v<br/>o<br/>m<br/>S<br/>I<br/>M<br/>N<br/>I<br/>O<br/>e<br/>s<br/>m<br/>o<br/>i<br/>e<br/>m<br/>c<br/>o<br/>c<br/>e<br/>a<br/>m<br/>c<br/>o<br/>i<br/>a<br/>m<br/>c<br/>o<br/>i<br/>m<br/>o<br/>i<br/>c<br/>e<br/>m<br/>i<br/>v<br/>o<br/>m<br/>S<br/>I<br/>M<br/>N<br/>I<br/>O<br/>e<br/>s<br/>m<br/>o<br/>i<br/>e<br/>m<br/>c<br/>o<br/>c<br/>e<br/>a<br/>m<br/>c<br/>o<br/>i<br/>a<br/>m<br/>c<br/>o<br/>i<br/>m<br/>o<br/>i<br/>c<br/>e<br/>m<br/>i<br/>v<br/>o<br/>m</p> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solar-system" element={<SolarSystemPage />} />
      </Routes>
    </>
  );
}

export default App;
