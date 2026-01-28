import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { reservationAPI } from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../common/Toast/Toast';
import Breadcrumb from '../common/Breadcrumb/Breadcrumb';
import Button from '../common/Button/Button';
import CustomSelect from '../common/CustomSelect/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker/CustomDatePicker';
import ReservationImage from '../../assets/img/ReservationBack.jpg';

export default function Reservation() {
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: isAuthenticated && user ? user.name || '' : '',
    email: isAuthenticated && user ? user.email || '' : '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    // Validate date (must be today or future)
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      showToast('Please select a future date', 'error');
      return;
    }

    try {
      setLoading(true);
      const reservationData = {
        ...formData,
        guests: parseInt(formData.guests),
        date: new Date(formData.date).toISOString(),
      };
      
      await reservationAPI.createReservation(reservationData);
      showToast('Reservation submitted successfully! We will confirm shortly.', 'success');
      
      // Reset form
      setFormData({
        name: isAuthenticated && user ? user.name || '' : '',
        email: isAuthenticated && user ? user.email || '' : '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        specialRequests: '',
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to submit reservation. Please try again.';
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  // Generate time slots (every 30 minutes from 9:00 to 23:30)
  const timeSlots = [];
  for (let hour = 9; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push({
        value: timeString,
        label: timeString,
      });
    }
  }

  // Guest options
  const guestOptions = [
    { value: '1', label: '1 Guest' },
    { value: '2', label: '2 Guests' },
    { value: '3', label: '3 Guests' },
    { value: '4', label: '4 Guests' },
    { value: '5', label: '5 Guests' },
    { value: '6', label: '6 Guests' },
    { value: '7', label: '7 Guests' },
    { value: '8', label: '8+ Guests' },
  ];

  return (
    <div className="min-h-screen bg-dark pt-[96px]">
      <Breadcrumb items={[
        { label: 'Home', path: '/' },
        { label: 'Reservation', path: '/Reservation' }
      ]} />

      {/* Hero Section */}
      <motion.div
        className="relative h-[280px] bg-cover bg-center flex items-center justify-center mb-12"
        style={{
          backgroundImage: `linear-gradient(rgba(12, 11, 9, 0.7), rgba(12, 11, 9, 0.7)), url(${ReservationImage})`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-dark/50"></div>
        <div className="relative z-10 text-center px-5">
          <motion.span
            className="inline-block text-xs text-primary uppercase tracking-wider mb-2 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Reserve Your Table
          </motion.span>
          <motion.h1
            className="font-playfair text-3xl md:text-4xl text-white mb-2 font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Book a Table
          </motion.h1>
          <motion.p
            className="text-base text-text-muted font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Experience exceptional dining at E-Cafe
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-5 pb-12">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Image Section */}
          <motion.div
            className="hidden lg:block relative rounded-lg overflow-hidden bg-dark-light"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={ReservationImage}
              alt="E-Cafe Interior"
              className="w-full h-full object-cover min-h-[500px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark/80"></div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            className="bg-dark-card rounded-lg p-6 md:p-8 border border-primary/10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-6">
              <span className="inline-block text-xs text-primary uppercase tracking-wider mb-2 font-medium">
                Make Reservation
              </span>
              <h2 className="font-playfair text-2xl md:text-3xl text-white mb-2 font-semibold">
                Reserve Your Table
              </h2>
              <p className="text-sm text-text-muted">
                Fill in the details below and we'll confirm your reservation shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm text-white mb-2 font-medium">
                  Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-dark-light border border-primary/20 rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm text-white mb-2 font-medium">
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-dark-light border border-primary/20 rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm text-white mb-2 font-medium">
                  Phone <span className="text-primary">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-dark-light border border-primary/20 rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                  placeholder="+1 234 567 8900"
                />
              </div>

              {/* Date and Time Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm text-white mb-2 font-medium">
                    Date <span className="text-primary">*</span>
                  </label>
                  <CustomDatePicker
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label htmlFor="time" className="block text-sm text-white mb-2 font-medium">
                    Time <span className="text-primary">*</span>
                  </label>
                  <CustomSelect
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    options={timeSlots}
                    placeholder="Select Time"
                    required
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label htmlFor="guests" className="block text-sm text-white mb-2 font-medium">
                  Number of Guests <span className="text-primary">*</span>
                </label>
                <CustomSelect
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  options={guestOptions}
                  placeholder="Select Guests"
                  required
                />
              </div>

              {/* Special Requests */}
              <div>
                <label htmlFor="specialRequests" className="block text-sm text-white mb-2 font-medium">
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2.5 bg-dark-light border border-primary/20 rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 resize-none"
                  placeholder="Any special requests or dietary requirements..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Submitting...' : 'Make Reservation'}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
