import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumb from '../common/Breadcrumb/Breadcrumb';

const categories = [
  { name: 'Coffee', path: 'Coffee', label: 'Coffee' },
  { name: 'Tea', path: 'Tea', label: 'Tea' },
  { name: 'Bakery', path: 'BakeryItams', label: 'Bakery Items' },
  { name: 'Beverages', path: 'ColdBeverages', label: 'Cold Beverages' },
  { name: 'Sandwich', path: 'Sandwich', label: 'Sandwiches & Burgers' },
  { name: 'Desserts', path: 'Desserts', label: 'Desserts' },
];

export default function Product() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('Coffee');

  React.useEffect(() => {
    const path = location.pathname;
    const category = categories.find(cat => path.includes(cat.path));
    setActiveCategory(category ? category.name : 'Coffee');
  }, [location.pathname]);

  return (
    <div className='min-h-screen bg-dark pt-[96px]'>
      <Breadcrumb items={[
        { label: 'Home', path: '/' },
        { label: 'Menu', path: '/Product' }
      ]} />

      {/* Hero Section */}
      <motion.div
        className="relative h-[280px] bg-cover bg-center flex items-center justify-center mb-12"
        style={{
          backgroundImage: "linear-gradient(rgba(12, 11, 9, 0.7), rgba(12, 11, 9, 0.7)), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-dark/50"></div>
        <div className="relative z-10 text-center px-5">
          <motion.span
            className="inline-block text-xs text-primary uppercase tracking-wider mb-3 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Our Menu
          </motion.span>
          <motion.h1
            className="font-playfair text-3xl md:text-4xl text-white mb-3 font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Delicious Selection
          </motion.h1>
          <motion.p
            className="text-sm text-text-muted max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Explore our carefully crafted menu featuring the finest coffee, teas, and culinary delights
          </motion.p>
        </div>
      </motion.div>

      {/* Category Navigation */}
      <motion.div
        className="bg-dark-light py-6 px-5 mb-12 border-t border-b border-primary/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <nav className="flex justify-center flex-wrap gap-3">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={category.path}
                  className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium font-playfair transition-all duration-300 ${
                    activeCategory === category.name
                      ? 'bg-primary text-white border-2 border-primary'
                      : 'bg-primary/5 text-text-muted border-2 border-transparent hover:border-primary/30 hover:text-primary'
                  }`}
                  onClick={() => setActiveCategory(category.name)}
                >
                  {category.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Products Outlet */}
      <motion.div
        className="max-w-7xl mx-auto px-5 pb-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
}
