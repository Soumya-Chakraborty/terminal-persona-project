import { useState, useEffect } from 'react';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const TerminalWindow = ({ title = "Terminal", children, className = "" }: TerminalWindowProps) => {
  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-terminal-green rounded-full"></div>
        </div>
        <div className="text-terminal-gray text-sm font-mono">{title}</div>
        <div className="w-16"></div>
      </div>
      <div className="terminal-content">
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

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return (
    <span>
      {displayText}
      <span className="cursor-blink">_</span>
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
  return (
    <div className="flex items-start space-x-1 mb-2">
      <span className="terminal-prompt">{user}@{host}</span>
      <span className="terminal-text">:</span>
      <span className="text-blue-400">{path}</span>
      <span className="terminal-prompt">$</span>
      {children && <span className="terminal-text ml-1">{children}</span>}
    </div>
  );
};