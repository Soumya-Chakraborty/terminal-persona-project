import { TerminalWindow, TerminalPrompt } from './TerminalWindow';

const skills = [
  { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust'] },
  { category: 'Frontend', items: ['React', 'Vue.js', 'Svelte', 'Next.js', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB'] },
  { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Terraform'] },
  { category: 'Tools', items: ['Git', 'VS Code', 'Linux', 'Figma', 'Postman'] }
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