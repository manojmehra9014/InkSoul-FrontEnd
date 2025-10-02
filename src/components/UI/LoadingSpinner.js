import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingSpinner = ({ size = 'large', text = 'Loading...' }) => {
  const spinnerRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    // Animate spinner
    gsap.to(spinnerRef.current, {
      rotation: 360,
      duration: 1,
      repeat: -1,
      ease: "none"
    });

    // Animate text
    gsap.fromTo(textRef.current,
      { opacity: 0.5 },
      { opacity: 1, duration: 1, repeat: -1, yoyo: true }
    );
  }, []);

  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div
          ref={spinnerRef}
          className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 border-t-ink-600 rounded-full mx-auto mb-4`}
        />
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-ink-600 to-soul-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-ink-600 to-soul-600 bg-clip-text text-transparent">
            InkSoul
          </span>
        </div>
        <p
          ref={textRef}
          className="text-gray-600 dark:text-gray-400 font-medium"
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;