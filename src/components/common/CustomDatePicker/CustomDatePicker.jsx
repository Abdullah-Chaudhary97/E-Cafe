import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomDatePicker = ({
  id,
  name,
  value,
  onChange,
  min,
  max,
  required = false,
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  const datePickerRef = useRef(null);

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
      setCurrentMonth(new Date(value));
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (date) => {
    if (!date) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    const dateString = formatDate(newDate);
    
    onChange({
      target: {
        name,
        value: dateString,
      },
    });
    setIsOpen(false);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (day) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (min) {
      const minDate = new Date(min);
      minDate.setHours(0, 0, 0, 0);
      if (checkDate < minDate) return true;
    } else {
      if (checkDate < today) return true;
    }
    
    if (max) {
      const maxDate = new Date(max);
      maxDate.setHours(0, 0, 0, 0);
      if (checkDate > maxDate) return true;
    }
    
    return false;
  };

  const isSelectedDate = (day) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = [];
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className={`relative ${className}`} ref={datePickerRef}>
      {/* Hidden native input for form submission */}
      <input
        type="date"
        id={id}
        name={name}
        value={value || ''}
        onChange={onChange}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        tabIndex={-1}
      />

      {/* Custom date picker button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-4 py-2.5 bg-dark-light border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 appearance-none cursor-pointer flex items-center justify-between ${
          disabled ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        <span className={selectedDate ? 'text-white' : 'text-text-muted'}>
          {selectedDate ? formatDisplayDate(selectedDate) : 'Select Date'}
        </span>
        <motion.svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-2"
        >
          <path
            d="M6 9L1 4h10z"
            fill="#cda45e"
          />
        </motion.svg>
      </button>

      {/* Calendar popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-dark-light border border-primary/20 rounded-lg shadow-lg p-4"
          >
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => navigateMonth(-1)}
                className="p-1 text-primary hover:text-primary-light transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M10 12L6 8l4-4v8z" />
                </svg>
              </button>
              <h3 className="text-white font-semibold text-sm">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                type="button"
                onClick={() => navigateMonth(1)}
                className="p-1 text-primary hover:text-primary-light transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M6 4l4 4-4 4V4z" />
                </svg>
              </button>
            </div>

            {/* Day names header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-xs text-primary font-medium py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }
                
                const disabled = isDateDisabled(day);
                const selected = isSelectedDate(day);
                const today = isToday(day);

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => !disabled && handleDateSelect(day)}
                    disabled={disabled}
                    className={`aspect-square text-xs rounded transition-all duration-200 ${
                      disabled
                        ? 'text-text-muted/30 cursor-not-allowed'
                        : selected
                        ? 'bg-primary text-dark font-semibold'
                        : today
                        ? 'bg-primary/20 text-primary font-semibold hover:bg-primary/30'
                        : 'text-white hover:bg-primary/20 hover:text-primary'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDatePicker;
