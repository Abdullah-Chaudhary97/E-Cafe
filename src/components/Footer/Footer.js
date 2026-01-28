import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const openingHours = [
    { day: 'Monday', time: '9:00 - 24:00' },
    { day: 'Tuesday', time: '9:00 - 24:00' },
    { day: 'Wednesday', time: '9:00 - 24:00' },
    { day: 'Thursday', time: '9:00 - 24:00' },
    { day: 'Friday', time: '9:00 - 24:00' },
    { day: 'Saturday', time: '9:00 - 24:00' },
    { day: 'Sunday', time: '9:00 - 02:00' },
  ];

  return (
    <footer className="bg-dark border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-5 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-6">
          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-playfair text-base text-primary mb-4 font-semibold">
              Opening Hours
            </h2>
            <ul className="space-y-2">
              {openingHours.map((schedule, index) => (
                <li key={index} className="flex justify-between items-center text-text-muted text-xs">
                  <span className="font-medium">{schedule.day}</span>
                  <span className="text-primary">{schedule.time}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Location & Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 lg:col-span-1"
          >
            <h2 className="font-playfair text-base text-primary mb-4 font-semibold">
              We Are Located At !!
            </h2>
            <div className="w-full h-[180px] rounded-lg overflow-hidden border border-primary/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.1945756373725!2d74.34335827450823!3d31.51881544722081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905f12cb2fdcb%3A0x2a7e6bad217e222c!2sTim%20Hortons!5e0!3m2!1sen!2s!4v1685691222815!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="E-Cafe Location"
              />
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h2 className="font-playfair text-base text-primary mb-4 font-semibold">
              Contact Us
            </h2>
            <div className="space-y-2.5 mb-4">
              <div className="flex items-center gap-2 text-text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="text-primary"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
                  <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
                <a href="tel:+923005392979" className="text-text-muted hover:text-primary transition-colors no-underline text-xs">
                  +92 300 5392979
                </a>
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="text-primary"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>
                <span className="text-xs">Mon-Sat: 11AM - 23PM</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="text-primary"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
                <a href="mailto:Abdullahramy7@gmail.com" className="text-text-muted hover:text-primary transition-colors no-underline text-xs">
                  Abdullahramy7@gmail.com
                </a>
              </div>
            </div>
            <motion.a
              href="mailto:Abdullahramy7@gmail.com"
              className="inline-block bg-primary text-dark px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-primary-light hover:text-white hover:shadow-xl hover:shadow-primary/50 no-underline w-full text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Email Us
            </motion.a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="border-t border-primary/20 pt-6 mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-text-muted text-xs">
            © Created with ❤️ By | Code Mavericks
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
