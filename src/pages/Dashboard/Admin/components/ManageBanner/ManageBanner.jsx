import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaImage, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import toast from 'react-hot-toast';
import BannerTable from './BannerTable';
import axiosInstance from '../../../../../api/axiosInstance';

const ManageBanner = () => {
    const [medicines, setMedicines] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [bannerFilter, setBannerFilter] = useState('all');

    useEffect(() => {
        const fetchMedicines = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/medicines');
                setMedicines(response.data);
            } catch (error) {
                console.error('Error fetching medicines:', error);
                toast.error('Failed to fetch medicines');
            } finally {
                setLoading(false);
            }
        };

        fetchMedicines();
    }, []);

    // Filter medicines based on search term, category, and banner status
    useEffect(() => {
        let filtered = medicines;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered?.filter(medicine =>
                medicine?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine?.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine?.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine?.genericName.toLowerCase().includes(searchTerm.toLowerCase())
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
            const medicine = medicines.find(m => m._id === medicineId);
            if (!medicine) throw new Error('Medicine not found');

            // Toggle banner status
            const updatedMedicine = {
                isInBanner: !medicine?.isInBanner,
                addedToBannerAt: !medicine?.isInBanner ? new Date().toISOString() : null
            };
            delete updatedMedicine._id;

            await axiosInstance.put(`/medicines/${medicineId}`, updatedMedicine);
            setMedicines(prevMedicines =>
                prevMedicines.map(m =>
                    m._id === medicineId ? updatedMedicine : m
                )
            );

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
                                {categories?.map(category => (
                                    <option key={category} value={category}>
                                        {category?.charAt(0).toUpperCase() + category?.slice(1)}
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
                                    src={medicine.image}
                                    alt={medicine.name}
                                    className="w-full h-24 object-cover rounded-md mb-2"
                                />
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {medicine.name}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {medicine.category}
                                </p>
                                <button
                                    onClick={() => handleToggleBanner(medicine._id)}
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
