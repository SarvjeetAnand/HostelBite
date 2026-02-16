import { useState } from 'react'
import { BarChart3, Calendar, Coffee, Utensils, Moon, IndianRupee , TrendingUp } from 'lucide-react'

function MonthlyReport({ records, payments }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

  const getMonthlyStats = () => {
    const monthRecords = Object.entries(records).filter(([date]) => 
      date.startsWith(selectedMonth)
    )

    const monthPayments = Object.entries(payments).filter(([date]) => 
      date.startsWith(selectedMonth)
    )

    const stats = {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      totalDays: monthRecords.length,
      totalPayments: monthPayments.reduce((sum, [, p]) => sum + p.amount, 0),
      paymentCount: monthPayments.length
    }

    monthRecords.forEach(([, meals]) => {
      if (meals.breakfast) stats.breakfast++
      if (meals.lunch) stats.lunch++
      if (meals.dinner) stats.dinner++
    })

    stats.totalMeals = stats.breakfast + stats.lunch + stats.dinner
    stats.avgMealsPerDay = stats.totalDays > 0 ? (stats.totalMeals / stats.totalDays).toFixed(1) : 0
    stats.costPerMeal = stats.totalMeals > 0 ? (stats.totalPayments / stats.totalMeals).toFixed(2) : 0

    return stats
  }

  const stats = getMonthlyStats()

  const mealData = [
    { name: 'Breakfast', count: stats.breakfast, icon: Coffee, color: 'bg-amber-500' },
    { name: 'Lunch', count: stats.lunch, icon: Utensils, color: 'bg-emerald-500' },
    { name: 'Dinner', count: stats.dinner, icon: Moon, color: 'bg-indigo-500' }
  ]

  const maxCount = Math.max(stats.breakfast, stats.lunch, stats.dinner, 1)

  return (
    <div className="animate-slide-up">
      {/* Month Selector */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <label className="text-base sm:text-lg font-semibold text-gray-700">Select Month:</label>
          </div>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full sm:w-auto px-3 sm:px-4 py-2 border-2 border-primary rounded-xl font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
        <div className="card bg-gradient-to-br from-primary to-green-600 text-white">
          <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 opacity-90" />
          <p className="text-xs sm:text-sm opacity-90 font-medium">Total Meals</p>
          <p className="text-3xl sm:text-4xl font-display font-black mt-1 sm:mt-2">{stats.totalMeals}</p>
        </div>

        <div className="card bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 opacity-90" />
          <p className="text-xs sm:text-sm opacity-90 font-medium">Active Days</p>
          <p className="text-3xl sm:text-4xl font-display font-black mt-1 sm:mt-2">{stats.totalDays}</p>
        </div>

        <div className="card bg-gradient-to-br from-accent to-red-500 text-white">
          <IndianRupee  className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 opacity-90" />
          <p className="text-xs sm:text-sm opacity-90 font-medium">Total Paid</p>
          <p className="text-3xl sm:text-4xl font-display font-black mt-1 sm:mt-2">₹{stats.totalPayments.toFixed(0)}</p>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 opacity-90" />
          <p className="text-xs sm:text-sm opacity-90 font-medium">Cost/Meal</p>
          <p className="text-3xl sm:text-4xl font-display font-black mt-1 sm:mt-2">₹{stats.costPerMeal}</p>
        </div>
      </div>

      {/* Meal Breakdown */}
      <div className="card mb-6">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-primary mb-4 sm:mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
          Meal Breakdown
        </h2>
        
        <div className="space-y-4 sm:space-y-6">
          {mealData.map((meal) => {
            const Icon = meal.icon
            const percentage = maxCount > 0 ? (meal.count / maxCount) * 100 : 0
            
            return (
              <div key={meal.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`${meal.color} p-1.5 sm:p-2 rounded-lg`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-700 text-sm sm:text-base">{meal.name}</span>
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-gray-800">{meal.count}</span>
                </div>
                
                <div className="relative h-3 sm:h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 ${meal.color} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Additional Insights */}
      <div className="card bg-gradient-to-br from-light to-white">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-primary mb-4 sm:mb-6">Monthly Insights</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="p-3 sm:p-4 bg-white rounded-xl border-2 border-primary border-opacity-20">
            <p className="text-xs sm:text-sm text-gray-600 font-medium">Average Meals Per Day</p>
            <p className="text-2xl sm:text-3xl font-bold text-primary mt-2">{stats.avgMealsPerDay}</p>
          </div>
          
          <div className="p-3 sm:p-4 bg-white rounded-xl border-2 border-accent border-opacity-20">
            <p className="text-xs sm:text-sm text-gray-600 font-medium">Payment Transactions</p>
            <p className="text-2xl sm:text-3xl font-bold text-accent mt-2">{stats.paymentCount}</p>
          </div>

          <div className="p-3 sm:p-4 bg-white rounded-xl border-2 border-emerald-500 border-opacity-20">
            <p className="text-xs sm:text-sm text-gray-600 font-medium">Most Common Meal</p>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-2">
              {stats.breakfast >= stats.lunch && stats.breakfast >= stats.dinner ? 'Breakfast' :
               stats.lunch >= stats.dinner ? 'Lunch' : 'Dinner'}
            </p>
          </div>

          <div className="p-3 sm:p-4 bg-white rounded-xl border-2 border-indigo-500 border-opacity-20">
            <p className="text-xs sm:text-sm text-gray-600 font-medium">Average Daily Cost</p>
            <p className="text-2xl sm:text-3xl font-bold text-indigo-600 mt-2">
              ₹{stats.totalDays > 0 ? (stats.totalPayments / stats.totalDays).toFixed(2) : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonthlyReport