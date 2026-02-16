import { Check } from 'lucide-react'

function MealCard({ icon: Icon, title, checked, onChange, color }) {
  return (
    <div 
      className={`card relative overflow-hidden cursor-pointer group ${
        checked ? 'ring-4 ring-primary ring-opacity-50' : ''
      }`}
      onClick={onChange}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className={`bg-gradient-to-br ${color} p-2 sm:p-3 rounded-xl shadow-lg`}>
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-3 flex items-center justify-center transition-all duration-300 ${
            checked 
              ? 'bg-primary border-primary shadow-lg scale-110' 
              : 'border-gray-300 group-hover:border-primary group-hover:scale-105'
          }`}>
            {checked && <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
          </div>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 font-medium">
          {checked ? 'Consumed' : 'Not consumed'}
        </p>
      </div>

      {/* Hover effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  )
}

export default MealCard