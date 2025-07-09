import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`${isGlitching ? 'glitch' : ''} ${className}`}
      data-text={text}
    >
      {text}
    </span>
  );
};