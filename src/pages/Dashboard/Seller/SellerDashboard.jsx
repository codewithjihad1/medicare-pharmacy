import React, { useContext, useState } from 'react';
import {
    FaHome,
    FaPills,
    FaCreditCard,
    FaBullhorn,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

// Import components
import SellerHome from './components/SellerHome/SellerHome';
import ManageMedicines from './components/ManageMedicines/ManageMedicines';
import PaymentHistory from './components/PaymentHistory/PaymentHistory';
import AdvertiseRequest from './components/AdvertiseRequest/AdvertiseRequest';
import { AuthContext } from '../../../context/AuthContext';

const SellerDashboard = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully');
            navigate('/login');
        } catch {
            toast.error('Failed to logout');
        }
    };

    const sidebarItems = [
        { id: 'home', label: 'Dashboard', icon: FaHome },
        { id: 'medicines', label: 'Manage Medicines', icon: FaPills },
        { id: 'payments', label: 'Payment History', icon: FaCreditCard },
        { id: 'advertise', label: 'Advertise Request', icon: FaBullhorn },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <SellerHome />;
            case 'medicines':
                return <ManageMedicines />;
            case 'payments':
                return <PaymentHistory />;
            case 'advertise':
                return <AdvertiseRequest />;
            default:
                return <SellerHome />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                !fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:inset-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Seller Panel</h2>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* User Info */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                                {user?.displayName?.charAt(0).toUpperCase() || 'S'}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-800 dark:text-white">{user?.displayName || 'Seller'}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Seller Account</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${activeTab === item.id
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600 dark:border-blue-400'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white'
                                    }
                `}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                    >
                        <FaSignOutAlt size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-0 lg:pl-64 w-full">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between h-16 px-6">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                <FaBars size={20} />
                            </button>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                                {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                            </h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="hidden md:block">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back,</p>
                                <p className="font-medium text-gray-800 dark:text-white">{user?.displayName || 'Seller'}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default SellerDashboard;
