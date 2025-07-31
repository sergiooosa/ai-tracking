'use client';

import { motion } from 'framer-motion';
import { Users, CheckCircle, Target, DollarSign, TrendingUp, Award, Phone, UserCheck } from 'lucide-react';
import { ReportMetrics as ReportMetricsType } from '@/types';

interface ReportMetricsProps {
  metrics: ReportMetricsType;
  isLoading?: boolean;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  delay: number;
  isLoading?: boolean;
}

function MetricCard({ title, value, icon, color, gradient, delay, isLoading }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      className={`
        relative group p-6 rounded-2xl bg-gradient-to-br ${gradient}
        border border-gray-700/30 backdrop-blur-xl
        hover:scale-105 hover:border-${color}-500/50 transition-all duration-300
        cursor-pointer overflow-hidden
      `}
    >
      {/* Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-${color}-500/20 text-${color}-400`}>
            {icon}
          </div>
          <div className={`w-2 h-2 rounded-full bg-${color}-400 animate-pulse`} />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            {title}
          </h3>
          
          {isLoading ? (
            <div className={`h-8 bg-${color}-500/20 rounded-lg animate-pulse`} />
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: delay + 0.2 }}
              className={`text-3xl font-bold text-${color}-400`}
            >
              {typeof value === 'number' ? value.toLocaleString() : value}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl">
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-${color}-500/0 via-${color}-500/50 to-${color}-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
             style={{ 
               background: `linear-gradient(90deg, transparent, ${color === 'blue' ? 'rgba(59, 130, 246, 0.3)' : color === 'green' ? 'rgba(34, 197, 94, 0.3)' : color === 'purple' ? 'rgba(147, 51, 234, 0.3)' : color === 'orange' ? 'rgba(249, 115, 22, 0.3)' : color === 'cyan' ? 'rgba(6, 182, 212, 0.3)' : color === 'pink' ? 'rgba(236, 72, 153, 0.3)' : color === 'yellow' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(156, 163, 175, 0.3)'}, transparent)`,
               maskImage: 'linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)'
             }}
        />
      </div>
    </motion.div>
  );
}

export default function ReportMetrics({ metrics, isLoading = false }: ReportMetricsProps) {
  const metricsConfig = [
    {
      title: 'Total Leads',
      value: metrics?.totalLeads || 0,
      icon: <Users className="w-6 h-6" />,
      color: 'blue',
      gradient: 'from-blue-900/20 to-blue-800/10'
    },
    {
      title: 'Asistieron',
      value: metrics?.asistieron || 0,
      icon: <UserCheck className="w-6 h-6" />,
      color: 'green',
      gradient: 'from-green-900/20 to-green-800/10'
    },
    {
      title: 'Calificados',
      value: metrics?.calificados || 0,
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'purple',
      gradient: 'from-purple-900/20 to-purple-800/10'
    },
    {
      title: 'Ofertados',
      value: metrics?.ofertados || 0,
      icon: <Target className="w-6 h-6" />,
      color: 'orange',
      gradient: 'from-orange-900/20 to-orange-800/10'
    },
    {
      title: 'Vendidos',
      value: metrics?.vendidos || 0,
      icon: <Award className="w-6 h-6" />,
      color: 'cyan',
      gradient: 'from-cyan-900/20 to-cyan-800/10'
    },
    {
      title: 'Cash Total',
      value: `$${(metrics?.cashTotal || 0).toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'pink',
      gradient: 'from-pink-900/20 to-pink-800/10'
    },
    {
      title: 'Close Rate',
      value: metrics?.closeRate || '0%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'yellow',
      gradient: 'from-yellow-900/20 to-yellow-800/10'
    },
    {
      title: '% Calificados',
      value: metrics?.porcentajeCalificados || '0%',
      icon: <Phone className="w-6 h-6" />,
      color: 'gray',
      gradient: 'from-gray-900/20 to-gray-800/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-2"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          📊 Métricas Generales
        </h2>
        <p className="text-gray-400">
          Resumen completo del rendimiento y conversiones
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsConfig.map((metric, index) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            color={metric.color}
            gradient={metric.gradient}
            delay={index * 0.1}
            isLoading={isLoading}
          />
        ))}
      </div>

      {/* Animated Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
      />
    </div>
  );
}