'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Download, RefreshCw, AlertCircle } from 'lucide-react';
import { ReportResponse, DateRangeOption, ReportState } from '@/types';
import DateSelector from '@/components/ui/DateSelector';
import ReportMetricsComponent from '@/components/ui/ReportMetrics';
import DataTable from '@/components/ui/DataTable';
import { FuturisticButton } from '@/components/ui/FuturisticButton';

function LoadingStep({ step, isActive, isCompleted }: { step: string, isActive: boolean, isCompleted: boolean }) {
    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-blue-500/20' : isCompleted ? 'bg-green-500/20' : 'bg-secondary'}`}>
            <div className="relative">
                {isActive && <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />}
                {isCompleted && <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-green-900 rounded-full" /></div>}
                {!isActive && !isCompleted && <div className="w-4 h-4 bg-muted rounded-full" />}
            </div>
            <span className={`text-sm font-medium ${isActive ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-muted-foreground'}`}>{step}</span>
        </motion.div>
    );
}

export default function ReportDashboard() {
  const [reportState, setReportState] = useState<ReportState>('idle');
  const [reportData, setReportData] = useState<ReportResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = useMemo(() => ['Conectando...', 'Enviando parámetros...', 'Procesando datos...', 'Calculando métricas...', 'Analizando tendencias...', 'Organizando data...', 'Generando reporte...'], []);

  const simulateProgress = useCallback((stopSignal: { stopped: boolean }) => {
    let localProgress = 0, step = 0;
    const interval = setInterval(() => {
        if (stopSignal.stopped) { clearInterval(interval); return; }
        const fastPace = 3, slowPace = 27, fastSteps = 3;
        localProgress += (step < fastSteps) ? 100 / (fastPace * 10) : 100 / (slowPace * (loadingSteps.length - fastSteps) * 10);
        setProgress(Math.min(localProgress, 95));
        const newStep = Math.floor((localProgress / 100) * loadingSteps.length);
        if (newStep > step) setCurrentStep(newStep);
        step = newStep;
    }, 100);
  }, [loadingSteps.length]);

  const handleGenerateReport = useCallback(async () => {
    setReportState('loading');
    setError('');
    setProgress(0);
    setCurrentStep(0);
    const stopSignal = { stopped: false };
    simulateProgress(stopSignal);
    try {
      const response = await fetch('/api/generate-report', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ initialLoad: true }) });
      stopSignal.stopped = true;
      if (!response.ok) throw new Error(`Error del servidor: ${await response.text()}`);
      let finalProgress = progress > 95 ? 95 : progress;
      const finalInterval = setInterval(() => {
        finalProgress = Math.min(finalProgress + 5, 100);
        setProgress(finalProgress);
        if (finalProgress >= 100) {
          clearInterval(finalInterval);
          response.json().then(data => { setReportData(data); setReportState('success'); });
        }
      }, 50);
    } catch (err) {
      stopSignal.stopped = true;
      setError(err instanceof Error ? err.message : 'Error al generar el reporte');
      setReportState('error');
    }
  }, [progress, simulateProgress]);

  const handleDateChange = useCallback((newReportData: ReportResponse) => setReportData(newReportData), []);
  const handleReset = useCallback(() => { setReportState('idle'); setReportData(null); setError(''); }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {reportState === 'idle' && <motion.div key="initial" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl w-full text-center space-y-8"><div className="space-y-4"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="mx-auto w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-lg"><BarChart3 className="w-12 h-12 text-primary-foreground" /></motion.div><h1 className="text-5xl font-bold text-foreground">Generador de Reportes con IA</h1><p className="text-xl text-muted-foreground max-w-lg mx-auto">Presiona el botón para iniciar un análisis completo y en tiempo real de tus leads.</p></div><FuturisticButton onClick={handleGenerateReport} variant="primary" size="xl" className="min-w-72"><BarChart3 className="w-6 h-6 mr-3" />Generar Reporte</FuturisticButton></motion.div>}
        {reportState === 'loading' && <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center"><div className="max-w-lg w-full mx-6 space-y-8"><div className="text-center space-y-4"><motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center"><BarChart3 className="w-8 h-8 text-primary-foreground" /></motion.div><h2 className="text-2xl font-bold text-foreground">Generando Reporte</h2><p className="text-muted-foreground">Procesando datos...</p><div className="text-xs text-muted-foreground">🔗 Conectando con: conexiones.automatizacionesia.com</div></div><div className="space-y-2"><div className="flex justify-between text-sm"><span className="text-muted-foreground">Progreso</span><span className="text-blue-400">{Math.round(progress)}%</span></div><div className="h-2 bg-secondary rounded-full overflow-hidden"><motion.div className="h-full bg-primary" initial={{ width: '0%' }} animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }} /></div></div><div className="space-y-2">{loadingSteps.map((step, index) => <LoadingStep key={index} step={step} isActive={index === currentStep} isCompleted={index < currentStep} />)}</div></div></motion.div>}
        {reportState === 'success' && reportData && <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-7xl mx-auto space-y-8"><div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"><div><h1 className="text-3xl font-bold text-foreground">Reporte Generado</h1></div><div className="flex flex-col sm:flex-row gap-3"><DateSelector onDateChange={handleDateChange} disabled={reportState === 'loading'} /><FuturisticButton onClick={handleReset} variant="secondary"><RefreshCw className="w-4 h-4 mr-2" />Nuevo Reporte</FuturisticButton><FuturisticButton onClick={() => {}} variant="neon"><Download className="w-4 h-4 mr-2" />Exportar</FuturisticButton></div></div><ReportMetricsComponent metrics={reportData.metrics} /><DataTable leads={reportData.leads} isLoading={false}/></motion.div>}
        {reportState === 'error' && <motion.div key="error" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center space-y-6"><div className="w-16 h-16 bg-destructive/20 rounded-2xl flex items-center justify-center mx-auto"><AlertCircle className="w-8 h-8 text-destructive" /></div><div className="space-y-2"><h2 className="text-2xl font-bold text-foreground">Error al Generar Reporte</h2><p className="text-destructive">{error}</p></div><FuturisticButton onClick={handleReset} variant="secondary" size="lg"><RefreshCw className="w-5 h-5 mr-2" />Intentar de Nuevo</FuturisticButton></motion.div>}
      </AnimatePresence>
    </div>
  );
}
