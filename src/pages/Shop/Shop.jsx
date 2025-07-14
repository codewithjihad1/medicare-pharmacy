import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import SearchFilter from './components/SearchFilter/SearchFilter';
import MedicineTable from './components/MedicineTable/MedicineTable';
import Pagination from './components/Pagination/Pagination';
import MedicineDetailModal from './components/MedicineModal/MedicineDetailModal';
import Loading from '../../components/ui/Loading/Loading';

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
    }
];

const Shop = () => {
    const [medicines, setMedicines] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setMedicines(mockMedicines);
            setFilteredMedicines(mockMedicines);
            setLoading(false);
        }, 1000);
    }, []);

    // Filter and search functionality
    useEffect(() => {
        let filtered = medicines;

        // Filter by category
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(medicine => medicine.category === categoryFilter);
        }

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
    }, [medicines, searchTerm, sortBy, sortOrder, categoryFilter]);

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

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Medicine Shop
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Browse and purchase medicines from our extensive collection
                    </p>
                </div>

                {/* Search and Filters */}
                <SearchFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />

                {/* Medicine Table */}
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

export default Shop;
