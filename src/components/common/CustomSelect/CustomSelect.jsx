import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomSelect = ({
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  required = false,
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue) => {
    onChange({
      target: {
        name,
        value: optionValue,
      },
    });
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* Hidden native select for form submission */}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        tabIndex={-1}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom dropdown button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-4 py-2.5 bg-dark-light border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 appearance-none cursor-pointer flex items-center justify-between ${
          disabled ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        <span className={selectedOption ? 'text-white' : 'text-text-muted'}>
          {selectedOption ? selectedOption.label : placeholder}
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

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-dark-light border border-primary/20 rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto custom-dropdown-scroll"
          >
            {options.length === 0 ? (
              <div className="px-4 py-3 text-sm text-text-muted text-center">
                No options available
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-200 ${
                    value === option.value
                      ? 'bg-primary text-dark font-medium'
                      : 'text-white hover:bg-primary/20 hover:text-primary'
                  }`}
                >
                  {option.label}
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
