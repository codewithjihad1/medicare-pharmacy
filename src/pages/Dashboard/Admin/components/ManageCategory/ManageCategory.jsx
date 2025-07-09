import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaTags } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CategoryTable from './CategoryTable';

// Mock categories data
const mockCategories = [
    {
        id: 1,
        name: 'Tablets',
        slug: 'tablets',
        description: 'Oral solid dosage forms including coated and uncoated tablets',
        image: 'https://via.placeholder.com/100x100?text=Tablets',
        productCount: 245,
        createdAt: '2024-01-15T10:30:00Z'
    },
    {
        id: 2,
        name: 'Capsules',
        slug: 'capsules',
        description: 'Hard and soft capsules for oral administration',
        image: 'https://via.placeholder.com/100x100?text=Capsules',
        productCount: 156,
        createdAt: '2024-01-20T14:45:00Z'
    },
    {
        id: 3,
        name: 'Syrups',
        slug: 'syrups',
        description: 'Liquid preparations for oral administration',
        image: 'https://via.placeholder.com/100x100?text=Syrups',
        productCount: 89,
        createdAt: '2024-02-01T09:15:00Z'
    },
    {
        id: 4,
        name: 'Injections',
        slug: 'injections',
        description: 'Injectable preparations for parenteral administration',
        image: 'https://via.placeholder.com/100x100?text=Injections',
        productCount: 67,
        createdAt: '2024-02-10T16:20:00Z'
    },
    {
        id: 5,
        name: 'Creams & Ointments',
        slug: 'creams-ointments',
        description: 'Topical preparations for external application',
        image: 'https://via.placeholder.com/100x100?text=Creams',
        productCount: 134,
        createdAt: '2024-02-15T11:30:00Z'
    }
];

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setCategories(mockCategories);
            setFilteredCategories(mockCategories);
            setLoading(false);
        }, 1000);
    }, []);

    // Filter categories based on search term
    useEffect(() => {
        if (searchTerm) {
            const filtered = categories.filter(category =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCategories(filtered);
        } else {
            setFilteredCategories(categories);
        }
    }, [categories, searchTerm]);

    // Handle form submission (add/edit category)
    const onSubmit = async (data) => {
        try {
            if (editingCategory) {
                // Update existing category
                setCategories(prevCategories =>
                    prevCategories.map(cat =>
                        cat.id === editingCategory.id
                            ? { ...cat, ...data, slug: data.name.toLowerCase().replace(/\s+/g, '-') }
                            : cat
                    )
                );
                toast.success('Category updated successfully');
            } else {
                // Add new category
                const newCategory = {
                    id: Date.now(),
                    ...data,
                    slug: data.name.toLowerCase().replace(/\s+/g, '-'),
                    productCount: 0,
                    createdAt: new Date().toISOString()
                };
                setCategories(prevCategories => [...prevCategories, newCategory]);
                toast.success('Category added successfully');
            }

            setIsModalOpen(false);
            setEditingCategory(null);
            reset();
        } catch (error) {
            console.error('Error saving category:', error);
            toast.error('Failed to save category');
        }
    };

    // Handle edit category
    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setValue('name', category.name);
        setValue('description', category.description);
        setValue('image', category.image);
        setIsModalOpen(true);
    };

    // Handle delete category
    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
            try {
                setCategories(prevCategories =>
                    prevCategories.filter(cat => cat.id !== categoryId)
                );
                toast.success('Category deleted successfully');
            } catch (error) {
                console.error('Error deleting category:', error);
                toast.error('Failed to delete category');
            }
        }
    };

    // Close modal and reset form
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        reset();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Manage Categories
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Organize medicines by categories
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <FaPlus className="mr-2 h-4 w-4" />
                    Add Category
                </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaTags className="h-8 w-8 text-blue-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Categories</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold text-sm">P</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-bold text-sm">A</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Products/Category</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {categories.length > 0 ? Math.round(categories.reduce((sum, cat) => sum + cat.productCount, 0) / categories.length) : 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Categories ({filteredCategories.length})
                    </h3>
                </div>
                <CategoryTable
                    categories={filteredCategories}
                    onEditCategory={handleEditCategory}
                    onDeleteCategory={handleDeleteCategory}
                    loading={loading}
                />
            </div>

            {/* Add/Edit Category Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            {editingCategory ? 'Edit Category' : 'Add New Category'}
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Category Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Category Name *
                                </label>
                                <input
                                    type="text"
                                    {...register('name', { required: 'Category name is required' })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter category name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    {...register('description')}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter category description"
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    {...register('image')}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter image URL"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    {editingCategory ? 'Update' : 'Add'} Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCategory;
