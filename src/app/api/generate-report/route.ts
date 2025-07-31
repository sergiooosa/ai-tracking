import { NextRequest, NextResponse } from 'next/server';
import { ReportResponse, LeadData, ReportMetrics } from '@/types';

// Reusable parser functions
const parseNumber = (value: any): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value.replace(/[^0-9.-]+/g,""));
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};
const parseBoolean = (value: any): boolean => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lowerCaseValue = value.toLowerCase();
    return lowerCaseValue === 'si' || lowerCaseValue === 'sí' || lowerCaseValue === 'true';
  }
  return false;
};

// Reusable translation logic
function transformWebhookData(webhookData: any[]): ReportResponse {
    if (!Array.isArray(webhookData) || webhookData.length === 0) {
        throw new Error('La respuesta del webhook no es un array válido o está vacío.');
    }
    const rawMetrics = webhookData[0];
    const metrics: ReportMetrics = {
        totalLeads: parseNumber(rawMetrics['totalLeads']),
        asistieron: parseNumber(rawMetrics['asistieron']),
        calificados: parseNumber(rawMetrics['calificados']),
        ofertados: parseNumber(rawMetrics['ofertados']),
        vendidos: parseNumber(rawMetrics['vendidos']),
        cashTotal: parseNumber(rawMetrics['cashTotal']),
        closeRate: String(rawMetrics['closeRate'] || '0%'),
        porcentajeCalificados: String(rawMetrics['calificadosRate'] || '0%'),
    };
    const leads: LeadData[] = webhookData.slice(1).map(rawLead => ({
        nombre: rawLead['Nombre'] || 'N/A',
        telefono: String(rawLead['Telefono'] || ''),
        fechaReunion: rawLead['Fecha de la reunión'] || '',
        closerACargo: rawLead['Closer a cargo'] || 'N/A',
        asistio: parseBoolean(rawLead['Asistió']),
        calificada: parseBoolean(rawLead['Calificada?']),
        status: String(rawLead['Ofertada/Vendida']).toLowerCase().includes('cerrada') ? 'vendida' : 'ofertada',
        cashCollected: parseNumber(rawLead['Cash collected']),
        facturacion: parseNumber(rawLead['Facturación']),
        notas: rawLead['Notas (dolores, deseos, problemas, objeciones de manera textual)'] || '',
    }));
    return { metrics, leads };
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const webhookUrl = body.initialLoad 
        ? 'https://conexiones.automatizacionesia.com/webhook/recibirparanalisisv2demo'
        : 'https://conexiones.automatizacionesia.com/webhook/cambiosdetemporalidadv2';
    
    const webhookPayload = body.initialLoad ? {} : { fecha: body.fecha };

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'GHL-Dashboard-v2' },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      throw new Error(`Webhook responded with status: ${webhookResponse.status} - ${errorText}`);
    }
    
    const webhookData: any[] = await webhookResponse.json();
    const processedData = transformWebhookData(webhookData);

    return NextResponse.json(processedData);

  } catch (error) {
    console.error('❌ Error en /api/generate-report:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}
