'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Zap, Brain, Target, TrendingUp, Clock, Shield } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      id: '1',
      title: 'Análisis Instantáneo',
      description: 'IA procesando y analizando tus contenidos en menos de 3 segundos',
      icon: Zap,
      metric: { value: 3, suffix: 's' }
    },
    {
      id: '2', 
      title: 'Feedback Personalizado',
      description: 'Insights únicos basados en tu industria y objetivos específicos',
      icon: Brain,
      metric: { value: 99, suffix: '%' }
    },
    {
      id: '3',
      title: 'Tracking Automático',
      description: 'Sin esfuerzo manual, seguimiento 24/7 de todos tus enlaces',
      icon: Target,
      metric: { value: 24, suffix: '/7' }
    },
    {
      id: '4',
      title: 'Mejora Continua',
      description: 'Algoritmos que aprenden y optimizan tus resultados constantemente',
      icon: TrendingUp,
      metric: { value: 300, suffix: '%' }
    },
    {
      id: '5',
      title: 'Tiempo Real',
      description: 'Actualizaciones instantáneas y notificaciones inteligentes',
      icon: Clock,
      metric: { value: 0, suffix: 'ms' }
    },
    {
      id: '6',
      title: 'Seguridad Total',
      description: 'Encriptación end-to-end y protección de datos garantizada',
      icon: Shield,
      metric: { value: 256, suffix: 'bit' }
    }
  ];

  return (
    <section id="benefits" className="relative py-20 px-6 bg-gradient-to-b from-transparent to-gray-900/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <AnimatedText
              text="Beneficios Revolucionarios"
              effect="glow"
              gradient={true}
              cursor={false}
            />
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre cómo nuestra IA transforma completamente tu forma de hacer tracking y análisis
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 h-full">
                {/* Icon and Metric */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                    <benefit.icon size={32} className="text-blue-400" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                      {benefit.metric.value}{benefit.metric.suffix}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-2xl text-gray-300 mb-8">
            ¿Listo para experimentar el futuro del tracking?
          </p>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-green-400 text-lg font-semibold"
          >
            ↑ Comienza agregando tus links arriba ↑
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection; 