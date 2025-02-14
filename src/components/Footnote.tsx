import { motion } from "motion/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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
          <a href="https://se-webring.xyz" target="_blank" rel="noopener noreferrer" className="text-foreground transition duration-750 hover:text-orange-500">
            <svg class="w-8 h-8" viewBox="0 0 960 960" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="960" height="960" fill="none"></rect> <path fill-rule="evenodd" clip-rule="evenodd" d="M369.6,223.6v512.5c124.9-18.2,220.9-126,220.9-256.2s-96-238.1-220.9-256.2ZM341.1,812.6c-3,0-5.9.1-8.9.1C148.7,812.7,0,663.7,0,479.8S148.7,146.9,332.1,146.9s6,0,8.9.1c1.1,0,2.3-.1,3.4-.1h615.5v665.9H344.5c-1.1,0-2.3,0-3.4-.1ZM295.8,736.2V223.4c-125.4,17.7-222,125.8-222,256.4s96.5,238.7,222,256.4ZM540.9,220.9h345.3v517.9h-345.3c75.2-61,123.4-154.4,123.4-258.9s-48.1-197.9-123.4-258.9Z" fill="currentColor"></path> </svg>
          </a>
        </motion.div>
        <motion.p
          className="text-lg text-muted-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Jan "Honzik" Schenk
          {/* Jan "Honzik" Schenk | <a href="https://se-webring.xyz" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500"> se-webring.xyz</a> */}
        </motion.p>
      </div>
    </motion.section>
  );
};

export default Footnote;
