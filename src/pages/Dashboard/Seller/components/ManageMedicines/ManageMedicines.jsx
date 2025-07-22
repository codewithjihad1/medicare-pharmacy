import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaFilter, FaPills } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import MedicineTable from './MedicineTable';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../../api/axiosInstance';
import { useAuth } from '../../../../../hooks/useAuth';
import AddOrEditMedicine from './AddOrEditMedicine';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ManageMedicines = () => {
    const { user } = useAuth();
    const [medicines, setMedicines] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMedicine, setEditingMedicine] = useState(null);
    const [viewingMedicine, setViewingMedicine] = useState(null);
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    // get medicines
    const { data: medicinesData, isLoading: isMedicinesLoading, refetch: refetchMedicines } = useQuery({
        queryKey: ['medicines'],
        enabled: !!user?.email,
        queryFn: async () => {
            const response = await axiosInstance.get(`/medicines/${user?.email}`)
            return response.data;
        }
    });

    // get categories
    const { data: categories, isLoading: isCategoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await axiosInstance.get('/categories');
            return response.data;
        }
    });

    useEffect(() => {
        if (medicinesData) {
            setMedicines(medicinesData);
            setFilteredMedicines(medicinesData);
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
    // Add & update medicine using TanStack Query mutations



    // Mutation for adding medicine
    const addMedicineMutation = useMutation({
        mutationFn: async (newMedicine) => {
            const response = await axiosInstance.post('/medicines', newMedicine);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['medicines']);
            toast.success('Medicine added successfully');
        },
        onError: () => {
            toast.error('Failed to add medicine');
        }
    });

    // Mutation for updating medicine
    const updateMedicineMutation = useMutation({
        mutationFn: async ({ id, updatedData }) => {
            const response = await axiosInstance.put(`/medicines/${id}`, updatedData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['medicines']);
            toast.success('Medicine updated successfully');
        },
        onError: () => {
            toast.error('Failed to update medicine');
        }
    });

    const onSubmit = async (data) => {
        try {
            if (editingMedicine) {
                // Update existing medicine
                await updateMedicineMutation.mutateAsync({
                    id: editingMedicine._id,
                    updatedData: {
                        ...editingMedicine,
                        ...data,
                        stockQuantity: parseInt(data.stockQuantity),
                        pricePerUnit: parseFloat(data.pricePerUnit),
                        discount: parseFloat(data.discount) || 0,
                    }
                });
            } else {
                // Add new medicine
                await addMedicineMutation.mutateAsync({
                    ...data,
                    stockQuantity: parseInt(data.stockQuantity),
                    pricePerUnit: parseFloat(data.pricePerUnit),
                    discount: parseFloat(data.discount) || 0,
                    createdAt: new Date().toISOString(),
                    seller: {
                        email: user?.email,
                        displayName: user?.displayName || 'Unknown Seller',
                        photoURL: user?.photoURL || ''
                    }
                });
            }

            refetchMedicines();
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
        setValue('price', medicine.pricePerUnit); // updated field
        setValue('discount', medicine.discount);
        setValue('stock', medicine.stockQuantity); // updated field
        setIsModalOpen(true);
    };

    // Handle delete medicine
    const handleDeleteMedicine = async (medicineId) => {
        if (window.confirm('Are you sure you want to delete this medicine? This action cannot be undone.')) {
            try {
                setMedicines(prevMedicines =>
                    prevMedicines.filter(med => med._id !== medicineId)
                );
                await axiosInstance.delete(`/medicines/${medicineId}`);
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
                                {categories?.map(category => (
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
            {isModalOpen && <AddOrEditMedicine medicine={editingMedicine} onClose={closeModal} register={register} handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit} categories={categories} />}

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
                                    <p className="text-gray-900 dark:text-white">${viewingMedicine.pricePerUnit}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600 dark:text-gray-400">Stock:</span>
                                    <p className="text-gray-900 dark:text-white">{viewingMedicine.stockQuantity} units</p>
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
