// 📊 NEW REPORT SYSTEM TYPES
export interface ReportMetrics {
  totalLeads: number;
  asistieron: number;
  calificados: number;
  ofertados: number;
  vendidos: number;
  cashTotal: number;
  closeRate: string;
  porcentajeCalificados: string;
}

export interface LeadData {
  nombre: string;
  telefono: string;
  fechaReunion: string;
  closerACargo: string;
  asistio: boolean;
  calificada: boolean; // Campo booleano separado
  status: 'ofertada' | 'vendida'; // Estado de la venta simplificado
  cashCollected: number;
  facturacion: number;
  notas: string;
}

export interface ReportResponse {
  metrics: ReportMetrics;
  leads: LeadData[];
}

export interface DateRangeOption {
  label: string;
  value: string;
  days?: number;
  isCustom?: boolean;
}

export type ReportState = 'idle' | 'loading' | 'success' | 'error';

// 🔥 Legacy Analysis Response Types (kept for reference, can be removed if not needed)
export interface CallMetrics {
  llamadas_tomadas: number;
  llamadas_ofertadas: number;
  llamadas_cerradas: number;
  close_rate: string;
  cash_collected: number;
  facturacion: number;
}
