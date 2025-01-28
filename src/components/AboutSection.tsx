import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface AboutSectionProps {
  bio?: string;
  skills?: Skill[];
}

const AboutSection = ({
  bio = "I'm a passionate software engineer specializing in autonomous systems and modern web technologies. With experience in robotics, AI, and full-stack development, I create innovative solutions that bridge the gap between hardware and software.",
  skills = [
    { name: "React/Next.js", level: 90, color: "bg-blue-500" },
    { name: "TypeScript", level: 85, color: "bg-blue-600" },
    { name: "Python", level: 88, color: "bg-yellow-500" },
    { name: "ROS", level: 82, color: "bg-green-500" },
    { name: "TensorFlow", level: 78, color: "bg-orange-500" },
    { name: "Docker", level: 85, color: "bg-blue-400" },
  ],
}: AboutSectionProps) => {
  return (
    <motion.section
      className="w-full min-h-screen bg-background py-20 px-4 md:px-8 lg:px-16 flex items-center"
      initial={false}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-foreground"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bio Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed">{bio}</p>
            </Card>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full">
              <h3 className="text-2xl font-semibold mb-6">
                Skills & Expertise
              </h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <Badge
                        variant="secondary"
                        className={`${skill.color} text-white`}
                      >
                        {skill.level}%
                      </Badge>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${skill.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
