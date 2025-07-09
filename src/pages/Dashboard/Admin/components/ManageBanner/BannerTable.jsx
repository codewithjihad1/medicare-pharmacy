import React from 'react';
import { FaToggleOn, FaToggleOff, FaEye } from 'react-icons/fa';

const BannerTable = ({ banners, onToggleBanner, loading }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Medicine
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Seller
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Banner Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {banners.map((banner) => (
                        <tr key={banner.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img
                                        src={banner.medicineImage || 'https://via.placeholder.com/60x60?text=Med'}
                                        alt={banner.medicineName}
                                        className="h-12 w-12 rounded-lg object-cover"
                                    />
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {banner.medicineName}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {banner.category}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-900 dark:text-white max-w-xs">
                                    {banner.description}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {banner.sellerName}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {banner.sellerEmail}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-bold text-green-600">
                                    ${banner.price.toFixed(2)}
                                </div>
                                {banner.discount > 0 && (
                                    <div className="text-xs text-red-500">
                                        {banner.discount}% OFF
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${banner.isInBanner
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                    }`}>
                                    {banner.isInBanner ? 'Active in Banner' : 'Not in Banner'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-3">
                                    {/* Toggle Banner Button */}
                                    <button
                                        onClick={() => onToggleBanner(banner.id)}
                                        className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${banner.isInBanner
                                                ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300'
                                                : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
                                            }`}
                                        title={banner.isInBanner ? 'Remove from banner' : 'Add to banner'}
                                    >
                                        {banner.isInBanner ? (
                                            <>
                                                <FaToggleOff className="mr-1 h-4 w-4" />
                                                Remove
                                            </>
                                        ) : (
                                            <>
                                                <FaToggleOn className="mr-1 h-4 w-4" />
                                                Add
                                            </>
                                        )}
                                    </button>

                                    {/* Preview Button */}
                                    <button
                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900"
                                        title="Preview medicine"
                                    >
                                        <FaEye className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {banners.length === 0 && (
                <div className="text-center py-8">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                        <span className="text-gray-400 text-xl">🏷️</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">No medicines available for banner</p>
                </div>
            )}
        </div>
    );
};

export default BannerTable;
