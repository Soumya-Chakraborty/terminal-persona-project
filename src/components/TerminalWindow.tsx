import { useState, useEffect } from 'react';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const TerminalWindow = ({ title = "Terminal", children, className = "" }: TerminalWindowProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`terminal-window transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      <div className="terminal-header">
        <div className="flex items-center space-x-2 z-10 relative">
          <div className="window-button bg-terminal-red border-terminal-red"></div>
          <div className="window-button bg-terminal-yellow border-terminal-yellow"></div>
          <div className="window-button bg-terminal-green border-terminal-green"></div>
        </div>
        <div className="text-terminal-gray text-sm font-mono scanline">{title}</div>
        <div className="w-16"></div>
      </div>
      <div className="terminal-content relative">
        <div className="absolute inset-0 bg-gradient-to-br from-terminal-green/5 to-transparent pointer-events-none"></div>
        {children}
      </div>
    </div>
  );
};

interface TypeWriterProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

export const TypeWriter = ({ text, delay = 50, onComplete }: TypeWriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setShowCursor(false), 2000);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, delay, text, onComplete]);

  return (
    <span className="relative">
      <span className="text-gradient-terminal">{displayText}</span>
      {showCursor && <span className="cursor-blink ml-1">█</span>}
    </span>
  );
};

interface TerminalPromptProps {
  user?: string;
  host?: string;
  path?: string;
  children?: React.ReactNode;
}

export const TerminalPrompt = ({ 
  user = "dev", 
  host = "portfolio", 
  path = "~", 
  children 
}: TerminalPromptProps) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex items-start space-x-1 mb-2 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
      <span className="terminal-prompt">{user}@{host}</span>
      <span className="terminal-text">:</span>
      <span className="text-terminal-green">{path}</span>
      <span className="terminal-prompt">$</span>
      {children && <span className="terminal-text ml-1">{children}</span>}
    </div>
  );
};