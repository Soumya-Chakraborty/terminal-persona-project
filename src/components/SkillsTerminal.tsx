import { TerminalWindow, TerminalPrompt } from './TerminalWindow';

const skills = [
  { category: 'Programming', items: ['Python', 'C', 'C#', '.NET Framework'] },
  { category: 'AI/ML', items: ['YOLOv10', 'GANs', 'Reinforcement Learning', 'PyTorch', 'Deep Learning'] },
  { category: 'Data Analysis', items: ['Pandas', 'NumPy', 'FFT', 'Scikit Learn', 'Matplotlib'] },
  { category: 'Database', items: ['SQL', 'Database Management Systems'] },
  { category: 'Cloud & Integration', items: ['Google Cloud Platform', 'SAP CPI'] },
  { category: 'Tools', items: ['Git', 'LaTeX', 'Docker', 'Linux', 'Windows'] }
];

export const SkillsTerminal = () => {
  return (
    <TerminalWindow title="skills.sh" className="w-full max-w-4xl">
      <TerminalPrompt>ls -la skills/</TerminalPrompt>
      <div className="mb-4 terminal-dim">
        total {skills.length}
      </div>
      
      {skills.map((skillGroup, index) => (
        <div key={skillGroup.category} className="mb-4">
          <TerminalPrompt>cat skills/{skillGroup.category.toLowerCase()}.txt</TerminalPrompt>
          <div className="ml-4 space-y-1">
            {skillGroup.items.map((skill, skillIndex) => (
              <div key={skill} className="terminal-text">
                <span className="terminal-prompt">✓</span> {skill}
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <TerminalPrompt>echo "Skills loaded successfully!"</TerminalPrompt>
      <div className="terminal-prompt">Skills loaded successfully!</div>
    </TerminalWindow>
  );
};