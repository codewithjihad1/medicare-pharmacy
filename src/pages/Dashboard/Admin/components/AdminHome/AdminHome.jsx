import React, { useState, useEffect } from 'react';
import { FaDollarSign, FaShoppingCart, FaClock, FaCheckCircle } from 'react-icons/fa';
import RevenueCard from './RevenueCard';

// Mock data - In real app, this would come from API
const mockRevenueData = {
    totalRevenue: 125476.30,
    paidTotal: 98750.20,
    pendingTotal: 26726.10,
    totalOrders: 1247,
    completedOrders: 1156,
    pendingOrders: 91
};

const AdminHome = () => {
    const [revenueData, setRevenueData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setRevenueData(mockRevenueData);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
                <p className="text-blue-100">
                    Manage your medicine e-commerce platform efficiently
                </p>
            </div>

            {/* Revenue Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <RevenueCard
                    title="Total Revenue"
                    amount={revenueData.totalRevenue}
                    icon={<FaDollarSign className="h-6 w-6 text-white" />}
                    color="bg-green-500"
                    trend="up"
                    trendValue={12.5}
                />

                <RevenueCard
                    title="Paid Total"
                    amount={revenueData.paidTotal}
                    icon={<FaCheckCircle className="h-6 w-6 text-white" />}
                    color="bg-blue-500"
                    trend="up"
                    trendValue={8.3}
                />

                <RevenueCard
                    title="Pending Total"
                    amount={revenueData.pendingTotal}
                    icon={<FaClock className="h-6 w-6 text-white" />}
                    color="bg-orange-500"
                    trend="down"
                    trendValue={3.2}
                />

                <RevenueCard
                    title="Total Orders"
                    amount={revenueData.totalOrders}
                    icon={<FaShoppingCart className="h-6 w-6 text-white" />}
                    color="bg-purple-500"
                    trend="up"
                    trendValue={15.7}
                />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Orders Overview */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Orders Overview
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Completed Orders</span>
                            <span className="font-semibold text-green-600">{revenueData.completedOrders}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Pending Orders</span>
                            <span className="font-semibold text-orange-600">{revenueData.pendingOrders}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{
                                    width: `${(revenueData.completedOrders / revenueData.totalOrders) * 100}%`
                                }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {((revenueData.completedOrders / revenueData.totalOrders) * 100).toFixed(1)}% completion rate
                        </p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Recent Activity
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                            <FaCheckCircle className="h-4 w-4 text-green-600 mr-3" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                New payment received: $245.50
                            </span>
                        </div>
                        <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                            <FaShoppingCart className="h-4 w-4 text-blue-600 mr-3" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                5 new orders placed
                            </span>
                        </div>
                        <div className="flex items-center p-3 bg-orange-50 dark:bg-orange-900 rounded-lg">
                            <FaClock className="h-4 w-4 text-orange-600 mr-3" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                3 payments pending approval
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-4 bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg text-center transition-colors">
                        <FaShoppingCart className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-blue-600">View Orders</span>
                    </button>
                    <button className="p-4 bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800 rounded-lg text-center transition-colors">
                        <FaDollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-green-600">Payments</span>
                    </button>
                    <button className="p-4 bg-purple-50 dark:bg-purple-900 hover:bg-purple-100 dark:hover:bg-purple-800 rounded-lg text-center transition-colors">
                        <FaClock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-purple-600">Reports</span>
                    </button>
                    <button className="p-4 bg-orange-50 dark:bg-orange-900 hover:bg-orange-100 dark:hover:bg-orange-800 rounded-lg text-center transition-colors">
                        <FaCheckCircle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-orange-600">Settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
