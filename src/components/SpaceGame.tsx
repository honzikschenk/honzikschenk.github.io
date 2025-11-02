import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { X, ExternalLink, Github, Rocket, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { spaceGameData, SpaceObject } from '../data/spaceGameData';
import OptimizedImage from './OptimizedImage';

interface SpaceGameProps {
  open: boolean;
  onClose: () => void;
}

interface GameState {
  cameraX: number;
  cameraY: number;
  selectedObject: SpaceObject | null;
  showInstructions: boolean;
  animationTime: number;
}

const SpaceGame: React.FC<SpaceGameProps> = ({ open, onClose }) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  
  const [gameState, setGameState] = useState<GameState>({
    cameraX: 0,
    cameraY: 0,
    selectedObject: null,
    showInstructions: true,
    animationTime: 0
  });

  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  // Game constants
  const CAMERA_SPEED = 3;
  const GAME_WIDTH = 1200;
  const GAME_HEIGHT = 800;
  const CAMERA_BOUNDS = { minX: -400, maxX: 400, minY: -300, maxY: 300 };

  // Calculate object positions with orbital motion
  const calculateObjectPositions = useCallback((time: number): SpaceObject[] => {
    return spaceGameData.map(obj => {
      if (obj.type === 'sun') return obj;
      
      // Calculate orbital position for planets
      if (obj.type === 'planet' && obj.orbitRadius && obj.orbitSpeed) {
        const angle = time * obj.orbitSpeed;
        const sunX = spaceGameData[0].x;
        const sunY = spaceGameData[0].y;
        
        const newObj = {
          ...obj,
          x: sunX + Math.cos(angle) * obj.orbitRadius,
          y: sunY + Math.sin(angle) * obj.orbitRadius,
        };

        // Calculate moon positions around their planet
        if (obj.moons) {
          newObj.moons = obj.moons.map(moon => {
            if (moon.orbitRadius && moon.orbitSpeed) {
              const moonAngle = time * moon.orbitSpeed;
              return {
                ...moon,
                x: newObj.x + Math.cos(moonAngle) * moon.orbitRadius,
                y: newObj.y + Math.sin(moonAngle) * moon.orbitRadius,
              };
            }
            return moon;
          });
        }

        return newObj;
      }

      return obj;
    });
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault();
        setPressedKeys(prev => new Set(prev).add(key));
      }
      if (key === 'escape') {
        setGameState(prev => ({ ...prev, selectedObject: null }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    };

    if (open) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [open]);

  // Game loop
  useEffect(() => {
    if (!open) return;

    const gameLoop = () => {
      setGameState(prev => {
        let newCameraX = prev.cameraX;
        let newCameraY = prev.cameraY;

        // Handle camera movement
        if (pressedKeys.has('a') || pressedKeys.has('arrowleft')) {
          newCameraX = Math.max(CAMERA_BOUNDS.minX, newCameraX - CAMERA_SPEED);
        }
        if (pressedKeys.has('d') || pressedKeys.has('arrowright')) {
          newCameraX = Math.min(CAMERA_BOUNDS.maxX, newCameraX + CAMERA_SPEED);
        }
        if (pressedKeys.has('w') || pressedKeys.has('arrowup')) {
          newCameraY = Math.max(CAMERA_BOUNDS.minY, newCameraY - CAMERA_SPEED);
        }
        if (pressedKeys.has('s') || pressedKeys.has('arrowdown')) {
          newCameraY = Math.min(CAMERA_BOUNDS.maxY, newCameraY + CAMERA_SPEED);
        }

        return {
          ...prev,
          cameraX: newCameraX,
          cameraY: newCameraY,
          animationTime: prev.animationTime + 16 // ~60fps
        };
      });

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [open, pressedKeys]);

  const handleObjectClick = (obj: SpaceObject) => {
    setGameState(prev => ({ ...prev, selectedObject: obj }));
  };

  const startGame = () => {
    setGameState(prev => ({ ...prev, showInstructions: false }));
  };

  const renderSpaceObject = (obj: SpaceObject, isClickable: boolean = true) => {
    const screenX = obj.x - gameState.cameraX + GAME_WIDTH / 2;
    const screenY = obj.y - gameState.cameraY + GAME_HEIGHT / 2;
    
    // Don't render if outside screen bounds
    if (screenX < -100 || screenX > GAME_WIDTH + 100 || screenY < -100 || screenY > GAME_HEIGHT + 100) {
      return null;
    }

    return (
      <motion.div
        key={obj.id}
        className={`absolute ${isClickable ? 'cursor-pointer' : ''}`}
        style={{
          left: screenX - obj.radius,
          top: screenY - obj.radius,
        }}
        whileHover={isClickable ? { scale: 1.1 } : {}}
        onClick={isClickable ? () => handleObjectClick(obj) : undefined}
      >
        {/* Glow effect */}
        {obj.glowColor && (
          <div
            className="absolute inset-0 rounded-full animate-pulse opacity-60"
            style={{
              background: `radial-gradient(circle, ${obj.glowColor}40 0%, transparent 70%)`,
              width: obj.radius * 3,
              height: obj.radius * 3,
              left: -obj.radius,
              top: -obj.radius,
            }}
          />
        )}
        
        {/* Main object */}
        <motion.div
          className="rounded-full shadow-lg border-2 border-white/20 flex items-center justify-center text-white font-bold text-xs"
          style={{
            width: obj.radius * 2,
            height: obj.radius * 2,
            backgroundColor: obj.color,
            boxShadow: obj.type === 'sun' ? `0 0 20px ${obj.glowColor || obj.color}` : 'none',
          }}
          animate={{
            rotate: obj.type === 'sun' ? 360 : 0,
          }}
          transition={{
            duration: obj.type === 'sun' ? 20 : 0,
            repeat: obj.type === 'sun' ? Infinity : 0,
            ease: 'linear',
          }}
        >
          {obj.type === 'sun' && '☀️'}
          {obj.type === 'planet' && '🪐'}
          {obj.type === 'moon' && '🌙'}
        </motion.div>

        {/* Object label */}
        <div 
          className="absolute whitespace-nowrap text-xs text-white/80 font-medium pointer-events-none text-center"
          style={{
            top: obj.radius * 2 + 4,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {obj.name}
        </div>
      </motion.div>
    );
  };

  const currentObjects = calculateObjectPositions(gameState.animationTime);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-purple-500/30">
        {/* Instructions Modal */}
        <AnimatePresence>
          {gameState.showInstructions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 flex items-center justify-center z-50"
            >
              <Card className="p-8 max-w-md bg-background/95 backdrop-blur-sm border-purple-500/30">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    🚀 Space Portfolio Explorer
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 text-sm">
                  <p className="text-center text-muted-foreground">
                    Welcome to my interactive space portfolio! Navigate through a solar system of my skills and projects.
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">🎮 Controls:</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <ArrowUp className="w-3 h-3" />
                        <span>W / ↑ - Move Up</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowDown className="w-3 h-3" />
                        <span>S / ↓ - Move Down</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowLeft className="w-3 h-3" />
                        <span>A / ← - Move Left</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-3 h-3" />
                        <span>D / → - Move Right</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">🌌 Space Objects:</h4>
                    <ul className="text-xs space-y-1">
                      <li>☀️ <strong>Sun:</strong> About me</li>
                      <li>🪐 <strong>Planets:</strong> Skill categories & projects</li>
                      <li>🌙 <strong>Moons:</strong> Individual skills & details</li>
                    </ul>
                  </div>

                  <p className="text-xs text-center text-muted-foreground">
                    Click on any object to learn more!
                  </p>
                </div>

                <Button
                  onClick={startGame}
                  className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  Launch Into Space!
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Area */}
        <div
          ref={gameRef}
          className="w-full h-full relative overflow-hidden bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20"
          style={{
            backgroundImage: `
              radial-gradient(white 1px, transparent 1px),
              radial-gradient(white 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 20px 20px',
            backgroundPosition: '0 0, 25px 25px',
          }}
        >
          {/* Stars background */}
          <div className="absolute inset-0 opacity-40">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Close button */}
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 z-40 bg-background/80 backdrop-blur-sm border-purple-500/30"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Controls hint */}
          {!gameState.showInstructions && (
            <div className="absolute top-4 left-4 z-40 bg-background/80 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">
                <div className="font-semibold mb-1">Controls:</div>
                <div>WASD or Arrow Keys to move</div>
                <div>Click objects to explore</div>
              </div>
            </div>
          )}

          {/* Camera position indicator */}
          {!gameState.showInstructions && (
            <div className="absolute bottom-4 right-4 z-40 bg-background/80 backdrop-blur-sm border border-purple-500/30 rounded-lg p-2">
              <div className="text-xs text-muted-foreground">
                Camera: ({Math.round(gameState.cameraX)}, {Math.round(gameState.cameraY)})
              </div>
            </div>
          )}

          {/* Render space objects */}
          {!gameState.showInstructions && currentObjects.map(obj => (
            <React.Fragment key={obj.id}>
              {renderSpaceObject(obj)}
              {/* Render moons */}
              {obj.moons?.map(moon => renderSpaceObject(moon))}
            </React.Fragment>
          ))}
        </div>

        {/* Object details panel */}
        <AnimatePresence>
          {gameState.selectedObject && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-background/95 backdrop-blur-sm border-l border-purple-500/30 p-6 overflow-y-auto z-50"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold">{gameState.selectedObject.name}</h3>
                <Button
                  onClick={() => setGameState(prev => ({ ...prev, selectedObject: null }))}
                  variant="ghost"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {gameState.selectedObject.description}
              </p>

              {/* Show content based on object type */}
              {gameState.selectedObject.content && (
                <div className="space-y-4">
                  {gameState.selectedObject.content.image && (
                    <OptimizedImage
                      src={gameState.selectedObject.content.image}
                      alt={gameState.selectedObject.name}
                      className="w-full h-32 object-cover rounded-lg"
                      sizes="320px"
                    />
                  )}

                  {gameState.selectedObject.content.fullBio && (
                    <p className="text-sm">{gameState.selectedObject.content.fullBio}</p>
                  )}

                  {gameState.selectedObject.content.techStack && (
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-1">
                        {gameState.selectedObject.content.techStack.map((tech: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project links */}
                  <div className="flex gap-2">
                    {gameState.selectedObject.content.demoLink && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="text-xs"
                      >
                        <a href={gameState.selectedObject.content.demoLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {gameState.selectedObject.content.githubLink && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="text-xs"
                      >
                        <a href={gameState.selectedObject.content.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="w-3 h-3 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default SpaceGame;