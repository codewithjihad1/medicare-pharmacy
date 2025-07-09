import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';
import CartItem from './components/CartItem/CartItem';
import CartSummary from './components/CartSummary/CartSummary';

// Mock cart data - In real app, this would come from context/localStorage/API
const mockCartItems = [
    {
        id: 1,
        name: 'Paracetamol',
        genericName: 'Acetaminophen',
        company: 'Square Pharmaceuticals',
        category: 'tablet',
        massUnit: '500mg',
        pricePerUnit: 2.50,
        discount: 10,
        quantity: 2,
        stockQuantity: 500,
        image: 'https://via.placeholder.com/300x200?text=Paracetamol'
    },
    {
        id: 2,
        name: 'Amoxicillin Syrup',
        genericName: 'Amoxicillin',
        company: 'Beximco Pharmaceuticals',
        category: 'syrup',
        massUnit: '250mg/5ml',
        pricePerUnit: 15.75,
        discount: 5,
        quantity: 1,
        stockQuantity: 120,
        image: 'https://via.placeholder.com/300x200?text=Amoxicillin'
    },
    {
        id: 3,
        name: 'Vitamin D3 Capsules',
        genericName: 'Cholecalciferol',
        company: 'Incepta Pharmaceuticals',
        category: 'capsule',
        massUnit: '1000 IU',
        pricePerUnit: 8.50,
        discount: 0,
        quantity: 3,
        stockQuantity: 200,
        image: 'https://via.placeholder.com/300x200?text=Vitamin+D3'
    }
];

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading cart data
        setTimeout(() => {
            setCartItems(mockCartItems);
            setLoading(false);
        }, 1000);
    }, []);

    // Calculate discounted price
    const getDiscountedPrice = (price, discount) => {
        return discount > 0 ? price - (price * discount / 100) : price;
    };

    // Handle quantity update
    const handleUpdateQuantity = (itemId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
        toast.success('Quantity updated');
    };

    // Handle remove item
    const handleRemoveItem = (itemId) => {
        const itemToRemove = cartItems.find(item => item.id === itemId);
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        toast.success(`${itemToRemove.name} removed from cart`);
    };

    // Handle clear cart
    const handleClearCart = () => {
        setCartItems([]);
        toast.success('Cart cleared');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <Link
                            to="/shop"
                            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                        >
                            <FaArrowLeft className="mr-2" />
                            Continue Shopping
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                        <FaShoppingCart className="mr-3" />
                        Shopping Cart
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Review your selected medicines before checkout
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    /* Empty Cart */
                    <div className="text-center py-16">
                        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                            <FaShoppingCart className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Your cart is empty
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Looks like you haven't added any medicines to your cart yet.
                        </p>
                        <Link
                            to="/shop"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    /* Cart with Items */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Cart Items ({cartItems.length})
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onUpdateQuantity={handleUpdateQuantity}
                                        onRemoveItem={handleRemoveItem}
                                        getDiscountedPrice={getDiscountedPrice}
                                    />
                                ))}
                            </div>

                            {/* Additional Actions */}
                            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/shop"
                                    className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <FaArrowLeft className="mr-2" />
                                    Continue Shopping
                                </Link>

                                <button
                                    onClick={handleClearCart}
                                    className="flex items-center justify-center px-6 py-3 border border-red-300 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
                                >
                                    Clear All Items
                                </button>
                            </div>
                        </div>

                        {/* Cart Summary */}
                        <div className="lg:col-span-1">
                            <CartSummary
                                cartItems={cartItems}
                                onClearCart={handleClearCart}
                                getDiscountedPrice={getDiscountedPrice}
                            />
                        </div>
                    </div>
                )}

                {/* Trust Indicators */}
                {cartItems.length > 0 && (
                    <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Why Shop With Us?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-3">
                                    <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Authentic Medicines</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    All medicines are sourced from licensed manufacturers
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-3">
                                    <span className="text-blue-600 dark:text-blue-400 text-xl">🚚</span>
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Fast Delivery</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Free shipping on orders over $50
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 mb-3">
                                    <span className="text-purple-600 dark:text-purple-400 text-xl">🔒</span>
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Secure Payment</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Your payment information is always protected
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
