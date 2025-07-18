import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaFilter, FaPills } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import MedicineTable from './MedicineTable';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../../api/axiosInstance';
import { useAuth } from '../../../../../hooks/useAuth';

// Mock medicines data for seller
const mockMedicines = [
    {
        id: 1,
        name: 'Paracetamol 500mg',
        genericName: 'Acetaminophen',
        description: 'Effective pain reliever and fever reducer for adults and children',
        image: 'https://via.placeholder.com/300x200?text=Paracetamol',
        category: 'tablet',
        company: 'Square Pharmaceuticals',
        massUnit: '500mg',
        price: 2.50,
        discount: 10,
        stock: 150,
        status: 'active',
        createdAt: '2024-07-01T10:30:00Z'
    },
    {
        id: 2,
        name: 'Vitamin D3 Capsules',
        genericName: 'Cholecalciferol',
        description: 'Essential vitamin for bone health and immune system support',
        image: 'https://via.placeholder.com/300x200?text=Vitamin+D3',
        category: 'capsule',
        company: 'Incepta Pharmaceuticals',
        massUnit: '1000 IU',
        price: 8.50,
        discount: 0,
        stock: 75,
        status: 'active',
        createdAt: '2024-07-02T14:45:00Z'
    },
    {
        id: 3,
        name: 'Amoxicillin Syrup',
        genericName: 'Amoxicillin',
        description: 'Antibiotic syrup for treating bacterial infections',
        image: 'https://via.placeholder.com/300x200?text=Amoxicillin',
        category: 'syrup',
        company: 'Beximco Pharmaceuticals',
        massUnit: '250mg/5ml',
        price: 15.75,
        discount: 5,
        stock: 8,
        status: 'active',
        createdAt: '2024-06-28T09:15:00Z'
    },
    {
        id: 4,
        name: 'Insulin Injection',
        genericName: 'Human Insulin',
        description: 'Fast-acting insulin for diabetes management',
        image: 'https://via.placeholder.com/300x200?text=Insulin',
        category: 'injection',
        company: 'Novo Nordisk',
        massUnit: '100 IU/ml',
        price: 45.00,
        discount: 15,
        stock: 25,
        status: 'pending',
        createdAt: '2024-06-25T16:20:00Z'
    }
];

// Mock categories and companies
const categories = [
    { value: 'tablet', label: 'Tablet' },
    { value: 'capsule', label: 'Capsule' },
    { value: 'syrup', label: 'Syrup' },
    { value: 'injection', label: 'Injection' },
    { value: 'cream', label: 'Cream/Ointment' },
    { value: 'drops', label: 'Drops' }
];

const companies = [
    { value: 'square', label: 'Square Pharmaceuticals' },
    { value: 'incepta', label: 'Incepta Pharmaceuticals' },
    { value: 'beximco', label: 'Beximco Pharmaceuticals' },
    { value: 'novonordisk', label: 'Novo Nordisk' },
    { value: 'pfizer', label: 'Pfizer' },
    { value: 'glaxo', label: 'GlaxoSmithKline' }
];

const ManageMedicines = () => {
    const { user } = useAuth();
    const [medicines, setMedicines] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMedicine, setEditingMedicine] = useState(null);
    const [viewingMedicine, setViewingMedicine] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    const { data: medicinesData, isLoading: isMedicinesLoading } = useQuery({
        queryKey: ['medicines'],
        enabled: !!user?.email,
        queryFn: async () => {
            const response = await axiosInstance.get(`/medicines/${user?.email}`)
            return response.data;
        }
    });

    useEffect(() => {
        if (medicinesData) {
            setMedicines(medicinesData);
            setFilteredMedicines(medicinesData);
            setLoading(false);
        }
    }, [medicinesData]);

    // Filter medicines based on search term, category, and status
    useEffect(() => {
        let filtered = medicines;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(medicine =>
                medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine.company.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(medicine => medicine.category === categoryFilter);
        }

        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(medicine => medicine.status === statusFilter);
        }

        setFilteredMedicines(filtered);
    }, [medicines, searchTerm, categoryFilter, statusFilter]);

    // Handle form submission (add/edit medicine)
    const onSubmit = async (data) => {
        try {
            if (editingMedicine) {
                // Update existing medicine
                setMedicines(prevMedicines =>
                    prevMedicines.map(med =>
                        med.id === editingMedicine.id
                            ? { ...med, ...data }
                            : med
                    )
                );
                toast.success('Medicine updated successfully');
            } else {
                // Add new medicine
                const newMedicine = {
                    id: Date.now(),
                    ...data,
                    status: 'pending',
                    stock: parseInt(data.stock),
                    price: parseFloat(data.price),
                    discount: parseFloat(data.discount) || 0,
                    createdAt: new Date().toISOString()
                };
                setMedicines(prevMedicines => [...prevMedicines, newMedicine]);
                toast.success('Medicine added successfully');
            }

            setIsModalOpen(false);
            setEditingMedicine(null);
            reset();
        } catch (error) {
            console.error('Error saving medicine:', error);
            toast.error('Failed to save medicine');
        }
    };

    // Handle edit medicine
    const handleEditMedicine = (medicine) => {
        setEditingMedicine(medicine);
        setValue('name', medicine.name);
        setValue('genericName', medicine.genericName);
        setValue('description', medicine.description);
        setValue('image', medicine.image);
        setValue('category', medicine.category);
        setValue('company', medicine.company);
        setValue('massUnit', medicine.massUnit);
        setValue('price', medicine.price);
        setValue('discount', medicine.discount);
        setValue('stock', medicine.stock);
        setIsModalOpen(true);
    };

    // Handle delete medicine
    const handleDeleteMedicine = async (medicineId) => {
        if (window.confirm('Are you sure you want to delete this medicine? This action cannot be undone.')) {
            try {
                setMedicines(prevMedicines =>
                    prevMedicines.filter(med => med.id !== medicineId)
                );
                toast.success('Medicine deleted successfully');
            } catch (error) {
                console.error('Error deleting medicine:', error);
                toast.error('Failed to delete medicine');
            }
        }
    };

    // Handle view medicine
    const handleViewMedicine = (medicine) => {
        setViewingMedicine(medicine);
    };

    // Close modal and reset form
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMedicine(null);
        reset();
    };

    // Get medicine statistics
    const getMedicineStats = () => {
        const total = medicines.length;
        const active = medicines.filter(m => m.status === 'active').length;
        const pending = medicines.filter(m => m.status === 'pending').length;
        const lowStock = medicines.filter(m => m.stock < 10).length;

        return { total, active, pending, lowStock };
    };

    const stats = getMedicineStats();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Manage Medicines
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Add, edit, and manage your medicine inventory
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <FaPlus className="mr-2 h-4 w-4" />
                    Add Medicine
                </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaPills className="h-8 w-8 text-blue-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Medicines</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold text-sm">✓</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-600 font-bold text-sm">⏳</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-600 font-bold text-sm">⚠</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.lowStock}</p>
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
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <div className="relative">
                            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Medicines Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Your Medicines ({filteredMedicines.length})
                    </h3>
                </div>
                <MedicineTable
                    medicines={filteredMedicines}
                    onEditMedicine={handleEditMedicine}
                    onDeleteMedicine={handleDeleteMedicine}
                    onViewMedicine={handleViewMedicine}
                    loading={isMedicinesLoading}
                />
            </div>

            {/* Add/Edit Medicine Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                            {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Medicine Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Medicine Name *
                                    </label>
                                    <input
                                        type="text"
                                        {...register('name', { required: 'Medicine name is required' })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        placeholder="Enter medicine name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                {/* Generic Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Generic Name *
                                    </label>
                                    <input
                                        type="text"
                                        {...register('genericName', { required: 'Generic name is required' })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        placeholder="Enter generic name"
                                    />
                                    {errors.genericName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.genericName.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Short Description
                                </label>
                                <textarea
                                    {...register('description')}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter medicine description"
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Category *
                                    </label>
                                    <select
                                        {...register('category', { required: 'Category is required' })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map(category => (
                                            <option key={category.value} value={category.value}>
                                                {category.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
                                    )}
                                </div>

                                {/* Company */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Company *
                                    </label>
                                    <select
                                        {...register('company', { required: 'Company is required' })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="">Select company</option>
                                        {companies.map(company => (
                                            <option key={company.value} value={company.label}>
                                                {company.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.company && (
                                        <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Mass Unit */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Mass Unit *
                                    </label>
                                    <input
                                        type="text"
                                        {...register('massUnit', { required: 'Mass unit is required' })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        placeholder="e.g., 500mg, 5ml"
                                    />
                                    {errors.massUnit && (
                                        <p className="text-red-500 text-xs mt-1">{errors.massUnit.message}</p>
                                    )}
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Price per Unit ($) *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        {...register('price', { required: 'Price is required', min: 0 })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        placeholder="0.00"
                                    />
                                    {errors.price && (
                                        <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
                                    )}
                                </div>

                                {/* Discount */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Discount (%)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        defaultValue="0"
                                        {...register('discount', { min: 0, max: 100 })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        placeholder="0"
                                    />
                                    {errors.discount && (
                                        <p className="text-red-500 text-xs mt-1">{errors.discount.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Stock */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Stock Quantity *
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    {...register('stock', { required: 'Stock quantity is required', min: 0 })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter stock quantity"
                                />
                                {errors.stock && (
                                    <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-3 pt-6">
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
                                    {editingMedicine ? 'Update' : 'Add'} Medicine
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Medicine Modal */}
            {viewingMedicine && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Medicine Details
                        </h2>

                        <div className="space-y-4">
                            <img
                                src={viewingMedicine.image || 'https://via.placeholder.com/300x200?text=Medicine'}
                                alt={viewingMedicine.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />

                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                    {viewingMedicine.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {viewingMedicine.genericName}
                                </p>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300">
                                {viewingMedicine.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium text-gray-600 dark:text-gray-400">Category:</span>
                                    <p className="text-gray-900 dark:text-white">{viewingMedicine.category}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600 dark:text-gray-400">Company:</span>
                                    <p className="text-gray-900 dark:text-white">{viewingMedicine.company}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600 dark:text-gray-400">Price:</span>
                                    <p className="text-gray-900 dark:text-white">${viewingMedicine.price}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600 dark:text-gray-400">Stock:</span>
                                    <p className="text-gray-900 dark:text-white">{viewingMedicine.stock} units</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setViewingMedicine(null)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMedicines;
