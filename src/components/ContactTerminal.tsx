import { TerminalWindow, TerminalPrompt } from './TerminalWindow';
import { useState } from 'react';

const contactInfo = {
  email: "soumyachakraborty198181@gmail.com",
  phone: "+91-89109-27312",
  github: "https://github.com/Soumya-Chakraborty",
  linkedin: "https://linkedin.com/in/soumya-chakraborty"
};

export const ContactTerminal = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleCommand = (cmd: string) => {
    const newHistory = [...history, cmd];
    
    switch (cmd.toLowerCase()) {
      case 'help':
        newHistory.push('Available commands: email, phone, github, linkedin, clear');
        break;
      case 'email':
        newHistory.push(`📧 ${contactInfo.email}`);
        break;
      case 'phone':
        newHistory.push(`📱 ${contactInfo.phone}`);
        break;
      case 'github':
        newHistory.push(`🐱 ${contactInfo.github}`);
        break;
      case 'linkedin':
        newHistory.push(`💼 ${contactInfo.linkedin}`);
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        newHistory.push(`Command not found: ${cmd}. Type 'help' for available commands.`);
    }
    
    setHistory(newHistory);
  };

  return (
    <TerminalWindow title="contact.sh" className="w-full max-w-4xl">
      <TerminalPrompt>ls -la contact/</TerminalPrompt>
      <div className="mb-4 space-y-1 terminal-dim">
        <div>total 4</div>
        <div>-rw-r--r-- 1 dev dev 42 Dec 25 12:00 email.txt</div>
        <div>-rw-r--r-- 1 dev dev 20 Dec 25 12:00 phone.txt</div>
        <div>-rw-r--r-- 1 dev dev 38 Dec 25 12:00 github.txt</div>
        <div>-rw-r--r-- 1 dev dev 45 Dec 25 12:00 linkedin.txt</div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="terminal-text">
          <span className="terminal-dim"># Quick access commands:</span>
        </div>
        <div className="terminal-text">
          <span className="terminal-prompt">email</span> - Display email address
        </div>
        <div className="terminal-text">
          <span className="terminal-prompt">phone</span> - Display phone number
        </div>
        <div className="terminal-text">
          <span className="terminal-prompt">github</span> - Open GitHub profile
        </div>
        <div className="terminal-text">
          <span className="terminal-prompt">linkedin</span> - Open LinkedIn profile
        </div>
      </div>

      {history.map((line, index) => (
        <div key={index} className={line.startsWith('Command not found') ? 'text-red-400' : 'terminal-text'}>
          {line.startsWith('📧') || line.startsWith('📱') || line.startsWith('🐱') || line.startsWith('💼') ? (
            <a href={
              line.startsWith('📧') ? `mailto:${line.split(' ')[1]}` :
              line.startsWith('📱') ? `tel:${line.split(' ')[1]}` :
              line.split(' ')[1]
            } 
               className="terminal-prompt hover:text-terminal-green-dim transition-colors">
              {line}
            </a>
          ) : (
            line
          )}
        </div>
      ))}

      <div className="flex items-center">
        <TerminalPrompt />
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
          placeholder="Type 'help' for commands..."
          autoFocus
        />
        <span className="cursor-blink">_</span>
      </div>
    </TerminalWindow>
  );
};