import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import

const SolarSystemPage: React.FC = () => {
  const navigate = useNavigate(); // Add this line
  const [shipPosition, setShipPosition] = useState({ x: 50, y: 50 });
  const moveSpeed = 15;

  const planets = [
    { id: 'projects', name: 'Projects', x: 200, y: 150, size: 70, color: '#FF6347' }, // Tomato
    { id: 'experience', name: 'Experience', x: 500, y: 300, size: 80, color: '#32CD32' }, // LimeGreen
    { id: 'about', name: 'About Me', x: 700, y: 100, size: 60, color: '#FFD700' }, // Gold
  ];

  // Handle keyboard input for spaceship movement
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    setShipPosition((prev) => {
      let { x, y } = prev;
      switch (event.key.toLowerCase()) {
        case 'w': y -= moveSpeed; break;
        case 's': y += moveSpeed; break;
        case 'a': x -= moveSpeed; break;
        case 'd': x += moveSpeed; break;
        default: return prev;
      }
      // Basic boundary detection
      // Spaceship dimensions: width: 20px, height: 30px
      x = Math.max(0, Math.min(x, window.innerWidth - 20)); 
      y = Math.max(0, Math.min(y, window.innerHeight - 30));
      return { x, y };
    });
  }, [moveSpeed]); // No dependencies needed for moveSpeed if it's constant

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handlePlanetClick = (planetId: string) => {
    console.log(`Navigating to section: ${planetId}`);
    navigate(`/#${planetId}`);
  };

  // Enhanced stars - more stars with random opacity
  const stars = React.useMemo(() => Array.from({ length: 100 }).map((_, i) => ({ // Increased to 100 stars
    id: i,
    x: Math.random() * 100, // vw
    y: Math.random() * 100, // vh
    size: Math.random() * 2 + 1, // px
    opacity: Math.random() * 0.5 + 0.5, // Random opacity between 0.5 and 1.0
  })), []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000020',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      // paddingTop: '20px' // Removed to allow full screen for space, title is positioned absolutely or within flow
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        margin: '20px 0', // Adjusted margin
        position: 'relative', // Ensure it's above stars if they overlap
        zIndex: 3 // Above stars and planets, but can be below UI elements if any fixed on top
      }}>
        Fly Around and Explore!
      </h1>
      
      {/* Stars */}
      {stars.map(star => (
        <div key={star.id} style={{
          position: 'absolute',
          left: `${star.x}vw`,
          top: `${star.y}vh`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          backgroundColor: 'white',
          borderRadius: '50%',
          opacity: star.opacity, // Apply random opacity
          zIndex: 0 // Stars are at the very back
        }} />
      ))}

      {/* Spaceship */}
      <div
        id="spaceship"
        style={{
          position: 'absolute',
          left: `${shipPosition.x}px`,
          top: `${shipPosition.y}px`,
          width: 0, // Changed for triangle shape
          height: 0, // Changed for triangle shape
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: '20px solid skyblue', // Triangle shape
          zIndex: 2 // Spaceship is above planets and stars
        }}
      ></div>

      {/* Planets */}
      {planets.map((planet) => (
        <div
          key={planet.id}
          onClick={() => handlePlanetClick(planet.id)} // Changed from planet.name to planet.id
          style={{
            position: 'absolute',
            left: `${planet.x}px`,
            top: `${planet.y}px`,
            width: `${planet.size}px`,
            height: `${planet.size}px`,
            backgroundColor: planet.color,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            textAlign: 'center',
            border: '2px solid white',
            padding: '5px',
            boxSizing: 'border-box',
            textShadow: '0px 0px 4px black', // Added text shadow for readability
            zIndex: 1 // Planets are above stars, below spaceship
          }}
        >
          {planet.name}
        </div>
      ))}
    </div>
  );
};

export default SolarSystemPage;
