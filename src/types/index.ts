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
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

export type ButtonVariant = 'primary' | 'secondary' | 'neon' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type ThemeColor = 'blue' | 'purple' | 'neon' | 'dark' | 'cyan' | 'magenta';

// 🔥 Analysis Response Types
export interface CallMetrics {
  llamadas_tomadas: number;
  llamadas_ofertadas: number;
  llamadas_cerradas: number;
  close_rate: string;
  cash_collected: number;
  facturacion: number;
}

export interface AnalysisOutput {
  output: string;
}

export interface NewAnalysisResponse {
  metrics: CallMetrics;
  analysis: AnalysisOutput;
}

export type AnalysisState = 'idle' | 'loading' | 'success' | 'error'; 