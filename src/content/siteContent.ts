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
    "I'm a Software Engineering student at the University of Waterloo working across UAV autonomy, perception, and controls. I lead the autonomy subteam at the Waterloo Aerial Robotics Group, and my recent work spans GPS-denied target localization, crop-pest geolocation and visual localization on Jetson-based payloads, heavy-lift UAV tuning, and simulation-driven testing.",
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
      "Behavior Trees",
      "State Machines",
      "Gain Scheduling",
      "State-Space Control",
      "Path Planning",
    ],
  },
  {
    title: "Perception and localization",
    items: [
      "SLAM / VIO",
      "Sensor Fusion",
      "Camera Calibration",
      "Georeferencing",
      "Orthomosaic Mapping",
      "OpenCV",
      "Open3D",
      "DepthAI / OAK-D",
      "AprilTag",
      "PyTorch",
    ],
  },
  {
    title: "Flight, robotics, and simulation",
    items: [
      "PX4",
      "ArduPilot",
      "MAVLink",
      "Isaac ROS",
      "Jetson",
      "Gazebo",
      "ArduPilot SITL",
      "HITL",
      "MuJoCo",
      "PyBullet",
    ],
  },
  {
    title: "Systems and tooling",
    items: [
      "C++",
      "C",
      "Python",
      "Java",
      "TypeScript",
      "SQL",
      "Docker / Compose",
      "pytest",
      "GitHub Actions",
      "TensorRT",
      "DeepStream",
      "KiCad",
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
    title: "WARG: Aerial Target Detection and Localization",
    description:
      "Real-time perception and mapping pipeline for WARG's competition drone that fuses OAK-D detections, VIO pose estimates, and SLAM maps. RANSAC plane segmentation extracts walls and corners so targets are localized relative to building structure in GPS-denied flight.",
    image: "/warg-auto.webp",
    techStack: [
      { name: "Python", color: "bg-blue-600" },
      { name: "SLAM / VIO", color: "bg-emerald-600" },
      { name: "Open3D", color: "bg-cyan-500" },
      { name: "DepthAI / OAK-D", color: "bg-amber-500" },
      { name: "RANSAC", color: "bg-rose-500" },
      { name: "MAVLink", color: "bg-violet-500" },
    ],
    demoLink: "",
    githubLink: "https://github.com/UWARG/Auto-AEAC-2026-Task-1-COMP",
  },
  {
    title: "PloverOS - Split-Compute Autonomy Framework",
    description:
      "Split-compute UAV autonomy framework that turns natural-language operator commands into real-time velocity setpoints. The ground station embeds the command and a scene image into a 512-dim latent, which drives a 20 Hz C++ airside control loop over a shared cross-language TCP protocol.",
    image: "/ploveros.webp",
    techStack: [
      { name: "C++", color: "bg-blue-600" },
      { name: "Python", color: "bg-blue-700" },
      { name: "ONNX Runtime", color: "bg-emerald-500" },
      { name: "TCP Networking", color: "bg-amber-500" },
      { name: "Control Systems", color: "bg-violet-500" },
    ],
    demoLink: "",
    githubLink: "https://github.com/honzikschenk/PloverOS",
  },
  {
    title: "Drone Audio Classification Model + Web App",
    description:
      "3rd place at the Ottawa Defence Tech Hackathon. A custom transformer fusing mel spectrograms, constant-Q transforms, and harmonic features classifies drone audio at 80% accuracy, with a React and Flask app visualizing waveforms, spectrograms, and model confidence in real time.",
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
    title: "Drone Hardware-in-the-Loop Platform (WARG)",
    description:
      "HITL simulation framework for safe autonomy testing that emulates GPS and camera data over MAVLink and TCP into a real Pixhawk running ArduPilot, integrated with the team's custom Python autonomy flight stack.",
    image: "/warg-hitl.webp",
    techStack: [
      { name: "HITL", color: "bg-blue-600" },
      { name: "Python", color: "bg-emerald-500" },
      { name: "MAVLink", color: "bg-violet-500" },
      { name: "ArduPilot", color: "bg-amber-500" },
      { name: "Pixhawk", color: "bg-cyan-500" },
    ],
    demoLink: "",
    githubLink: "",
  },
  {
    title: "Autonomous Aerial Survey Stack",
    description:
      "Containerized ROS 2 stack where a behavior-tree mission engine flies surveys through MAVROS and ArduPilot, with a fleet protocol that allocates tasks by dispatching the closest available UAV to map the survey area.",
    image: "",
    techStack: [
      { name: "ROS 2", color: "bg-blue-600" },
      { name: "MAVROS", color: "bg-violet-500" },
      { name: "Behavior Trees", color: "bg-emerald-500" },
      { name: "ArduPilot", color: "bg-amber-500" },
      { name: "Gazebo", color: "bg-orange-500" },
      { name: "Docker", color: "bg-cyan-500" },
    ],
    demoLink: "",
    githubLink: "",
  },
  {
    title: "City Drone Pathfinder",
    description:
      "Visibility-graph pathfinding engine for UAVs that runs A* over a graph built from OSM building outlines. Geographic data is projected into UTM for metric building buffers, and edges that clip buildings are rejected with segment-intersection tests.",
    image: "/city-pathfinder.webp",
    techStack: [
      { name: "Python", color: "bg-blue-600" },
      { name: "A*", color: "bg-emerald-500" },
      { name: "Visibility Graphs", color: "bg-violet-500" },
      { name: "UTM", color: "bg-amber-500" },
      { name: "OpenStreetMap", color: "bg-cyan-500" },
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
      "Lead a 40-person autonomy subteam, fusing SLAM and target detection for drone and target localization in GPS-denied settings. Architected a behavior-tree-driven ROS 2 autonomy stack with OAK-D perception and mapping, and established HITL testing that injects GPS and camera data into a Pixhawk running ArduPilot.",
    tags: ["UAV Autonomy", "ROS 2", "Behavior Trees", "SLAM", "YOLO", "DepthAI", "HITL"],
  },
  {
    logo: "agricision.webp",
    company: "Agricision Inc.",
    position: "UAV Autonomy & Robotics Engineering Intern",
    duration: "Sep 2026 - Present",
    description:
      "Architected a C++ ROS 2 payload on a Jetson that detects and geolocates crop pests at centimeter accuracy. Developing a georeferenced landmark atlas for visual localization, a PX4 SITL simulator with a rendered camera to score the pipeline, and live orthomosaic mapping validated against satellite imagery.",
    tags: ["C++", "ROS 2", "Jetson", "PX4 SITL", "Georeferencing", "Orthomosaics"],
  },
  {
    logo: "agricision.webp",
    company: "Agricision Inc.",
    position: "UAV Systems Integration Consultant (Part-time)",
    duration: "Apr 2026 - Sep 2026",
    description:
      "Tuned a 50 kg PX4 UAV for flight readiness with gain scheduling and FFT-based vibration analysis, and built Python tooling for automated rosbag fetching and post-flight data analysis.",
    tags: ["PX4", "Gain Scheduling", "FFT", "Python", "rosbag"],
  },
  {
    logo: "aeroprobe.webp",
    company: "Aeroprobe",
    position: "Software Engineering Intern",
    duration: "Jan 2026 - Apr 2026",
    description:
      "Built a Python validation framework for an air data computer, automated RS-232/RS-422 device workflows with PySerial (cutting manual steps by ~85%), and developed Octave tooling to generate optimal wind-tunnel probe-positioning patterns.",
    tags: ["Python", "Octave", "PySerial", "Validation", "RS-232 / RS-422"],
  },
  {
    logo: "cowtech.webp",
    company: "Cowden Technologies",
    position: "Robotics and Autonomous Systems Intern",
    duration: "May 2025 - Aug 2025",
    description:
      "Developed a drone docking station with closed-chain inverse kinematics in ROS 2 and MuJoCo, with state estimation, Arduino serial control, and AprilTag localization for precise landing. Deployed TensorRT, DeepStream, and Docker detection pipelines on NVIDIA Jetson.",
    tags: ["ROS 2", "MuJoCo", "AprilTag", "TensorRT", "DeepStream", "Jetson"],
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
