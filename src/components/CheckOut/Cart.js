import React, { useState } from 'react';
import { IoIosAdd, IoIosRemove, IoMdTrash } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../utils/formatters';
import Button from '../common/Button/Button';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumb from '../common/Breadcrumb/Breadcrumb';

export default function Cart() {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal,
    isEmpty 
  } = useCart();
  
  const [shippingMethod, setShippingMethod] = useState('pickup');
  const [couponCode, setCouponCode] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const shippingCosts = {
    next_day: 4.99,
    standard: 1.99,
    pickup: 0,
  };

  const shippingCost = shippingCosts[shippingMethod] || 0;
  const subtotal = getCartTotal();
  const total = subtotal + shippingCost;

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity < 1) {
      removeFromCart(item.id, item.category);
    } else {
      updateQuantity(item.id, item.category, newQuantity);
    }
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.category);
  };

  const handleClearCart = () => {
    if (window.confirm('Clear entire cart?')) {
      clearCart();
    }
  };

  const handleApplyCoupon = () => {
    setApplyingCoupon(true);
    setTimeout(() => {
      setApplyingCoupon(false);
      alert('Coupon code functionality coming soon!');
    }, 1000);
  };

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-dark pt-[120px] pb-16">
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Cart', path: '/Cart' }
        ]} />
        
        <motion.div
          className="max-w-2xl mx-auto text-center py-16 px-5 mt-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-8xl mb-5"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            🛒
          </motion.div>
          <h2 className="font-playfair text-4xl text-primary mb-4 font-semibold">
            Your cart is empty
          </h2>
          <p className="text-base text-text-muted mb-8 leading-relaxed">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/Product">
            <Button variant="primary" size="large">
              Browse Menu
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-[120px] pb-16">
      <Breadcrumb items={[
        { label: 'Home', path: '/' },
        { label: 'Shopping Cart', path: '/Cart' }
      ]} />

      <div className="max-w-7xl mx-auto px-5 pt-8 pb-5 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Cart Content */}
        <div className="flex-1">
          {/* Cart Header */}
          <motion.div
            className="mb-6 pb-4 border-b border-primary/20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-playfair text-xl md:text-2xl text-white font-semibold mb-1">
              Shopping Cart
            </h1>
            <p className="text-[10px] text-text-muted">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </motion.div>

          {/* Cart Items */}
          <div className="flex flex-col gap-3 mb-5">
            <AnimatePresence>
              {items.map((item, index) => {
                const itemPrice = parseFloat(item.price?.replace(/[^0-9.]/g, '')) || 0;
                const itemTotal = itemPrice * item.quantity;
                
                return (
                  <motion.div
                    key={`${item.id}-${item.category}`}
                    className="bg-dark-card rounded-lg p-3 grid grid-cols-[80px_1fr_auto_auto_auto_auto] gap-3 items-center border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="w-[80px] h-[80px] rounded-lg overflow-hidden bg-dark-light">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.title || item.productTitle}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-playfair text-sm text-white mb-1 font-semibold">
                        {item.title || item.productTitle}
                      </h3>
                      <p className="text-[10px] text-text-muted mb-1.5 leading-relaxed line-clamp-2">
                        {item.description?.substring(0, 50)}...
                      </p>
                      <span className="inline-block text-[9px] text-primary uppercase tracking-wider px-1.5 py-0.5 bg-primary/10 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[9px] text-text-muted uppercase tracking-wider">Price</span>
                      <span className="text-sm text-primary font-semibold font-playfair">
                        {formatPrice(itemPrice)}
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[9px] text-text-muted uppercase tracking-wider">Qty</span>
                      <div className="flex items-center gap-1.5 bg-primary/10 rounded-lg px-1.5 py-1">
                        <motion.button
                          className="text-primary hover:text-primary-light transition-colors"
                          onClick={() => handleQuantityChange(item, -1)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <IoIosRemove size={14} />
                        </motion.button>
                        <span className="text-xs text-white font-semibold min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <motion.button
                          className="text-primary hover:text-primary-light transition-colors"
                          onClick={() => handleQuantityChange(item, 1)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <IoIosAdd size={14} />
                        </motion.button>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[9px] text-text-muted uppercase tracking-wider">Total</span>
                      <span className="text-base text-white font-semibold font-playfair">
                        {formatPrice(itemTotal)}
                      </span>
                    </div>

                    <motion.button
                      className="w-8 h-8 rounded-lg border border-red-500/30 text-red-500 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500 transition-all"
                      onClick={() => handleRemoveItem(item)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IoMdTrash size={14} />
                    </motion.button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Cart Actions */}
          <motion.div
            className="flex gap-3 pt-4 border-t border-primary/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/Product">
              <Button variant="secondary" size="medium">
                ← Continue Shopping
              </Button>
            </Link>
            <button
              className="px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider border-2 border-red-500/30 text-red-500 hover:bg-red-500/10 hover:border-red-500 transition-all"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </motion.div>
        </div>

        {/* Cart Summary Sidebar */}
        <motion.div
          className="lg:sticky lg:top-[120px] h-fit"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-dark-card rounded-lg p-5 border border-primary/20">
            <h2 className="font-playfair text-lg text-white mb-5 pb-3 border-b border-primary/20 font-semibold">
              Order Summary
            </h2>
            
            {/* Shipping Options */}
            <div className="mb-4">
              <h3 className="font-playfair text-xs text-primary mb-2.5 font-medium">
                Shipping Method
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'pickup', label: 'Personal Pickup', price: 'Free' },
                  { value: 'standard', label: 'Standard Delivery', price: formatPrice(shippingCosts.standard) },
                  { value: 'next_day', label: 'Next Day Delivery', price: formatPrice(shippingCosts.next_day) },
                ].map((option) => (
                  <motion.label
                    key={option.value}
                    className={`flex items-center p-2 border-2 rounded-lg cursor-pointer transition-all ${
                      shippingMethod === option.value
                        ? 'border-primary bg-primary/10'
                        : 'border-primary/20 bg-primary/5 hover:border-primary/40'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={option.value}
                      checked={shippingMethod === option.value}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mr-2 w-3.5 h-3.5 accent-primary cursor-pointer"
                    />
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-[10px] text-white font-medium">
                        {option.label}
                      </span>
                      <span className="text-[10px] text-primary font-semibold">
                        {option.price}
                      </span>
                    </div>
                  </motion.label>
                ))}
              </div>
            </div>

            {/* Coupon Code */}
            <div className="mb-4">
              <h3 className="font-playfair text-xs text-primary mb-2.5 font-medium">
                Coupon Code
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 bg-white/5 border border-primary/20 rounded-lg px-2.5 py-1.5 text-white text-[10px] focus:outline-none focus:border-primary transition-colors placeholder:text-gray-500"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code"
                />
                <motion.button
                  className="bg-primary text-dark px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase whitespace-nowrap hover:bg-primary-light hover:text-white hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={handleApplyCoupon}
                  disabled={applyingCoupon}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {applyingCoupon ? '...' : 'Apply'}
                </motion.button>
              </div>
            </div>

            {/* Order Totals */}
            <div className="pt-3 border-t border-primary/20">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] text-text-muted">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-text-muted">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 mt-1.5 border-t border-primary/20 text-sm text-white font-semibold font-playfair">
                  <span>Total</span>
                  <span className="text-lg text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <motion.div className="mt-4" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/Checkout" className="block">
                <button className="w-full bg-primary text-dark py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider font-poppins hover:bg-primary-light hover:text-white hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 shadow-lg shadow-primary/30 hover:scale-[1.02]">
                  Proceed to Checkout
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
