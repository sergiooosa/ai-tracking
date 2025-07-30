'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FuturisticButton } from '@/components/ui/FuturisticButton';
import { GlowInput } from '@/components/ui/GlowInput';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Plus, X, Link as LinkIcon, Globe, CheckCircle, AlertCircle } from 'lucide-react';
import { LinkItem } from '@/types';
import { generateId, isValidUrl, getDomainFromUrl } from '@/lib/utils';

const LinkManager = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newCloser, setNewCloser] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [hasStartedAnalysis, setHasStartedAnalysis] = useState(false);

  const addLink = () => {
    if (!newLinkUrl.trim() || !newCloser.trim()) return;
    
    const isValid = isValidUrl(newLinkUrl);
    const newLink: LinkItem = {
      id: generateId(),
      url: newLinkUrl,
      domain: isValid ? getDomainFromUrl(newLinkUrl) : '',
      closer: newCloser.trim(),
      isValid,
      createdAt: new Date()
    };

    setLinks([...links, newLink]);
    setNewLinkUrl('');
    setNewCloser('');
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleAnalyze = async () => {
    const validLinks = links.filter(link => link.isValid);
    if (validLinks.length === 0 || hasStartedAnalysis) return;
    
    setHasStartedAnalysis(true);
    setIsAnalyzing(true);
    
    try {
      // Preparar los datos para enviar
      const payload = {
        links: validLinks.map(link => ({
          id: link.id,
          url: link.url,
          domain: link.domain,
          closer: link.closer,
          createdAt: link.createdAt.toISOString()
        })),
        timestamp: new Date().toISOString(),
        totalLinks: validLinks.length
      };

      console.log('Enviando links al webhook (UNA VEZ):', payload);

      // Enviar al webhook
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
        
        // Validar que la respuesta tenga la estructura esperada
        let analysisData = null;
        
        if (Array.isArray(data) && data.length >= 2) {
          // Nuevo formato: [metrics_objeto, output_objeto]
          analysisData = {
            metrics: data[0],
            analysis: data[1]
          };
        } else if (Array.isArray(data) && data.length > 0) {
          // Fallback: primer elemento tiene todo
          analysisData = data[0];
        } else if (data && typeof data === 'object') {
          // Objeto directo
          analysisData = data;
        }
        
        console.log('Datos de análisis procesados:', analysisData);
        
        // Verificar que tengamos los datos necesarios (formato nuevo)
        if (analysisData && ((analysisData.metrics && analysisData.analysis) || analysisData.output)) {
          setAnalysisResults(analysisData);
          setShowResults(true);
        } else {
          console.error('Estructura de datos inválida:', analysisData);
          console.log('Datos originales:', data);
          throw new Error('El webhook devolvió datos en formato incorrecto');
        }
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    } catch (error) {
      console.error('Error enviando al webhook:', error);
      alert('Hubo un error al enviar los links para análisis. Por favor intenta de nuevo.');
      setHasStartedAnalysis(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBackToLinks = () => {
    setShowResults(false);
    setHasStartedAnalysis(false);
    setAnalysisResults(null);
  };

  const validLinks = links.filter(link => link.isValid);

  // Si está mostrando resultados, renderizar directamente los resultados
  if (showResults && analysisResults) {
    return (
      <section className="relative py-20 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                ✅ Análisis Completado
              </h1>
              <p className="text-xl text-gray-300">
                Resultados del análisis de {validLinks.length} link{validLinks.length !== 1 ? 's' : ''}
              </p>
            </div>
            <FuturisticButton
              variant="ghost"
              size="md"
              onClick={handleBackToLinks}
            >
              ← Volver
            </FuturisticButton>
          </div>

                    {/* Call Metrics Grid */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              📊 Métricas de Llamadas
            </h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              {analysisResults?.metrics ? (
                <>
                  <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-gray-700/50 hover:border-blue-500/30 transition-colors">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {analysisResults.metrics.llamadas_tomadas || 0}
                    </div>
                    <div className="text-sm text-gray-300 font-medium">Llamadas Tomadas</div>
                  </div>
                  <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-gray-700/50 hover:border-purple-500/30 transition-colors">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {analysisResults.metrics.llamadas_ofertadas || 0}
                    </div>
                    <div className="text-sm text-gray-300 font-medium">Llamadas Ofertadas</div>
                  </div>
                  <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-gray-700/50 hover:border-green-500/30 transition-colors">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {analysisResults.metrics.llamadas_cerradas || 0}
                    </div>
                    <div className="text-sm text-gray-300 font-medium">Llamadas Cerradas</div>
                  </div>
                  <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-gray-700/50 hover:border-yellow-500/30 transition-colors">
                    <div className={`text-3xl font-bold mb-2 ${
                      parseFloat(analysisResults.metrics.close_rate?.replace('%', '') || '0') > 15 ? 'text-green-400' :
                      parseFloat(analysisResults.metrics.close_rate?.replace('%', '') || '0') > 5 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {analysisResults.metrics.close_rate || '0%'}
                    </div>
                    <div className="text-sm text-gray-300 font-medium">Close Rate</div>
                  </div>
                  <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-gray-700/50 hover:border-cyan-500/30 transition-colors">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">
                      ${analysisResults.metrics.cash_collected || 0}
                    </div>
                    <div className="text-sm text-gray-300 font-medium">Cash Collected</div>
                  </div>
                </>
              ) : (
                <div className="col-span-full text-center py-8 text-gray-400">
                  <p>⚠️ No se pudieron cargar las métricas</p>
                  <p className="text-sm mt-2">Datos recibidos sin información de métricas</p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs text-blue-400">Ver datos recibidos</summary>
                    <pre className="text-xs bg-gray-900 p-2 rounded mt-2 text-left overflow-auto">
                      {JSON.stringify(analysisResults, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          </div>

          {/* Analysis Report */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              📖 Análisis Detallado de Leads
            </h2>
            
            <div className="bg-gray-800/30 rounded-xl p-6 text-gray-300 leading-relaxed border border-gray-700/50">
              <div className="whitespace-pre-wrap text-sm lg:text-base font-mono" style={{ lineHeight: '1.6' }}>
                {(analysisResults?.analysis?.output || analysisResults?.output) ? (
                  (analysisResults.analysis?.output || analysisResults.output)
                    .split('\n')
                    .map((line: string, index: number) => (
                      <div key={index} className="mb-1">
                        {line.startsWith('**') && line.endsWith('**') ? (
                          // Títulos principales
                          <div className="text-blue-400 font-bold text-lg mt-4 mb-2 border-l-4 border-blue-400 pl-3">
                            {line.replace(/\*\*/g, '')}
                          </div>
                        ) : line.startsWith('* ') ? (
                          // Elementos de lista
                          <div className="text-gray-300 ml-4 flex items-start gap-2">
                            <span className="text-green-400 text-lg">•</span> 
                            <span>{line.substring(2)}</span>
                          </div>
                        ) : line.startsWith('```') ? (
                          // Bloques de código (ignorar)
                          null
                        ) : line.includes('**') ? (
                          // Texto con negritas
                          <div dangerouslySetInnerHTML={{
                            __html: line
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-400 font-bold">$1</strong>')
                              .replace(/\*(.*?)\*/g, '<em class="text-purple-300 italic">$1</em>')
                          }} />
                        ) : line.trim() === '' ? (
                          // Líneas vacías
                          <div className="h-2"></div>
                        ) : (
                          // Texto normal
                          <span className="text-gray-300">{line}</span>
                        )}
                      </div>
                    ))
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    <p>⚠️ No se pudo cargar el análisis detallado</p>
                    <p className="text-sm mt-2">Los datos del webhook no contienen el campo &apos;output&apos;</p>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs text-blue-400">Ver datos recibidos</summary>
                      <pre className="text-xs bg-gray-900 p-2 rounded mt-2 text-left overflow-auto">
                        {JSON.stringify(analysisResults, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="link-manager" className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <AnimatedText
              text="Agrega tus Links"
              effect="glow"
              gradient={true}
              cursor={false}
            />
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Agrega todos los links que quieras analizar junto con el closer responsable. 
            Nuestro sistema de IA los procesará instantáneamente para darte feedback personalizado.
          </p>
        </motion.div>

        {/* Link Input Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div>
              <GlowInput
                label="URL del Link"
                placeholder="https://ejemplo.com/tu-contenido"
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
                icon={<LinkIcon size={20} />}
                glowColor="blue"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newLinkUrl.trim() && newCloser.trim()) {
                    e.preventDefault();
                    addLink();
                  }
                }}
              />
            </div>
            <div>
              <GlowInput
                label="Closer Responsable"
                placeholder="Nombre del closer/vendedor"
                value={newCloser}
                onChange={(e) => setNewCloser(e.target.value)}
                icon={<span className="text-purple-400 font-bold">👤</span>}
                glowColor="purple"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newLinkUrl.trim() && newCloser.trim()) {
                    e.preventDefault();
                    addLink();
                  }
                }}
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <FuturisticButton
              variant="primary"
              size="md"
              onClick={addLink}
              disabled={!newLinkUrl.trim() || !newCloser.trim()}
            >
              <Plus size={20} />
              Agregar Link
            </FuturisticButton>
          </div>
          
          {newLinkUrl && !isValidUrl(newLinkUrl) && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm mt-2 flex items-center gap-2"
            >
              <AlertCircle size={16} />
              Por favor ingresa una URL válida
            </motion.p>
          )}
          
          {(!newLinkUrl.trim() || !newCloser.trim()) && (newLinkUrl.trim() || newCloser.trim()) && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-yellow-400 text-sm mt-2 flex items-center gap-2"
            >
              <AlertCircle size={16} />
              Completa ambos campos para agregar el link
            </motion.p>
          )}
        </motion.div>

        {/* Links Display */}
        <AnimatePresence>
          {links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 mb-8"
            >
              {links.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`p-2 rounded-lg ${link.isValid ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        {link.isValid ? (
                          <CheckCircle size={20} className="text-green-400" />
                        ) : (
                          <AlertCircle size={20} className="text-red-400" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Globe size={16} className="text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-300 truncate">
                            {link.domain || 'Dominio inválido'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-purple-400 text-xs">👤</span>
                          <span className="text-xs text-purple-300 font-medium">
                            {link.closer}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {link.url}
                        </p>
                      </div>
                    </div>
                    
                    <FuturisticButton
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLink(link.id)}
                    >
                      <X size={16} />
                    </FuturisticButton>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analysis Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <FuturisticButton
            variant="neon"
            size="xl"
            onClick={handleAnalyze}
            disabled={validLinks.length === 0 || isAnalyzing || hasStartedAnalysis}
            isLoading={isAnalyzing}
          >
            {isAnalyzing ? 'Analizando con IA...' : 
             hasStartedAnalysis ? 'Procesando...' :
             `Analizar ${validLinks.length} Link${validLinks.length !== 1 ? 's' : ''}`}
          </FuturisticButton>
          
          {validLinks.length === 0 && links.length > 0 && (
            <p className="text-red-400 text-sm mt-4">
              Agrega al menos un link válido para continuar
            </p>
          )}
          
          {validLinks.length === 0 && links.length === 0 && (
            <p className="text-gray-400 text-sm mt-4">
              Agrega links para comenzar el análisis inteligente
            </p>
          )}
        </motion.div>

        {/* Simple Progress Indicator */}
        {isAnalyzing && (
          <div className="mt-8 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-blue-400 font-medium mb-2">Analizando con IA...</p>
              <p className="text-gray-400 text-sm">
                Procesando {validLinks.length} link{validLinks.length !== 1 ? 's' : ''} • 
                Esto puede tomar unos {validLinks.length * 23} segundos
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LinkManager; 