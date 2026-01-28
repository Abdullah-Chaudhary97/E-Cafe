import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBirthdayCake, 
  faGift, 
  faGlassCheers, 
  faCalendarCheck, 
  faUsers, 
  faRunning 
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export default function Event() {
  const services = [
    {
      icon: faBirthdayCake,
      title: "Birthday Catering",
      description: "Celebrate with our exceptional birthday catering services. Customized menus, professional service, and unforgettable experiences. Contact us today for an extraordinary celebration."
    },
    {
      icon: faGift,
      title: "Wedding Service",
      description: "Experience our impeccable wedding catering services, creating unforgettable culinary moments for your special day. Trust us to deliver exceptional flavors and professional service."
    },
    {
      icon: faGlassCheers,
      title: "Party Catering",
      description: "Elevate your party with our exceptional catering services, delivering delectable flavors and professional service to make your event unforgettable."
    },
    {
      icon: faCalendarCheck,
      title: "Event Catering",
      description: "Professional catering services for corporate events, conferences, and special occasions. We ensure every detail is perfect for your event."
    },
    {
      icon: faUsers,
      title: "Corporate Service",
      description: "Tailored catering solutions for your business needs. From board meetings to company celebrations, we've got you covered."
    },
    {
      icon: faRunning,
      title: "Catering On Demand",
      description: "Need catering at short notice? Our on-demand service ensures quality food delivered quickly, perfect for any last-minute event."
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-dark-light py-12 md:py-16 px-5 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs text-primary uppercase tracking-wider mb-2 font-medium">
            What We Offer
          </span>
          <h2 className="text-2xl md:text-3xl text-white mb-3 font-playfair font-semibold">
            Our Services
          </h2>
          <p className="text-sm text-text-muted leading-relaxed max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, we provide exceptional 
            catering services tailored to your needs. Experience the perfect blend 
            of culinary excellence and professional service.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-dark-card rounded-xl p-5 md:p-6 text-center transition-all duration-300 border border-primary/10 relative overflow-hidden group hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-2"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
            >
              {/* Top border animation */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

              <motion.div
                className="mb-4 inline-block"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FontAwesomeIcon 
                  icon={service.icon} 
                  className="text-3xl text-primary transition-colors duration-300 group-hover:text-primary-light"
                />
              </motion.div>

              <h3 className="font-playfair text-base text-white mb-2 font-semibold">
                {service.title}
              </h3>
              
              <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
