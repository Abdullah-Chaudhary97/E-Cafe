import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { motion } from 'framer-motion';

/**
 * Breadcrumb Component
 * Displays navigation breadcrumbs with consistent styling
 */
const Breadcrumb = ({ items = [] }) => {
  if (items.length === 0) return null;

  return (
    <motion.div
      className="bg-dark-light/30 backdrop-blur-sm border-b border-primary/20 py-4 shadow-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-5">
        <nav className="flex items-center gap-2.5 text-sm" aria-label="Breadcrumb">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <IoIosArrowForward 
                  size={12} 
                  className="text-primary/50 mx-1" 
                />
              )}
              {index === items.length - 1 ? (
                <span className="text-primary font-semibold font-playfair text-base">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-text-muted hover:text-primary transition-colors duration-300 flex items-center gap-1.5 no-underline text-sm"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Breadcrumb;
