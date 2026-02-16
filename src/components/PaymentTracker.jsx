import { useState } from 'react'
import { IndianRupee, Plus, Trash2, Calendar, FileText } from 'lucide-react'
import { toast } from 'react-toastify'
import ConfirmModal from './ConfirmModal'

function PaymentTracker({ payments, addPayment, deletePayment }) {
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0])
    const [amount, setAmount] = useState('')
    const [note, setNote] = useState('')
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        date: null,
        amount: 0,
        formattedDate: ''
    })

    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = (e) => {
        e.preventDefault()
        if (amount && parseFloat(amount) > 0) {
            addPayment(paymentDate, amount, note)
            setAmount('')
            setNote('')
            setPaymentDate(new Date().toISOString().split('T')[0])
        }
    }

    const handleDeleteClick = (date, paymentAmount) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })

        setConfirmModal({
            isOpen: true,
            date: date,
            amount: paymentAmount,
            formattedDate: formattedDate
        })
    }

    const handleConfirmDelete = () => {
        const { date } = confirmModal
        deletePayment(date)
        toast.success(`Payment deleted successfully!`, {
            position: "top-right",
            autoClose: 3000,
        })
    }

    const closeModal = () => {
        setConfirmModal({ isOpen: false, date: null, amount: 0, formattedDate: '' })
    }

    const totalPayments = Object.values(payments).reduce((sum, p) => sum + p.amount, 0)

    return (
        <div className="animate-slide-up">
            {/* Payment Form */}
            <div className="card mb-6 bg-gradient-to-br from-white to-orange-50">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-primary mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <div className="bg-accent p-1.5 sm:p-2 rounded-xl">
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    Add Payment
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                Payment Date
                            </label>
                            <input
                                type="date"
                                value={paymentDate}
                                max={today}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-all text-sm sm:text-base"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <IndianRupee className="w-4 h-4 text-primary" />
                                Amount
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                                step="0.01"
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-all text-sm sm:text-base"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-primary" />
                                Note (Optional)
                            </label>
                            <input
                                type="text"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="e.g., Monthly mess bill, Week 1-7 payment"
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-all text-sm sm:text-base"
                            />
                        </div>

                        <button type="submit" className="btn-accent mt-7 w-full flex items-center justify-center gap-2 text-sm sm:text-base">
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                            Add Payment
                        </button>
                    </div>


                </form>
            </div>

            {/* Summary Card */}
            <div className="card mb-6 bg-gradient-to-br from-primary to-green-600 text-white">
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <p className="text-base sm:text-lg font-medium opacity-90">Total Payments</p>
                        <p className="text-4xl sm:text-5xl font-display font-black mt-2">₹{totalPayments.toFixed(2)}</p>
                        <p className="text-xs sm:text-sm opacity-75 mt-1">{Object.keys(payments).length} transaction(s)</p>
                    </div>
                    <div className="bg-white bg-opacity-20 p-3 sm:p-4 rounded-2xl">
                        <IndianRupee className="w-12 h-12 sm:w-16 sm:h-16" />
                    </div>
                </div>
            </div>

            {/* Payment History */}
            <div className="card">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-primary mb-4">Payment History</h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {Object.entries(payments)
                        .sort(([a], [b]) => b.localeCompare(a))
                        .map(([date, payment]) => (
                            <div key={date} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-light to-orange-50 rounded-xl hover:shadow-md transition-all gap-3 sm:gap-0">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                                    <div className="bg-accent text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-sm sm:text-base">
                                        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <div>
                                        <p className="text-xl sm:text-2xl font-bold text-gray-800">₹{payment.amount.toFixed(2)}</p>
                                        {payment.note && (
                                            <p className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center gap-1">
                                                <FileText className="w-3 h-3" />
                                                {payment.note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteClick(date, payment.amount)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all self-end sm:self-auto"
                                >
                                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        ))}
                    {Object.keys(payments).length === 0 && (
                        <div className="text-center py-12">
                            <IndianRupee className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium text-sm sm:text-base">No payments recorded yet</p>
                            <p className="text-xs sm:text-sm text-gray-400 mt-1">Add your first payment above</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={closeModal}
                onConfirm={handleConfirmDelete}
                title="Delete Payment?"
                message={`Are you sure you want to delete the payment of ₹${confirmModal.amount.toFixed(2)} made on ${confirmModal.formattedDate}? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </div>
    )
}

export default PaymentTracker