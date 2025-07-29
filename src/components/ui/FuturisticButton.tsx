'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ButtonVariant, ButtonSize } from '@/types';

interface FuturisticButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  glowEffect?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

const buttonVariants = {
  primary: `
    bg-gradient-to-r from-blue-600 to-purple-600 
    hover:from-blue-500 hover:to-purple-500 
    text-white border-0
    shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50
  `,
  secondary: `
    bg-gradient-to-r from-gray-800 to-gray-700 
    hover:from-gray-700 hover:to-gray-600 
    text-white border border-gray-600
    shadow-lg shadow-gray-500/25
  `,
  neon: `
    bg-gradient-to-r from-green-400 to-cyan-400 
    hover:from-green-300 hover:to-cyan-300 
    text-black font-semibold border-0
    shadow-lg shadow-green-400/50 hover:shadow-green-400/75
  `,
  ghost: `
    bg-transparent border border-blue-500/50 
    hover:border-blue-400 hover:bg-blue-500/10 
    text-blue-400 hover:text-blue-300
  `,
};

const sizeVariants = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

export function FuturisticButton({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  glowEffect = true,
  className,
  children,
  disabled,
  onClick,
  type = 'button'
}: FuturisticButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={cn(
        // Base styles
        'relative rounded-lg font-medium transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'overflow-hidden',
        
        // Variant styles
        buttonVariants[variant],
        
        // Size styles
        sizeVariants[size],
        
        // Glow effect
        glowEffect && 'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
        
        className
      )}
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
    >
      {/* Shine effect overlay */}
      {glowEffect && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          />
        )}
        {children}
      </span>
      
      {/* Glow effect */}
      {glowEffect && !disabled && (
        <div className={cn(
          'absolute inset-0 rounded-lg blur-xl transition-opacity duration-300 -z-10',
          variant === 'primary' && 'bg-gradient-to-r from-blue-600/30 to-purple-600/30',
          variant === 'neon' && 'bg-gradient-to-r from-green-400/30 to-cyan-400/30',
          variant === 'secondary' && 'bg-gray-500/20',
          variant === 'ghost' && 'bg-blue-500/20',
        )} />
      )}
    </motion.button>
  );
} 