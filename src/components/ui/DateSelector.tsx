'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';
import { DateRangeOption, ReportResponse } from '@/types';
import { format, subDays } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface DateSelectorProps {
  onDateChange: (newReportData: ReportResponse) => void;
  disabled?: boolean;
}

const DATE_OPTIONS: DateRangeOption[] = [
  { label: 'Hoy', value: 'today', days: 0 },
  { label: 'Ayer', value: 'yesterday', days: 1 },
  { label: 'Últimos 7 días', value: '7days', days: 7 },
  { label: 'Últimos 15 días', value: '15days', days: 15 },
  { label: 'Último mes', value: '1month', days: 30 },
  { label: 'Personalizado', value: 'custom', isCustom: true },
];

const TIME_ZONE = 'America/Bogota';

export default function DateSelector({ onDateChange, disabled = false }: DateSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<DateRangeOption>(DATE_OPTIONS[5]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customDate, setCustomDate] = useState('');

  const getColombianDate = (date: Date) => toZonedTime(date, TIME_ZONE);

  const handleDateSelection = useCallback(async (option: DateRangeOption, dateValue?: string) => {
    setIsLoading(true);
    setIsOpen(false);
    setSelectedOption(option);

    let targetDate = getColombianDate(new Date());
    if (option.days !== undefined && option.days > 0) targetDate = subDays(targetDate, option.days);
    else if (option.isCustom && dateValue) {
      const [year, month, day] = dateValue.split('-').map(Number);
      targetDate = getColombianDate(new Date(year, month - 1, day));
    }
    
    const formattedDate = format(targetDate, 'dd/MM/yyyy');

    try {
      // Call our own unified API route
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fecha: formattedDate, initialLoad: false }),
      });
      if (!response.ok) throw new Error('Error al cambiar la temporalidad');
      const newReportData = await response.json();
      onDateChange(newReportData);
    } catch (error) {
      console.error("Error en el selector de fecha:", error);
    } finally {
      setIsLoading(false);
    }
  }, [onDateChange]);
  
  useEffect(() => {
    const todayInColombia = getColombianDate(new Date());
    setCustomDate(format(todayInColombia, 'yyyy-MM-dd'));
  }, []);

  const getDateDisplay = () => {
    if (isLoading) return "Actualizando...";
    if (selectedOption.isCustom && customDate) {
      const displayDate = format(new Date(`${customDate}T00:00:00`), 'dd/MM/yyyy');
      return `Personalizado: ${displayDate}`;
    }
    return selectedOption.label;
  };
  
  return (
    <div className="relative w-full sm:w-64">
      <motion.button onClick={() => !disabled && setIsOpen(!isOpen)} disabled={disabled || isLoading} className="relative flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground transition-colors hover:border-primary disabled:opacity-50">
        <div className="flex items-center space-x-3"><Calendar className="w-5 h-5 text-muted-foreground" /><span className="font-medium text-sm">{getDateDisplay()}</span></div>
        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-2xl z-50 overflow-hidden">
            {DATE_OPTIONS.map((option) => (
              <button key={option.value} onClick={() => option.isCustom ? setSelectedOption(option) : handleDateSelection(option)} className="w-full px-4 py-2.5 text-left text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                {option.label}
              </button>
            ))}
            {selectedOption.isCustom && (
              <div className="p-2 border-t border-border">
                <input type="date" value={customDate} onChange={(e) => { setCustomDate(e.target.value); if(e.target.value) handleDateSelection(selectedOption, e.target.value); }} className="w-full bg-input rounded-md p-2 text-sm" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
