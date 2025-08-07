'use client';

import React, { useState, useRef } from 'react';
import { Download, FileImage, FileText, Calendar, Settings } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Post, ExportOptions } from '@/types';
import { storage } from '@/lib/storage';
import { SOCIAL_NETWORKS, POST_OBJECTIVES } from '@/lib/constants';
import { dateUtils } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ExportCalendarProps {
  className?: string;
}

const ExportCalendar: React.FC<ExportCalendarProps> = ({ className }) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    dateRange: {
      start: new Date().toISOString().split('T')[0],
      end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    includeDetails: true,
    orientation: 'landscape'
  });
  
  const [isExporting, setIsExporting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const posts = storage.getPostsByDateRange(
        exportOptions.dateRange.start,
        exportOptions.dateRange.end
      );

      if (exportOptions.format === 'pdf') {
        await exportToPDF(posts);
      } else {
        await exportToImage(posts);
      }
    } catch (error) {
      console.error('Erro ao exportar:', error);
      alert('Erro ao exportar calendário');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDF = async (posts: Post[]) => {
    // In a real app, you would use jsPDF here
    // For now, we'll use the browser's print functionality
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = generatePrintableHTML(posts);
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const exportToImage = async (posts: Post[]) => {
    // In a real app, you would use html2canvas here
    // For now, we'll simulate the process
    alert('Funcionalidade de exportação de imagem será implementada em breve!');
  };

  const generatePrintableHTML = (posts: Post[]): string => {
    const startDate = new Date(exportOptions.dateRange.start);
    const endDate = new Date(exportOptions.dateRange.end);
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Calendário de Conteúdo - ConteúdoMestre</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #3b82f6;
              padding-bottom: 20px;
            }
            .header h1 {
              color: #3b82f6;
              margin: 0;
            }
            .date-range {
              color: #666;
              margin-top: 10px;
            }
            .posts-grid {
              display: grid;
              gap: 20px;
              margin-top: 30px;
            }
            .post-card {
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 15px;
              page-break-inside: avoid;
            }
            .post-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
            }
            .post-title {
              font-weight: bold;
              font-size: 1.1em;
              color: #1f2937;
            }
            .post-date {
              color: #6b7280;
              font-size: 0.9em;
            }
            .post-meta {
              display: flex;
              gap: 15px;
              margin: 10px 0;
              font-size: 0.9em;
            }
            .social-network {
              background: #eff6ff;
              color: #2563eb;
              padding: 3px 8px;
              border-radius: 4px;
            }
            .objective {
              background: #f0f9ff;
              color: #0c4a6e;
              padding: 3px 8px;
              border-radius: 4px;
            }
            .post-content {
              margin-top: 10px;
              color: #4b5563;
            }
            .hashtags {
              margin-top: 10px;
              font-size: 0.8em;
              color: #3b82f6;
            }
            @media print {
              body { margin: 0; }
              .post-card { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📅 Calendário de Conteúdo</h1>
            <p>ConteúdoMestre - Planejamento de Redes Sociais</p>
            <div class="date-range">
              Período: ${dateUtils.formatDate(startDate)} - ${dateUtils.formatDate(endDate)}
            </div>
            <div class="date-range">
              Total de posts: ${posts.length}
            </div>
          </div>
          
          <div class="posts-grid">
            ${posts.map(post => `
              <div class="post-card">
                <div class="post-header">
                  <div class="post-title">${post.title}</div>
                  <div class="post-date">${dateUtils.formatDate(post.date)}</div>
                </div>
                
                <div class="post-meta">
                  <span class="social-network">
                    ${SOCIAL_NETWORKS[post.socialNetwork]?.name || post.socialNetwork}
                  </span>
                  <span class="objective">
                    ${POST_OBJECTIVES[post.objective]?.name || post.objective}
                  </span>
                </div>
                
                ${exportOptions.includeDetails && post.description ? `
                  <div class="post-content">
                    <strong>Descrição:</strong><br>
                    ${post.description}
                  </div>
                ` : ''}
                
                ${exportOptions.includeDetails && post.callToAction ? `
                  <div class="post-content">
                    <strong>Call to Action:</strong> ${post.callToAction}
                  </div>
                ` : ''}
                
                ${exportOptions.includeDetails && post.hashtags && post.hashtags.length > 0 ? `
                  <div class="hashtags">
                    ${post.hashtags.join(' ')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          
          <div style="margin-top: 40px; text-align: center; color: #9ca3af; font-size: 0.8em;">
            Gerado por ConteúdoMestre em ${new Date().toLocaleDateString('pt-BR')}
          </div>
        </body>
      </html>
    `;
  };

  const updateExportOption = <K extends keyof ExportOptions>(
    key: K,
    value: ExportOptions[K]
  ) => {
    setExportOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const posts = storage.getPostsByDateRange(
    exportOptions.dateRange.start,
    exportOptions.dateRange.end
  );

  return (
    <Card variant="glass" className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="h-5 w-5 text-green-400" />
          <span>Exportar Calendário</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Export Format */}
        <div>
          <label className="text-sm font-medium mb-3 block">Formato de Exportação</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => updateExportOption('format', 'pdf')}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-lg border transition-colors",
                exportOptions.format === 'pdf'
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "border-slate-600 hover:border-slate-500"
              )}
            >
              <FileText className="h-5 w-5" />
              <span>PDF</span>
            </button>
            
            <button
              onClick={() => updateExportOption('format', 'image')}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-lg border transition-colors",
                exportOptions.format === 'image'
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "border-slate-600 hover:border-slate-500"
              )}
            >
              <FileImage className="h-5 w-5" />
              <span>Imagem</span>
            </button>
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="text-sm font-medium mb-3 block">Período</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Data Inicial"
              type="date"
              value={exportOptions.dateRange.start}
              onChange={(e) => updateExportOption('dateRange', {
                ...exportOptions.dateRange,
                start: e.target.value
              })}
              icon={<Calendar className="h-4 w-4" />}
            />
            
            <Input
              label="Data Final"
              type="date"
              value={exportOptions.dateRange.end}
              onChange={(e) => updateExportOption('dateRange', {
                ...exportOptions.dateRange,
                end: e.target.value
              })}
              icon={<Calendar className="h-4 w-4" />}
            />
          </div>
        </div>

        {/* Options */}
        <div>
          <label className="text-sm font-medium mb-3 block">Opções</label>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={exportOptions.includeDetails}
                onChange={(e) => updateExportOption('includeDetails', e.target.checked)}
                className="rounded border-slate-600 bg-slate-900 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Incluir detalhes dos posts (descrição, CTA, hashtags)</span>
            </label>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Orientação</label>
              <select
                value={exportOptions.orientation}
                onChange={(e) => updateExportOption('orientation', e.target.value as 'portrait' | 'landscape')}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="landscape">Paisagem</option>
                <option value="portrait">Retrato</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preview Info */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Settings className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-medium">Prévia da Exportação</span>
          </div>
          <div className="text-sm text-slate-400 space-y-1">
            <p>• <strong>{posts.length}</strong> posts encontrados no período selecionado</p>
            <p>• Formato: <strong>{exportOptions.format === 'pdf' ? 'PDF' : 'Imagem'}</strong></p>
            <p>• Período: <strong>{dateUtils.formatDate(exportOptions.dateRange.start)} - {dateUtils.formatDate(exportOptions.dateRange.end)}</strong></p>
            <p>• Detalhes: <strong>{exportOptions.includeDetails ? 'Incluídos' : 'Não incluídos'}</strong></p>
          </div>
        </div>

        {/* Export Button */}
        <Button
          variant="primary"
          onClick={handleExport}
          isLoading={isExporting}
          disabled={posts.length === 0}
          className="w-full"
        >
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? 'Exportando...' : `Exportar ${posts.length} Posts`}
        </Button>

        {posts.length === 0 && (
          <div className="text-center py-6 text-slate-400">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum post encontrado no período selecionado.</p>
            <p className="text-sm mt-1">Ajuste as datas ou crie alguns posts primeiro!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExportCalendar;
