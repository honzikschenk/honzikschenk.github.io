import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footnote = () => {
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
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 70, -35, 0],
              y: [0, -50, 35, 0],
              rotate: [0, 270, 360],
              scale: [0.9, 1.3, 0.9],
            }}
            transition={{
              duration: Math.random() * 16 + 24,
              repeat: Infinity,
              ease: "linear",
              delay: -Math.random() * 28,
            }}
          >
            <div className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-blue-500/20' : 'bg-green-500/20'}`} />
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-green-500/5 -z-10" />

      <div className="max-w-7xl mx-auto w-full text-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.0, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Connect with me
        </motion.h2>
        <motion.div
          className="flex justify-center space-x-8 mb-8"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/honzikschenk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition duration-100 hover:text-gray-500 p-3 rounded-full bg-background/50 backdrop-blur-sm border border-border/30 hover:border-primary/40 hover:shadow-lg"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub size={32} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/honzik-schenk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition duration-100 hover:text-blue-500 p-3 rounded-full bg-background/50 backdrop-blur-sm border border-border/30 hover:border-primary/40 hover:shadow-lg"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedin size={32} />
          </motion.a>
          <motion.a
            href="https://se-webring.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition duration-100 hover:text-orange-500 p-3 rounded-full bg-background/50 backdrop-blur-sm border border-border/30 hover:border-primary/40 hover:shadow-lg"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-8 h-8" viewBox="0 0 960 960" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="960" height="960" fill="none"></rect> <path fillRule="evenodd" clipRule="evenodd" d="M369.6,223.6v512.5c124.9-18.2,220.9-126,220.9-256.2s-96-238.1-220.9-256.2ZM341.1,812.6c-3,0-5.9.1-8.9.1C148.7,812.7,0,663.7,0,479.8S148.7,146.9,332.1,146.9s6,0,8.9.1c1.1,0,2.3-.1,3.4-.1h615.5v665.9H344.5c-1.1,0-2.3,0-3.4-.1ZM295.8,736.2V223.4c-125.4,17.7-222,125.8-222,256.4s96.5,238.7,222,256.4ZM540.9,220.9h345.3v517.9h-345.3c75.2-61,123.4-154.4,123.4-258.9s-48.1-197.9-123.4-258.9Z" fill="currentColor"></path> </svg>
          </motion.a>
        </motion.div>
        <motion.p
          className="text-lg text-muted-foreground"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.0 }}
          viewport={{ once: true }}
        >
          Jan "Honzik" Schenk
        </motion.p>
      </div>
    </motion.section>
  );
};

export default Footnote;
