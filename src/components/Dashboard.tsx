import { useState } from 'react';
import { Search, Bell, MoreVertical, TrendingUp, Users, DollarSign, Target, BarChart3, Calendar, CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import logoImage from '@/assets/admybrand-logo.png';

// Sample data for charts
const revenueData = [
  { date: 'Jan 1', revenue: 45000, spend: 15000 },
  { date: 'Jan 5', revenue: 52000, spend: 17000 },
  { date: 'Jan 10', revenue: 48000, spend: 16000 },
  { date: 'Jan 15', revenue: 61000, spend: 19000 },
  { date: 'Jan 20', revenue: 55000, spend: 18000 },
  { date: 'Jan 25', revenue: 67000, spend: 21000 },
  { date: 'Jan 30', revenue: 72000, spend: 23000 },
];

const trafficData = [
  { name: 'Organic Search', value: 45, color: 'hsl(var(--chart-organic))' },
  { name: 'Paid Social', value: 35, color: 'hsl(var(--chart-paid))' },
  { name: 'Referrals', value: 20, color: 'hsl(var(--chart-referral))' },
];

const campaigns = [
  { id: 1, name: 'Summer Sale 2024', status: 'Active', budget: '$15,000', roi: '+24.5%' },
  { id: 2, name: 'Brand Awareness Q1', status: 'Active', budget: '$8,500', roi: '+18.2%' },
  { id: 3, name: 'Product Launch', status: 'Paused', budget: '$12,000', roi: '+12.8%' },
  { id: 4, name: 'Holiday Campaign', status: 'Active', budget: '$22,000', roi: '+31.4%' },
];

const tasks = [
  { id: 1, title: 'Set up tracking pixels', completed: true },
  { id: 2, title: 'Design ad creatives', completed: true },
  { id: 3, title: 'Configure audience targeting', completed: true },
  { id: 4, title: 'Launch initial campaigns', completed: false },
];

export function Dashboard() {
  const [searchValue, setSearchValue] = useState('');

  const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      Active: 'bg-success-light text-status-active border-success',
      Paused: 'bg-warning-light text-status-paused border-warning',
      Stopped: 'bg-red-50 text-status-stopped border-red-200',
    };
    
    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants] || variants.Active}>
        {status}
      </Badge>
    );
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-glass backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={logoImage} alt="ADmyBRAND" className="h-8" />
              <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 w-64 bg-card border-border/50"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
              </Button>
              
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card shadow-card border-border/50 hover:shadow-lifted transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">$124,582</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-card border-border/50 hover:shadow-lifted transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">New Conversions</p>
                  <p className="text-2xl font-bold text-foreground">3,102</p>
                </div>
                <div className="h-12 w-12 bg-success/10 rounded-2xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-card border-border/50 hover:shadow-lifted transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">Active Users</p>
                  <p className="text-2xl font-bold text-foreground">18,740</p>
                </div>
                <div className="h-12 w-12 bg-chart-paid/10 rounded-2xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-chart-paid" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-card border-border/50 hover:shadow-lifted transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">Growth</p>
                  <div className="flex items-center space-x-1">
                    <p className="text-2xl font-bold text-success">+15.2%</p>
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                </div>
                <div className="h-12 w-12 bg-success/10 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart and Secondary Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <Card className="lg:col-span-2 bg-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Revenue & Spend (Last 30 Days)</span>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-chart-revenue rounded-full"></div>
                    <span className="text-muted-foreground">Revenue</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-chart-spend rounded-full"></div>
                    <span className="text-muted-foreground">Spend</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-revenue))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-revenue))" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--chart-revenue))" 
                      strokeWidth={3}
                      fill="url(#revenueGradient)"
                      dot={false}
                      activeDot={{ r: 6, fill: "hsl(var(--chart-revenue))" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="spend" 
                      stroke="hsl(var(--chart-spend))" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: "hsl(var(--chart-spend))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Secondary Info */}
          <div className="space-y-6">
            {/* Campaign Launch Checklist */}
            <Card className="bg-card shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Campaign Launch Checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{Math.round(progressPercentage)}% complete</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center space-x-3">
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span className={`text-sm ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Traffic Sources Donut Chart */}
            <Card className="bg-card shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {trafficData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Table */}
        <Card className="bg-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Campaign Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Budget</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">ROI</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4 font-medium text-foreground">{campaign.name}</td>
                      <td className="py-4 px-4">
                        <StatusBadge status={campaign.status} />
                      </td>
                      <td className="py-4 px-4 text-foreground">{campaign.budget}</td>
                      <td className="py-4 px-4 text-success font-medium">{campaign.roi}</td>
                      <td className="py-4 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Showing 4 of 12 campaigns
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}