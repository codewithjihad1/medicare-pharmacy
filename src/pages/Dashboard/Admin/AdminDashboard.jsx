import React, { useState } from 'react';
import {
    FaHome,
    FaUsers,
    FaTags,
    FaDollarSign,
    FaChartBar,
    FaImage,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import { NavLink } from 'react-router';

// Import all admin components
import AdminHome from './components/AdminHome/AdminHome';
import ManageUsers from './components/ManageUsers/ManageUsers';
import ManageCategory from './components/ManageCategory/ManageCategory';
import PaymentManagement from './components/PaymentManagement/PaymentManagement';
import SalesReport from './components/SalesReport/SalesReport';
import ManageBanner from './components/ManageBanner/ManageBanner';
import { Outlet } from 'react-router';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Navigation items
    const navItems = [
        { id: 'home', label: 'Dashboard', icon: FaHome, component: AdminHome },
        { id: 'users', label: 'Manage Users', icon: FaUsers, component: ManageUsers },
        { id: 'categories', label: 'Manage Categories', icon: FaTags, component: ManageCategory },
        { id: 'payments', label: 'Payment Management', icon: FaDollarSign, component: PaymentManagement },
        { id: 'reports', label: 'Sales Report', icon: FaChartBar, component: SalesReport },
        { id: 'banners', label: 'Manage Banners', icon: FaImage, component: ManageBanner }
    ];

    const ActiveComponent = navItems.find(item => item.id === activeTab)?.component || AdminHome;

    // Render content based on active tab
    const renderContent = () => {
        return <ActiveComponent />;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-md bg-white dark:bg-gray-800 shadow-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                    {sidebarOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`!fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 lg:w-64 transition duration-200 ease-in-out lg:static lg:inset-0 z-40`}>
                <div className="flex h-screen w-64 flex-col bg-white dark:bg-gray-800 shadow-xl">
                    {/* Logo/Header */}
                    <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">A</span>
                                </div>
                            </div>
                            <div className="ml-3">
                                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Admin Panel
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setSidebarOpen(false);
                                    }}
                                    className={`group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium transition-colors ${activeTab === item.id
                                        ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-200'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                        }`}
                                >
                                    <Icon
                                        className={`mr-3 h-5 w-5 flex-shrink-0 ${activeTab === item.id
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                                            }`}
                                    />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            Admin Dashboard v1.0
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <div className="lg:pl-64">
                <div className="flex min-h-screen flex-col">
                    {/* Header */}
                    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white ml-12 lg:ml-0">
                                        {navItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                                    </h2>
                                </div>

                                <div className="flex items-center space-x-4">
                                    {/* Notifications */}
                                    <div className="flex items-center space-x-2">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                            <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">3</span>
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                                            Pending Tasks
                                        </span>
                                    </div>

                                    {/* Admin Profile */}
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src="https://via.placeholder.com/32x32?text=A"
                                            alt="Admin"
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                        <span className="text-sm font-medium text-gray-900 dark:text-white hidden sm:block">
                                            Admin User
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main content area */}
                    <main className="flex-1">
                        <div className="px-4 sm:px-6 lg:px-8 py-8">
                            {renderContent()}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
