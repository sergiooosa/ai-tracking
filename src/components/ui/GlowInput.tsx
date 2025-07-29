'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  glowColor?: 'blue' | 'purple' | 'neon' | 'red';
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
}

const glowColors = {
  blue: {
    focus: 'ring-blue-400/50 border-blue-400',
    glow: 'shadow-blue-400/25',
    label: 'text-blue-400',
  },
  purple: {
    focus: 'ring-purple-400/50 border-purple-400',
    glow: 'shadow-purple-400/25',
    label: 'text-purple-400',
  },
  neon: {
    focus: 'ring-green-400/50 border-green-400',
    glow: 'shadow-green-400/25',
    label: 'text-green-400',
  },
  red: {
    focus: 'ring-red-400/50 border-red-400',
    glow: 'shadow-red-400/25',
    label: 'text-red-400',
  },
};

export function GlowInput({
  label,
  error,
  icon,
  glowColor = 'blue',
  className,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  type = 'text'
}: GlowInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const colors = glowColors[error ? 'red' : glowColor];

  return (
    <div className="relative w-full">
      {label && (
        <motion.label
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isFocused ? 1 : 0.7 }}
          className={cn(
            'block text-sm font-medium mb-2 transition-colors duration-200',
            isFocused ? colors.label : 'text-gray-400'
          )}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
                 <motion.input
           whileFocus={{ scale: 1.01 }}
           transition={{ duration: 0.2 }}
           onFocus={(e) => {
             setIsFocused(true);
             onFocus?.(e);
           }}
           onBlur={(e) => {
             setIsFocused(false);
             onBlur?.(e);
           }}
           className={cn(
             // Base styles
             'w-full px-4 py-3 rounded-lg transition-all duration-300',
             'bg-gray-900/50 backdrop-blur-sm border border-gray-700',
             'text-white placeholder-gray-500',
             'focus:outline-none focus:ring-2',
             
             // Icon padding
             icon && 'pl-10',
             
             // Focus styles
             isFocused && [
               colors.focus,
               `shadow-lg ${colors.glow}`,
             ],
             
             // Error styles
             error && 'border-red-500 ring-red-400/50',
             
             className
           )}
           type={type}
           placeholder={placeholder}
           value={value}
           onChange={onChange}
           onKeyDown={onKeyDown}
         />
        
        {/* Glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused ? 1 : 0 }}
          className={cn(
            'absolute inset-0 rounded-lg blur-xl -z-10 transition-opacity duration-300',
            error ? 'bg-red-500/20' : `bg-${glowColor}-500/20`
          )}
        />
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-2 flex items-center gap-1"
        >
          <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-xs">!</span>
          {error}
        </motion.p>
      )}
    </div>
  );
} 