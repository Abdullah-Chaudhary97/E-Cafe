import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productAPI } from '../../api';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../common/Toast/Toast';
import Loading from '../common/Loading/Loading';
import Button from '../common/Button/Button';
import Breadcrumb from '../common/Breadcrumb/Breadcrumb';
import { getProductSlug } from '../../utils/slugUtils';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Product not found');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      for (let i = 0; i < quantity; i++) {
        await addToCart({
          ...product,
          category: product.category,
          title: product.productTitle || product.title,
        });
      }
      showToast(`${quantity} x ${product.productTitle || product.title} added to cart!`, 'success');
    } catch (error) {
      showToast('Failed to add item to cart', 'error');
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(99, prev + delta)));
  };

  if (loading) return <Loading message="Loading product details..." />;
  if (error || !product) {
    return (
      <div className="min-h-screen bg-dark pt-[96px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Product not found</h2>
          <Button variant="primary" onClick={() => navigate('/Product')}>
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }

  const categoryMap = {
    coffee: { label: 'Coffee', path: 'Coffee' },
    tea: { label: 'Tea', path: 'Tea' },
    bakery: { label: 'Bakery Items', path: 'BakeryItams' },
    beverages: { label: 'Cold Beverages', path: 'ColdBeverages' },
    sandwich: { label: 'Sandwiches & Burgers', path: 'Sandwich' },
    desserts: { label: 'Desserts', path: 'Desserts' },
  };

  return (
    <div className="min-h-screen bg-dark pt-[96px]">
      <Breadcrumb items={[
        { label: 'Home', path: '/' },
        { label: 'Menu', path: '/Product' },
        { label: categoryMap[product.category]?.label || 'Product', path: `/Product/${categoryMap[product.category]?.path || product.category}` },
        { label: product.productTitle || product.title, path: `/Product/${getProductSlug(product) || id}` }
      ]} />

      <div className="max-w-6xl mx-auto px-5 py-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Product Image */}
          <motion.div
            className="relative rounded-lg overflow-hidden bg-dark-light"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={product.image}
              alt={product.productTitle || product.title}
              className="w-full h-[400px] object-cover"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="inline-block text-xs text-primary uppercase tracking-wider mb-2 font-medium">
              {categoryMap[product.category]?.label || product.category}
            </span>
            
            <h1 className="font-playfair text-2xl md:text-3xl text-white mb-3 font-semibold">
              {product.productTitle || product.title}
            </h1>

            <p className="text-xl md:text-2xl text-primary mb-4 font-semibold font-playfair">
              {product.price}
            </p>

            <div className="mb-6">
              <h3 className="text-sm text-white mb-2 font-semibold">Description</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            {product.inStock !== undefined && (
              <div className="mb-6">
                {product.inStock ? (
                  <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                    In Stock
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium">
                    Out of Stock
                  </span>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm text-white mb-2 font-medium">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-8 h-8 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-dark transition-all duration-300 flex items-center justify-center text-sm font-semibold"
                >
                  -
                </button>
                <span className="text-base text-white font-semibold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-dark transition-all duration-300 flex items-center justify-center text-sm font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-3 mb-6">
              <Button
                variant="primary"
                onClick={handleAddToCart}
                disabled={product.inStock === false}
                className="flex-1"
              >
                Add to Cart
              </Button>
            </div>

            {/* Back Button */}
            <Link
              to="/Product"
              className="text-sm text-primary hover:text-primary-light transition-colors underline"
            >
              ← Back to Menu
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
