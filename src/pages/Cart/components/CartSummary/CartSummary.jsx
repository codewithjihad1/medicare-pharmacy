import React from 'react';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const CartSummary = ({ cartItems, onClearCart, getDiscountedPrice }) => {
    const navigate = useNavigate();

    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => {
        const itemPrice = getDiscountedPrice(item.pricePerUnit, item.discount || 0);
        return total + (itemPrice * item.quantity);
    }, 0);

    const totalDiscount = cartItems.reduce((total, item) => {
        if (item.discount > 0) {
            const originalPrice = item.pricePerUnit * item.quantity;
            const discountedPrice = getDiscountedPrice(item.pricePerUnit, item.discount) * item.quantity;
            return total + (originalPrice - discountedPrice);
        }
        return total;
    }, 0);

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Tax calculation (8% tax)
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const grandTotal = subtotal + tax;

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FaShoppingCart className="mr-2" />
                Order Summary
            </h2>

            {/* Items Count */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                        Items ({totalItems})
                    </span>
                    <span className="text-gray-900 dark:text-white">
                        ${(subtotal + totalDiscount).toFixed(2)}
                    </span>
                </div>

                {/* Discount */}
                {totalDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-green-600">Discount</span>
                        <span className="text-green-600">
                            -${totalDiscount.toFixed(2)}
                        </span>
                    </div>
                )}

                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-white">
                        ${subtotal.toFixed(2)}
                    </span>
                </div>

                {/* Tax */}
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tax (8%)</span>
                    <span className="text-gray-900 dark:text-white">
                        ${tax.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mb-6">
                <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        Total
                    </span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${grandTotal.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <button
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                    <FaShoppingCart className="mr-2" />
                    Proceed to Checkout
                </button>

                <button
                    onClick={onClearCart}
                    disabled={cartItems.length === 0}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                    <FaTrash className="mr-2" />
                    Clear Cart
                </button>
            </div>

            {/* Shipping Info */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Free shipping</strong> on orders over $50
                </p>
                {subtotal < 50 && (
                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                        Add ${(50 - subtotal).toFixed(2)} more for free shipping
                    </p>
                )}
            </div>

            {/* Security Notice */}
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    🔒 Secure checkout with 256-bit SSL encryption
                </p>
            </div>
        </div>
    );
};

export default CartSummary;
