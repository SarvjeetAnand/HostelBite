import { useState, useEffect } from 'react'
import { Calendar, Coffee, Utensils, Moon, IndianRupee , History, Trash2, Download, Upload } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import MealCard from './components/MealCard'
import PaymentTracker from './components/PaymentTracker'
import MonthlyReport from './components/MonthlyReport'
import RecentRecords from './components/RecentRecords'

function App() {
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem('messRecords')
    return saved ? JSON.parse(saved) : {}
  })

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('messPayments')
    return saved ? JSON.parse(saved) : {}
  })

  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [activeTab, setActiveTab] = useState('daily')

  useEffect(() => {
    localStorage.setItem('messRecords', JSON.stringify(records))
  }, [records])

  useEffect(() => {
    localStorage.setItem('messPayments', JSON.stringify(payments))
  }, [payments])

  const toggleMeal = (date, meal) => {
    const isCurrentlyChecked = records[date]?.[meal]
    setRecords(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [meal]: !prev[date]?.[meal]
      }
    }))
    
    // Show toast notification
    const mealName = meal.charAt(0).toUpperCase() + meal.slice(1)
    if (isCurrentlyChecked) {
      toast.info(`${mealName} unmarked`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      })
    } else {
      toast.success(`${mealName} marked as consumed!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      })
    }
  }

  const addPayment = (date, amount, note) => {
    setPayments(prev => ({
      ...prev,
      [date]: { amount: parseFloat(amount), note, timestamp: new Date().toISOString() }
    }))
    
    toast.success(`Payment of ₹${parseFloat(amount).toFixed(2)} added!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
    })
  }

  const deleteRecord = (date) => {
    const newRecords = { ...records }
    delete newRecords[date]
    setRecords(newRecords)
  }

  const deletePayment = (date) => {
    if (window.confirm('Delete this payment record?')) {
      const newPayments = { ...payments }
      delete newPayments[date]
      setPayments(newPayments)
    }
  }

  const exportData = () => {
    // Create CSV content
    let csvContent = "Date,Breakfast,Lunch,Dinner,Payment Amount,Payment Note\n"
    
    // Get all unique dates from both records and payments
    const allDates = new Set([
      ...Object.keys(records),
      ...Object.keys(payments)
    ])
    
    // Sort dates
    const sortedDates = Array.from(allDates).sort()
    
    // Build CSV rows
    sortedDates.forEach(date => {
      const meal = records[date] || {}
      const payment = payments[date] || {}
      
      const row = [
        date,
        meal.breakfast ? 'Yes' : 'No',
        meal.lunch ? 'Yes' : 'No',
        meal.dinner ? 'Yes' : 'No',
        payment.amount || '',
        payment.note ? `"${payment.note.replace(/"/g, '""')}"` : ''
      ]
      
      csvContent += row.join(',') + '\n'
    })
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mess-data-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success('Data exported as CSV successfully!', {
      position: "top-right",
      autoClose: 3000,
    })
  }

  const importData = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const csvText = event.target.result
          const lines = csvText.split('\n').filter(line => line.trim())
          
          // Skip header row
          const dataLines = lines.slice(1)
          
          const newRecords = {}
          const newPayments = {}
          
          dataLines.forEach(line => {
            // Parse CSV line (handle quoted fields)
            const matches = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g)
            if (!matches || matches.length < 4) return
            
            const [date, breakfast, lunch, dinner, amount, note] = matches.map(field => 
              field.replace(/^"|"$/g, '').replace(/""/g, '"').trim()
            )
            
            // Add meal records
            if (breakfast === 'Yes' || lunch === 'Yes' || dinner === 'Yes') {
              newRecords[date] = {
                breakfast: breakfast === 'Yes',
                lunch: lunch === 'Yes',
                dinner: dinner === 'Yes'
              }
            }
            
            // Add payment records
            if (amount && amount !== '') {
              newPayments[date] = {
                amount: parseFloat(amount),
                note: note || '',
                timestamp: new Date().toISOString()
              }
            }
          })
          
          // Merge with existing data
          setRecords(prev => ({ ...prev, ...newRecords }))
          setPayments(prev => ({ ...prev, ...newPayments }))
          
          toast.success(`Data imported successfully! ${Object.keys(newRecords).length} records and ${Object.keys(newPayments).length} payments added.`, {
            position: "top-right",
            autoClose: 4000,
          })
        } catch (error) {
          toast.error('Error importing CSV file. Please check the file format.', {
            position: "top-right",
            autoClose: 4000,
          })
        }
      }
      reader.readAsText(file)
    }
    // Reset input value to allow importing the same file again
    e.target.value = ''
  }

  const currentRecord = records[selectedDate] || { breakfast: false, lunch: false, dinner: false }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-light">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 sm:p-3 rounded-2xl">
                <Utensils className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-black text-primary">HostelBite</h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Track Your Daily Meal & Payment</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={exportData} 
                className="p-2 sm:px-6 sm:py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Download className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline font-semibold">Export</span>
              </button>
              <label className="p-2 sm:px-6 sm:py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2">
                <Upload className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline font-semibold">Import</span>
                <input type="file" accept=".csv" onChange={importData} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 bg-white rounded-2xl p-2 shadow-md">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
              activeTab === 'daily' 
                ? 'bg-primary text-white shadow-lg transform scale-105' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Coffee className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
            Daily Meals
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
              activeTab === 'payment' 
                ? 'bg-accent text-white shadow-lg transform scale-105' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <IndianRupee  className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
            Payments
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
              activeTab === 'report' 
                ? 'bg-secondary text-white shadow-lg transform scale-105' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <History className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
            Reports
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'daily' && (
          <div className="animate-slide-up">
            {/* Date Selector */}
            <div className="card mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <label className="text-base sm:text-lg font-semibold text-gray-700">Select Date:</label>
                </div>
                <input
                  type="date"
                  value={selectedDate}
                  max={today}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2 border-2 border-primary rounded-xl font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Meal Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <MealCard
                icon={Coffee}
                title="Breakfast"
                checked={currentRecord.breakfast}
                onChange={() => toggleMeal(selectedDate, 'breakfast')}
                color="from-amber-400 to-orange-500"
              />
              <MealCard
                icon={Utensils}
                title="Lunch"
                checked={currentRecord.lunch}
                onChange={() => toggleMeal(selectedDate, 'lunch')}
                color="from-emerald-400 to-teal-500"
              />
              <MealCard
                icon={Moon}
                title="Dinner"
                checked={currentRecord.dinner}
                onChange={() => toggleMeal(selectedDate, 'dinner')}
                color="from-indigo-400 to-purple-500"
              />
            </div>

            {/* Recent Records with Pagination */}
            <RecentRecords records={records} deleteRecord={deleteRecord} />
          </div>
        )}

        {activeTab === 'payment' && (
          <PaymentTracker
            payments={payments}
            addPayment={addPayment}
            deletePayment={deletePayment}
          />
        )}

        {activeTab === 'report' && (
          <MonthlyReport records={records} payments={payments} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-8 sm:mt-12 py-4 sm:py-6 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p className="font-medium text-sm sm:text-base">HostelBite &copy; {new Date().getFullYear()}</p>
          <p className="text-xs sm:text-sm mt-1">Design By Sarvjeet Kumar Anand</p>
        </div>
      </footer>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App