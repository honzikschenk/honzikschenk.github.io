import React from "react";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

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
  image = "profile.jpg",
  bio = "I'm Honzík, a rising second-year software engineering student at the University of Waterloo interested in integrated software engineering for robotics and space applications. I've worked with control theory concepts, such as state-space control, AprilTag localization, and PID loops, and collaborative tools like Github Actions, Git, and Gantt charts. In high school, I organized weekly standups, presented to local industry leaders, and participated in various community outreach events. I love backpacking, mountain biking, and rock climbing in my free time.",
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
      className="w-full min-h-screen py-20 px-4 md:px-8 lg:px-16 flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileInView={{ opacity: 0.99 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-foreground"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: false }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bio Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: false }}
          >
            <Card className="flex flex-col overflow-hidden">
              <img src={image} alt="Profile Picture" style={{ height: "500px" }} className="w-full object-cover" />
              <h3 className="px-6 text-2xl font-semibold my-4">Bio</h3>
              <p className="px-6 text-muted-foreground mb-6">{bio}</p>
            </Card>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: false }}
          >
            <Card className="p-6 h-full">
              <h3 className="text-2xl font-semibold mb-6">
                Skills & Expertise
              </h3>
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
  <div>
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {skills.map((skill) => (
        <div key={skill.name} className="flex items-center">
          <div className={`w-4 h-4 rounded-full ${skill.color} mr-2`}></div>
          <span className="text-lg">{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default AboutSection;
