import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { FaUser, FaShoppingCart, FaHeart, FaCog } from 'react-icons/fa';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome back, {user?.displayName || 'User'}!
                    </h1>
                    <p className="text-blue-100">
                        Manage your account and track your orders
                    </p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <FaShoppingCart className="h-8 w-8 text-blue-500" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <FaHeart className="h-8 w-8 text-red-500" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Wishlist Items</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 font-bold">$</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spent</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">$324.50</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <FaCog className="h-8 w-8 text-gray-500" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Account Type</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                                    {user?.role || 'User'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Recent Orders
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Order #12345</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">2 items • $45.99</p>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                    Delivered
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Order #12344</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">1 item • $12.50</p>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                    Shipped
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Profile Information
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center">
                                        <FaUser className="h-6 w-6 text-gray-600" />
                                    </div>
                                )}
                                <div className="ml-4">
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {user?.displayName || 'User Name'}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                            <div className="pt-4">
                                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                    Update Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
