import React, { useState, useMemo } from 'react';
import { FaSearch, FaFilter, FaImage, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import BannerTable from './BannerTable';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';

const ManageBanner = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [bannerFilter, setBannerFilter] = useState('all');

    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch advertisement requests
    const { data: advertisements = [], isLoading, error } = useQuery({
        queryKey: ['admin-advertisements'],
        queryFn: async () => {
            const response = await axiosSecure.get('/advertise-requests');
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Toggle banner status mutation
    const toggleBannerMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const response = await axiosSecure.patch(`/advertise-requests/${id}/status`, {
                status: status,
                reviewedAt: new Date().toISOString(),
                adminNote: status === 'approved' ? 'Added to banner slider' : 'Removed from banner slider'
            });
            return response.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['admin-advertisements']);
            const action = variables.status === 'approved' ? 'added to' : 'removed from';
            toast.success(`Advertisement ${action} banner slider successfully`);
        },
        onError: (error) => {
            console.error('Error updating banner status:', error);
            toast.error('Failed to update banner status');
        },
    });

    // Filter advertisements based on search term, status, and banner status
    const filteredAdvertisements = useMemo(() => {
        let filtered = advertisements;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(ad =>
                ad.medicineName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ad.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ad.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ad.sellerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ad.sellerName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(ad => ad.status === statusFilter);
        }

        // Filter by banner status (approved = in banner, others = not in banner)
        if (bannerFilter !== 'all') {
            filtered = filtered.filter(ad =>
                bannerFilter === 'active' ? ad.status === 'approved' : ad.status !== 'approved'
            );
        }

        return filtered;
    }, [advertisements, searchTerm, statusFilter, bannerFilter]);

    // Handle toggle banner status
    const handleToggleBanner = async (advertisementId) => {
        try {
            const advertisement = advertisements.find(ad => ad._id === advertisementId);
            if (!advertisement) {
                toast.error('Advertisement not found');
                return;
            }

            const newStatus = advertisement.status === 'approved' ? 'pending' : 'approved';
            toggleBannerMutation.mutate({
                id: advertisementId,
                status: newStatus
            });
        } catch (error) {
            console.error('Error toggling banner status:', error);
            toast.error('Failed to update banner status');
        }
    };

    // Get banner statistics
    const getBannerStats = useMemo(() => {
        const activeBanners = advertisements.filter(ad => ad.status === 'approved').length;
        const totalPending = advertisements.filter(ad => ad.status === 'pending').length;
        const totalClicks = advertisements.filter(ad => ad.status === 'approved').reduce((sum, ad) => sum + (ad.clicks || 0), 0);
        const totalImpressions = advertisements.filter(ad => ad.status === 'approved').reduce((sum, ad) => sum + (ad.impressions || 0), 0);

        return {
            active: activeBanners,
            pending: totalPending,
            totalClicks,
            totalImpressions
        };
    }, [advertisements]);

    // Get unique statuses for filter
    const statuses = useMemo(() => {
        return [...new Set(advertisements.map(ad => ad.status))];
    }, [advertisements]);

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-red-600 dark:text-red-400 mb-2">Error loading advertisements</p>
                    <button
                        onClick={() => queryClient.invalidateQueries(['admin-advertisements'])}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Manage Banner Advertisement
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Control which advertisement requests appear in the homepage banner slider
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center">
                        <FaImage className="h-8 w-8 text-green-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active in Banner</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{getBannerStats.active}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center">
                            <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">P</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Review</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{getBannerStats.pending}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">👁</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Impressions</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{getBannerStats.totalImpressions.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                            <span className="text-green-600 dark:text-green-400 font-bold text-sm">�</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Clicks</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{getBannerStats.totalClicks.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Search Advertisements
                        </label>
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search by name, seller, description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Status Filter
                        </label>
                        <div className="relative">
                            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="all">All Status</option>
                                {statuses.map(status => (
                                    <option key={status} value={status}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Banner Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Banner Status
                        </label>
                        <div className="relative">
                            <FaToggleOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                value={bannerFilter}
                                onChange={(e) => setBannerFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="all">All Advertisements</option>
                                <option value="active">Active in Banner</option>
                                <option value="inactive">Not in Banner</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Current Banner Preview */}
            {getBannerStats.active > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Current Banner Advertisements ({getBannerStats.active})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {advertisements.filter(ad => ad.status === 'approved').map(advertisement => (
                            <div key={advertisement._id} className="relative bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                <img
                                    src={advertisement.medicineImage}
                                    alt={advertisement.medicineName}
                                    className="w-full h-32 object-cover rounded-md mb-3"
                                />
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate mb-1">
                                    {advertisement.medicineName}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                                    {advertisement.title}
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <span>By: {advertisement.sellerName}</span>
                                    <span>{advertisement.clicks || 0} clicks</span>
                                </div>
                                <button
                                    onClick={() => handleToggleBanner(advertisement._id)}
                                    className="absolute top-2 right-2 p-1.5 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
                                    title="Remove from banner"
                                    disabled={toggleBannerMutation.isLoading}
                                >
                                    <FaToggleOff className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Advertisement Management Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Advertisement Management ({filteredAdvertisements.length})
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Review and manage advertisement requests for homepage banner
                    </p>
                </div>
                <BannerTable
                    banners={filteredAdvertisements}
                    onToggleBanner={handleToggleBanner}
                    loading={isLoading}
                    isUpdating={toggleBannerMutation.isLoading}
                />
            </div>

            {/* Banner Guidelines */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                    <FaImage className="mr-2" />
                    Banner Advertisement Guidelines
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                        <li>• Approved advertisements appear in the homepage banner slider</li>
                        <li>• Medicine images should be high quality and properly formatted</li>
                        <li>• Review advertisement content before approval</li>
                        <li>• Monitor click-through rates and performance metrics</li>
                    </ul>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                        <li>• Banner rotation happens automatically every 5 seconds</li>
                        <li>• Sellers can track impressions and clicks</li>
                        <li>• Remove underperforming or inappropriate content</li>
                        <li>• Maintain quality standards for user experience</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ManageBanner;
