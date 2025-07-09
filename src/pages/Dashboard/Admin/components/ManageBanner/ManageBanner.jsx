import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaImage, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import toast from 'react-hot-toast';
import BannerTable from './BannerTable';

// Mock banner medicines data
const mockBannerMedicines = [
    {
        id: 1,
        medicineName: 'Paracetamol 500mg',
        category: 'tablet',
        description: 'Effective pain reliever and fever reducer. Fast-acting formula for quick relief.',
        medicineImage: 'https://via.placeholder.com/300x200?text=Paracetamol',
        price: 2.50,
        discount: 10,
        sellerName: 'Jane Smith',
        sellerEmail: 'jane@seller.com',
        isInBanner: true,
        views: 1245,
        sales: 89,
        addedToBannerAt: '2024-07-01T10:30:00Z'
    },
    {
        id: 2,
        medicineName: 'Vitamin D3 1000 IU',
        category: 'capsule',
        description: 'Essential vitamin for bone health and immune system support. High potency formula.',
        medicineImage: 'https://via.placeholder.com/300x200?text=Vitamin+D3',
        price: 8.50,
        discount: 15,
        sellerName: 'Mike Johnson',
        sellerEmail: 'mike@seller.com',
        isInBanner: true,
        views: 987,
        sales: 67,
        addedToBannerAt: '2024-07-02T14:45:00Z'
    },
    {
        id: 3,
        medicineName: 'Omega-3 Fish Oil',
        category: 'supplement',
        description: 'Premium quality fish oil with EPA and DHA for heart and brain health.',
        medicineImage: 'https://via.placeholder.com/300x200?text=Omega+3',
        price: 12.99,
        discount: 20,
        sellerName: 'Tom Wilson',
        sellerEmail: 'tom@seller.com',
        isInBanner: false,
        views: 756,
        sales: 45,
        addedToBannerAt: null
    },
    {
        id: 4,
        medicineName: 'Multivitamin Complex',
        category: 'tablet',
        description: 'Complete daily nutrition with 25 essential vitamins and minerals.',
        medicineImage: 'https://via.placeholder.com/300x200?text=Multivitamin',
        price: 15.99,
        discount: 5,
        sellerName: 'Jane Smith',
        sellerEmail: 'jane@seller.com',
        isInBanner: true,
        views: 1456,
        sales: 123,
        addedToBannerAt: '2024-06-28T09:15:00Z'
    },
    {
        id: 5,
        medicineName: 'Calcium + Magnesium',
        category: 'tablet',
        description: 'Essential minerals for strong bones and teeth. Enhanced absorption formula.',
        medicineImage: 'https://via.placeholder.com/300x200?text=Calcium',
        price: 9.75,
        discount: 0,
        sellerName: 'Sarah Davis',
        sellerEmail: 'sarah@seller.com',
        isInBanner: false,
        views: 634,
        sales: 34,
        addedToBannerAt: null
    },
    {
        id: 6,
        medicineName: 'Probiotic Capsules',
        category: 'capsule',
        description: 'Advanced probiotic formula for digestive health and immune support.',
        medicineImage: 'https://via.placeholder.com/300x200?text=Probiotic',
        price: 18.50,
        discount: 25,
        sellerName: 'Mike Johnson',
        sellerEmail: 'mike@seller.com',
        isInBanner: false,
        views: 892,
        sales: 56,
        addedToBannerAt: null
    }
];

const ManageBanner = () => {
    const [medicines, setMedicines] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [bannerFilter, setBannerFilter] = useState('all');

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setMedicines(mockBannerMedicines);
            setFilteredMedicines(mockBannerMedicines);
            setLoading(false);
        }, 1000);
    }, []);

    // Filter medicines based on search term, category, and banner status
    useEffect(() => {
        let filtered = medicines;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(medicine =>
                medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine.sellerEmail.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(medicine => medicine.category === categoryFilter);
        }

        // Filter by banner status
        if (bannerFilter !== 'all') {
            filtered = filtered.filter(medicine =>
                bannerFilter === 'active' ? medicine.isInBanner : !medicine.isInBanner
            );
        }

        setFilteredMedicines(filtered);
    }, [medicines, searchTerm, categoryFilter, bannerFilter]);

    // Handle toggle banner status
    const handleToggleBanner = async (medicineId) => {
        try {
            setMedicines(prevMedicines =>
                prevMedicines.map(medicine =>
                    medicine.id === medicineId
                        ? {
                            ...medicine,
                            isInBanner: !medicine.isInBanner,
                            addedToBannerAt: !medicine.isInBanner ? new Date().toISOString() : null
                        }
                        : medicine
                )
            );

            const medicine = medicines.find(m => m.id === medicineId);
            const action = medicine.isInBanner ? 'removed from' : 'added to';
            toast.success(`${medicine.medicineName} ${action} banner successfully`);
        } catch (error) {
            console.error('Error toggling banner status:', error);
            toast.error('Failed to update banner status');
        }
    };

    // Get banner statistics
    const getBannerStats = () => {
        const activeBanners = medicines.filter(m => m.isInBanner).length;
        const totalViews = medicines.filter(m => m.isInBanner).reduce((sum, m) => sum + m.views, 0);
        const totalSales = medicines.filter(m => m.isInBanner).reduce((sum, m) => sum + m.sales, 0);

        return {
            active: activeBanners,
            inactive: medicines.length - activeBanners,
            totalViews,
            totalSales
        };
    };

    const stats = getBannerStats();

    // Get unique categories for filter
    const categories = [...new Set(medicines.map(m => m.category))];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Manage Banner Advertisement
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Control which medicines appear in the homepage banner slider
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaImage className="h-8 w-8 text-green-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Banners</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-bold text-sm">I</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inactive</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inactive}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">👁</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalViews.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold text-sm">💰</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Banner Sales</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSales}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div>
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search medicines..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <div className="relative">
                            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Banner Status Filter */}
                    <div>
                        <div className="relative">
                            <FaToggleOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                value={bannerFilter}
                                onChange={(e) => setBannerFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active in Banner</option>
                                <option value="inactive">Not in Banner</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Current Banner Preview */}
            {stats.active > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Current Banner Medicines ({stats.active})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {medicines.filter(m => m.isInBanner).map(medicine => (
                            <div key={medicine.id} className="relative bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                <img
                                    src={medicine.medicineImage}
                                    alt={medicine.medicineName}
                                    className="w-full h-24 object-cover rounded-md mb-2"
                                />
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {medicine.medicineName}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {medicine.views} views • {medicine.sales} sales
                                </p>
                                <button
                                    onClick={() => handleToggleBanner(medicine.id)}
                                    className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                                    title="Remove from banner"
                                >
                                    <FaToggleOff className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Banner Management Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Medicine Advertisement Management ({filteredMedicines.length})
                    </h3>
                </div>
                <BannerTable
                    banners={filteredMedicines}
                    onToggleBanner={handleToggleBanner}
                    loading={loading}
                />
            </div>

            {/* Banner Guidelines */}
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-4">
                    Banner Advertisement Guidelines
                </h3>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                    <li>• Featured medicines will appear in the homepage banner slider</li>
                    <li>• Banner images should be high quality and properly formatted</li>
                    <li>• Maximum of 6 medicines can be active in banner at once</li>
                    <li>• Medicines with higher sales and views get priority positioning</li>
                    <li>• Banner rotation happens every 5 seconds on the homepage</li>
                    <li>• Analytics are tracked for banner performance</li>
                </ul>
            </div>
        </div>
    );
};

export default ManageBanner;
