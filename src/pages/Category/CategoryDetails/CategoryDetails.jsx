import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaList } from 'react-icons/fa';
import SearchFilter from '../../Shop/components/SearchFilter/SearchFilter';
import MedicineTable from '../../Shop/components/MedicineTable/MedicineTable';
import Pagination from '../../Shop/components/Pagination/Pagination';
import MedicineDetailModal from '../../Shop/components/MedicineModal/MedicineDetailModal';

// Mock data for medicines - In real app, this would come from API
const mockMedicines = [
    {
        id: 1,
        name: 'Paracetamol',
        genericName: 'Acetaminophen',
        company: 'Square Pharmaceuticals',
        category: 'tablet',
        description: 'Pain reliever and fever reducer',
        massUnit: '500mg',
        pricePerUnit: 2.50,
        discount: 10,
        image: 'https://via.placeholder.com/300x200?text=Paracetamol',
        inStock: true,
        stockQuantity: 500
    },
    {
        id: 2,
        name: 'Amoxicillin Syrup',
        genericName: 'Amoxicillin',
        company: 'Beximco Pharmaceuticals',
        category: 'syrup',
        description: 'Antibiotic for bacterial infections',
        massUnit: '250mg/5ml',
        pricePerUnit: 15.75,
        discount: 5,
        image: 'https://via.placeholder.com/300x200?text=Amoxicillin',
        inStock: true,
        stockQuantity: 120
    },
    {
        id: 3,
        name: 'Vitamin D3 Capsules',
        genericName: 'Cholecalciferol',
        company: 'Incepta Pharmaceuticals',
        category: 'capsule',
        description: 'Vitamin D3 supplement for bone health',
        massUnit: '1000 IU',
        pricePerUnit: 8.50,
        discount: 0,
        image: 'https://via.placeholder.com/300x200?text=Vitamin+D3',
        inStock: true,
        stockQuantity: 200
    },
    {
        id: 4,
        name: 'Insulin Injection',
        genericName: 'Human Insulin',
        company: 'Novo Nordisk',
        category: 'injection',
        description: 'Fast-acting insulin for diabetes management',
        massUnit: '100 units/ml',
        pricePerUnit: 45.00,
        discount: 0,
        image: 'https://via.placeholder.com/300x200?text=Insulin',
        inStock: true,
        stockQuantity: 50
    },
    {
        id: 5,
        name: 'Omeprazole',
        genericName: 'Omeprazole',
        company: 'ACI Limited',
        category: 'tablet',
        description: 'Proton pump inhibitor for acid reflux',
        massUnit: '20mg',
        pricePerUnit: 3.25,
        discount: 15,
        image: 'https://via.placeholder.com/300x200?text=Omeprazole',
        inStock: true,
        stockQuantity: 300
    },
    {
        id: 6,
        name: 'Cough Syrup',
        genericName: 'Dextromethorphan',
        company: 'Popular Pharmaceuticals',
        category: 'syrup',
        description: 'Cough suppressant and expectorant',
        massUnit: '15mg/5ml',
        pricePerUnit: 12.00,
        discount: 8,
        image: 'https://via.placeholder.com/300x200?text=Cough+Syrup',
        inStock: true,
        stockQuantity: 80
    },
    {
        id: 7,
        name: 'Aspirin',
        genericName: 'Acetylsalicylic Acid',
        company: 'Bayer',
        category: 'tablet',
        description: 'Anti-inflammatory and pain reliever',
        massUnit: '75mg',
        pricePerUnit: 1.80,
        discount: 5,
        image: 'https://via.placeholder.com/300x200?text=Aspirin',
        inStock: true,
        stockQuantity: 400
    },
    {
        id: 8,
        name: 'Iron Capsules',
        genericName: 'Ferrous Sulfate',
        company: 'Renata Pharmaceuticals',
        category: 'capsule',
        description: 'Iron supplement for anemia',
        massUnit: '325mg',
        pricePerUnit: 6.25,
        discount: 0,
        image: 'https://via.placeholder.com/300x200?text=Iron+Capsules',
        inStock: true,
        stockQuantity: 150
    },
    {
        id: 9,
        name: 'Antibiotic Injection',
        genericName: 'Ceftriaxone',
        company: 'Healthcare Pharmaceuticals',
        category: 'injection',
        description: 'Broad-spectrum antibiotic injection',
        massUnit: '1g',
        pricePerUnit: 25.00,
        discount: 0,
        image: 'https://via.placeholder.com/300x200?text=Antibiotic+Injection',
        inStock: true,
        stockQuantity: 75
    },
    {
        id: 10,
        name: 'Multivitamin Syrup',
        genericName: 'Multivitamin Complex',
        company: 'Drug International',
        category: 'syrup',
        description: 'Complete vitamin and mineral supplement',
        massUnit: '200ml',
        pricePerUnit: 18.50,
        discount: 12,
        image: 'https://via.placeholder.com/300x200?text=Multivitamin+Syrup',
        inStock: true,
        stockQuantity: 90
    }
];

// Category information mapping
const categoryInfo = {
    tablet: {
        name: 'Tablets',
        description: 'Solid dosage forms containing active pharmaceutical ingredients',
        icon: '💊',
        color: 'blue'
    },
    syrup: {
        name: 'Syrups',
        description: 'Liquid pharmaceutical preparations, often flavored',
        icon: '🧴',
        color: 'purple'
    },
    capsule: {
        name: 'Capsules',
        description: 'Encapsulated medications for easy swallowing',
        icon: '💊',
        color: 'green'
    },
    injection: {
        name: 'Injections',
        description: 'Injectable pharmaceutical preparations',
        icon: '💉',
        color: 'red'
    },
    others: {
        name: 'Others',
        description: 'Various other pharmaceutical forms',
        icon: '🏥',
        color: 'gray'
    }
};

const CategoryDetails = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [medicines, setMedicines] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Get category information
    const currentCategory = categoryInfo[category] || categoryInfo.others;

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            // Filter medicines by category
            const categoryMedicines = mockMedicines.filter(medicine =>
                medicine.category.toLowerCase() === category?.toLowerCase()
            );
            setMedicines(categoryMedicines);
            setFilteredMedicines(categoryMedicines);
            setLoading(false);
        }, 1000);
    }, [category]);

    // Filter and search functionality
    useEffect(() => {
        let filtered = medicines;

        // Search functionality
        if (searchTerm) {
            filtered = filtered.filter(medicine =>
                medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine.company.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort functionality
        filtered.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setFilteredMedicines(filtered);
        setCurrentPage(1);
    }, [medicines, searchTerm, sortBy, sortOrder]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredMedicines.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);

    // Handle view details
    const handleViewDetails = (medicine) => {
        setSelectedMedicine(medicine);
        setShowModal(true);
    };

    // Handle add to cart
    const handleAddToCart = (medicine) => {
        // In real app, this would add to cart context/state
        toast.success(`${medicine.name} added to cart!`);
        console.log('Added to cart:', medicine);
    };

    // Calculate discounted price
    const getDiscountedPrice = (price, discount) => {
        return discount > 0 ? price - (price * discount / 100) : price;
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle modal close
    const handleModalClose = () => {
        setShowModal(false);
        setSelectedMedicine(null);
    };

    // Handle back navigation
    const handleBackToCategories = () => {
        navigate('/categories');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (filteredMedicines.length === 0 && !searchTerm) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="text-6xl mb-4">{currentCategory.icon}</div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            No {currentCategory.name} Available
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            No medicines found in the {category} category.
                        </p>
                        <button
                            onClick={handleBackToCategories}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            <FaArrowLeft className="mr-2" />
                            Back to Categories
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleBackToCategories}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <FaArrowLeft className="mr-2" />
                                Back to Categories
                            </button>
                            <div className="flex items-center space-x-2">
                                <span className="text-3xl">{currentCategory.icon}</span>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {currentCategory.name}
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {currentCategory.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {filteredMedicines.length} medicine{filteredMedicines.length !== 1 ? 's' : ''} available
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search and Filters - Modified to hide category filter */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search medicines..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                            <div className="absolute left-3 top-3 text-gray-400">
                                🔍
                            </div>
                        </div>

                        {/* Sort By */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="pricePerUnit">Sort by Price</option>
                                <option value="company">Sort by Company</option>
                            </select>
                            <div className="absolute left-3 top-3 text-gray-400">
                                📊
                            </div>
                        </div>

                        {/* Sort Order */}
                        <div>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results */}
                {filteredMedicines.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No medicines found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Try adjusting your search terms or browse all medicines.
                        </p>
                    </div>
                ) : (
                    <div className="mb-6">
                        <MedicineTable
                            medicines={currentItems}
                            onViewDetails={handleViewDetails}
                            onAddToCart={handleAddToCart}
                            getDiscountedPrice={getDiscountedPrice}
                        />

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            itemsPerPage={itemsPerPage}
                            totalItems={filteredMedicines.length}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>

            {/* Medicine Details Modal */}
            <MedicineDetailModal
                isOpen={showModal}
                medicine={selectedMedicine}
                onClose={handleModalClose}
                onAddToCart={handleAddToCart}
                getDiscountedPrice={getDiscountedPrice}
            />
        </div>
    );
};

export default CategoryDetails;
