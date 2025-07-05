import { useState, useEffect } from 'react';
import { TerminalWindow, TerminalPrompt, TypeWriter } from '@/components/TerminalWindow';
import { AboutTerminal } from '@/components/AboutTerminal';
import { SkillsTerminal } from '@/components/SkillsTerminal';
import { ProjectsTerminal } from '@/components/ProjectsTerminal';
import { ContactTerminal } from '@/components/ContactTerminal';
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

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...commandHistory, `$ ${cmd}`];
    
    switch (trimmedCmd) {
      case 'about':
        setCurrentSection('about');
        newHistory.push('Loading about section...');
        break;
      case 'skills':
        setCurrentSection('skills');
        newHistory.push('Loading skills section...');
        break;
      case 'projects':
        setCurrentSection('projects');
        newHistory.push('Loading projects section...');
        break;
      case 'contact':
        setCurrentSection('contact');
        newHistory.push('Loading contact section...');
        break;
      case 'home':
      case 'clear':
        setCurrentSection('home');
        setCommandHistory([]);
        return;
      case 'help':
        newHistory.push('Available commands:');
        navigationCommands.forEach(nav => {
          newHistory.push(`  ${nav.command.padEnd(12)} - ${nav.description}`);
        });
        newHistory.push('  clear        - Clear terminal and return to home');
        break;
      default:
        newHistory.push(`bash: ${cmd}: command not found`);
        newHistory.push("Type 'help' for available commands.");
    }
    
    setCommandHistory(newHistory);
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'about':
        return <AboutTerminal />;
      case 'skills':
        return <SkillsTerminal />;
      case 'projects':
        return <ProjectsTerminal />;
      case 'contact':
        return <ContactTerminal />;
      default:
        return (
          <TerminalWindow title="welcome.sh" className="w-full max-w-4xl">
            {showWelcome ? (
              <div className="space-y-4">
                <pre className="text-terminal-green text-xs leading-tight overflow-x-auto">
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
              <div className="space-y-4">
                <div className="terminal-text">
                  <span className="text-terminal-green font-bold">Welcome to Soumya's Portfolio v1.0</span>
                </div>
                <div className="terminal-dim">
                  Type commands to navigate through my portfolio.
                </div>
                
                <div className="mt-6">
                  <div className="terminal-text mb-2">Available commands:</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4">
                    {navigationCommands.map((nav) => (
                      <div key={nav.command} className="terminal-text">
                        <span className="terminal-prompt font-mono">{nav.command}</span>
                        <span className="terminal-dim ml-2">- {nav.description}</span>
                      </div>
                    ))}
                    <div className="terminal-text">
                      <span className="terminal-prompt font-mono">clear</span>
                      <span className="terminal-dim ml-2">- Clear terminal</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-1">
                  {commandHistory.map((line, index) => (
                    <div key={index} className={
                      line.startsWith('bash:') ? 'text-red-400' : 
                      line.startsWith('$') ? 'terminal-prompt' : 'terminal-text'
                    }>
                      {line}
                    </div>
                  ))}
                </div>

                <div className="flex items-center mt-4">
                  <TerminalPrompt user="visitor" host="soumya-portfolio" path="~" />
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleCommand(command);
                        setCommand('');
                      }
                    }}
                    className="bg-transparent border-none outline-none terminal-text flex-1 ml-2"
                    placeholder="Enter command..."
                    autoFocus
                  />
                  <span className="cursor-blink">_</span>
                </div>
              </div>
            )}
          </TerminalWindow>
        );
    }
  };

  return (
    <div 
      className="min-h-screen bg-terminal-dark relative overflow-x-hidden"
      style={{
        backgroundImage: `url(${terminalBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-terminal-dark/80"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {renderCurrentSection()}
        
        {/* Navigation hint */}
        {currentSection !== 'home' && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentSection('home')}
              className="terminal-prompt hover:text-terminal-green-dim transition-colors text-sm"
            >
              [← Back to Home]
            </button>
          </div>
        )}
      </div>

      {/* Terminal glow effect */}
      <div className="fixed inset-0 pointer-events-none terminal-glow opacity-30"></div>
    </div>
  );
};

export default Index;