import { TerminalWindow, TerminalPrompt } from './TerminalWindow';

const projects = [
  {
    name: "torpedo-detection-system",
    description: "AI-driven molten steel leak detector using YOLOv10 and thermal imaging",
    tech: ["YOLOv10", "Thermal Imaging", "Python", "AI/ML"],
    details: [
      "Engineered system cutting undetected leaks by 95%",
      "Enhanced plant safety for IISCO steel production",
      "Implemented RFID-based inventory tracker with 100% accuracy",
      "Standardized incident reporting workflows reducing response time by 40%"
    ],
    status: "production",
    company: "Hi-Tech System & Services Ltd."
  },
  {
    name: "pan-tilt-drift-correction",
    description: "FFT-backed algorithm for auto-correcting pan-tilt drift",
    tech: ["FFT", "Control Systems", "Python", "Algorithm Design"],
    details: [
      "Achieved positional precision within 0.5°",
      "Reduced equipment downtime by 40%",
      "Improved monitoring reliability for JUSCO",
      "Integrated automated control routines"
    ],
    status: "production",
    company: "Hi-Tech System & Services Ltd."
  },
  {
    name: "sap-integration-middleware",
    description: "GCP-based middleware for automated meter data ingestion",
    tech: ["Google Cloud Platform", "SAP CPI", "API Development", "Cloud Architecture"],
    details: [
      "Architected middleware for DVC automation",
      "Increased data availability by 30%",
      "Reduced latency from hours to minutes",
      "Streamlined alerting and data synchronization"
    ],
    status: "production",
    company: "Hi-Tech System & Services Ltd."
  },
  {
    name: "c-dataframes-library",
    description: "C-based DataFrame library for statistical analysis",
    tech: ["C Programming", "Data Structures", "Statistical Analysis"],
    details: [
      "Supports insertion, filtering, and aggregation operations",
      "Reduced operational times by multiple factors",
      "Enhanced data processing for academic research",
      "Developed at Indian Statistical Institute"
    ],
    status: "completed",
    company: "Academic Project"
  },
  {
    name: "video-summarization-gan",
    description: "Unsupervised video summarization using GANs and reinforcement learning",
    tech: ["GANs", "Reinforcement Learning", "PyTorch", "Computer Vision"],
    details: [
      "Designed GAN framework for concise video summaries",
      "Includes audio processing capabilities",
      "Validated on SumMe dataset",
      "Improved summary relevance and computational efficiency"
    ],
    status: "research",
    company: "Indian Statistical Institute"
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
              <div className="terminal-dim">## Company</div>
              <div className="terminal-text">{project.company}</div>
            </div>
            
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
              <div className="terminal-dim">## Key Achievements</div>
              <div className="ml-4 space-y-1">
                {project.details.map((detail, idx) => (
                  <div key={idx} className="terminal-text">
                    <span className="terminal-prompt">•</span> {detail}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-2">
              <div className="terminal-dim">## Status</div>
              <span className={`${
                project.status === 'production' ? 'text-terminal-green' : 
                project.status === 'research' ? 'text-yellow-400' :
                project.status === 'completed' ? 'text-blue-400' :
                'text-terminal-gray'
              }`}>
                ● {project.status}
              </span>
            </div>
          </div>
        </div>
      ))}
      
      <TerminalPrompt>echo "Projects overview complete!"</TerminalPrompt>
      <div className="terminal-prompt">Projects overview complete!</div>
    </TerminalWindow>
  );
};