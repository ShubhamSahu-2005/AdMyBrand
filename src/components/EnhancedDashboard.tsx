import { useState, useEffect } from 'react';
import { Moon, Sun, Search, Bell, Download, Calendar, TrendingUp, Users, DollarSign, Target, BarChart3, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Chart } from '@/components/ui/custom-chart';
import { DataTable } from '@/components/ui/data-table';
import { MetricCardSkeleton, ChartSkeleton, TableSkeleton } from '@/components/ui/loading-skeletons';
import { MobileMenu } from '@/components/ui/mobile-menu';
import { useTheme } from '@/hooks/use-theme';
import { mockData, DashboardData } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { format, subDays } from 'date-fns';
import logoImage from '@/assets/admybrand-logo.png';
import webLogo from '@/assets/web_logo.svg';

export function EnhancedDashboard() {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData[]>(mockData);
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [searchValue, setSearchValue] = useState('');
  const [timeframe, setTimeframe] = useState('30d');
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Real-time updates simulation
  useEffect(() => {
    if (!isRealTimeEnabled) return;
    
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        const latestEntry = { ...newData[newData.length - 1] };
        
        // Simulate real-time metric updates
        latestEntry.revenue += Math.round((Math.random() - 0.5) * 1000);
        latestEntry.users += Math.round((Math.random() - 0.5) * 10);
        latestEntry.conversions += Math.round(Math.random() * 2);
        latestEntry.growth = ((Math.random() - 0.3) * 50);
        
        newData[newData.length - 1] = latestEntry;
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isRealTimeEnabled]);

  const currentData = data[data.length - 1];
  const previousData = data[data.length - 2];

  // Calculate metrics
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalUsers = data.reduce((sum, item) => sum + item.users, 0);
  const totalConversions = data.reduce((sum, item) => sum + item.conversions, 0);
  const avgGrowth = data.reduce((sum, item) => sum + item.growth, 0) / data.length;

  // Prepare chart data
  const lineChartData = data.slice(-14).map(item => ({
    date: format(new Date(item.date), 'MMM dd'),
    revenue: item.revenue,
    spend: item.spend,
  }));

  const barChartData = data.slice(-7).map(item => ({
    date: format(new Date(item.date), 'dd'),
    conversions: item.conversions,
    sessions: item.sessions,
  }));

  const pieChartData = currentData ? [
    { name: 'Organic Search', value: currentData.trafficSources.organic, color: 'hsl(var(--chart-organic))' },
    { name: 'Paid Social', value: currentData.trafficSources.paid, color: 'hsl(var(--chart-paid))' },
    { name: 'Social Media', value: currentData.trafficSources.social, color: 'hsl(var(--chart-referral))' },
    { name: 'Direct Traffic', value: currentData.trafficSources.direct, color: 'hsl(var(--chart-revenue))' },
    { name: 'Referrals', value: currentData.trafficSources.referral, color: 'hsl(var(--chart-spend))' },
  ] : [];

  // Table columns
  const campaignColumns = [
    { key: 'name', label: 'Campaign Name', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { 
      key: 'budget', 
      label: 'Budget', 
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { 
      key: 'spent', 
      label: 'Spent', 
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { 
      key: 'roi', 
      label: 'ROI', 
      sortable: true,
      render: (value: number) => (
        <span className={value > 0 ? 'text-success' : 'text-destructive'}>
          {value > 0 ? '+' : ''}{value.toFixed(1)}%
        </span>
      )
    },
  ];

  const MetricCard = ({ title, value, icon: Icon, change, trend, loading }: {
    title: string;
    value: string | number;
    icon: any;
    change?: string;
    trend?: 'up' | 'down';
    loading?: boolean;
  }) => {
    if (loading) return <MetricCardSkeleton />;

    return (
      <Card className="bg-card shadow-card border-border/50 hover:shadow-lifted transition-all duration-200 animate-fade-in hover-scale">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">{title}</p>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold text-foreground">{value}</p>
                {change && (
                  <span className={cn(
                    "text-sm font-medium flex items-center",
                    trend === 'up' ? 'text-success' : 'text-destructive'
                  )}>
                    <TrendingUp className={cn("h-3 w-3 mr-1", trend === 'down' && 'rotate-180')} />
                    {change}
                  </span>
                )}
              </div>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-glass backdrop-blur-sm border-b border-border/50 transition-colors duration-300 dark:bg-[hsl(var(--nav-background))]">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <img src={webLogo} alt="AdMyBrand" className="h-6 sm:h-8 md:h-10" />
              {isRealTimeEnabled && (
                <Badge variant="success" className="animate-pulse hidden sm:flex">
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  Live
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              {/* Date Range Picker - Hidden on mobile and tablet */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="hover-scale hidden lg:flex">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(dateRange.from, 'MMM dd')} - {format(dateRange.to, 'MMM dd')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="range"
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        setDateRange({ from: range.from, to: range.to });
                      }
                    }}
                    numberOfMonths={2}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              {/* Timeframe Selector - Hidden on mobile and tablet */}
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-32 hidden xl:flex">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>

              {/* Real-time Toggle - Hidden on mobile */}
              <Button
                variant={isRealTimeEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
                className="hover-scale hidden md:flex"
              >
                <RefreshCw className={cn("h-4 w-4 mr-2", isRealTimeEnabled && "animate-spin")} />
                Real-time
              </Button>
              
              {/* Theme Toggle - Hidden on mobile */}
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover-scale hidden sm:flex">
                {theme === 'light' ? <Moon className="h-4 w-4 sm:h-5 sm:w-5" /> : <Sun className="h-4 w-4 sm:h-5 sm:w-5" />}
              </Button>

              {/* Notifications - Hidden on mobile */}
              <Button variant="ghost" size="icon" className="relative hover-scale hidden sm:flex">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse"></span>
              </Button>
              
              {/* User Avatar - Hidden on mobile */}
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8 md:h-8 md:w-8 hover-scale hidden sm:flex">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">JD</AvatarFallback>
              </Avatar>

              {/* Mobile Menu */}
              <MobileMenu
                theme={theme}
                toggleTheme={toggleTheme}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                dateRange={dateRange}
                setDateRange={setDateRange}
                timeframe={timeframe}
                setTimeframe={setTimeframe}
                isRealTimeEnabled={isRealTimeEnabled}
                setIsRealTimeEnabled={setIsRealTimeEnabled}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <MetricCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            change="+12.5%"
            trend="up"
            loading={loading}
          />
          <MetricCard
            title="Total Users"
            value={totalUsers.toLocaleString()}
            icon={Users}
            change="+8.2%"
            trend="up"
            loading={loading}
          />
          <MetricCard
            title="Conversions"
            value={totalConversions.toLocaleString()}
            icon={Target}
            change="+15.1%"
            trend="up"
            loading={loading}
          />
          <MetricCard
            title="Avg Growth"
            value={`${avgGrowth.toFixed(1)}%`}
            icon={BarChart3}
            change={avgGrowth > 0 ? `+${avgGrowth.toFixed(1)}%` : `${avgGrowth.toFixed(1)}%`}
            trend={avgGrowth > 0 ? "up" : "down"}
            loading={loading}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {/* Line Chart */}
          {loading ? (
            <ChartSkeleton />
          ) : (
            <Chart
              data={lineChartData}
              title="Revenue & Spend Trend"
              type="line"
              height={320}
              dataKeys={['revenue', 'spend']}
              colors={['hsl(var(--chart-revenue))', 'hsl(var(--chart-spend))']}
            />
          )}

          {/* Bar Chart */}
          {loading ? (
            <ChartSkeleton />
          ) : (
            <Chart
              data={barChartData}
              title="Conversions vs Sessions"
              type="bar"
              height={320}
              dataKeys={['conversions', 'sessions']}
              colors={['hsl(var(--chart-organic))', 'hsl(var(--chart-paid))']}
            />
          )}
        </div>

        {/* Pie Chart and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {/* Traffic Sources Pie Chart */}
          {loading ? (
            <ChartSkeleton height="h-64" />
          ) : (
            <Chart
              data={pieChartData}
              title="Traffic Sources"
              type="pie"
              height={280}
            />
          )}

          {/* Top Pages */}
          <Card className="lg:col-span-2 bg-card shadow-card border-border/50 animate-fade-in">
            <CardHeader>
              <CardTitle>Top Performing Pages</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 animate-pulse">
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-32"></div>
                        <div className="h-3 bg-muted rounded w-20"></div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="h-4 bg-muted rounded w-16"></div>
                        <div className="h-3 bg-muted rounded w-12"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {currentData?.topPages.map((page, index) => (
                    <div
                      key={page.page}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div>
                        <p className="font-medium text-foreground">{page.page}</p>
                        <p className="text-sm text-muted-foreground">
                          {page.uniqueViews} unique views • {page.bounceRate}% bounce rate
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{page.views.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">views</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Campaigns Data Table */}
        {loading ? (
          <TableSkeleton />
        ) : (
          <DataTable
            data={currentData?.campaigns || []}
            columns={campaignColumns}
            title="Campaign Performance"
            filterable={true}
            exportable={true}
            onRowAction={(action, row) => {
              console.log(`Action: ${action}`, row);
            }}
          />
        )}
      </div>
    </div>
  );
}