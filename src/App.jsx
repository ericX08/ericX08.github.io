//fix skills bug where i can go back before closing
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Loader from './assets/Loader';
import Gym from './model/gym';
import Sky from './model/sky';
import CameraController from './assets/CameraController';
import About from './pages/About';
import QTEBar from './assets/MiniGame';
import Projects from './pages/Projects';
import { arrow } from '../public';
import { Dumbbell, Play, RefreshCw, Home, XCircle, HelpCircle, MapPin, Info } from 'lucide-react';


const Scene = ({ currentView, onCameraChange, cameraConfigs, onPopupTrigger, playAnimation, sliderPosition, playGame }) => {
  return (
    <>
      <CameraController currentView={currentView} cameraConfigs={cameraConfigs} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <Environment preset="sunset" />
      <Gym 
        onCameraChange={onCameraChange} 
        currentView={currentView} 
        onPopupTrigger={onPopupTrigger} 
        playAnimation={playAnimation}
      />
      <Sky />
      {playGame && (
        <QTEBar 
          position={[-8.7, 2, -11]} 
          rotation={[0, 0, 0]} 
          scale={[2, 0.5, 0.5]} 
          sliderPosition={sliderPosition}
          successZoneStart={0.35}
          successZoneEnd={0.65}
        />
      )}
    </>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('outside');
  const [activePopup, setActivePopup] = useState(null);
  const [playAnimation, setPlayAnimation] = useState(false);
  const [showGameResults, setShowGameResults] = useState(false);
  const [score, setScore] = useState(0);
  const [playGame, setPlayGame] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [direction, setDirection] = useState(1);
  const [canClick, setCanClick] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showStartPopup, setShowStartPopup] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [showHitboxes, setShowHitboxes] = useState(true);

  const cameraConfigs = {
    outside: { position: [0, 3, -23.5], rotation: [0, 180, 0], fov: 54, enableMouseFollow: false },
    reception: { position: [0, 2, -13.5], rotation: [0, 200, 0], fov: 60, enableMouseFollow: true },
    about: { position: [9.75, 1.5, -9.5], rotation: [-5, 0, 0], fov: 54, enableMouseFollow: true },
    projects: { position: [6, 2, 14], rotation: [-2, 0, 0], fov: 70, enableMouseFollow: true },
    skills: { position: [-10, 1.6, 1], rotation: [0, 90, 0], fov: 70, enableMouseFollow: true },
    game: { position: [-8.7, 2, -5], rotation: [0, 0, 0], fov: 60, enableMouseFollow: false },
  };

  useEffect(() => {
    let animationFrame;
    if (playGame && !isPaused) {
      const animate = () => {
        setSliderPosition((prev) => {
          const newPosition = prev + 0.02 * speed * direction;
          if (newPosition > 1 || newPosition < 0) {
            setDirection((prev) => -prev);
          }
          return Math.max(0, Math.min(1, newPosition));
        });
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [playGame, speed, direction, isPaused]);

  useEffect(() => {
    let timeoutId;

    if (currentView === 'game') {
      timeoutId = setTimeout(() => {
        setShowStartPopup(true);
      }, 2000);
    } else {
      setShowStartPopup(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentView]);

  const handleCameraChange = (destination) => {
    setCurrentView(destination);
    // Close any open popups when navigating to a new view
    if (activePopup) {
      setActivePopup(null);
    }
  };

  const handlePopupTrigger = (popupType) => {
    setActivePopup(popupType);
  };

  const handleClick = () => {
    if (!canClick || isPaused) return;

    if (sliderPosition >= 0.35 && sliderPosition <= 0.65) {
      setScore((prev) => prev + 1);
      setSpeed((prev) => prev * 1.05);
      setPlayAnimation(true);
      setCanClick(false);
      setIsPaused(true);
      setTimeout(() => {
        setCanClick(true);
        setPlayAnimation(false);
        setIsPaused(false);
      }, 1500);
    } else {
      handleGameOver();
    }
  };

  const handleStartGame = () => {
    setShowStartPopup(false);
    setShowGameResults(false);
    setPlayGame(true);
    setScore(0);
    setSpeed(1);
    setSliderPosition(0);
    setDirection(1);
    setCanClick(true);
    setIsPaused(false);
  };

  const handleGameOver = () => {
    setShowGameResults(true);
    setPlayGame(false);
    setPlayAnimation(false);
    setIsPaused(false);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  const getLocationName = (view) => {
    const locations = {
      outside: 'Outside Gym',
      reception: 'Reception',
      about: 'About Me',
      projects: 'Projects',
      skills: 'Skills',
      game: 'Game Area'
    };
    return locations[view] || view;
  };

  return (
    <section className='w-full h-screen relative'>
      <Canvas 
        className='w-full h-screen bg-transparent'
        camera={{ near: 0.1, far: 1000, position: [0, 0, 0], fov: 60 }}
      >
        <Suspense fallback={<Loader />}>   
          <Scene 
            currentView={currentView} 
            onCameraChange={handleCameraChange}
            cameraConfigs={cameraConfigs}
            onPopupTrigger={handlePopupTrigger}
            playAnimation={playAnimation}
            onGameOver={handleGameOver}
            sliderPosition={sliderPosition}
            playGame={playGame}
          />
        </Suspense>
      </Canvas>

      {/* Welcome Screen */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-2xl p-4 sm:p-8 max-w-2xl w-full mx-4 text-center">
            <div className="mb-4 sm:mb-6">
              <Dumbbell className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-blue-600 mb-3 sm:mb-4" />
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Welcome to My 3D Portfolio!</h1>
              <p className="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-6">Explore my skills, projects, and experience in this interactive gym environment</p>
            </div>
            
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-left">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700"><strong>Reception:</strong> Start here to navigate to different areas</span>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700"><strong>Skills:</strong> Hover over dumbbells to see my technical expertise</span>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <Info className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700"><strong>About:</strong> Learn about my experience and education</span>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700"><strong>Projects:</strong> Click lockers to view my work</span>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <Home className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700"><strong>Game:</strong> Try the bench press challenge!</span>
              </div>
            </div>

            <button 
              onClick={() => setShowWelcome(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition duration-300 text-sm sm:text-lg w-full sm:w-auto"
            >
              Let's Explore!
            </button>
          </div>
        </div>
      )}

      {/* Help Button */}
      <button
        onClick={() => setShowHelp(true)}
        className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-full transition-colors duration-200 z-40"
        title="Help & Instructions"
      >
        <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Reset Welcome Button */}
      <button
        onClick={() => setShowWelcome(true)}
        className="absolute top-2 sm:top-4 right-16 sm:right-20 bg-green-600 hover:bg-green-700 text-white p-2 sm:p-3 rounded-full transition-colors duration-200 z-40"
        title="Show Welcome Screen"
      >
        <Info className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Progress Indicator */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-lg px-3 sm:px-6 py-2 sm:py-3 shadow-lg z-40 mx-2">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${currentView === 'reception' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-600 hidden sm:block">Reception</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${currentView === 'about' ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-600 hidden sm:block">About</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${currentView === 'skills' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-600 hidden sm:block">Skills</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${currentView === 'projects' ? 'bg-orange-600' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-600 hidden sm:block">Projects</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${currentView === 'game' ? 'bg-red-600' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-600 hidden sm:block">Game</span>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-2xl p-4 sm:p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">How to Navigate</h2>
              <button 
                onClick={() => setShowHelp(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 transition-colors duration-200"
              >
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-2 sm:mb-3">🎯 Getting Started</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-3">Click on the menu in the reception area to navigate to different sections of the gym.</p>
                <p className="text-sm sm:text-base text-gray-700">Each area showcases different aspects of my portfolio.</p>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-green-600 mb-2 sm:mb-3">🏋️ Skills Area</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-3">Hover over the dumbbells to see my technical skills and confidence levels.</p>
                <p className="text-sm sm:text-base text-gray-700">Large dumbbells = High confidence, Small dumbbells = Learning</p>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-purple-600 mb-2 sm:mb-3">📚 About Section</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-3">Learn about my experience, education, and background.</p>
                <p className="text-sm sm:text-base text-gray-700">Click on different sections to explore my journey.</p>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-red-600 mb-2 sm:mb-3">💼 Projects</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-3">Click on the lockers to view my projects and work.</p>
                <p className="text-sm sm:text-base text-gray-700">Each locker contains a different project with details and links.</p>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-orange-600 mb-2 sm:mb-3">🎮 Game Area</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-3">Test your timing with the bench press challenge!</p>
                <p className="text-sm sm:text-base text-gray-700">Click when the slider is in the green zone to score points.</p>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Interactive Hints */}
      {currentView === 'reception' && showHitboxes && (
        <div className="absolute top-16 sm:top-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg z-40 animate-pulse mx-2">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">Click on the menu to explore different areas!</span>
          </div>
        </div>
      )}

      {currentView === 'skills' && !activePopup && (
        <div className="absolute top-16 sm:top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg z-40 animate-pulse mx-2">
          <div className="flex items-center space-x-2">
            <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">Hover over dumbbells to see my skills!</span>
          </div>
        </div>
      )}

      {currentView === 'projects' && !activePopup && (
        <div className="absolute top-16 sm:top-20 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg z-40 animate-pulse mx-2">
          <div className="flex items-center space-x-2">
            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">Click on lockers to view projects!</span>
          </div>
        </div>
      )}

      {currentView === 'about' && !activePopup && (
        <div className="absolute top-16 sm:top-20 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg z-40 animate-pulse mx-2">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">Click on different sections to learn more!</span>
          </div>
        </div>
      )}

      {/* Game Controls */}
      {currentView === 'game' && playGame && !isPaused && (
        <button
          onClick={handleClick}
          disabled={!canClick}
          className={`absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 
                      bg-gradient-to-r ${canClick ? 'from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600' : 'from-gray-400 to-gray-500'} 
                      text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg 
                      transition duration-300 ease-in-out transform hover:scale-105 
                      flex items-center justify-center space-x-2
                      ${canClick ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        >
          <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-lg sm:text-xl">LIFT!</span>
        </button>
      )}

      {/* Back to Reception Button */}
      {currentView !== 'reception' && currentView !== 'outside' && !showGameResults && !playGame && (
        <button
          className="absolute top-3 sm:top-6 left-3 sm:left-6 flex items-center text-white hover:text-gray-200 transition-colors duration-300 focus:outline-none bg-black bg-opacity-50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg"
          onClick={() => handleCameraChange('reception')}
        >
          <img src={arrow} alt="Back Arrow" className="w-4 h-4 sm:w-6 sm:h-6 mr-1 sm:mr-2 transform rotate-180" />
          <span className="text-sm sm:text-lg font-semibold">Back to Reception</span>
        </button>
      )}

      {/* Popup Overlays */}
      {activePopup && currentView !== 'projects' && (
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: '70%',
          height: '85%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '2px solid #333',
          borderRadius: '10px',
          padding: '20px',
          overflowY: 'auto'
        }}>
          <About activePopup={activePopup} onClose={() => setActivePopup(null)} />
        </div>
      )}
      {activePopup && currentView !== 'about' && (
        <div style={{
          position: 'absolute',
          top: '4%',
          left: '17%',
          width: '70%',
          height: '95%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '2px solid #333',
          borderRadius: '10px',
          padding: '20px',
          overflowY: 'auto'
        }}>
          <Projects activePopup={activePopup} onClose={() => setActivePopup(null)} />
        </div>
      )}

      {/* Game Start Popup */}
      {showStartPopup && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-4 sm:p-8 rounded-xl text-center shadow-lg z-50 max-w-md w-full mx-4">
          <Dumbbell className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-emerald-400" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">Ready to Lift?</h2>
          <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-300">Challenge yourself with the Bench Press Game!</p>
          <button 
            onClick={handleStartGame}
            className="flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-300"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            Start Game
          </button>
        </div>
      )}

      {/* Game Results */}
      {showGameResults && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-4 sm:p-8 rounded-xl text-center shadow-lg z-50 max-w-md w-full mx-4">
          <XCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-red-400" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">Game Over</h2>
          <p className="text-lg sm:text-xl mb-2 text-gray-300">Score: <span className="text-emerald-400 font-bold">{score}</span></p>
          <p className="text-lg sm:text-xl mb-4 sm:mb-6 text-gray-300">High Score: <span className="text-emerald-400 font-bold">{highScore}</span></p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={handleStartGame}
              className="w-full sm:flex-1 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 sm:py-3 px-4 rounded-lg transition duration-300"
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Play Again
            </button>
            <button 
              onClick={() => {handleCameraChange('reception'); setShowGameResults(false);}}
              className="w-full sm:flex-1 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 sm:py-3 px-4 rounded-lg transition duration-300"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Reception
            </button>
          </div>
        </div>
      )}

      {/* Quick Navigation Menu */}
      {currentView !== 'outside' && currentView !== 'reception' && (
        <div className="absolute top-16 sm:top-20 right-2 sm:right-4 bg-white bg-opacity-90 rounded-lg p-3 sm:p-4 shadow-lg z-40 max-w-[200px] sm:max-w-none">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Quick Navigation</h3>
          <div className="space-y-1 sm:space-y-2">
            <button
              onClick={() => handleCameraChange('reception')}
              className="flex items-center space-x-2 w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded hover:bg-blue-100 transition-colors"
            >
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              <span className="text-xs text-gray-600">Reception</span>
            </button>
            <button
              onClick={() => handleCameraChange('about')}
              className="flex items-center space-x-2 w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded hover:bg-purple-100 transition-colors"
            >
              <Info className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              <span className="text-xs text-gray-600">About</span>
            </button>
            <button
              onClick={() => handleCameraChange('skills')}
              className="flex items-center space-x-2 w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded hover:bg-green-100 transition-colors"
            >
              <Dumbbell className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="text-xs text-gray-600">Skills</span>
            </button>
            <button
              onClick={() => handleCameraChange('projects')}
              className="flex items-center space-x-2 w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded hover:bg-orange-100 transition-colors"
            >
              <Play className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
              <span className="text-xs text-gray-600">Projects</span>
            </button>
            <button
              onClick={() => handleCameraChange('game')}
              className="flex items-center space-x-2 w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded hover:bg-red-100 transition-colors"
            >
              <Home className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
              <span className="text-xs text-gray-600">Game</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default App;