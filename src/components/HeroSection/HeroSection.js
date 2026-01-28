import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroBg from '../../assets/img/hero-bg.jpg';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[calc(100vh-120px)] bg-cover bg-center bg-fixed pt-[120px] pb-12"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-dark/60"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 py-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center min-h-[350px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <div className="max-w-3xl">
            <motion.span
              className="inline-block text-xs text-primary uppercase tracking-wider mb-2 font-medium"
              variants={itemVariants}
            >
              Welcome to
            </motion.span>
            
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-3 font-playfair"
              variants={itemVariants}
            >
              <span className="text-primary">E-Cafe</span>
            </motion.h1>
            
            <motion.h2
              className="text-base md:text-lg text-text-light mb-3 font-normal"
              variants={itemVariants}
            >
              Delivering great food for more than 2 years!
            </motion.h2>
            
            <motion.p
              className="text-sm text-text-muted leading-relaxed mb-6 max-w-2xl"
              variants={itemVariants}
            >
              Experience the perfect blend of exceptional coffee, delicious food, and warm hospitality. 
              Join us for an unforgettable culinary journey.
            </motion.p>
            
            <motion.div
              className="flex gap-3 flex-wrap"
              variants={itemVariants}
            >
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link
                  to="/Product"
                  className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider inline-block font-poppins bg-primary text-dark border-2 border-primary transition-all duration-300 hover:bg-primary-light hover:border-primary-light hover:text-white hover:shadow-xl hover:shadow-primary/50 hover:scale-105"
                >
                  Our Menu
                </Link>
              </motion.div>
              
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link
                  to="/Reservation"
                  className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider inline-block font-poppins bg-transparent text-white border-2 border-primary transition-all duration-300 hover:bg-primary hover:text-dark hover:border-primary-light hover:shadow-xl hover:shadow-primary/50 hover:scale-105"
                >
                  Book a Table
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Play Button */}
          <motion.div
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div
              className="w-14 h-14 md:w-16 md:h-16 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg width="94" height="94" viewBox="0 0 94 94" fill="none" className="w-full h-full">
                <circle cx="47" cy="47" r="47" fill="rgba(205, 164, 94, 0.2)"/>
                <circle cx="47" cy="47" r="35" fill="rgba(205, 164, 94, 0.4)"/>
                <path d="M38 32L38 62L58 47L38 32Z" fill="#cda45e"/>
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
