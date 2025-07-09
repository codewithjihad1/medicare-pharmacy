import React, { useState, useMemo } from 'react';
import {
    FaSearch,
    FaFilter,
    FaDownload,
    FaEye,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaCalendarAlt
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const PaymentHistory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // Mock payment data
    const mockPayments = [
        {
            id: 'PAY-001',
            orderId: 'ORD-2024-001',
            amount: 125.50,
            commission: 12.55,
            netAmount: 112.95,
            status: 'completed',
            paymentMethod: 'Credit Card',
            transactionId: 'TXN-789456123',
            customerName: 'John Doe',
            customerEmail: 'john@email.com',
            medicines: [
                { name: 'Paracetamol 500mg', quantity: 2, price: 25.00 },
                { name: 'Vitamin D3', quantity: 1, price: 75.50 }
            ],
            createdAt: '2024-01-15T10:30:00Z',
            completedAt: '2024-01-15T10:35:00Z'
        },
        {
            id: 'PAY-002',
            orderId: 'ORD-2024-002',
            amount: 89.99,
            commission: 8.99,
            netAmount: 81.00,
            status: 'pending',
            paymentMethod: 'PayPal',
            transactionId: 'TXN-789456124',
            customerName: 'Jane Smith',
            customerEmail: 'jane@email.com',
            medicines: [
                { name: 'Ibuprofen 400mg', quantity: 3, price: 29.99 }
            ],
            createdAt: '2024-01-14T15:20:00Z',
            completedAt: null
        },
        {
            id: 'PAY-003',
            orderId: 'ORD-2024-003',
            amount: 45.00,
            commission: 4.50,
            netAmount: 40.50,
            status: 'failed',
            paymentMethod: 'Credit Card',
            transactionId: 'TXN-789456125',
            customerName: 'Bob Johnson',
            customerEmail: 'bob@email.com',
            medicines: [
                { name: 'Cough Syrup', quantity: 1, price: 45.00 }
            ],
            createdAt: '2024-01-13T09:15:00Z',
            completedAt: null
        },
        {
            id: 'PAY-004',
            orderId: 'ORD-2024-004',
            amount: 199.99,
            commission: 19.99,
            netAmount: 180.00,
            status: 'completed',
            paymentMethod: 'Bank Transfer',
            transactionId: 'TXN-789456126',
            customerName: 'Alice Brown',
            customerEmail: 'alice@email.com',
            medicines: [
                { name: 'Blood Pressure Monitor', quantity: 1, price: 199.99 }
            ],
            createdAt: '2024-01-12T14:45:00Z',
            completedAt: '2024-01-12T14:50:00Z'
        }
    ];

    // Filter payments based on search and filters
    const filteredPayments = useMemo(() => {
        return mockPayments.filter(payment => {
            const matchesSearch =
                payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;

            const matchesDate = (() => {
                if (dateFilter === 'all') return true;
                const paymentDate = new Date(payment.createdAt);
                const now = new Date();

                switch (dateFilter) {
                    case 'today':
                        return paymentDate.toDateString() === now.toDateString();
                    case 'week':
                        const weekAgo = new Date(now.setDate(now.getDate() - 7));
                        return paymentDate >= weekAgo;
                    case 'month':
                        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
                        return paymentDate >= monthAgo;
                    default:
                        return true;
                }
            })();

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [searchTerm, statusFilter, dateFilter]);

    // Calculate summary stats
    const summaryStats = useMemo(() => {
        const completed = filteredPayments.filter(p => p.status === 'completed');
        const pending = filteredPayments.filter(p => p.status === 'pending');
        const failed = filteredPayments.filter(p => p.status === 'failed');

        return {
            totalPayments: filteredPayments.length,
            completedPayments: completed.length,
            pendingPayments: pending.length,
            failedPayments: failed.length,
            totalAmount: completed.reduce((sum, p) => sum + p.amount, 0),
            totalCommission: completed.reduce((sum, p) => sum + p.commission, 0),
            netEarnings: completed.reduce((sum, p) => sum + p.netAmount, 0)
        };
    }, [filteredPayments]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <FaCheckCircle className="text-green-500" />;
            case 'pending':
                return <FaClock className="text-yellow-500" />;
            case 'failed':
                return <FaTimesCircle className="text-red-500" />;
            default:
                return null;
        }
    };

    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case 'completed':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case 'failed':
                return `${baseClasses} bg-red-100 text-red-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleViewDetails = (payment) => {
        setSelectedPayment(payment);
        setShowDetailModal(true);
    };

    const handleExportData = () => {
        const csvContent = [
            ['Payment ID', 'Order ID', 'Customer', 'Amount', 'Commission', 'Net Amount', 'Status', 'Date'],
            ...filteredPayments.map(payment => [
                payment.id,
                payment.orderId,
                payment.customerName,
                payment.amount,
                payment.commission,
                payment.netAmount,
                payment.status,
                formatDate(payment.createdAt)
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'payment-history.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success('Payment history exported successfully');
    };

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Payments</p>
                            <p className="text-2xl font-bold text-gray-900">{summaryStats.totalPayments}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FaCalendarAlt className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Net Earnings</p>
                            <p className="text-2xl font-bold text-green-600">${summaryStats.netEarnings.toFixed(2)}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <FaCheckCircle className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-yellow-600">{summaryStats.pendingPayments}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <FaClock className="text-yellow-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Commission</p>
                            <p className="text-2xl font-bold text-red-600">${summaryStats.totalCommission.toFixed(2)}</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <FaTimesCircle className="text-red-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by order ID, customer, or transaction..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>

                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                    </div>

                    <button
                        onClick={handleExportData}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        <FaDownload />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{payment.id}</p>
                                            <p className="text-sm text-gray-500">Order: {payment.orderId}</p>
                                            <p className="text-xs text-gray-400">{payment.transactionId}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{payment.customerName}</p>
                                            <p className="text-sm text-gray-500">{payment.customerEmail}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">${payment.amount.toFixed(2)}</p>
                                            <p className="text-xs text-red-500">Commission: ${payment.commission.toFixed(2)}</p>
                                            <p className="text-xs text-green-600">Net: ${payment.netAmount.toFixed(2)}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(payment.status)}
                                            <span className={getStatusBadge(payment.status)}>
                                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(payment.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleViewDetails(payment)}
                                            className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                                        >
                                            <FaEye />
                                            <span>View</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPayments.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No payments found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Payment Detail Modal */}
            {showDetailModal && selectedPayment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <FaTimesCircle size={24} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Payment Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment ID</label>
                                        <p className="text-sm text-gray-900">{selectedPayment.id}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                                        <p className="text-sm text-gray-900">{selectedPayment.orderId}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                                        <p className="text-sm text-gray-900">{selectedPayment.transactionId}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                                        <p className="text-sm text-gray-900">{selectedPayment.paymentMethod}</p>
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div>
                                    <h4 className="text-md font-medium text-gray-900 mb-3">Customer Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                            <p className="text-sm text-gray-900">{selectedPayment.customerName}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <p className="text-sm text-gray-900">{selectedPayment.customerEmail}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Amount Breakdown */}
                                <div>
                                    <h4 className="text-md font-medium text-gray-900 mb-3">Amount Breakdown</h4>
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Total Amount:</span>
                                            <span className="text-sm font-medium">${selectedPayment.amount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Platform Commission:</span>
                                            <span className="text-sm font-medium text-red-600">-${selectedPayment.commission.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t pt-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium text-gray-900">Net Amount:</span>
                                                <span className="text-sm font-bold text-green-600">${selectedPayment.netAmount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Medicines */}
                                <div>
                                    <h4 className="text-md font-medium text-gray-900 mb-3">Medicines Ordered</h4>
                                    <div className="space-y-2">
                                        {selectedPayment.medicines.map((medicine, index) => (
                                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{medicine.name}</p>
                                                    <p className="text-xs text-gray-500">Quantity: {medicine.quantity}</p>
                                                </div>
                                                <p className="text-sm font-medium">${medicine.price.toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Status and Dates */}
                                <div>
                                    <h4 className="text-md font-medium text-gray-900 mb-3">Status & Timeline</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            {getStatusIcon(selectedPayment.status)}
                                            <span className={getStatusBadge(selectedPayment.status)}>
                                                {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Created: {formatDate(selectedPayment.createdAt)}</p>
                                            {selectedPayment.completedAt && (
                                                <p className="text-sm text-gray-600">Completed: {formatDate(selectedPayment.completedAt)}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
