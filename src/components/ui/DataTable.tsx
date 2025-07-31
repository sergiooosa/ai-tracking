'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Search, Filter, ChevronDown, ChevronUp, Phone, Calendar, User, DollarSign, FileText, CheckCircle, XCircle, Award, Target, Eye, BookOpen, Loader } from 'lucide-react';
import { LeadData } from '@/types';

function StatusBadge({ status }: { status: LeadData['status'] }) {
    const statusConfig = {
        'ofertada': { label: 'Ofertada', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', icon: <Target className="w-3 h-3" /> },
        'vendida': { label: 'Vendida', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: <Award className="w-3 h-3" /> },
    };
    const config = statusConfig[status];
    if (!config) return null;
    return <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>{config.icon}<span>{config.label}</span></span>;
}

function NotesCell({ notes, leadName }: { notes: string, leadName: string }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const summary = notes.length > 25 ? `${notes.substring(0, 25)}...` : notes;
    return (
        <>
            <div className="flex items-center justify-between group">
                <p className="text-gray-400 text-sm truncate pr-2" title={notes}>{summary || 'Sin notas'}</p>
                {notes.length > 25 && <motion.button onClick={() => setIsExpanded(true)} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-1.5 rounded-full hover:bg-blue-500/20" aria-label="Ver notas completas"><BookOpen className="w-4 h-4 text-blue-400" /></motion.button>}
            </div>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-card/80 backdrop-blur-lg flex items-center justify-center z-[100] p-4 sm:p-6 md:p-8" onClick={() => setIsExpanded(false)}>
                        <motion.div initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 30 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="relative w-full max-w-3xl bg-background border-2 border-border rounded-2xl shadow-2xl flex flex-col" style={{ maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
                            <div className="flex-shrink-0 p-6 border-b-2 border-border"><h3 className="text-xl font-bold text-foreground flex items-center"><FileText className="w-6 h-6 mr-3 text-blue-400"/>Análisis Detallado de Notas</h3><p className="text-sm text-muted-foreground mt-1">Lead: {leadName}</p></div>
                            <div className="flex-grow p-6 overflow-y-auto prose prose-invert prose-lg max-w-none prose-p:text-foreground/90 prose-headings:text-foreground"><pre className="whitespace-pre-wrap bg-transparent p-0 font-sans text-base leading-relaxed">{notes}</pre></div>
                            <div className="flex-shrink-0 p-4 bg-secondary/20 border-t-2 border-border text-right"><button onClick={() => setIsExpanded(false)} className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">Cerrar</button></div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function TableHeader({ title, sortKey, currentSort, onSort, icon, className }: { title: string; sortKey: keyof LeadData; currentSort: { key: keyof LeadData | null; direction: 'asc' | 'desc'; }; onSort: (key: keyof LeadData) => void; icon?: React.ReactNode; className: string; }) {
    const isActive = currentSort.key === sortKey;
    return (
        <th className={`px-6 py-3 text-left cursor-pointer hover:bg-secondary/30 transition-colors group select-none flex-shrink-0 ${className}`} onClick={() => onSort(sortKey)}>
            <div className="flex items-center space-x-2"><div className="w-4">{icon}</div><span>{title}</span><div className="flex flex-col"><ChevronUp className={`w-3 h-3 transition-colors ${isActive && currentSort.direction === 'asc' ? 'text-blue-400' : 'text-gray-600'}`} /><ChevronDown className={`w-3 h-3 -mt-1 transition-colors ${isActive && currentSort.direction === 'desc' ? 'text-blue-400' : 'text-gray-600'}`} /></div></div>
        </th>
    );
}

export default function DataTable({ leads, isLoading = false }: { leads: LeadData[], isLoading?: boolean }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof LeadData | null; direction: 'asc' | 'desc'; }>({ key: 'fechaReunion', direction: 'desc' });
    const [filterStatus, setFilterStatus] = useState<LeadData['status'] | 'all'>('all');
    
    const handleSort = (key: keyof LeadData) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));

    const filteredAndSortedLeads = useMemo(() => leads.filter(lead => 
        (searchTerm ? (lead.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || lead.telefono.includes(searchTerm) || lead.closerACargo.toLowerCase().includes(searchTerm.toLowerCase())) : true) &&
        (filterStatus === 'all' || lead.status === filterStatus)
    ).sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aVal = a[sortConfig.key], bVal = b[sortConfig.key];
        if(typeof aVal === 'string' && typeof bVal === 'string') return sortConfig.direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        if(typeof aVal === 'number' && typeof bVal === 'number') return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        if(typeof aVal === 'boolean' && typeof bVal === 'boolean') return sortConfig.direction === 'asc' ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
        return 0;
    }), [leads, searchTerm, filterStatus, sortConfig]);

    const parentRef = useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({ count: filteredAndSortedLeads.length, getScrollElement: () => parentRef.current, estimateSize: () => 65, overscan: 10 });
    
    const columns = [
        { key: 'nombre', header: 'Nombre', icon: <User />, className: 'w-[15%]', cell: lead => <span className="font-medium text-foreground">{lead.nombre}</span> },
        { key: 'telefono', header: 'Teléfono', icon: <Phone />, className: 'w-[10%]', cell: lead => <span className="font-mono text-muted-foreground">{lead.telefono}</span> },
        { key: 'fechaReunion', header: 'Fecha', icon: <Calendar />, className: 'w-[12%]', cell: lead => <span className="text-muted-foreground">{lead.fechaReunion}</span> },
        { key: 'closerACargo', header: 'Closer', icon: <User />, className: 'w-[10%]', cell: lead => <span className="text-blue-400 font-medium">{lead.closerACargo}</span> },
        { key: 'asistio', header: 'Asistió', icon: <CheckCircle />, className: 'w-[8%]', cell: lead => <span className={`inline-flex items-center space-x-1 ${lead.asistio ? 'text-green-400' : 'text-red-400'}`}>{lead.asistio ? <CheckCircle className="w-4 h-4"/> : <XCircle className="w-4 h-4"/>}<span>{lead.asistio ? 'Sí' : 'No'}</span></span> },
        { key: 'calificada', header: 'Calificada?', icon: <Eye />, className: 'w-[9%]', cell: lead => <span className={`inline-flex items-center space-x-1 ${lead.calificada ? 'text-green-400' : 'text-red-400'}`}>{lead.calificada ? <CheckCircle className="w-4 h-4"/> : <XCircle className="w-4 h-4"/>}<span>{lead.calificada ? 'Sí' : 'No'}</span></span> },
        { key: 'status', header: 'Estado', icon: <Target />, className: 'w-[10%]', cell: lead => <StatusBadge status={lead.status} /> },
        { key: 'cashCollected', header: 'Cash', icon: <DollarSign />, className: 'w-[8%]', cell: lead => <span className="font-mono text-green-400">${lead.cashCollected.toLocaleString()}</span> },
        { key: 'facturacion', header: 'Facturación', icon: <DollarSign />, className: 'w-[8%]', cell: lead => <span className="font-mono text-green-400">${lead.facturacion.toLocaleString()}</span> },
        { key: 'notas', header: 'Notas', icon: <FileText />, className: 'w-[10%]', cell: lead => <NotesCell notes={lead.notas} leadName={lead.nombre} /> },
    ];
    
    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col lg:flex-row gap-4 p-4 bg-secondary/30 rounded-xl border border-border">
                <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" /><input type="text" placeholder="Buscar por nombre, teléfono, closer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg" /></div>
                <div className="relative"><Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" /><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as LeadData['status'] | 'all')} className="pl-10 pr-8 py-2 bg-input border border-border rounded-lg appearance-none cursor-pointer"><option value="all">Todos los estados</option><option value="ofertada">Ofertada</option><option value="vendida">Vendida</option></select></div>
            </motion.div>
            <div ref={parentRef} className="bg-card rounded-xl border border-border overflow-auto relative" style={{ height: '70vh' }}>
                <table className="w-full" style={{ minWidth: '1300px' }}>
                    <thead className="sticky top-0 bg-card/80 backdrop-blur-sm z-10"><tr className="flex w-full">{columns.map(col => <TableHeader key={col.key} title={col.header} sortKey={col.key as keyof LeadData} currentSort={sortConfig} onSort={handleSort} icon={col.icon} className={col.className} />)}</tr></thead>
                    <tbody className="relative w-full" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
                        {isLoading ? <div className="absolute inset-0 flex items-center justify-center"><Loader className="w-8 h-8 animate-spin text-primary" /></div> : rowVirtualizer.getVirtualItems().length === 0 ? <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">No se encontraron leads</div> : rowVirtualizer.getVirtualItems().map(virtualRow => {
                            const lead = filteredAndSortedLeads[virtualRow.index];
                            return (
                                <tr key={virtualRow.key} ref={virtualRow.measureElement} className="absolute flex w-full items-center transition-colors hover:bg-secondary/20" style={{ transform: `translateY(${virtualRow.start}px)`, height: `${virtualRow.size}px` }}>
                                    {columns.map(column => <td key={column.key} className={`px-6 h-full flex items-center border-b border-border ${column.className}`}>{column.cell(lead)}</td>)}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
