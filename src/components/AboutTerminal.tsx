import { TerminalWindow, TerminalPrompt, TypeWriter } from './TerminalWindow';
import { useState, useEffect } from 'react';

const aboutInfo = {
  name: "John Developer",
  role: "Full-Stack Developer",
  location: "San Francisco, CA",
  experience: "5+ years",
  passion: "Building innovative web applications and exploring new technologies"
};

export const AboutTerminal = () => {
  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TerminalWindow title="about.sh" className="w-full max-w-4xl">
      <TerminalPrompt>whoami</TerminalPrompt>
      <div className="terminal-text mb-4">{aboutInfo.name}</div>
      
      <TerminalPrompt>cat /etc/profile</TerminalPrompt>
      <div className="ml-4 space-y-2 mb-4">
        <div className="terminal-text">
          <span className="terminal-dim"># User Profile</span>
        </div>
        <div className="terminal-text">
          <span className="terminal-prompt">NAME=</span>"{aboutInfo.name}"
        </div>
        <div className="terminal-text">
          <span className="terminal-prompt">ROLE=</span>"{aboutInfo.role}"
        </div>
        <div className="terminal-text">
          <span className="terminal-prompt">LOCATION=</span>"{aboutInfo.location}"
        </div>
        <div className="terminal-text">
          <span className="terminal-prompt">EXPERIENCE=</span>"{aboutInfo.experience}"
        </div>
      </div>

      <TerminalPrompt>echo $PASSION</TerminalPrompt>
      <div className="terminal-text mb-4">
        {showDetails ? (
          <TypeWriter 
            text={aboutInfo.passion}
            delay={30}
          />
        ) : (
          <span className="cursor-blink">_</span>
        )}
      </div>

      <TerminalPrompt>ps aux | grep -i "interests"</TerminalPrompt>
      <div className="ml-4 space-y-1 terminal-dim">
        <div>dev      1234  0.1  0.5  coding        Running</div>
        <div>dev      1235  0.2  0.3  open-source   Running</div>
        <div>dev      1236  0.1  0.2  learning      Running</div>
        <div>dev      1237  0.3  0.4  mentoring     Running</div>
      </div>
    </TerminalWindow>
  );
};