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
  eyebrow: "Robotics and autonomy",
  name: "Jan \"Honzik\" Schenk",
  role: "2nd year Software Engineering student @ University of Waterloo",
  summary: "",
  image: "/profile.webp",
  imageAlt: "Portrait of Jan Schenk",
  ctaLabel: "About",
};

export const aboutContent: AboutContent = {
  eyebrow: "",
  title: "About me",
  bio:
    "I am a software engineering student at the University of Waterloo focused on UAVs, robotics, and autonomous systems. I love working close to hardware and making it feel alive.",
  details: [
    { label: "Currently at", value: "University of Waterloo" },
    { label: "Focus", value: "UAV and robotics autonomy" },
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Robotics software",
    items: ["ROS 2", "MAVLink / Pixhawk", "State Machines", "Mission Planning"],
  },
  {
    title: "Controls and perception",
    items: ["PID + State Space", "Sensor Fusion", "AprilTag Localization", "OpenCV"],
  },
  {
    title: "Engineering",
    items: ["C++", "Python", "Java", "CI/CD", "Hardware-in-the-Loop"],
  },
  {
    title: "Tools",
    items: ["Docker", "GitHub Actions", "KiCad", "Telemetry Dashboards"],
  },
];

export const projectsIntro: SectionIntro = {
  eyebrow: "",
  title: "Projects",
  description: "Projects across robotics, autonomy, and software.",
};

export const projects: ProjectItem[] = [
  {
    title: "Campus Navigation Vehicle",
    description:
      "Autonomous campus navigator that guides users to classes with on-device planning using Dijkstra's algorithm and localization via AprilTags.",
    image: "/path-maxer.webp",
    techStack: [
      { name: "Robot OS", color: "bg-blue-600" },
      { name: "Dijkstra's Algorithm", color: "bg-yellow-500" },
      { name: "AprilTags", color: "bg-green-500" },
      { name: "C++", color: "bg-purple-500" },
      { name: "Bluetooth", color: "bg-blue-500" },
    ],
    demoLink: "https://drive.google.com/file/d/1TNJl6DPzvSaDpCO_igs-X81bE8GjgqE4/view?usp=sharing",
    githubLink: "",
  },
  // {
  //   title: "UWaterloo Outers Club Website",
  //   description:
  //     "University outdoor club website with a rental system, events platform, and member management workflows.",
  //   image: "/outers-club.webp",
  //   techStack: [
  //     { name: "Next.js", color: "bg-green-500" },
  //     { name: "React", color: "bg-purple-500" },
  //     { name: "TypeScript", color: "bg-blue-700" },
  //     { name: "Tailwind CSS", color: "bg-cyan-500" },
  //   ],
  //   demoLink: "",
  //   githubLink: "",
  // },
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
    description:
      "This site, built to present my work in a creative format.",
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
  eyebrow: "",
  title: "Work and team experience",
  description: "Roles where I have built software, tested systems, and worked close to hardware.",
};

export const experiences: ExperienceItem[] = [
  {
    logo: "cowtech.webp",
    company: "Cowden Technologies, Inc.",
    position: "Robotics and Autonomous Systems Intern",
    duration: "May 2025 - Present",
    description:
      "Designing and integrating autonomy subsystems for UAV platforms, including ROS-based modules, sensor interfaces, and validation workflows for reliable field operation.",
    tags: ["UAV", "ROS", "PCB Design", "Pixhawk", "Autonomous Systems"],
  },
  {
    logo: "warg.webp",
    company: "Waterloo Aerial Robotics Group",
    position: "Autonomy Subteam Lead, Project Manager (Simulation / Testing)",
    duration: "November 2024 - Present",
    description:
      "Leading autonomy development on a competition drone focused on fire detection and suppression. Coordinating hardware-in-the-loop simulation and test architecture to reduce field risk.",
    tags: ["UAV", "OpenCV", "Python", "IR Camera", "Competition"],
  },
  {
    logo: "atc.webp",
    company: "Appalachian Trail Conservancy",
    position: "Campsite Inventory Technician",
    duration: "July 2024 - August 2024",
    description:
      "Worked independently to inventory campsites and complete scientific field assessments with GIS navigation and structured data capture methods.",
    tags: ["GIS", "Field Work", "Data Collection", "Scientific Assessment"],
  },
  {
    logo: "vt.webp",
    company: "Virginia Tech Computer Science Department",
    position: "Back-End Cybersecurity Intern",
    duration: "February 2023 - May 2023",
    description:
      "Built a smart-grid cybersecurity model linking IoT devices with a full-stack monitoring and control system. Presented at VT ICAT Day and won the People's Choice Award.",
    tags: ["Next.js", "MongoDB", "IoT", "Cybersecurity", "Smart Grid"],
  },
  {
    logo: "401.webp",
    company: "FIRST Robotics Competition Team 401",
    position: "Programming Lead, Electrical Lead",
    duration: "September 2021 - May 2024",
    description:
      "Led a 12-person team building autonomous robotics systems with state-space control, AprilTag localization, and disciplined CI workflows.",
    tags: ["Java", "Team Leadership", "AprilTag", "CAN Bus", "CI/CD"],
  },
];

export const contactContent: ContactContent = {
  eyebrow: "Contact",
  title: "Get in touch",
  description: "",
  links: [
    {
      label: "GitHub",
      href: "https://github.com/honzikschenk",
      icon: "github",
      tone: "primary",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/honzik-schenk",
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