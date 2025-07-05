import { TerminalWindow, TerminalPrompt } from './TerminalWindow';

const projects = [
  {
    name: 'e-commerce-platform',
    description: 'Full-stack e-commerce application with React and Node.js',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    status: 'production',
    demo: 'https://demo.example.com',
    repo: 'https://github.com/username/project'
  },
  {
    name: 'task-management-app',
    description: 'Real-time task management with team collaboration features',
    tech: ['Vue.js', 'Express', 'Socket.io', 'MongoDB'],
    status: 'development',
    demo: 'https://demo2.example.com',
    repo: 'https://github.com/username/project2'
  },
  {
    name: 'ai-chat-bot',
    description: 'AI-powered chatbot with natural language processing',
    tech: ['Python', 'FastAPI', 'OpenAI', 'Redis'],
    status: 'production',
    demo: 'https://demo3.example.com',
    repo: 'https://github.com/username/project3'
  }
];

export const ProjectsTerminal = () => {
  return (
    <TerminalWindow title="projects.sh" className="w-full max-w-4xl">
      <TerminalPrompt>find ./projects -type f -name "*.md" | head -10</TerminalPrompt>
      <div className="mb-4 space-y-1 terminal-dim">
        {projects.map((project) => (
          <div key={project.name}>./projects/{project.name}/README.md</div>
        ))}
      </div>
      
      {projects.map((project, index) => (
        <div key={project.name} className="mb-6">
          <TerminalPrompt>cat ./projects/{project.name}/README.md</TerminalPrompt>
          <div className="ml-4 space-y-2">
            <div className="text-terminal-green font-bold text-lg"># {project.name}</div>
            <div className="terminal-text">{project.description}</div>
            
            <div className="mt-2">
              <div className="terminal-dim">## Tech Stack</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.tech.map((tech) => (
                  <span key={tech} className="terminal-prompt bg-secondary px-2 py-1 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-2">
              <div className="terminal-dim">## Status</div>
              <span className={`${project.status === 'production' ? 'text-terminal-green' : 'text-yellow-400'}`}>
                ● {project.status}
              </span>
            </div>
            
            <div className="mt-2 space-x-4">
              <a href={project.demo} className="terminal-prompt hover:text-terminal-green-dim transition-colors">
                [Demo]
              </a>
              <a href={project.repo} className="terminal-prompt hover:text-terminal-green-dim transition-colors">
                [Source]
              </a>
            </div>
          </div>
        </div>
      ))}
      
      <TerminalPrompt>echo "Projects overview complete!"</TerminalPrompt>
      <div className="terminal-prompt">Projects overview complete!</div>
    </TerminalWindow>
  );
};