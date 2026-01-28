import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../common/Button/Button';
import { getProductSlug } from '../../utils/slugUtils';

export default function MenuCategoryTemplate({ 
  title, 
  subtitle, 
  products, 
  category, 
  onAddToCart 
}) {
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
    <div className="py-6 pb-10">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block text-xs text-primary uppercase tracking-wider mb-1.5 font-medium">
          Our Selection
        </span>
        <h2 className="font-playfair text-xl md:text-2xl text-white mt-1.5 mb-2 font-semibold">
          {title}
        </h2>
        <p className="text-xs text-text-muted max-w-2xl mx-auto">
          {subtitle}
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((item, index) => {
          const slug = getProductSlug(item);
          // Debug: log first product to see what we're getting
          if (index === 0) {
            console.log('🔍 First product data:', {
              id: item.id,
              _id: item._id,
              slug: item.slug,
              title: item.title,
              productTitle: item.productTitle,
              generatedSlug: slug,
              fullItem: item
            });
          }
          return (
          <motion.div
            key={item.id || item._id || index}
            className="bg-dark-card rounded-lg overflow-hidden transition-all duration-300 border border-primary/10 flex flex-col hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-2 group"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
          >
            <Link 
              to={`/Product/${slug}`}
              className="relative w-full h-40 overflow-hidden bg-dark-light block"
            >
              <motion.img
                src={item.image}
                alt={item.productTitle || item.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <div
                className="absolute inset-0 bg-dark/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div
                  className="transform transition-transform duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onAddToCart(item);
                  }}
                >
                  <Button
                    variant="primary"
                    size="small"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
            <Link 
              to={`/Product/${getProductSlug(item)}`}
              className="p-4 flex-1 flex flex-col no-underline"
            >
              <h3 className="font-playfair text-sm md:text-base text-white mb-1.5 font-semibold hover:text-primary transition-colors">
                {item.productTitle || item.title}
              </h3>
              <p className="text-sm text-primary mb-1.5 font-semibold font-playfair">
                {item.price}
              </p>
              <p className="text-xs text-text-muted leading-relaxed flex-1 line-clamp-2">
                {item.description}
              </p>
            </Link>
          </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
