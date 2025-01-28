import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footnote = () => {
  return (
    <motion.section
      className="w-full min-h-screen py-20 px-4 md:px-8 lg:px-16 flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 0.99 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="max-w-7xl mx-auto w-full text-center">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Connect with me
        </motion.h2>
        <motion.div
          className="flex justify-center space-x-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a href="https://github.com/honzikschenk" target="_blank" rel="noopener noreferrer" className="text-foreground transition duration-750 hover:text-gray-500">
            <FaGithub size={32} />
          </a>
          <a href="https://linkedin.com/in/honzik-schenk" target="_blank" rel="noopener noreferrer" className="text-foreground transition duration-750 hover:text-blue-500">
            <FaLinkedin size={32} />
          </a>
          {/* <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer" className="text-foreground transition duration-750 hover:text-blue-500">
            <FaTwitter size={32} />
          </a> */}
        </motion.div>
        <motion.p
          className="text-lg text-muted-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          © {new Date().getFullYear()} | Jan "Honzik" Schenk | <a href="https://se-webring.xyz" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500"> se-webring.xyz</a>
        </motion.p>
      </div>
    </motion.section>
  );
};

export default Footnote;
