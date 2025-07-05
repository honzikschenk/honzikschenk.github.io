import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import OptimizedImage from "./OptimizedImage";

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface AboutSectionProps {
  image?: string;
  bio?: string;
  skills?: {
    languages: Skill[];
    frameworks: Skill[];
    tools: Skill[];
    engineering: Skill[];
    softSkills: Skill[];
  };
}

const AboutSection = ({
  image = "profile.webp",
  bio = "I'm Honzík, a software engineering student at the University of Waterloo interested in integrated software engineering for robotics applications. I've worked with control theory concepts, such as state-space control, AprilTag localization, and PID loops, and collaborative tools like Github Actions, Git, and Gantt charts. In high school, I organized weekly standups, presented to local industry leaders, and participated in various community outreach events. At University, I'm an Autonomy Project Manager at WARG and am currently working on BARS, my bipedal robot! I love backpacking, mountain biking, and rock climbing in my free time.",
  skills = {
    languages: [
      { name: "C++", level: 90, color: "bg-blue-500" },
      { name: "Java", level: 85, color: "bg-orange-500" },
      { name: "Python", level: 80, color: "bg-green-500" },
      { name: "Java(Type)Script", level: 75, color: "bg-purple-500" },
      { name: "HTML/CSS", level: 40, color: "bg-green-700" },
    ],
    frameworks: [
      { name: "React.js", level: 70, color: "bg-blue-600" },
      { name: "Node.js", level: 65, color: "bg-green-600" },
      { name: "MongoDB", level: 60, color: "bg-green-700" },
      { name: "PostgreSQL", level: 55, color: "bg-blue-700" },
      { name: "Robot OS 2", level: 50, color: "bg-purple-600" },
      { name: "Gradle/Maven", level: 45, color: "bg-orange-600" },
    ],
    tools: [
      { name: "Docker", level: 35, color: "bg-blue-700" },
      { name: "VS Code", level: 30, color: "bg-purple-700" },
      { name: "Git/GitHub Actions", level: 25, color: "bg-orange-700" },
      { name: "KiCad", level: 50, color: "bg-teal-500" },
      { name: "IntelliJ", level: 20, color: "bg-green-800" },
      { name: "Continuous Integration", level: 10, color: "bg-purple-800" },
    ],
    engineering: [
      { name: "Boolean algebra", level: 70, color: "bg-blue-500" },
      { name: "PCB/Schematic Design", level: 65, color: "bg-green-500" },
      { name: "Control Theory", level: 60, color: "bg-red-500" },
      { name: "Sensor Fusion", level: 55, color: "bg-yellow-500" },
      { name: "Soldering", level: 60, color: "bg-orange-500" },
      { name: "Electrical Wiring", level: 55, color: "bg-purple-500" },
      { name: "Lab Equipment", level: 50, color: "bg-blue-600" },
    ],
    softSkills: [
      { name: "Leadership and Mentorship", level: 100, color: "bg-green-600" },
      {
        name: "Presentation and Communication",
        level: 100,
        color: "bg-orange-600",
      },
      { name: "Grant Writing", level: 100, color: "bg-purple-600" },
    ],
  },
}: AboutSectionProps) => {
  return (
    <motion.section
      className="w-full min-h-screen py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-16 flex items-center relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Tech Elements Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 80, -40, 0],
              y: [0, -60, 40, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: -Math.random() * 25,
            }}
          >
            <div className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-blue-500/20' : 'bg-green-500/20'}`} />
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-green-500/5 -z-10" />
      
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Bio Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.0, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="flex flex-col overflow-hidden bg-background/95 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <OptimizedImage 
                  src={image} 
                  alt="Profile Picture" 
                  style={{ height: "500px" }} 
                  className="w-full object-cover"
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.0, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <h3 className="text-2xl font-semibold mb-4 text-foreground">Bio</h3>
                <p className="text-muted-foreground leading-relaxed">{bio}</p>
              </motion.div>
            </Card>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full bg-background/95 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-100 shadow-lg hover:shadow-xl">
              <motion.h3
                className="text-2xl font-semibold mb-6 text-foreground"
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                viewport={{ once: true }}
              >
                Skills & Expertise
              </motion.h3>
              <div className="space-y-2">
                <SkillSection title="Languages" skills={skills.languages} />
                <SkillSection
                  title="Frameworks and Databases"
                  skills={skills.frameworks}
                />
                <SkillSection title="Developer Tools" skills={skills.tools} />
                <SkillSection
                  title="Engineering Skills"
                  skills={skills.engineering}
                />
                <SkillSection title="Soft Skills" skills={skills.softSkills} />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const SkillSection = ({
  title,
  skills,
}: {
  title: string;
  skills: Skill[];
}) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="mb-6"
  >
    <motion.h4
      className="text-lg font-semibold mb-3 text-foreground"
      whileHover={{ scale: 1.02 }}
    >
      {title}
    </motion.h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="flex items-center p-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border/30 hover:border-primary/40 transition-all duration-100"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0, duration: 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, x: 5 }}
        >
          <motion.div
            className={`w-3 h-3 rounded-full ${skill.color} mr-3 shadow-sm`}
            whileHover={{ scale: 1.2 }}
          />
          <span className="text-sm font-medium text-foreground">{skill.name}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default AboutSection;
