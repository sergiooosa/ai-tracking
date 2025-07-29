'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FuturisticButton } from '@/components/ui/FuturisticButton';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { ArrowLeft, Zap, Brain, TrendingUp, Users, Target, BarChart3, CheckCircle } from 'lucide-react';
import { AnalysisResponse, AnalysisState, LinkItem } from '@/types';

interface AnalysisResultsProps {
  links: LinkItem[];
  onBack: () => void;
}

const AnalysisResults = ({ links, onBack }: AnalysisResultsProps) => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>('loading');
  const [results, setResults] = useState<AnalysisResponse | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);

  // Asegurar que empezamos desde arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadingSteps = [
    { icon: Zap, text: "Inicializando análisis con IA...", duration: 2000 },
    { icon: Brain, text: "Procesando URLs y extrayendo datos...", duration: 3000 },
    { icon: Users, text: "Analizando patrones de closers...", duration: 4000 },
    { icon: Target, text: "Calculando métricas de conversión...", duration: 3000 },
    { icon: TrendingUp, text: "Generando insights personalizados...", duration: 2000 },
    { icon: BarChart3, text: "Compilando reporte final...", duration: 1000 }
  ];

  useEffect(() => {
    const totalEstimated = links.length * 15; // 15 segundos por link
    setEstimatedTime(totalEstimated);
    
    // Llamar al webhook solo una vez
    analyzeLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo ejecutar al montar

  useEffect(() => {
    if (analysisState !== 'loading') return;

    // Simular progreso de carga
    const totalDuration = loadingSteps.reduce((acc, step) => acc + step.duration, 0);
    let currentProgress = 0;
    
    const progressInterval = setInterval(() => {
      currentProgress += (100 / totalDuration) * 50; // Solo llega al 50%
      setProgress(Math.min(currentProgress, 85)); // No llegar muy alto hasta que llegue la respuesta
    }, 100);

    // Cambiar pasos
    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      if (stepIndex < loadingSteps.length - 1) {
        stepIndex++;
        setCurrentStep(stepIndex);
      }
    }, totalDuration / loadingSteps.length);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [analysisState, loadingSteps]);

  const analyzeLinks = async () => {
    try {
      const payload = {
        links: links.map(link => ({
          id: link.id,
          url: link.url,
          domain: link.domain,
          closer: link.closer,
          createdAt: link.createdAt.toISOString()
        })),
        timestamp: new Date().toISOString(),
        totalLinks: links.length
      };

      const response = await fetch('https://conexiones.automatizacionesia.com/webhook/recibirparanalisis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta completa del webhook:', data);
        
        // Completar el progreso rápidamente
        setProgress(95);
        setTimeout(() => setProgress(100), 300);
        
        // Delay mínimo para mostrar el 100% antes de cambiar a resultados
        setTimeout(() => {
          setResults(data[0]); // El primer elemento del array
          setAnalysisState('success');
        }, 800);
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    } catch (error) {
      console.error('Error en análisis:', error);
      setAnalysisState('error');
    }
  };

  const LoadingScreen = () => (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <AnimatedText
              text="Analizando con IA"
              effect="glow"
              gradient={true}
              cursor={false}
            />
          </h1>
          <p className="text-xl text-gray-300">
            Procesando {links.length} link{links.length !== 1 ? 's' : ''} • 
            Tiempo estimado: ~{estimatedTime} segundos
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-800"
        >
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Progreso</span>
              <span className="text-sm text-blue-400 font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Current Step */}
          <div className="flex items-center gap-4">
            <motion.div
              key={currentStep}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20"
            >
              {React.createElement(loadingSteps[currentStep].icon, { 
                size: 24, 
                className: "text-blue-400" 
              })}
            </motion.div>
            <div className="flex-1">
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-blue-400 font-medium"
              >
                {loadingSteps[currentStep].text}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Processing Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="flex justify-center space-x-2 mb-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            Nuestros algoritmos están trabajando en tu análisis...
          </p>
        </motion.div>
      </div>
    </div>
  );

  const ResultsScreen = () => {
    if (!results) return null;

    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <AnimatedText
                  text="Análisis Completado"
                  effect="glow"
                  gradient={true}
                  cursor={false}
                />
              </h1>
              <p className="text-xl text-gray-300">
                Resultados del análisis de {links.length} link{links.length !== 1 ? 's' : ''}
              </p>
            </div>
            <FuturisticButton
              variant="ghost"
              size="md"
              onClick={onBack}
            >
              <ArrowLeft size={20} />
              Volver
            </FuturisticButton>
          </motion.div>

          {/* Closers Table */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-800"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                📊 Resumen de Closers
              </span>
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Nombre del Closer</th>
                    <th className="text-center py-3 px-4 text-gray-300 font-semibold">Total Prospectos</th>
                    <th className="text-center py-3 px-4 text-gray-300 font-semibold">Total Cierres</th>
                    <th className="text-center py-3 px-4 text-gray-300 font-semibold">Close Rate</th>
                  </tr>
                </thead>
                                 <tbody>
                   {results.resumen.closers
                     .sort((a, b) => b.closeRate - a.closeRate) // Ordenar por mejor close rate primero
                     .map((closer, index) => (
                    <motion.tr
                      key={closer.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                            <span className="text-blue-400 font-bold">
                              {closer.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-white font-medium">{closer.name}</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-2xl font-bold text-blue-400">
                          {closer.totalProspectos}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-2xl font-bold text-green-400">
                          {closer.totalCierres}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <span className={`text-2xl font-bold ${
                            closer.closeRate > 15 ? 'text-green-400' :
                            closer.closeRate > 5 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {closer.closeRate.toFixed(1)}%
                          </span>
                          {closer.closeRate > 0 && (
                            <CheckCircle size={16} className="text-green-400" />
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Analysis Report */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                📖 Reporte Detallado de Análisis
              </span>
            </h2>
            
                         <div className="max-w-none">
               <div className="bg-gray-800/30 rounded-xl p-6 text-gray-300 leading-relaxed">
                 <div 
                   className="whitespace-pre-wrap text-sm lg:text-base"
                   style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.7' }}
                 >
                   {results.output.split('\n').map((line, index) => (
                     <div key={index} className="mb-2">
                       {line.includes('**') ? (
                         <div dangerouslySetInnerHTML={{ 
                           __html: line
                             .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400 font-bold">$1</strong>')
                             .replace(/\*(.*?)\*/g, '<em class="text-purple-300 italic">$1</em>')
                         }} />
                       ) : (
                         <span>{line || <br />}</span>
                       )}
                     </div>
                   ))}
                 </div>
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    );
  };

  const ErrorScreen = () => (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-400 mb-4">Error en el Análisis</h2>
        <p className="text-gray-300 mb-6">
          Hubo un problema al procesar tus links. Por favor intenta de nuevo.
        </p>
        <FuturisticButton
          variant="primary"
          onClick={onBack}
        >
          <ArrowLeft size={20} />
          Volver a Intentar
        </FuturisticButton>
      </motion.div>
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {analysisState === 'loading' && <LoadingScreen />}
      {analysisState === 'success' && <ResultsScreen />}
      {analysisState === 'error' && <ErrorScreen />}
    </AnimatePresence>
  );
};

export default AnalysisResults; 