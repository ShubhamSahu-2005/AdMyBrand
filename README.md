# AdMyBrand - Marketing Analytics Dashboard

A modern, responsive marketing analytics dashboard built with React, TypeScript, and shadcn/ui. This application provides comprehensive insights into marketing campaigns, user behavior, and business metrics with real-time data visualization.

## 🚀 Features

### 📊 **Analytics Dashboard**
- **KPI Cards**: Revenue, Users, Conversions, and Growth metrics
- **Interactive Charts**: Line charts, bar charts, and pie charts using Recharts
- **Real-time Updates**: Live data simulation with configurable refresh rates
- **Responsive Design**: Optimized for mobile, tablet, and desktop screens

### 🎯 **Campaign Management**
- **Campaign Performance Table**: Sortable and filterable data table
- **Status Tracking**: Active, Paused, and Stopped campaign states
- **ROI Analysis**: Budget, spent amounts, and return on investment metrics
- **Export Functionality**: PDF and CSV export capabilities

### 🎨 **User Interface**
- **Modern Design**: Clean, professional interface with dark/light theme support
- **Responsive Navigation**: Mobile-optimized header with essential controls
- **Loading States**: Skeleton loaders and smooth animations
- **Toast Notifications**: User feedback and status updates

### 📱 **Mobile-First Design**
- **Responsive Layout**: Adapts seamlessly across all device sizes
- **Touch-Friendly**: Optimized for mobile interactions
- **Compact Navigation**: Streamlined mobile header with essential controls
- **Chart Responsiveness**: Charts automatically resize for mobile viewing

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router DOM** for navigation

### **UI Components & Styling**
- **shadcn/ui** - Modern component library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library

### **Data Visualization**
- **Recharts** - Responsive chart library
- **Custom Chart Components** - Tailored for analytics needs

### **State Management & Data**
- **React Query** - Server state management
- **Mock Data System** - Realistic analytics data simulation
- **Date-fns** - Date manipulation utilities

### **Development Tools**
- **ESLint** - Code linting
- **TypeScript** - Type safety
- **PostCSS & Autoprefixer** - CSS processing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd AdMyBrand
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run preview      # Preview production build

# Building
npm run build        # Build for production
npm run build:dev    # Build for development

# Code Quality
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── EnhancedDashboard.tsx    # Main dashboard component
│   └── ui/                      # shadcn/ui components
│       ├── custom-chart.tsx     # Chart components
│       ├── data-table.tsx       # Sortable data table
│       ├── loading-skeletons.tsx # Loading states
│       └── ...                  # Other UI components
├── lib/
│   ├── mock-data.ts            # Analytics data simulation
│   ├── utils.ts                # Utility functions
│   └── export-utils.ts         # PDF/CSV export
├── hooks/
│   ├── use-theme.ts            # Theme management
│   └── use-mobile.tsx          # Mobile detection
├── pages/
│   ├── Index.tsx               # Main dashboard page
│   └── NotFound.tsx            # 404 page
└── assets/
    ├── admybrand-logo.png      # Brand assets
    └── web_logo.svg
```

## 🎨 Key Components

### **EnhancedDashboard**
The main dashboard component featuring:
- Responsive header with navigation controls
- KPI metric cards with loading states
- Interactive charts (line, bar, pie)
- Campaign performance data table
- Real-time data simulation

### **Custom Chart Components**
- **Line Charts**: Revenue and spend trends
- **Bar Charts**: Conversions vs sessions
- **Pie Charts**: Traffic source distribution
- **Responsive Design**: Automatic mobile optimization

### **Data Table**
- Sortable columns
- Status filtering
- Export functionality (PDF/CSV)
- Pagination controls
- Mobile-responsive design

## 📱 Responsive Design

The dashboard is built with a mobile-first approach:

- **Mobile (320px+)**: Compact layout with essential controls
- **Tablet (768px+)**: Balanced layout with more visible features
- **Desktop (1024px+)**: Full-featured layout with all controls

### Mobile Navigation
- Date range picker (responsive)
- Real-time toggle (responsive)
- Theme toggle (always visible)
- User avatar (always visible)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **Any Static Host**: Upload the `dist` folder contents

## 🔧 Configuration

### Environment Variables
Create a `.env` file for environment-specific settings:
```env
VITE_API_URL=your_api_url
VITE_APP_TITLE=AdMyBrand Dashboard
```

### Customization
- **Themes**: Modify `src/hooks/use-theme.ts`
- **Data**: Update `src/lib/mock-data.ts` for different metrics
- **Styling**: Customize Tailwind classes in components
- **Charts**: Modify chart configurations in `src/components/ui/custom-chart.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the code comments
- Review the component examples in the `src/components` directory

---

**Built with ❤️ using React, TypeScript, and shadcn/ui**
