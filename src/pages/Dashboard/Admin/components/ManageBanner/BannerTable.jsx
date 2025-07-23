import React from 'react';
import { FaToggleOn, FaToggleOff, FaEye, FaCalendarAlt, FaDollarSign, FaChartLine } from 'react-icons/fa';

const BannerTable = ({ banners, onToggleBanner, loading, isUpdating }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400"></div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Loading advertisements...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Advertisement
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Description & Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Seller Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Budget & Performance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {banners?.length > 0 && banners?.map((banner) => (
                        <tr key={banner._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={banner?.medicineImage}
                                        alt={banner?.medicineName}
                                        className="h-16 w-16 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {banner?.medicineName}
                                        </div>
                                        <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                            {banner?.title}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-900 dark:text-white max-w-xs">
                                    <p className="line-clamp-2 mb-2">{banner?.description}</p>
                                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center">
                                            <FaCalendarAlt className="h-3 w-3 mr-1" />
                                            {banner?.duration} days
                                        </div>
                                        <div>
                                            {new Date(banner?.startDate).toLocaleDateString()} - {new Date(banner?.endDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {banner?.sellerName}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {banner?.sellerEmail}
                                    </div>
                                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                        Submitted: {new Date(banner?.submittedAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm font-bold text-green-600 dark:text-green-400">
                                        <FaDollarSign className="h-3 w-3 mr-1" />
                                        {banner?.budget?.toFixed(2)}
                                    </div>
                                    <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center">
                                            <FaChartLine className="h-3 w-3 mr-1" />
                                            {banner?.impressions || 0} views
                                        </div>
                                        <div>
                                            👆 {banner?.clicks || 0} clicks
                                        </div>
                                    </div>
                                    {banner?.conversions > 0 && (
                                        <div className="text-xs text-purple-600 dark:text-purple-400">
                                            🎯 {banner?.conversions} conversions
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="space-y-2">
                                    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full border ${banner?.status === 'approved'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 border-green-200 dark:border-green-700'
                                            : banner?.status === 'pending'
                                                ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200 border-orange-200 dark:border-orange-700'
                                                : banner?.status === 'rejected'
                                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 border-red-200 dark:border-red-700'
                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200 border-gray-200 dark:border-gray-700'
                                        }`}>
                                        {banner?.status?.charAt(0).toUpperCase() + banner?.status?.slice(1)}
                                    </span>
                                    {banner?.status === 'approved' && (
                                        <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                                            🎯 Active in Banner
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-3">
                                    {/* Toggle Banner Button */}
                                    <button
                                        onClick={() => onToggleBanner(banner?._id)}
                                        disabled={isUpdating}
                                        className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${banner?.status === 'approved'
                                                ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900'
                                                : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900'
                                            }`}
                                        title={banner?.status === 'approved' ? 'Remove from banner' : 'Add to banner'}
                                    >
                                        {banner?.status === 'approved' ? (
                                            <>
                                                <FaToggleOff className="mr-1.5 h-4 w-4" />
                                                Remove
                                            </>
                                        ) : (
                                            <>
                                                <FaToggleOn className="mr-1.5 h-4 w-4" />
                                                Approve
                                            </>
                                        )}
                                    </button>

                                    {/* Preview Button */}
                                    <button
                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                                        title="Preview advertisement"
                                    >
                                        <FaEye className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {banners?.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-gray-800">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                        <span className="text-gray-400 dark:text-gray-500 text-2xl">📢</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No advertisements found</h3>
                    <p className="text-gray-500 dark:text-gray-400">No advertisement requests match your current filters.</p>
                </div>
            )}
        </div>
    );
};

export default BannerTable;
