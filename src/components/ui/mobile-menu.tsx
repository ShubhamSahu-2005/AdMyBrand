import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Bell, Moon, Sun, Calendar, Filter, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';

interface MobileMenuProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  dateRange: { from: Date; to: Date };
  setDateRange: (range: { from: Date; to: Date }) => void;
  timeframe: string;
  setTimeframe: (value: string) => void;
  isRealTimeEnabled: boolean;
  setIsRealTimeEnabled: (value: boolean) => void;
}

export function MobileMenu({
  theme,
  toggleTheme,
  searchValue,
  setSearchValue,
  dateRange,
  setDateRange,
  timeframe,
  setTimeframe,
  isRealTimeEnabled,
  setIsRealTimeEnabled
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Hamburger Button with animation */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="hover-scale"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: 'none', border: 'none', padding: 0 }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.div>
      </motion.button>

      {/* Sidebar Overlay and Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            {/* Sidebar */}
            <motion.aside
              className="fixed top-0 left-0 z-50 h-full w-80 max-w-full shadow-2xl flex flex-col bg-background dark:bg-[hsl(var(--nav-background))] border-r border-border"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              role="dialog"
              aria-modal="true"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold tracking-tight">Menu</h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="hover-scale"
                  aria-label="Close menu"
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              {/* Menu Content */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Real-time Toggle */}
                <motion.div whileHover={{ scale: 1.03 }} className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Real-time Updates</label>
                  <Button
                    variant={isRealTimeEnabled ? "default" : "outline"}
                    onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
                    className="w-full justify-start"
                  >
                    <RefreshCw className={cn("h-4 w-4 mr-2", isRealTimeEnabled && "animate-spin")}/>
                    {isRealTimeEnabled ? "Disable" : "Enable"} Real-time
                  </Button>
                  {isRealTimeEnabled && (
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Live data updates every 5 seconds</span>
                    </div>
                  )}
                </motion.div>
                {/* Date Range Picker */}
                <motion.div whileHover={{ scale: 1.03 }} className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Date Range</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
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
                        numberOfMonths={1}
                        className="p-3"
                      />
                    </PopoverContent>
                  </Popover>
                </motion.div>
                {/* Timeframe Selector */}
                <motion.div whileHover={{ scale: 1.03 }} className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Timeframe</label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                      <SelectItem value="1y">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
                {/* Theme Toggle */}
                <motion.div whileHover={{ scale: 1.03 }} className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Theme</label>
                  <Button
                    variant="outline"
                    onClick={toggleTheme}
                    className="w-full justify-start"
                  >
                    {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                    {theme === 'light' ? 'Dark' : 'Light'} Mode
                  </Button>
                </motion.div>
                {/* Notifications */}
                <motion.div whileHover={{ scale: 1.03 }} className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Notifications</label>
                  <Button variant="outline" className="w-full justify-start relative">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse"></span>
                  </Button>
                </motion.div>
                {/* User Profile */}
                <motion.div whileHover={{ scale: 1.03 }} className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Profile</label>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">Administrator</p>
                    </div>
                  </div>
                </motion.div>
              </nav>
              {/* Footer */}
              <div className="p-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  Close Menu
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 