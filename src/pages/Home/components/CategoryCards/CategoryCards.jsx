import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FaTablets, FaFlask, FaCapsules, FaSyringe, FaPrescriptionBottleAlt, FaArrowRight } from 'react-icons/fa';
import useTheme from '../../../../hooks/useTheme';
import CategoryCard from './CategoryCard';

// Mock data for development - Replace with actual API call
const mockCategories = [
    {
        _id: '1',
        categoryName: 'Tablets',
        categoryImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400',
        medicineCount: 145,
        icon: FaTablets,
        description: 'Oral solid dosage forms for various treatments',
        color: 'blue'
    },
    {
        _id: '2',
        categoryName: 'Syrups',
        categoryImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=400',
        medicineCount: 87,
        icon: FaFlask,
        description: 'Liquid medications for easier consumption',
        color: 'purple'
    },
    {
        _id: '3',
        categoryName: 'Capsules',
        categoryImage: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=400',
        medicineCount: 112,
        icon: FaCapsules,
        description: 'Encapsulated medicines for targeted delivery',
        color: 'green'
    },
    {
        _id: '4',
        categoryName: 'Injections',
        categoryImage: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=400',
        medicineCount: 64,
        icon: FaSyringe,
        description: 'Injectable medications for immediate effect',
        color: 'red'
    },
    {
        _id: '5',
        categoryName: 'Drops',
        categoryImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400',
        medicineCount: 43,
        icon: FaPrescriptionBottleAlt,
        description: 'Eye, ear, and nasal drops for targeted treatment',
        color: 'indigo'
    },
    {
        _id: '6',
        categoryName: 'Others',
        categoryImage: 'https://images.unsplash.com/photo-1550572017-edd951aa8700?q=80&w=400',
        medicineCount: 76,
        icon: FaPrescriptionBottleAlt,
        description: 'Creams, ointments, and other specialized forms',
        color: 'orange'
    }
];

const CategoryCards = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate API call to fetch categories
        const fetchCategories = async () => {
            try {
                setLoading(true);
                // TODO: Replace with actual API call
                // const response = await fetch('/api/categories');
                // const data = await response.json();

                // For now, using mock data
                setTimeout(() => {
                    setCategories(mockCategories);
                    setLoading(false);
                }, 800);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (category) => {
        // Navigate to category details page
        navigate(`/category/${category.categoryName.toLowerCase()}`, {
            state: { categoryId: category._id, categoryName: category.categoryName }
        });
    };

    const getColorClasses = (color) => {
        const colors = {
            blue: {
                gradient: theme === 'dark' ? 'from-blue-600 to-blue-800' : 'from-blue-500 to-blue-700',
                border: theme === 'dark' ? 'border-blue-400' : 'border-blue-500',
                text: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
                bg: theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'
            },
            purple: {
                gradient: theme === 'dark' ? 'from-purple-600 to-purple-800' : 'from-purple-500 to-purple-700',
                border: theme === 'dark' ? 'border-purple-400' : 'border-purple-500',
                text: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
                bg: theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50'
            },
            green: {
                gradient: theme === 'dark' ? 'from-green-600 to-green-800' : 'from-green-500 to-green-700',
                border: theme === 'dark' ? 'border-green-400' : 'border-green-500',
                text: theme === 'dark' ? 'text-green-400' : 'text-green-600',
                bg: theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'
            },
            red: {
                gradient: theme === 'dark' ? 'from-red-600 to-red-800' : 'from-red-500 to-red-700',
                border: theme === 'dark' ? 'border-red-400' : 'border-red-500',
                text: theme === 'dark' ? 'text-red-400' : 'text-red-600',
                bg: theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'
            },
            indigo: {
                gradient: theme === 'dark' ? 'from-indigo-600 to-indigo-800' : 'from-indigo-500 to-indigo-700',
                border: theme === 'dark' ? 'border-indigo-400' : 'border-indigo-500',
                text: theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600',
                bg: theme === 'dark' ? 'bg-indigo-900/20' : 'bg-indigo-50'
            },
            orange: {
                gradient: theme === 'dark' ? 'from-orange-600 to-orange-800' : 'from-orange-500 to-orange-700',
                border: theme === 'dark' ? 'border-orange-400' : 'border-orange-500',
                text: theme === 'dark' ? 'text-orange-400' : 'text-orange-600',
                bg: theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50'
            }
        };
        return colors[color] || colors.blue;
    };

    if (loading) {
        return (
            <section className={
                theme === 'dark'
                    ? 'py-16 bg-gray-900'
                    : 'py-16 bg-gray-50'
            }>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className={
                            theme === 'dark'
                                ? 'h-8 bg-gray-700 rounded w-64 mx-auto mb-4 animate-pulse'
                                : 'h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse'
                        }></div>
                        <div className={
                            theme === 'dark'
                                ? 'h-4 bg-gray-700 rounded w-96 mx-auto animate-pulse'
                                : 'h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse'
                        }></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className={
                                theme === 'dark'
                                    ? 'bg-gray-800 rounded-xl p-6 animate-pulse'
                                    : 'bg-white rounded-xl p-6 shadow-md animate-pulse'
                            }>
                                <div className={
                                    theme === 'dark'
                                        ? 'h-32 bg-gray-700 rounded-lg mb-4'
                                        : 'h-32 bg-gray-200 rounded-lg mb-4'
                                }></div>
                                <div className={
                                    theme === 'dark'
                                        ? 'h-6 bg-gray-700 rounded mb-2'
                                        : 'h-6 bg-gray-200 rounded mb-2'
                                }></div>
                                <div className={
                                    theme === 'dark'
                                        ? 'h-4 bg-gray-700 rounded w-3/4'
                                        : 'h-4 bg-gray-200 rounded w-3/4'
                                }></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={
            theme === 'dark'
                ? 'py-16 bg-gray-900'
                : 'py-16 bg-gray-50'
        }>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className={
                        theme === 'dark'
                            ? 'text-4xl font-bold text-white mb-4'
                            : 'text-4xl font-bold text-gray-900 mb-4'
                    }>
                        Medicine Categories
                    </h2>
                    <p className={
                        theme === 'dark'
                            ? 'text-xl text-gray-300 max-w-2xl mx-auto'
                            : 'text-xl text-gray-600 max-w-2xl mx-auto'
                    }>
                        Browse our comprehensive collection of medicines organized by category
                    </p>
                </div>

                {/* Category Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <CategoryCard key={category._id} category={category} handleCategoryClick={handleCategoryClick} getColorClasses={getColorClasses} />))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <p className={
                        theme === 'dark'
                            ? 'text-gray-300 mb-6'
                            : 'text-gray-600 mb-6'
                    }>
                        Can't find what you're looking for?
                    </p>
                    <button
                        onClick={() => navigate('/shop')}
                        className={
                            theme === 'dark'
                                ? 'px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200'
                                : 'px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200'
                        }
                    >
                        Browse All Medicines
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CategoryCards;
