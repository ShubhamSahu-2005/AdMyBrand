import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Filter, MoreVertical, ArrowUpDown, Download } from 'lucide-react';
import { exportToPDF, exportToCSV, ExportData } from '@/lib/export-utils';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  title: string;
  filterable?: boolean;
  exportable?: boolean;
  pageSize?: number;
  loading?: boolean;
  onRowAction?: (action: string, row: any) => void;
}

export function DataTable({
  data,
  columns,
  title,
  filterable = true,
  exportable = true,
  pageSize = 10,
  loading = false,
  onRowAction
}: DataTableProps) {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAndSortedData = useMemo(() => {
    let filtered = [...data];

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(row => row.status === statusFilter);
    }

    // Sort
    if (sortField) {
      filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        
        if (sortDirection === 'asc') {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }

    return filtered;
  }, [data, sortField, sortDirection, statusFilter, columns]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedData.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExport = (format: 'pdf' | 'csv') => {
    const exportData: ExportData = {
      title,
      headers: columns.map(col => col.label),
      rows: filteredAndSortedData.map(row => 
        columns.map(col => {
          const value = row[col.key];
          // Handle special formatting for export
          if (typeof value === 'number' && col.key.includes('roi')) {
            return `${value}%`;
          }
          if (typeof value === 'number' && col.key.includes('budget')) {
            return `$${value.toLocaleString()}`;
          }
          return String(value);
        })
      )
    };

    if (format === 'pdf') {
      exportToPDF(exportData);
    } else {
      exportToCSV(exportData);
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      active: 'bg-success-light text-status-active border-success',
      paused: 'bg-warning-light text-status-paused border-warning',
      stopped: 'bg-red-50 text-status-stopped border-red-200',
    };
    
    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants] || variants.active}>
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Card className="bg-card shadow-card border-border/50 animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/4"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: pageSize }).map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card shadow-card border-border/50 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">

            
            {filterable && (
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="stopped">Stopped</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            {exportable && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleExport('csv')}>
                    Export CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('pdf')}>
                    Export PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full px-4 sm:px-0">
            <thead>
              <tr className="border-b border-border">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`text-left py-2 px-2 sm:px-4 font-medium text-muted-foreground ${
                      column.sortable ? 'cursor-pointer hover:text-foreground transition-colors' : ''
                    }`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <span className="text-xs sm:text-sm">{column.label}</span>
                      {column.sortable && (
                        <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </div>
                  </th>
                ))}
                <th className="text-right py-2 px-2 sm:px-4 font-medium text-muted-foreground">
                  <span className="text-xs sm:text-sm">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-border hover:bg-muted/50 transition-colors duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="py-2 sm:py-3 px-2 sm:px-4">
                      {column.render ? (
                        column.render(row[column.key], row)
                      ) : column.key === 'status' ? (
                        <StatusBadge status={row[column.key]} />
                      ) : (
                        <span className="text-foreground text-xs sm:text-sm">{row[column.key]}</span>
                      )}
                    </td>
                  ))}
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover-scale h-8 w-8 sm:h-10 sm:w-10">
                          <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onRowAction?.('view', row)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onRowAction?.('edit', row)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onRowAction?.('duplicate', row)}>
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onRowAction?.('delete', row)}
                          className="text-destructive"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mt-6 pt-4 border-t border-border">
          <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            Showing {Math.min((currentPage - 1) * pageSize + 1, filteredAndSortedData.length)} to{' '}
            {Math.min(currentPage * pageSize, filteredAndSortedData.length)} of{' '}
            {filteredAndSortedData.length} results
          </div>
          <div className="flex items-center justify-center sm:justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="hover-scale text-xs sm:text-sm px-3 sm:px-4"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="hover-scale text-xs sm:text-sm px-3 sm:px-4"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}