'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FuturisticButton } from '@/components/ui/FuturisticButton';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { ArrowDown, Zap, Brain, Target } from 'lucide-react';

const HeroSection = () => {
  const heroTexts = [
    "Revolucionamos el tracking con IA",
    "Análisis instantáneo y personalizado", 
    "El futuro del feedback inteligente"
  ];

  const floatingIcons = [
    { Icon: Zap, delay: 0, x: 100, y: 50 },
    { Icon: Brain, delay: 2, x: -80, y: 80 },
    { Icon: Target, delay: 4, x: 120, y: -60 }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-400/30"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            x: [0, x, 0],
            y: [0, y, 0]
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon size={32} />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center max-w-6xl mx-auto px-6"
      >
        {/* Main Title */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <AnimatedText
              text={heroTexts}
              speed={80}
              repeat={true}
              gradient={true}
              className="block leading-tight"
            />
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Nuestro sistema de <span className="text-green-400 font-semibold">IA avanzada</span> llena 
            automáticamente tus trackers y genera{' '}
            <span className="text-blue-400 font-semibold">feedback personalizado</span> que 
            transforma tus resultados
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16"
        >
          {[
            { value: "99%", label: "Precisión IA" },
            { value: "<3s", label: "Análisis" },
            { value: "24/7", label: "Tracking" }
          ].map(({ value, label }, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {value}
              </div>
              <div className="text-gray-400 text-sm md:text-base">{label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <FuturisticButton
            variant="neon"
            size="xl"
            onClick={() => {
              document.getElementById('link-manager')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            <Zap className="w-5 h-5" />
            Comenzar Análisis
          </FuturisticButton>
          
          <FuturisticButton
            variant="ghost"
            size="lg"
            onClick={() => {
              document.getElementById('benefits')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            Ver Beneficios
          </FuturisticButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex flex-col items-center"
        >
          <p className="text-gray-400 text-sm mb-4">Descubre el poder de la IA</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-blue-400 cursor-pointer"
            onClick={() => {
              document.getElementById('link-manager')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            <ArrowDown size={24} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    </section>
  );
};

export default HeroSection; 