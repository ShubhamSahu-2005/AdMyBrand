import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';

export interface ExportData {
  headers: string[];
  rows: any[][];
  title: string;
}

export function exportToPDF(data: ExportData) {
  const pdf = new jsPDF();
  
  // Add title
  pdf.setFontSize(20);
  pdf.text(data.title, 14, 22);
  
  // Add timestamp
  pdf.setFontSize(10);
  pdf.text(`Generated on: ${new Date().toLocaleString()}`, 14, 32);
  
  // Add table
  autoTable(pdf, {
    head: [data.headers],
    body: data.rows,
    startY: 40,
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [79, 70, 229], // Primary color
      textColor: 255,
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251],
    },
  });
  
  pdf.save(`${data.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
}

export function exportToCSV(data: ExportData) {
  const csvData = [data.headers, ...data.rows];
  const csv = Papa.unparse(csvData);
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${data.title.toLowerCase().replace(/\s+/g, '-')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}