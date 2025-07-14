import React from 'react'
import { FaArrowRight } from 'react-icons/fa';

const CategoryCard = ({ category, handleCategoryClick, getColorClasses }) => {
    const colorClasses = getColorClasses(category.color);

    return (
        <div
            key={category._id}
            onClick={() => handleCategoryClick(category)}
            className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-750"
        >
            {/* Category Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={category.image}
                    alt={category.slug}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${colorClasses.gradient} opacity-80`}></div>

                {/* Icon Overlay */}
                <div className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-sm rounded-full">
                    {category?.icon}
                </div>

                {/* Medicine Count Badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                    <span className="text-sm font-semibold text-gray-900">
                        {category.medicineCount} medicines
                    </span>
                </div>
            </div>

            {/* Category Info */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors duration-200">
                        {category.name}
                    </h3>
                    <FaArrowRight className={`w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 ${colorClasses.text}`} />
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {category.description}
                </p>

                {/* Stats */}
                <div className={`flex items-center justify-between p-3 rounded-lg ${colorClasses.bg}`}>
                    <div className="flex items-center space-x-2">
                        <i>{category?.icon}</i>
                        <span className={`text-sm font-medium ${colorClasses.text}`}>
                            Available Now
                        </span>
                    </div>
                    <span className={`text-lg font-bold ${colorClasses.text}`}>
                        {category.medicineCount}
                    </span>
                </div>
            </div>

            {/* Hover Effect Border */}
            <div className={`absolute inset-0 border-2 border-transparent group-hover:${colorClasses.border} rounded-xl transition-all duration-200 pointer-events-none`}></div>
        </div>
    )
}

export default CategoryCard
