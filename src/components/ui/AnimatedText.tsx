'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string | string[];
  speed?: number;
  delay?: number;
  repeat?: boolean;
  className?: string;
  effect?: 'typewriter' | 'fade' | 'slide' | 'glow';
  gradient?: boolean;
  cursor?: boolean;
}

export function AnimatedText({
  text,
  speed = 50,
  delay = 0,
  repeat = false,
  className,
  effect = 'typewriter',
  gradient = false,
  cursor = true
}: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);
  
  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (effect === 'typewriter') {
        if (!isDeleting && currentIndex < currentText.length) {
          setDisplayText(currentText.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else if (isDeleting && currentIndex > 0) {
          setDisplayText(currentText.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else if (!isDeleting && currentIndex === currentText.length) {
          if (textArray.length > 1 || repeat) {
            setTimeout(() => setIsDeleting(true), 1000);
          }
        } else if (isDeleting && currentIndex === 0) {
          setIsDeleting(false);
          setTextArrayIndex((prev) => (prev + 1) % textArray.length);
        }
      } else {
        setDisplayText(currentText);
      }
    }, delay + (effect === 'typewriter' ? (isDeleting ? speed / 2 : speed) : 0));

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, textArrayIndex, currentText, textArray.length, speed, delay, effect, repeat]);

  const textClasses = cn(
    gradient && 'bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent',
    className
  );

  if (effect === 'fade') {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay / 1000 }}
        className={textClasses}
      >
        {displayText}
      </motion.span>
    );
  }

  if (effect === 'slide') {
    return (
      <motion.span
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: delay / 1000 }}
        className={textClasses}
      >
        {displayText}
      </motion.span>
    );
  }

  if (effect === 'glow') {
    return (
      <motion.span
        initial={{ opacity: 0, textShadow: '0 0 0px rgba(59, 130, 246, 0)' }}
        animate={{ 
          opacity: 1, 
          textShadow: '0 0 20px rgba(59, 130, 246, 0.5)' 
        }}
        transition={{ duration: 1, delay: delay / 1000 }}
        className={textClasses}
      >
        {displayText}
      </motion.span>
    );
  }

  // Default typewriter effect
  return (
    <span className={textClasses}>
      {displayText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="ml-1 text-blue-400"
        >
          |
        </motion.span>
      )}
    </span>
  );
} 