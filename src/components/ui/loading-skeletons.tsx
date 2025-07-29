import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function MetricCardSkeleton() {
  return (
    <Card className="bg-card shadow-card border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
          <Skeleton className="h-12 w-12 rounded-2xl" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ChartSkeleton({ height = "h-80" }: { height?: string }) {
  return (
    <Card className="bg-card shadow-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className={`w-full ${height}`} />
      </CardContent>
    </Card>
  );
}

export function TableSkeleton() {
  return (
    <Card className="bg-card shadow-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Table Header */}
          <div className="flex items-center space-x-4 border-b border-border pb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 flex-1" />
            ))}
          </div>
          
          {/* Table Rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 py-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-4 flex-1" />
              ))}
            </div>
          ))}
          
          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Skeleton className="h-4 w-32" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}