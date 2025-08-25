import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Allow fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-adventure via-neonPink to-sunset z-50 flex items-center justify-center animate-fade-out">
        <div className="text-center text-white animate-fade-out">
          <div className="text-6xl mb-4 animate-bounce">����</div>
          <h1 className="text-4xl font-bold mb-2 neon-text">EventVibe</h1>
          <p className="text-lg">Find your tribe, join the vibe!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-adventure via-neonPink to-sunset z-50 flex items-center justify-center">
      <div className="text-center text-white animate-fade-scale">
        <div className="text-6xl mb-4 animate-bounce">🌟</div>
        <h1 className="text-4xl font-bold mb-2 neon-text">EventVibe</h1>
        <p className="text-lg animate-pulse">Find your tribe, join the vibe!</p>
        <div className="mt-8">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
