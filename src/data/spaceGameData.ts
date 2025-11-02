export interface SpaceObject {
  id: string;
  name: string;
  type: 'sun' | 'planet' | 'moon';
  description: string;
  content?: any;
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor?: string;
  orbitRadius?: number;
  orbitSpeed?: number;
  moons?: SpaceObject[];
}

// Portfolio data organized for space game
export const spaceGameData: SpaceObject[] = [
  // Sun - About Me
  {
    id: 'sun',
    name: 'About Honzik',
    type: 'sun',
    description: "I'm Honzík, a software engineering student at the University of Waterloo interested in integrated software engineering for robotics applications. I've worked with control theory concepts, such as state-space control, AprilTag localization, and PID loops.",
    content: {
      image: 'profile.webp',
      fullBio: "I'm Honzík, a software engineering student at the University of Waterloo interested in integrated software engineering for robotics applications. I've worked with control theory concepts, such as state-space control, AprilTag localization, and PID loops, and collaborative tools like Github Actions, Git, and Gantt charts. In high school, I organized weekly standups, presented to local industry leaders, and participated in various community outreach events. At University, I'm an Autonomy Project Manager at WARG and am currently working on BARS, my bipedal robot! I love backpacking, mountain biking, and rock climbing in my free time."
    },
    x: 400,
    y: 300,
    radius: 60,
    color: '#FFA500',
    glowColor: '#FFD700'
  },
  
  // Programming Languages Planet
  {
    id: 'languages',
    name: 'Programming Languages',
    type: 'planet',
    description: 'My programming language expertise',
    x: 200,
    y: 150,
    radius: 35,
    color: '#3B82F6',
    glowColor: '#60A5FA',
    orbitRadius: 180,
    orbitSpeed: 0.008,
    moons: [
      { id: 'cpp', name: 'C++', type: 'moon', description: 'Advanced level (90%)', x: 0, y: 0, radius: 8, color: '#00599C', orbitRadius: 50, orbitSpeed: 0.02 },
      { id: 'java', name: 'Java', type: 'moon', description: 'Proficient level (85%)', x: 0, y: 0, radius: 7, color: '#F89820', orbitRadius: 40, orbitSpeed: 0.025 },
      { id: 'python', name: 'Python', type: 'moon', description: 'Proficient level (80%)', x: 0, y: 0, radius: 6, color: '#3776AB', orbitRadius: 35, orbitSpeed: 0.03 },
      { id: 'javascript', name: 'JavaScript/TypeScript', type: 'moon', description: 'Good level (75%)', x: 0, y: 0, radius: 6, color: '#F7DF1E', orbitRadius: 45, orbitSpeed: 0.018 },
      { id: 'html-css', name: 'HTML/CSS', type: 'moon', description: 'Intermediate level (40%)', x: 0, y: 0, radius: 4, color: '#E34F26', orbitRadius: 30, orbitSpeed: 0.035 }
    ]
  },

  // Frameworks Planet
  {
    id: 'frameworks',
    name: 'Frameworks & Databases',
    type: 'planet',
    description: 'Web frameworks and database technologies',
    x: 600,
    y: 200,
    radius: 32,
    color: '#10B981',
    glowColor: '#34D399',
    orbitRadius: 220,
    orbitSpeed: 0.006,
    moons: [
      { id: 'react', name: 'React.js', type: 'moon', description: 'Good level (70%)', x: 0, y: 0, radius: 7, color: '#61DAFB', orbitRadius: 45, orbitSpeed: 0.022 },
      { id: 'nodejs', name: 'Node.js', type: 'moon', description: 'Good level (65%)', x: 0, y: 0, radius: 6, color: '#339933', orbitRadius: 40, orbitSpeed: 0.025 },
      { id: 'mongodb', name: 'MongoDB', type: 'moon', description: 'Intermediate level (60%)', x: 0, y: 0, radius: 6, color: '#47A248', orbitRadius: 35, orbitSpeed: 0.028 },
      { id: 'postgresql', name: 'PostgreSQL', type: 'moon', description: 'Intermediate level (55%)', x: 0, y: 0, radius: 5, color: '#336791', orbitRadius: 50, orbitSpeed: 0.02 },
      { id: 'ros', name: 'Robot OS 2', type: 'moon', description: 'Intermediate level (50%)', x: 0, y: 0, radius: 5, color: '#22314E', orbitRadius: 30, orbitSpeed: 0.03 },
      { id: 'gradle', name: 'Gradle/Maven', type: 'moon', description: 'Basic level (45%)', x: 0, y: 0, radius: 4, color: '#02303A', orbitRadius: 55, orbitSpeed: 0.018 }
    ]
  },

  // Tools Planet
  {
    id: 'tools',
    name: 'Developer Tools',
    type: 'planet',
    description: 'Development tools and environments',
    x: 150,
    y: 450,
    radius: 28,
    color: '#8B5CF6',
    glowColor: '#A78BFA',
    orbitRadius: 200,
    orbitSpeed: 0.007,
    moons: [
      { id: 'kicad', name: 'KiCad', type: 'moon', description: 'Intermediate level (50%)', x: 0, y: 0, radius: 6, color: '#314CB6', orbitRadius: 40, orbitSpeed: 0.025 },
      { id: 'docker', name: 'Docker', type: 'moon', description: 'Basic level (35%)', x: 0, y: 0, radius: 5, color: '#2496ED', orbitRadius: 35, orbitSpeed: 0.028 },
      { id: 'vscode', name: 'VS Code', type: 'moon', description: 'Basic level (30%)', x: 0, y: 0, radius: 4, color: '#007ACC', orbitRadius: 30, orbitSpeed: 0.03 },
      { id: 'git', name: 'Git/GitHub Actions', type: 'moon', description: 'Basic level (25%)', x: 0, y: 0, radius: 4, color: '#F05032', orbitRadius: 45, orbitSpeed: 0.022 },
      { id: 'intellij', name: 'IntelliJ', type: 'moon', description: 'Basic level (20%)', x: 0, y: 0, radius: 3, color: '#000000', orbitRadius: 50, orbitSpeed: 0.02 },
      { id: 'ci', name: 'Continuous Integration', type: 'moon', description: 'Basic level (10%)', x: 0, y: 0, radius: 3, color: '#1F6B2B', orbitRadius: 25, orbitSpeed: 0.035 }
    ]
  },

  // Engineering Planet
  {
    id: 'engineering',
    name: 'Engineering Skills',
    type: 'planet',
    description: 'Hardware and engineering capabilities',
    x: 650,
    y: 450,
    radius: 30,
    color: '#EF4444',
    glowColor: '#F87171',
    orbitRadius: 240,
    orbitSpeed: 0.005,
    moons: [
      { id: 'boolean', name: 'Boolean Algebra', type: 'moon', description: 'Good level (70%)', x: 0, y: 0, radius: 7, color: '#7C3AED', orbitRadius: 45, orbitSpeed: 0.022 },
      { id: 'pcb', name: 'PCB/Schematic Design', type: 'moon', description: 'Good level (65%)', x: 0, y: 0, radius: 6, color: '#059669', orbitRadius: 40, orbitSpeed: 0.025 },
      { id: 'soldering', name: 'Soldering', type: 'moon', description: 'Intermediate level (60%)', x: 0, y: 0, radius: 6, color: '#DC2626', orbitRadius: 35, orbitSpeed: 0.028 },
      { id: 'control', name: 'Control Theory', type: 'moon', description: 'Intermediate level (60%)', x: 0, y: 0, radius: 6, color: '#DB2777', orbitRadius: 50, orbitSpeed: 0.02 },
      { id: 'sensors', name: 'Sensor Fusion', type: 'moon', description: 'Intermediate level (55%)', x: 0, y: 0, radius: 5, color: '#2563EB', orbitRadius: 30, orbitSpeed: 0.03 },
      { id: 'wiring', name: 'Electrical Wiring', type: 'moon', description: 'Intermediate level (55%)', x: 0, y: 0, radius: 5, color: '#7C2D12', orbitRadius: 55, orbitSpeed: 0.018 },
      { id: 'lab', name: 'Lab Equipment', type: 'moon', description: 'Intermediate level (50%)', x: 0, y: 0, radius: 5, color: '#1F2937', orbitRadius: 25, orbitSpeed: 0.035 }
    ]
  },

  // Projects Planet
  {
    id: 'projects',
    name: 'Featured Projects',
    type: 'planet',
    description: 'My notable projects and achievements',
    x: 300,
    y: 100,
    radius: 38,
    color: '#F59E0B',
    glowColor: '#FBBF24',
    orbitRadius: 160,
    orbitSpeed: 0.009,
    moons: [
      { 
        id: 'pathmax', 
        name: 'Campus Navigation Vehicle', 
        type: 'moon', 
        description: 'Autonomous campus navigator using ROS and Raspberry Pi',
        content: {
          image: '/path-maxer.webp',
          techStack: ['Robot OS', 'Raspberry Pi', 'C++', 'React Native', 'Bluetooth'],
          demoLink: 'https://drive.google.com/file/d/1TNJl6DPzvSaDpCO_igs-X81bE8GjgqE4/view?usp=sharing'
        },
        x: 0, y: 0, radius: 8, color: '#06B6D4', orbitRadius: 55, orbitSpeed: 0.018 
      },
      { 
        id: 'debug-debacle', 
        name: 'Debug Debacle (3rd place)', 
        type: 'moon', 
        description: '3rd place at McHacks 2025 - Compete against others to fix bugs!',
        content: {
          image: '/debug-debacle.webp',
          techStack: ['React', 'Flask', 'Gumloops AI', 'Typescript', 'Python'],
          demoLink: 'https://debug-debacle.vercel.app/',
          githubLink: 'https://github.com/honzikschenk/debug-debacle'
        },
        x: 0, y: 0, radius: 7, color: '#8B5CF6', orbitRadius: 45, orbitSpeed: 0.022 
      },
      { 
        id: 'smart-car', 
        name: 'Omnidirectional Smart Car', 
        type: 'moon', 
        description: 'Smart car controlled via web interface using ESP32',
        content: {
          image: '/buddy-bot.webp',
          techStack: ['ESP32', 'Arduino', 'HTTP', 'HTTPS'],
          githubLink: 'https://github.com/honzikschenk/Omnidirectional-Smart-Car'
        },
        x: 0, y: 0, radius: 6, color: '#10B981', orbitRadius: 40, orbitSpeed: 0.025 
      },
      { 
        id: 'utra-bot', 
        name: 'UTRA Hacks Bot (2nd Place)', 
        type: 'moon', 
        description: 'Competition robot that won 2nd place at UTRA Hacks 2025',
        content: {
          image: '/utra.webp',
          techStack: ['Arduino', 'C++', 'Embedded Sensors', 'State-Machines'],
          demoLink: 'https://devpost.com/software/lebot-james-qgf9kw',
          githubLink: 'https://github.com/vichua2006/UTRAHack2025'
        },
        x: 0, y: 0, radius: 6, color: '#EF4444', orbitRadius: 35, orbitSpeed: 0.028 
      },
      { 
        id: 'portfolio', 
        name: 'Personal Portfolio Website', 
        type: 'moon', 
        description: 'This site - Modern portfolio built with React',
        content: {
          image: '/portfolio-site.webp',
          techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
          demoLink: 'https://honzikschenk.me',
          githubLink: 'https://github.com/honzikschenk/honzikschenk.github.io'
        },
        x: 0, y: 0, radius: 5, color: '#3B82F6', orbitRadius: 50, orbitSpeed: 0.02 
      }
    ]
  }
];