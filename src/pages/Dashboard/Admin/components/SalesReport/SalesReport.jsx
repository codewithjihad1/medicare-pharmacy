import React, { useState, useEffect } from 'react';
import { FaChartBar, FaDollarSign, FaShoppingCart, FaCalendarAlt } from 'react-icons/fa';
import DateRangeFilter from './DateRangeFilter';
import ReportTable from './ReportTable';
import ExportButtons from './ExportButtons';

// Mock sales data
const mockSalesData = [
    {
        id: 1,
        orderId: 'ORD-001',
        medicineName: 'Paracetamol 500mg',
        medicineCategory: 'tablet',
        sellerName: 'Jane Smith',
        sellerEmail: 'jane@seller.com',
        buyerName: 'John Doe',
        buyerEmail: 'john@example.com',
        quantity: 2,
        unitPrice: 2.50,
        totalPrice: 5.00,
        saleDate: '2024-07-08T10:30:00Z',
        status: 'completed'
    },
    {
        id: 2,
        orderId: 'ORD-002',
        medicineName: 'Amoxicillin Syrup 250mg',
        medicineCategory: 'syrup',
        sellerName: 'Mike Johnson',
        sellerEmail: 'mike@seller.com',
        buyerName: 'Sarah Wilson',
        buyerEmail: 'sarah@example.com',
        quantity: 1,
        unitPrice: 15.75,
        totalPrice: 15.75,
        saleDate: '2024-07-07T14:45:00Z',
        status: 'completed'
    },
    {
        id: 3,
        orderId: 'ORD-003',
        medicineName: 'Vitamin D3 1000 IU',
        medicineCategory: 'capsule',
        sellerName: 'Jane Smith',
        sellerEmail: 'jane@seller.com',
        buyerName: 'David Brown',
        buyerEmail: 'david@example.com',
        quantity: 3,
        unitPrice: 8.50,
        totalPrice: 25.50,
        saleDate: '2024-07-06T09:15:00Z',
        status: 'completed'
    },
    {
        id: 4,
        orderId: 'ORD-004',
        medicineName: 'Insulin Injection',
        medicineCategory: 'injection',
        sellerName: 'Tom Wilson',
        sellerEmail: 'tom@seller.com',
        buyerName: 'Lisa Anderson',
        buyerEmail: 'lisa@example.com',
        quantity: 1,
        unitPrice: 45.00,
        totalPrice: 45.00,
        saleDate: '2024-07-05T16:20:00Z',
        status: 'completed'
    },
    {
        id: 5,
        orderId: 'ORD-005',
        medicineName: 'Blood Pressure Monitor',
        medicineCategory: 'device',
        sellerName: 'Jane Smith',
        sellerEmail: 'jane@seller.com',
        buyerName: 'Robert Garcia',
        buyerEmail: 'robert@example.com',
        quantity: 1,
        unitPrice: 89.99,
        totalPrice: 89.99,
        saleDate: '2024-07-04T11:30:00Z',
        status: 'pending'
    },
    {
        id: 6,
        orderId: 'ORD-006',
        medicineName: 'Omega-3 Fish Oil',
        medicineCategory: 'supplement',
        sellerName: 'Mike Johnson',
        sellerEmail: 'mike@seller.com',
        buyerName: 'Emily Davis',
        buyerEmail: 'emily@example.com',
        quantity: 2,
        unitPrice: 12.99,
        totalPrice: 25.98,
        saleDate: '2024-07-03T08:45:00Z',
        status: 'completed'
    },
    {
        id: 7,
        orderId: 'ORD-007',
        medicineName: 'Cough Syrup',
        medicineCategory: 'syrup',
        sellerName: 'Tom Wilson',
        sellerEmail: 'tom@seller.com',
        buyerName: 'Michael Brown',
        buyerEmail: 'michael@example.com',
        quantity: 1,
        unitPrice: 8.75,
        totalPrice: 8.75,
        saleDate: '2024-07-02T15:20:00Z',
        status: 'completed'
    },
    {
        id: 8,
        orderId: 'ORD-008',
        medicineName: 'Antacid Tablets',
        medicineCategory: 'tablet',
        sellerName: 'Jane Smith',
        sellerEmail: 'jane@seller.com',
        buyerName: 'Jennifer Wilson',
        buyerEmail: 'jennifer@example.com',
        quantity: 1,
        unitPrice: 6.50,
        totalPrice: 6.50,
        saleDate: '2024-07-01T12:10:00Z',
        status: 'completed'
    }
];

const SalesReport = () => {
    const [salesData, setSalesData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setSalesData(mockSalesData);
            setFilteredData(mockSalesData);
            setLoading(false);
        }, 1000);
    }, []);

    // Filter data based on date range
    useEffect(() => {
        if (!startDate || !endDate) {
            setFilteredData(salesData);
            return;
        }

        const filtered = salesData.filter(sale => {
            const saleDate = new Date(sale.saleDate);
            return saleDate >= startDate && saleDate <= endDate;
        });

        setFilteredData(filtered);
    }, [salesData, startDate, endDate]);

    // Handle date range clear
    const handleClearDateFilter = () => {
        setStartDate(null);
        setEndDate(null);
    };

    // Calculate statistics
    const getStatistics = () => {
        const totalRevenue = filteredData.reduce((sum, sale) => sum + sale.totalPrice, 0);
        const totalOrders = filteredData.length;
        const completedOrders = filteredData.filter(sale => sale.status === 'completed').length;
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        return {
            totalRevenue,
            totalOrders,
            completedOrders,
            averageOrderValue
        };
    };

    const stats = getStatistics();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Sales Report
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Comprehensive sales analytics and reporting
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaDollarSign className="h-8 w-8 text-green-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                ${stats.totalRevenue.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaShoppingCart className="h-8 w-8 text-blue-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaChartBar className="h-8 w-8 text-purple-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Orders</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedOrders}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaCalendarAlt className="h-8 w-8 text-orange-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Order Value</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                ${stats.averageOrderValue.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Date Range Filter */}
            <DateRangeFilter
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onClear={handleClearDateFilter}
            />

            {/* Export Buttons */}
            <ExportButtons
                data={filteredData}
                filename={`sales-report-${new Date().toISOString().split('T')[0]}`}
            />

            {/* Sales Report Table */}
            <ReportTable
                data={filteredData}
                loading={loading}
            />

            {/* Summary Section */}
            {filteredData.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Report Summary
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                ${stats.totalRevenue.toFixed(2)}
                            </p>
                            <p className="text-sm text-green-800 dark:text-green-200">Total Revenue</p>
                        </div>

                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {stats.totalOrders}
                            </p>
                            <p className="text-sm text-blue-800 dark:text-blue-200">Total Sales</p>
                        </div>

                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                {((stats.completedOrders / stats.totalOrders) * 100).toFixed(1)}%
                            </p>
                            <p className="text-sm text-purple-800 dark:text-purple-200">Success Rate</p>
                        </div>

                        <div className="text-center p-4 bg-orange-50 dark:bg-orange-900 rounded-lg">
                            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                ${stats.averageOrderValue.toFixed(2)}
                            </p>
                            <p className="text-sm text-orange-800 dark:text-orange-200">Avg Order Value</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesReport;
