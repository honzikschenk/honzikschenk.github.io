export interface NavSection {
  id: string;
  label: string;
}

export interface HeroContent {
  eyebrow: string;
  name: string;
  role: string;
  summary: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
}

export interface AboutDetail {
  label: string;
  value: string;
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  bio: string;
  details: AboutDetail[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface ProjectTechnology {
  name: string;
  color: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  image: string;
  techStack: ProjectTechnology[];
  demoLink: string;
  githubLink: string;
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  description: string;
}

export interface ExperienceItem {
  logo?: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  tags?: string[];
}

export interface ContactLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "globe" | "mail";
  tone: "primary" | "accent";
}

export interface ContactContent extends SectionIntro {
  links: ContactLink[];
  webringLink?: {
    label: string;
    href: string;
  };
}

export const navigationSections: NavSection[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const heroContent: HeroContent = {
  eyebrow: "Autonomy, perception, and control",
  name: "Jan \"Honzik\" Schenk",
  role: "Software Engineering student @ University of Waterloo",
  summary:
    "",
  image: "/profile.webp",
  imageAlt: "Portrait of Jan Schenk",
  ctaLabel: "About",
};

export const aboutContent: AboutContent = {
  eyebrow: "Profile",
  title: "About",
  bio:
    "I'm a Software Engineering student at the University of Waterloo working across UAV autonomy, perception, and controls applications. My recent work spans local-space target localization, heavy-lift UAV system integration, and automating hardware systems.",
  details: [
    {
      label: "Education",
      value: "Software Engineering, University of Waterloo (Honours Co-op)",
    },
    {
      label: "Focus",
      value: "UAV autonomy, GNC, SLAM/VIO, and sensor fusion",
    },
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Autonomy and controls",
    items: [
      "ROS 2",
      "UAV Autonomy",
      "GNC",
      "PID Tuning",
      "State-Space Control",
      "Path Planning",
    ],
  },
  {
    title: "Perception and localization",
    items: [
      "SLAM / VIO",
      "Sensor Fusion",
      "OpenCV",
      "Open3D",
      "DepthAI / OAK-D",
      "AprilTag",
    ],
  },
  {
    title: "Flight and robotics stack",
    items: [
      "MAVLink",
      "PX4",
      "Ardupilot",
      "Isaac ROS",
      "MuJoCo",
      "Gazebo",
      "HITL",
    ],
  },
  {
    title: "Systems and tooling",
    items: [
      "C++",
      "Python",
      "Java",
      "TypeScript",
      "CMake",
      "Docker",
      "KiCad",
      "TensorRT",
      "DeepStream",
      "GitHub Actions",
    ],
  },
];

export const projectsIntro: SectionIntro = {
  eyebrow: "Selected work",
  title: "Projects",
  description: "Recent work across autonomy, robotics, and software.",
};

export const projects: ProjectItem[] = [
  {
    title: "Autonomous Aerial Target Localization",
    description:
      "Real-time UAV perception and mapping pipeline that fuses detections, visual odometry, and SLAM to localize competition targets in local-space environments.",
    image: "/warg-auto.webp",
    techStack: [
      { name: "Python", color: "bg-blue-600" },
      { name: "SLAM / VIO", color: "bg-emerald-600" },
      { name: "Open3D", color: "bg-cyan-500" },
      { name: "DepthAI / OAK-D", color: "bg-amber-500" },
      { name: "MAVLink", color: "bg-violet-500" },
    ],
    demoLink: "",
    githubLink: "https://github.com/UWARG/Auto-AEAC-2026-Task-1-COMP",
  },
  {
    title: "PloverOS - Split-Compute VLA UAV Prototype",
    description:
      "Split-compute VLA UAV prototype that converts operator instructions and scene context into low-latency flight commands across ground and air systems. Wireless-latent is sent from the ground station to the drone, reducing airside platform resource requirements.",
    image: "/ploveros.webp",
    techStack: [
      { name: "C++", color: "bg-blue-600" },
      { name: "Python", color: "bg-blue-700" },
      { name: "Multimodal Autonomy", color: "bg-emerald-500" },
      { name: "TCP Networking", color: "bg-amber-500" },
      { name: "Control Systems", color: "bg-violet-500" },
    ],
    demoLink: "",
    githubLink: "https://github.com/honzikschenk/PloverOS",
  },
  {
    title: "Drone Audio Classification Model + Web App",
    description:
      "Hackathon project pairing a transformer-based drone audio classifier with a React and Flask interface for real-time monitoring.",
    image: "/audio-class.webp",
    techStack: [
      { name: "PyTorch", color: "bg-orange-500" },
      { name: "Transformer ML", color: "bg-violet-500" },
      { name: "React", color: "bg-blue-600" },
      { name: "Flask", color: "bg-emerald-500" },
      { name: "Audio Features", color: "bg-cyan-500" },
    ],
    demoLink: "",
    githubLink: "https://github.com/AumkarMali/WATheDrone",
  },
  {
    title: "Drone Hardware-in-the-Loop Platform",
    description:
      "Physical simulation platform for safe autonomy testing with Pixhawk, Ardupilot, MAVLink, and a custom Python flight guidance and perception stack.",
    image: "/warg-hitl.webp",
    techStack: [
      { name: "HITL", color: "bg-blue-600" },
      { name: "Python", color: "bg-emerald-500" },
      { name: "MAVLink", color: "bg-violet-500" },
      { name: "Ardupilot", color: "bg-amber-500" },
      { name: "Pixhawk", color: "bg-cyan-500" },
    ],
    demoLink: "",
    githubLink: "",
  },
  {
    title: "Campus Navigation Vehicle",
    description:
      "Autonomous campus navigator that guides users to classes with on-device planning using Dijkstra's algorithm and localization via AprilTags.",
    image: "/path-maxer.webp",
    techStack: [
      { name: "ROS 2", color: "bg-blue-600" },
      { name: "C++", color: "bg-violet-500" },
      { name: "Dijkstra's Algorithm", color: "bg-violet-500" },
      { name: "Raspberry Pi", color: "bg-emerald-500" },
      { name: "React Native", color: "bg-cyan-500" },
      { name: "Bluetooth", color: "bg-amber-500" },
    ],
    demoLink: "https://drive.google.com/file/d/1TNJl6DPzvSaDpCO_igs-X81bE8GjgqE4/view?usp=sharing",
    githubLink: "",
  },
  {
    title: "Debug Debacle (3rd Place)",
    description:
      "McHacks 2025 project for real-time bug-fix competition with AI-assisted challenge flow.",
    image: "/debug-debacle.webp",
    techStack: [
      { name: "React", color: "bg-blue-600" },
      { name: "Flask", color: "bg-orange-500" },
      { name: "Gumloops AI", color: "bg-green-500" },
      { name: "TypeScript", color: "bg-yellow-500" },
      { name: "Python", color: "bg-blue-700" },
    ],
    demoLink: "https://debug-debacle.vercel.app/",
    githubLink: "https://github.com/honzikschenk/debug-debacle",
  },
  {
    title: "Omnidirectional Smart Car",
    description:
      "Omnidirectional robotics platform controlled from a web interface with embedded networking over ESP32.",
    image: "/buddy-bot.webp",
    techStack: [
      { name: "ESP32", color: "bg-blue-600" },
      { name: "Arduino", color: "bg-red-500" },
      { name: "HTTP", color: "bg-purple-500" },
      { name: "HTTPS", color: "bg-green-500" },
    ],
    demoLink: "",
    githubLink: "https://github.com/honzikschenk/Omnidirectional-Smart-Car",
  },
  {
    title: "UTRA Hacks 2025 Competition Bot (2nd Place)",
    description:
      "Competition robot for capture-the-flag tasks, built around robust state-machine logic.",
    image: "/utra.webp",
    techStack: [
      { name: "Arduino", color: "bg-blue-600" },
      { name: "C++", color: "bg-purple-500" },
      { name: "Embedded Sensors", color: "bg-orange-500" },
      { name: "State Machines", color: "bg-green-500" },
    ],
    demoLink: "https://devpost.com/software/lebot-james-qgf9kw",
    githubLink: "https://github.com/vichua2006/UTRAHack2025",
  },
  {
    title: "Personal Portfolio Website",
    description: "This site, built to present my work in a creative format.",
    image: "/portfolio-site.webp",
    techStack: [
      { name: "React", color: "bg-blue-600" },
      { name: "TypeScript", color: "bg-blue-700" },
      { name: "Tailwind CSS", color: "bg-cyan-500" },
      { name: "Vite", color: "bg-purple-500" },
    ],
    demoLink: "https://honzikschenk.me",
    githubLink: "https://github.com/honzikschenk/honzikschenk.github.io",
  },
];

export const experienceIntro: SectionIntro = {
  eyebrow: "Professional and extracurricular activity",
  title: "Relevant experience",
  description: "Roles spanning UAV autonomy, controls, validation, and robotics systems integration.",
};

export const experiences: ExperienceItem[] = [
  {
    logo: "warg.webp",
    company: "Waterloo Aerial Robotics Group",
    position: "Autonomy Subteam Lead, prev. Project Manager - Simulation / Testing",
    duration: "Oct 2024 - Present",
    description:
      "Lead autonomy development for a competition drone, fusing SLAM and target detection for fire detection and suppression missions.",
    tags: ["UAV Autonomy", "SLAM", "YOLO", "DepthAI", "OpenCV"],
  },
  {
    logo: "agricision.webp",
    company: "Agricision Inc.",
    position: "UAV Systems Integration Consultant",
    duration: "Apr 2026 - Present",
    description:
      "Support system integration and characterization for an autonomous agriculture UAV, tuning control loops and managing rosbag data-collection.",
    tags: ["PID", "ROS 2", "Python", "Flight Test", "UAV Systems"],
  },
  {
    logo: "aeroprobe.webp",
    company: "Aeroprobe",
    position: "Software Engineering Intern",
    duration: "Jan 2026 - Apr 2026",
    description:
      "Built Python and Octave tooling for air-data computer validation, calibration generation, and RS-232/RS-422 instrumentation automation.",
    tags: ["Python", "Octave", "PySerial", "Validation", "RS-232 / RS-422"],
  },
  {
    logo: "cowtech.webp",
    company: "Cowden Technologies",
    position: "Robotics and Autonomous Systems Intern",
    duration: "May 2025 - Aug 2025",
    description:
      "Built drone docking and perception systems with ROS 2, MuJoCo, TensorRT and DeepStream on Jetsons.",
    tags: ["ROS 2", "TensorRT", "DeepStream", "Jetson", "KiCad"],
  },
  {
    logo: "atc.webp",
    company: "Appalachian Trail Conservancy",
    position: "Campsite Inventory Technician",
    duration: "Jul 2024 - Aug 2024",
    description:
      "Worked independently to inventory campsites and complete scientific field assessments with GIS navigation and structured data capture methods.",
    tags: ["GIS", "Field Work", "Data Collection", "Scientific Assessment"],
  },
  {
    logo: "vt.webp",
    company: "Virginia Tech Computer Science Department",
    position: "Back-End Cybersecurity Intern",
    duration: "Feb 2023 - May 2023",
    description:
      "Built a smart-grid cybersecurity model linking IoT devices with a full-stack monitoring and control system. Presented at VT ICAT Day and won the People's Choice Award.",
    tags: ["Next.js", "MongoDB", "IoT", "Cybersecurity", "Smart Grid"],
  },
  {
    logo: "401.webp",
    company: "FIRST Robotics Competition Team 401",
    position: "Controls Lead, prev. Electrical Lead",
    duration: "Sep 2021 - May 2024",
    description:
      "Led a 12-person controls team building autonomous competition robots with Java, state-space control, AprilTag localization, and CAN bus integration.",
    tags: ["Java", "State-Space", "AprilTag", "CAN Bus", "Leadership"],
  },
];

export const contactContent: ContactContent = {
  eyebrow: "Contact",
  title: "Get in touch",
  description: "",
  links: [
    {
      label: "GitHub",
      href: "https://www.github.com/honzikschenk",
      icon: "github",
      tone: "primary",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/honzik-schenk/",
      icon: "linkedin",
      tone: "primary",
    },
    {
      label: "Email",
      href: "mailto:schenkhonzik0@gmail.com",
      icon: "mail",
      tone: "primary",
    },
  ],
  webringLink: {
    label: "SE Webring",
    href: "https://se-webring.xyz",
  },
};
