import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import Button from "../common/Button/Button";
import Breadcrumb from '../common/Breadcrumb/Breadcrumb';

export default function AboutUs() {
  const teamMembers = [
    {
      name: "MOHAMMAD ABDULLAH",
      role: "SOFTWARE ENGINEER",
      image: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3251108/person-icon-md.png",
    },
    {
      name: "MUBASHIR AHMED",
      role: "PRODUCT DESIGNER",
      image: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3251108/person-icon-md.png",
    },
    {
      name: "MOHAMMAD SOHAIB",
      role: "REACT DEVELOPER",
      image: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3251108/person-icon-md.png",
    },
    {
      name: "UMER",
      role: "SQA ENGINEER",
      image: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3251108/person-icon-md.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-dark pt-[120px]">
      <Breadcrumb items={[
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/AboutUs' }
      ]} />

      {/* Hero Section */}
      <motion.div
        className="relative h-[280px] bg-cover bg-center flex items-center justify-center mb-12"
        style={{
          backgroundImage: "linear-gradient(rgba(12, 11, 9, 0.7), rgba(12, 11, 9, 0.7)), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-dark/50"></div>
        <div className="relative z-10 text-center px-5">
          <motion.h1
            className="font-playfair text-3xl md:text-4xl text-white mb-2 font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            About E-Cafe
          </motion.h1>
          <motion.p
            className="text-base text-text-muted font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Delivering exceptional culinary experiences since 2022
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-5 pb-12">
        <motion.div
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* About Section */}
          <motion.section className="mb-10" variants={itemVariants}>
            <div className="text-center mb-6">
              <span className="inline-block text-xs text-primary uppercase tracking-wider mb-1.5 font-medium">
                Our Story
              </span>
              <h2 className="font-playfair text-2xl md:text-3xl text-white mt-1.5 mb-0 font-semibold">
                Welcome to E-Cafe
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="text-sm leading-relaxed text-text-muted mb-3">
                Welcome to <strong className="text-primary font-semibold">E-Cafe</strong>. We are not just your ordinary
                cafe; we are a unique culinary destination that combines the art of
                exceptional coffee with a diverse menu of delicious food offerings.
                Our passion for creating memorable experiences and fostering a sense
                of community sets us apart.
              </p>
              <p className="text-sm leading-relaxed text-text-muted mb-3">
                At E-Cafe, we understand that a cafe is more than just a place to grab
                a quick bite or a cup of coffee. It's a sanctuary where individuals
                come together to savor the simple joys of life. Whether you're seeking
                a quiet corner to work or a vibrant ambiance to connect with friends,
                we have created a space that caters to all.
              </p>
            </div>
          </motion.section>

          {/* Coffee Story */}
          <motion.section className="mb-10" variants={itemVariants}>
            <div className="text-center mb-6">
              <span className="inline-block text-xs text-primary uppercase tracking-wider mb-1.5 font-medium">
                Our Passion
              </span>
              <h2 className="font-playfair text-2xl md:text-3xl text-white mt-1.5 mb-0 font-semibold">
                The Art of Coffee
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="text-sm leading-relaxed text-text-muted mb-3">
                Our coffee is the heart and soul of E-Cafe. We take pride in sourcing
                the finest beans from around the world, carefully roasted to perfection.
                From the first sip to the last, each cup is a celebration of rich
                flavors and unparalleled quality.
              </p>
              <p className="text-sm leading-relaxed text-text-muted mb-3">
                Our skilled baristas are passionate about their craft and are dedicated
                to creating beautiful latte art and intricate designs, making every
                coffee a work of art. Through careful selection and expert roasting,
                we strive to bring out the unique flavors and aromas that make each
                sip a moment of pure bliss.
              </p>
            </div>
          </motion.section>

          {/* Community Section */}
          <motion.section className="mb-10" variants={itemVariants}>
            <div className="text-center mb-6">
              <span className="inline-block text-xs text-primary uppercase tracking-wider mb-1.5 font-medium">
                Our Mission
              </span>
              <h2 className="font-playfair text-2xl md:text-3xl text-white mt-1.5 mb-0 font-semibold">
                Building Community
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="text-sm leading-relaxed text-text-muted mb-3">
                We believe in fostering a sense of community. We provide a welcoming
                and inclusive environment where individuals from all walks of life can
                come together, connect, and share their stories. Our friendly and
                attentive staff is committed to ensuring your visit is nothing short
                of extraordinary, with personalized service that goes above and beyond.
              </p>
              <p className="text-sm leading-relaxed text-text-muted mb-3">
                Whether you're a coffee connoisseur, a food enthusiast, or simply
                looking for a cozy spot to unwind, E-Cafe invites you to experience
                the perfect blend of flavors, warmth, and hospitality. We are more
                than just a cafe; we are a destination where memories are created,
                friendships are formed, and exceptional experiences are shared.
              </p>
            </div>
          </motion.section>
        </motion.div>

        {/* Team Section */}
        <motion.section
          className="bg-dark-light py-12 px-5 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs text-primary uppercase tracking-wider mb-2 font-medium">
                Meet The Team
              </span>
              <h2 className="font-playfair text-2xl md:text-3xl text-white mt-1.5 mb-2 font-semibold">
                Our Amazing Team
              </h2>
              <p className="text-sm text-text-muted mt-2">
                The passionate individuals behind E-Cafe's success
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-dark-card rounded-xl overflow-hidden transition-all duration-300 border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/15 hover:-translate-y-1"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative w-full h-48 overflow-hidden bg-dark-light">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/70 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-playfair text-base text-white mb-1 font-semibold">
                      {member.name}
                    </h3>
                    <p className="text-xs text-primary mb-3 uppercase tracking-wider font-medium">
                      {member.role}
                    </p>
                    <Button variant="primary" size="small">
                      Contact Me
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
