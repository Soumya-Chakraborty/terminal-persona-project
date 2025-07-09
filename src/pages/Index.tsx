import { useState, useEffect } from 'react';
import { TerminalWindow, TerminalPrompt, TypeWriter } from '@/components/TerminalWindow';
import { AboutTerminal } from '@/components/AboutTerminal';
import { SkillsTerminal } from '@/components/SkillsTerminal';
import { ProjectsTerminal } from '@/components/ProjectsTerminal';
import { ContactTerminal } from '@/components/ContactTerminal';
import { MatrixBackground } from '@/components/MatrixBackground';
import { GlitchText } from '@/components/GlitchText';
import terminalBg from '@/assets/terminal-bg.jpg';

const welcomeAscii = `
███████╗ ██████╗ ██╗   ██╗███╗   ███╗██╗   ██╗ █████╗ 
██╔════╝██╔═══██╗██║   ██║████╗ ████║╚██╗ ██╔╝██╔══██╗
███████╗██║   ██║██║   ██║██╔████╔██║ ╚████╔╝ ███████║
╚════██║██║   ██║██║   ██║██║╚██╔╝██║  ╚██╔╝  ██╔══██║
███████║╚██████╔╝╚██████╔╝██║ ╚═╝ ██║   ██║   ██║  ██║
╚══════╝ ╚═════╝  ╚═════╝ ╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═╝ 
`;

const navigationCommands = [
  { command: 'about', description: 'Display information about me' },
  { command: 'skills', description: 'Show technical skills and expertise' },
  { command: 'projects', description: 'Browse recent projects and work' },
  { command: 'contact', description: 'Get contact information' },
  { command: 'help', description: 'Display available commands' }
];

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [showWelcome, setShowWelcome] = useState(true);
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sectionTransition, setSectionTransition] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...commandHistory, `$ ${cmd}`];
    
    setIsLoading(true);
    setSectionTransition(true);
    
    setTimeout(() => {
      switch (trimmedCmd) {
        case 'about':
          setCurrentSection('about');
          newHistory.push('✓ About section loaded successfully');
          break;
        case 'skills':
          setCurrentSection('skills');
          newHistory.push('✓ Skills database accessed');
          break;
        case 'projects':
          setCurrentSection('projects');
          newHistory.push('✓ Project repository initialized');
          break;
        case 'contact':
          setCurrentSection('contact');
          newHistory.push('✓ Contact interface activated');
          break;
        case 'home':
        case 'clear':
          setCurrentSection('home');
          setCommandHistory([]);
          setIsLoading(false);
          setSectionTransition(false);
          return;
        case 'help':
          newHistory.push('Available commands:');
          navigationCommands.forEach(nav => {
            newHistory.push(`  ${nav.command.padEnd(12)} - ${nav.description}`);
          });
          newHistory.push('  clear        - Clear terminal and return to home');
          break;
        case 'matrix':
          newHistory.push('Wake up, Neo...');
          break;
        case 'whoami':
          newHistory.push('You are the chosen one.');
          break;
        default:
          newHistory.push(`bash: ${cmd}: command not found`);
          newHistory.push("Type 'help' for available commands.");
      }
      
      setCommandHistory(newHistory);
      setIsLoading(false);
      setSectionTransition(false);
    }, 1000);
  };

  const renderCurrentSection = () => {
    const sectionClasses = `transition-all duration-700 ${sectionTransition ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`;
    
    switch (currentSection) {
      case 'about':
        return <div className={sectionClasses}><AboutTerminal /></div>;
      case 'skills':
        return <div className={sectionClasses}><SkillsTerminal /></div>;
      case 'projects':
        return <div className={sectionClasses}><ProjectsTerminal /></div>;
      case 'contact':
        return <div className={sectionClasses}><ContactTerminal /></div>;
      default:
        return (
          <TerminalWindow title="welcome.sh" className="w-full max-w-4xl">
            {showWelcome ? (
              <div className="space-y-6">
                <pre className="ascii-glow text-terminal-green text-xs leading-tight overflow-x-auto">
                  {welcomeAscii}
                </pre>
                <div className="terminal-text">
                  <TypeWriter 
                    text="Welcome to Soumya Chakraborty's developer portfolio..."
                    delay={50}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="terminal-text">
                  <GlitchText 
                    text="Welcome to Soumya's Portfolio v2.0" 
                    className="text-terminal-green font-bold text-lg"
                  />
                </div>
                <div className="terminal-dim animate-fade-in">
                  Type commands to navigate through my portfolio. Try 'matrix' for a surprise!
                </div>
                
                <div className="mt-8">
                  <div className="terminal-text mb-4 text-gradient-terminal font-semibold">Available commands:</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
                    {navigationCommands.map((nav, index) => (
                      <div 
                        key={nav.command} 
                        className="command-item"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="terminal-prompt font-mono font-semibold">{nav.command}</span>
                        <span className="terminal-dim ml-3">- {nav.description}</span>
                      </div>
                    ))}
                    <div className="command-item">
                      <span className="terminal-prompt font-mono font-semibold">clear</span>
                      <span className="terminal-dim ml-3">- Clear terminal</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-2 max-h-40 overflow-y-auto">
                  {commandHistory.map((line, index) => (
                    <div 
                      key={index} 
                      className={`transition-all duration-300 ${
                        line.startsWith('bash:') ? 'text-red-400 animate-pulse' : 
                        line.startsWith('$') ? 'terminal-prompt glow' : 
                        line.startsWith('✓') ? 'text-terminal-green' : 'terminal-text'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {line}
                    </div>
                  ))}
                </div>

                <div className="flex items-center mt-6 p-4 bg-gradient-to-r from-terminal-green/10 to-transparent rounded-lg border border-terminal-green/20">
                  <TerminalPrompt user="visitor" host="soumya-portfolio" path="~" />
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !isLoading) {
                        handleCommand(command);
                        setCommand('');
                      }
                    }}
                    disabled={isLoading}
                    className="bg-transparent border-none outline-none terminal-text flex-1 ml-2 placeholder:text-terminal-gray/50"
                    placeholder={isLoading ? "Processing..." : "Enter command..."}
                    autoFocus
                  />
                  {isLoading ? (
                    <span className="loading-dots text-terminal-green">Loading</span>
                  ) : (
                    <span className="cursor-blink">█</span>
                  )}
                </div>
              </div>
            )}
          </TerminalWindow>
        );
    }
  };

  return (
    <div 
      className="min-h-screen bg-terminal-dark relative overflow-hidden"
      style={{
        backgroundImage: `url(${terminalBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Matrix Background */}
      <MatrixBackground />
      
      {/* Background overlay with enhanced gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-terminal-dark/90 via-terminal-dark/80 to-terminal-dark/90"></div>
      
      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(0,255,0,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(0,255,0,0.1) 1px, transparent 1px)
               `,
               backgroundSize: '20px 20px'
             }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl">
          {renderCurrentSection()}
        </div>
        
        {/* Enhanced Navigation hint */}
        {currentSection !== 'home' && (
          <div className="mt-8 text-center animate-fade-in">
            <button
              onClick={() => {
                setSectionTransition(true);
                setTimeout(() => {
                  setCurrentSection('home');
                  setSectionTransition(false);
                }, 300);
              }}
              className="terminal-button group"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>←</span>
                <span>Back to Home</span>
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Enhanced terminal glow effects */}
      <div className="fixed inset-0 pointer-events-none terminal-glow opacity-20"></div>
      
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-terminal-green rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Index;