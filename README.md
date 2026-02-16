# 🍽️ Mess Tracker

A modern, beautiful daily mess management system built with React.js and Tailwind CSS. Track your meals, payments, and get insightful monthly reports - all without any database, using local browser storage.

![Mess Tracker](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.2-38B2AC.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Features

### 📱 Fully Responsive Design
- **Mobile-first approach** optimized for all devices
- Works perfectly on phones (320px+), tablets, and desktops
- Touch-friendly interface with larger tap targets
- Adaptive layouts that change based on screen size
- Optimized typography and spacing for each device
- Always-visible controls on mobile (no hover required)

### 📅 Daily Meal Tracking
- Track Breakfast, Lunch, and Dinner for any date
- Beautiful, interactive meal cards with visual feedback
- Quick date selection with calendar picker
- **Paginated recent records** (10 per page)
- **Filter records by date range**
- Instant toast notifications for all actions

### 💰 Payment Management
- Record payments with date, amount, and notes
- Track total payments and transaction count
- Visual payment history with detailed information
- Delete payments with confirmation dialogs
- Toast notifications for successful operations

### 📊 Monthly Reports
- Comprehensive monthly statistics
- Visual meal breakdown with progress bars
- Calculate cost per meal automatically
- Track average meals per day
- Payment transaction analytics
- Insights on spending patterns

### 🔔 Smart Notifications
- **React-Toastify** integration for user feedback
- Success notifications for meal tracking
- Info messages for meal unmarking
- Confirmation toasts for deletions
- Error handling with helpful messages

### ✨ Beautiful Confirmation Modals
- **Custom designed modals** (no browser alerts)
- Smooth animations and transitions
- Clear warning icons and messaging
- Shows exact details before deletion
- Professional UI matching app design
- Cancel and Confirm buttons with visual feedback

### 📄 Pagination & Filtering
- **10 records per page** with smooth navigation
- Filter records by start date, end date, or both
- Visual indicators for active filters
- Quick filter clearing
- Automatic page adjustment when deleting records

### 💾 Data Management
- **No database required** - all data stored in browser's localStorage
- Export data as **CSV** for easy use in Excel/Google Sheets
- Import previously exported CSV data
- Data persists across sessions
- Complete privacy - your data never leaves your browser
- Compatible with spreadsheet applications

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to project directory**
   ```bash
   cd mess-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to the URL shown in terminal

## 📁 Project Structure

```
mess-tracker/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── MealCard.jsx           # Individual meal tracking card
│   │   ├── PaymentTracker.jsx     # Payment management component
│   │   ├── MonthlyReport.jsx      # Statistics and reports
│   │   ├── RecentRecords.jsx      # Paginated records with filtering
│   │   └── ConfirmModal.jsx       # Custom confirmation dialog
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles and Tailwind directives
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # This file
```

## 🎨 Design Features

- **Modern UI/UX** with smooth animations and transitions
- **Fully Responsive** - optimized for mobile, tablet, and desktop
- **Mobile-First Design** - touch-friendly with larger tap targets
- **Custom Color Palette** with primary green and accent orange
- **Beautiful Typography** using Playfair Display and Manrope fonts
- **Interactive Elements** with hover effects and visual feedback
- **Gradient Backgrounds** for visual depth and interest
- **Adaptive Layouts** - grid changes based on screen size

## 🛠️ Technology Stack

- **React 18.2** - UI library
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Vite 4.3** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library
- **React-Toastify 9.1** - Toast notifications
- **LocalStorage API** - Data persistence

## 📖 Usage Guide

### Tracking Daily Meals

1. Select a date using the date picker
2. Click on meal cards (Breakfast, Lunch, Dinner) to mark as consumed
3. Visual checkmarks confirm your selections
4. Toast notifications appear for immediate feedback
5. Recent records appear below with pagination

### Viewing Recent Records

1. Scroll to the "Recent Records" section
2. Use **pagination controls** to navigate through pages (10 records per page)
3. Click **"Filter"** button to filter by date range:
   - Set start date and/or end date
   - Click "Apply Filter"
   - See filtered results with active filter indicator
   - Click "Clear" or (X) to remove filters
4. Hover over records to reveal delete button
5. Delete confirmation with toast notification

### Recording Payments

1. Navigate to the "Payments" tab
2. Select payment date
3. Enter amount (in ₹)
4. Add optional note (e.g., "Monthly mess bill")
5. Click "Add Payment"
6. Success toast appears confirming the payment
7. View total payments and transaction history

### Viewing Reports

1. Go to the "Reports" tab
2. Select the month you want to analyze
3. View comprehensive statistics:
   - Total meals consumed
   - Active days
   - Total amount paid
   - Cost per meal
   - Meal breakdown by type
   - Average meals per day
   - Most common meal
   - Average daily cost

### Backing Up Data

**Export:**
1. Click the "Export" button (📥 icon) in the header
2. A CSV file will download with all your data
3. Save this file securely
4. Can be opened in Excel, Google Sheets, or any spreadsheet app

**Import:**
1. Click the "Import" button (📤 icon)
2. Select a previously exported CSV file
3. Your data will be restored and merged with existing data

**CSV Format:**
- Includes all meals and payments
- Date, Breakfast, Lunch, Dinner, Payment Amount, Payment Note
- Compatible with all spreadsheet applications
- See CSV_FORMAT.md for detailed format specification

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Key Components

### App.jsx
Main application component that:
- Manages state for meals and payments
- Handles localStorage persistence
- Provides data import/export functionality
- Renders navigation and main content
- Integrates React-Toastify for notifications

### ConfirmModal.jsx
**NEW!** Beautiful confirmation dialog featuring:
- Custom-designed modal (no browser alerts)
- Smooth fade-in and slide-up animations
- Warning icon with blue accent
- Clear messaging with action details
- Backdrop blur effect
- Cancel and Confirm buttons
- Close button (X) in top-right

### MealCard.jsx
Interactive meal tracking card featuring:
- Icon-based visual representation
- Toggle functionality
- Animated hover effects
- Gradient backgrounds

### RecentRecords.jsx
**NEW!** Paginated records viewer with:
- 10 records per page with smooth navigation
- Date range filtering (start date, end date, or both)
- Active filter indicators
- Custom confirmation modal for deletions
- Toast notifications for all actions
- Responsive pagination controls

### PaymentTracker.jsx
Payment management interface with:
- Form for adding payments
- Total payment summary
- Chronological payment history
- Custom confirmation modal for deletions
- Toast notifications for all actions

### MonthlyReport.jsx
Analytics and reporting dashboard showing:
- Statistical overview cards
- Visual meal breakdown charts
- Calculated insights
- Month selection

## 💡 Tips

- **Regular Backups:** Export your data weekly as CSV
- **Consistent Tracking:** Track meals daily for accurate reports
- **Payment Notes:** Add notes to payments for better record-keeping
- **Browser Storage:** Data is stored per browser - use the same browser for consistency
- **Privacy:** All data stays on your device - completely private
- **Spreadsheet Analysis:** Open exported CSV in Excel for advanced analysis

## 🐛 Troubleshooting

**Data not persisting?**
- Ensure you're using the same browser
- Check if cookies/localStorage is enabled
- Try exporting and importing data

**Styles not loading?**
- Clear browser cache
- Restart development server
- Check console for errors

**Performance issues?**
- Large datasets (1000+ records) may slow down
- Consider exporting old data and starting fresh

## 🚀 Deploying to Netlify

Want to host your Mess Tracker online? Deploy it to Netlify for FREE!

### Quick Deploy

1. **Prepare your project:**
   ```bash
   npm run build
   ```

2. **Deploy via Drag & Drop:**
   - Go to https://app.netlify.com/drop
   - Drag the `dist` folder
   - Done! Your site is live

3. **Or deploy via Git (Auto-updates):**
   - Push to GitHub
   - Connect to Netlify
   - Automatic deployments on every push

📖 **See complete guide:** [NETLIFY_DEPLOY.md](NETLIFY_DEPLOY.md)

Your site will be live at: `https://your-mess-tracker.netlify.app` 🌐

## 🔐 Privacy & Security

- ✅ No backend server - no data transmission
- ✅ No user accounts or authentication required
- ✅ All data stored locally in your browser
- ✅ Complete control over your data
- ✅ Export/Import for data portability

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📧 Support

If you encounter any issues or have questions, please check:
1. This README file
2. Browser console for error messages
3. Ensure all dependencies are installed correctly

---

**Built with ❤️ using React and Tailwind CSS**

*Track your meals, manage your payments, stay organized!*