import React, { useEffect, useState } from 'react';
import '../styles/SplashScreen.css';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [showSlogan, setShowSlogan] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowSlogan(true), 1000);
    const timer2 = setTimeout(() => onFinish(), 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <img
        src={`${process.env.PUBLIC_URL}/Cakewalk_LOGO.png`}
        alt="Cakewalk Logo"
        className="logo"
      />
      <h2 className={`slogan ${showSlogan ? 'show' : ''}`}>
        Accessible, Affordable Peace of Mind
      </h2>
    </div>
  );
};

export default SplashScreen;