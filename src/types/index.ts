// 🎯 Core Application Types

export interface LinkItem {
  id: string;
  url: string;
  domain?: string;
  title?: string;
  closer: string;
  isValid: boolean;
  createdAt: Date;
}

export interface ProcessState {
  isAnalyzing: boolean;
  currentStep: string;
  progress: number;
  completedSteps: string[];
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  metric?: {
    value: number;
    suffix: string;
  };
}

export interface AnimationVariants {
  initial: any;
  animate: any;
  exit?: any;
  transition?: any;
}

export type ButtonVariant = 'primary' | 'secondary' | 'neon' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type ThemeColor = 'blue' | 'purple' | 'neon' | 'dark' | 'cyan' | 'magenta';

// 🔥 Analysis Response Types
export interface CloserData {
  name: string;
  totalProspectos: number;
  totalCierres: number;
  closeRate: number;
}

export interface AnalysisResume {
  closers: CloserData[];
  totalCashCollected: number;
  totalFacturacion: number;
}

export interface AnalysisResponse {
  resumen: AnalysisResume;
  resumenTexto: string;
  output: string;
}

export type AnalysisState = 'idle' | 'loading' | 'success' | 'error'; 