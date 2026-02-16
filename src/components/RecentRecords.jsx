import { useState } from 'react'
import { Coffee, Utensils, Moon, Trash2, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react'
import { toast } from 'react-toastify'
import ConfirmModal from './ConfirmModal'

function RecentRecords({ records, deleteRecord }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [filterStartDate, setFilterStartDate] = useState('')
  const [filterEndDate, setFilterEndDate] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, date: null, formattedDate: '' })
  
  const recordsPerPage = 10

  // Filter records by date range
  const getFilteredRecords = () => {
    let filtered = Object.entries(records)

    if (filterStartDate && filterEndDate) {
      filtered = filtered.filter(([date]) => {
        return date >= filterStartDate && date <= filterEndDate
      })
    } else if (filterStartDate) {
      filtered = filtered.filter(([date]) => date >= filterStartDate)
    } else if (filterEndDate) {
      filtered = filtered.filter(([date]) => date <= filterEndDate)
    }

    return filtered.sort(([a], [b]) => b.localeCompare(a))
  }

  const filteredRecords = getFilteredRecords()
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage)
  
  // Get current page records
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord)

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const scrollToCard = () => {
  const element = document.querySelector(".card");
  const topPosition = element.offsetTop;

  window.scrollTo({
    top: topPosition,
    behavior: "smooth",
  });
};

  // Handle delete with confirmation modal
  const handleDeleteClick = (date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
    
    setConfirmModal({
      isOpen: true,
      date: date,
      formattedDate: formattedDate
    })
  }

  const handleConfirmDelete = () => {
    const { date, formattedDate } = confirmModal
    deleteRecord(date)
    
    toast.success(`Record for ${formattedDate} deleted successfully!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })

    // Adjust current page if needed
    const newTotalPages = Math.ceil((filteredRecords.length - 1) / recordsPerPage)
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages)
    }
  }

  const closeModal = () => {
    setConfirmModal({ isOpen: false, date: null, formattedDate: '' })
  }

  // Clear filters
  const clearFilters = () => {
    setFilterStartDate('')
    setFilterEndDate('')
    setCurrentPage(1)
    toast.info('Filters cleared', {
      position: "top-right",
      autoClose: 2000,
    })
  }

  // Apply filters
  const applyFilters = () => {
    setCurrentPage(1)
    setShowFilter(false)
    toast.success(`Showing ${filteredRecords.length} record(s)`, {
      position: "top-right",
      autoClose: 2000,
    })
  }

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-primary">Recent Records</h2>
        
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`btn-outline flex items-center gap-2 text-sm sm:text-base ${showFilter ? 'bg-primary text-white' : ''}`}
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div className="bg-light p-4 rounded-xl mb-4 animate-slide-up border-2 border-primary border-opacity-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-all text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-all text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={applyFilters}
              className="btn-primary flex-1 text-sm sm:text-base"
            >
              Apply Filter
            </button>
            <button
              onClick={clearFilters}
              className="btn-outline flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Active Filter Indicator */}
      {(filterStartDate || filterEndDate) && (
        <div className="bg-primary bg-opacity-10 p-3 rounded-lg mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {filterStartDate && filterEndDate 
                ? `${filterStartDate} to ${filterEndDate}`
                : filterStartDate 
                  ? `From ${filterStartDate}`
                  : `Until ${filterEndDate}`
              }
            </span>
          </div>
          <button
            onClick={clearFilters}
            className="text-primary hover:text-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Records List */}
      <div className="space-y-3 mb-4">
        {currentRecords.map(([date, meals]) => (
          <div key={date} className="flex items-start sm:items-center justify-between p-3 sm:p-4 bg-light rounded-xl hover:bg-gray-100 transition-all group gap-3 sm:gap-0">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="bg-primary text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold min-w-[70px] sm:min-w-[80px] text-center text-sm sm:text-base">
                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div className="flex gap-2 sm:gap-3 flex-wrap">
                {meals.breakfast && (
                  <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 sm:px-3 sm:py-1 rounded-lg">
                    <Coffee className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                    <span className="text-xs sm:text-sm font-medium text-amber-700">Breakfast</span>
                  </div>
                )}
                {meals.lunch && (
                  <div className="flex items-center gap-1 bg-emerald-100 px-2 py-1 sm:px-3 sm:py-1 rounded-lg">
                    <Utensils className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                    <span className="text-xs sm:text-sm font-medium text-emerald-700">Lunch</span>
                  </div>
                )}
                {meals.dinner && (
                  <div className="flex items-center gap-1 bg-indigo-100 px-2 py-1 sm:px-3 sm:py-1 rounded-lg">
                    <Moon className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
                    <span className="text-xs sm:text-sm font-medium text-indigo-700">Dinner</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => handleDeleteClick(date)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 self-end sm:self-auto"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        ))}
        
        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-medium">
              {Object.keys(records).length === 0 
                ? 'No records yet. Start tracking your meals!'
                : 'No records found for the selected date range.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-gray-200">
          <div className="text-xs sm:text-sm text-gray-600 font-medium text-center sm:text-left">
            Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredRecords.length)} of {filteredRecords.length} records
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Previous Button */}
            <button
              onClick={() =>{ handlePageChange(currentPage - 1); scrollToCard()}}
              disabled={currentPage === 1}
              className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-primary hover:bg-primary hover:text-white'
              }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                // Show first page, last page, current page, and pages around current
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() =>{ handlePageChange(pageNumber); scrollToCard();}}
                      className={`px-2 py-1 sm:px-3 sm:py-1 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                        currentPage === pageNumber
                          ? 'bg-primary text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return <span key={pageNumber} className="px-1 sm:px-2 text-gray-400 text-sm sm:text-base">...</span>
                }
                return null
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() =>{handlePageChange(currentPage + 1); scrollToCard();}}
              disabled={currentPage === totalPages}
              className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-primary hover:bg-primary hover:text-white'
              }`}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
        title="Delete Record?"
        message={`Are you sure you want to delete all meal records for ${confirmModal.formattedDate}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
}

export default RecentRecords