import React, { useState, useEffect } from 'react';
import { FaDollarSign, FaCheck, FaClock, FaSearch, FaFilter } from 'react-icons/fa';
import toast from 'react-hot-toast';

// Mock payment data
const mockPayments = [
    {
        id: 1,
        orderId: 'ORD-001',
        buyerName: 'John Doe',
        buyerEmail: 'john@example.com',
        sellerName: 'Jane Smith',
        sellerEmail: 'jane@seller.com',
        amount: 125.50,
        status: 'pending',
        paymentMethod: 'stripe',
        createdAt: '2024-07-08T10:30:00Z',
        medicines: 'Paracetamol, Vitamin D3'
    },
    {
        id: 2,
        orderId: 'ORD-002',
        buyerName: 'Sarah Wilson',
        buyerEmail: 'sarah@example.com',
        sellerName: 'Mike Johnson',
        sellerEmail: 'mike@seller.com',
        amount: 89.25,
        status: 'paid',
        paymentMethod: 'stripe',
        createdAt: '2024-07-07T14:45:00Z',
        paidAt: '2024-07-07T15:30:00Z',
        medicines: 'Amoxicillin Syrup'
    },
    {
        id: 3,
        orderId: 'ORD-003',
        buyerName: 'David Brown',
        buyerEmail: 'david@example.com',
        sellerName: 'Jane Smith',
        sellerEmail: 'jane@seller.com',
        amount: 67.80,
        status: 'pending',
        paymentMethod: 'stripe',
        createdAt: '2024-07-06T09:15:00Z',
        medicines: 'Insulin, Blood Pressure Monitor'
    },
    {
        id: 4,
        orderId: 'ORD-004',
        buyerName: 'Lisa Anderson',
        buyerEmail: 'lisa@example.com',
        sellerName: 'Tom Wilson',
        sellerEmail: 'tom@seller.com',
        amount: 234.75,
        status: 'paid',
        paymentMethod: 'stripe',
        createdAt: '2024-07-05T16:20:00Z',
        paidAt: '2024-07-05T17:10:00Z',
        medicines: 'Antibiotics, Pain Relief'
    },
    {
        id: 5,
        orderId: 'ORD-005',
        buyerName: 'Robert Garcia',
        buyerEmail: 'robert@example.com',
        sellerName: 'Jane Smith',
        sellerEmail: 'jane@seller.com',
        amount: 156.30,
        status: 'pending',
        paymentMethod: 'stripe',
        createdAt: '2024-07-04T11:30:00Z',
        medicines: 'Heart Medication, Supplements'
    }
];

const PaymentManagement = () => {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setPayments(mockPayments);
            setFilteredPayments(mockPayments);
            setLoading(false);
        }, 1000);
    }, []);

    // Filter payments based on search term and status
    useEffect(() => {
        let filtered = payments;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(payment =>
                payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.sellerEmail.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(payment => payment.status === statusFilter);
        }

        setFilteredPayments(filtered);
    }, [payments, searchTerm, statusFilter]);

    // Handle accept payment
    const handleAcceptPayment = async (paymentId) => {
        try {
            setPayments(prevPayments =>
                prevPayments.map(payment =>
                    payment.id === paymentId
                        ? { ...payment, status: 'paid', paidAt: new Date().toISOString() }
                        : payment
                )
            );
            toast.success('Payment accepted successfully');
        } catch (error) {
            console.error('Error accepting payment:', error);
            toast.error('Failed to accept payment');
        }
    };

    // Get payment statistics
    const getPaymentStats = () => {
        const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
        const paidAmount = payments
            .filter(payment => payment.status === 'paid')
            .reduce((sum, payment) => sum + payment.amount, 0);
        const pendingAmount = payments
            .filter(payment => payment.status === 'pending')
            .reduce((sum, payment) => sum + payment.amount, 0);

        return {
            total: totalAmount,
            paid: paidAmount,
            pending: pendingAmount,
            totalCount: payments.length,
            paidCount: payments.filter(p => p.status === 'paid').length,
            pendingCount: payments.filter(p => p.status === 'pending').length
        };
    };

    const stats = getPaymentStats();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Payment Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage and approve payment transactions
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaDollarSign className="h-8 w-8 text-green-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaCheck className="h-8 w-8 text-blue-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Paid Amount</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.paid.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">({stats.paidCount} payments)</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaClock className="h-8 w-8 text-orange-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Amount</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.pending.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">({stats.pendingCount} payments)</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-bold">%</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {stats.totalCount > 0 ? ((stats.paidCount / stats.totalCount) * 100).toFixed(1) : 0}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search by Order ID, buyer, or seller email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="md:w-48">
                        <div className="relative">
                            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Payments ({filteredPayments.length})
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Order Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Buyer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Seller
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {filteredPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {payment.orderId}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {payment.medicines}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {payment.buyerName}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {payment.buyerEmail}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {payment.sellerName}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {payment.sellerEmail}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                                            ${payment.amount.toFixed(2)}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {payment.paymentMethod}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${payment.status === 'paid'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                                            }`}>
                                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        <div>
                                            {new Date(payment.createdAt).toLocaleDateString()}
                                        </div>
                                        {payment.paidAt && (
                                            <div className="text-xs text-green-600">
                                                Paid: {new Date(payment.paidAt).toLocaleDateString()}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {payment.status === 'pending' && (
                                            <button
                                                onClick={() => handleAcceptPayment(payment.id)}
                                                className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-xs"
                                            >
                                                Accept Payment
                                            </button>
                                        )}
                                        {payment.status === 'paid' && (
                                            <span className="text-green-600 text-xs">✓ Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredPayments.length === 0 && (
                        <div className="text-center py-8">
                            <FaDollarSign className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">No payments found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentManagement;
