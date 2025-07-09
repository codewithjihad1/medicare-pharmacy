import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaCreditCard, FaLock, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

const PaymentSection = ({ customerInfo, orderTotal, cartItems, onPaymentSuccess }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
                fontFamily: 'system-ui, -apple-system, sans-serif',
            },
            invalid: {
                color: '#9e2146',
            },
        },
        hidePostalCode: false,
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            toast.error('Stripe has not loaded yet. Please try again.');
            return;
        }

        setProcessing(true);

        try {
            // Get the CardElement
            const cardElement = elements.getElement(CardElement);

            // Create payment method
            const { error: paymentMethodError, paymentMethod: createdPaymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: customerInfo.fullName,
                    email: customerInfo.email,
                    phone: customerInfo.phone,
                    address: {
                        line1: customerInfo.address,
                        city: customerInfo.city,
                        state: customerInfo.state,
                        postal_code: customerInfo.zipCode,
                        country: 'US',
                    },
                },
            });

            if (paymentMethodError) {
                toast.error(paymentMethodError.message);
                setProcessing(false);
                return;
            }

            // Simulate payment intent creation and confirmation
            // In a real app, you'd call your backend to create a payment intent
            const mockPaymentIntent = {
                id: `pi_${Date.now()}`,
                amount: Math.round(orderTotal * 100), // Stripe uses cents
                currency: 'usd',
                status: 'requires_confirmation',
                client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
            };

            // Simulate payment confirmation
            const { error: confirmError } = await stripe.confirmCardPayment(
                mockPaymentIntent.client_secret,
                {
                    payment_method: createdPaymentMethod.id,
                }
            );

            if (confirmError) {
                // Handle real payment errors
                if (confirmError.code === 'card_declined') {
                    toast.error('Your card was declined. Please try a different payment method.');
                } else {
                    toast.error(confirmError.message || 'Payment failed. Please try again.');
                }
                setProcessing(false);
                return;
            }

            // Simulate successful payment
            setTimeout(() => {
                const paymentResult = {
                    id: mockPaymentIntent.id,
                    amount: orderTotal,
                    status: 'succeeded',
                    created: new Date().toISOString(),
                    paymentMethod: {
                        type: 'card',
                        brand: 'visa', // This would come from Stripe
                        last4: '4242', // This would come from Stripe
                    },
                    customer: customerInfo,
                    items: cartItems,
                };

                // Store payment result for invoice
                localStorage.setItem('lastPayment', JSON.stringify(paymentResult));

                toast.success('Payment successful! Redirecting to invoice...');

                // Call success callback
                if (onPaymentSuccess) {
                    onPaymentSuccess(paymentResult);
                }

                // Navigate to invoice page
                setTimeout(() => {
                    navigate('/invoice');
                }, 1500);

                setProcessing(false);
            }, 2000); // Simulate processing time

        } catch (error) {
            console.error('Payment error:', error);
            toast.error('An unexpected error occurred. Please try again.');
            setProcessing(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <FaCreditCard className="mr-2" />
                Payment Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                        Payment Method
                    </label>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <input
                                id="card"
                                name="payment-method"
                                type="radio"
                                value="card"
                                checked={paymentMethod === 'card'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="card" className="ml-3 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                <FaCreditCard className="mr-2" />
                                Credit/Debit Card
                            </label>
                        </div>
                    </div>
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                            Card Information
                        </label>
                        <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 bg-white dark:bg-gray-700">
                            <CardElement options={cardElementOptions} />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Test card: 4242 4242 4242 4242, any future date, any 3-digit CVC
                        </p>
                    </div>
                )}

                {/* Billing Information Display */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Billing Information
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <p><strong>Name:</strong> {customerInfo.fullName}</p>
                        <p><strong>Email:</strong> {customerInfo.email}</p>
                        <p><strong>Phone:</strong> {customerInfo.phone}</p>
                        <p><strong>Address:</strong> {customerInfo.address}</p>
                        <p><strong>City:</strong> {customerInfo.city}, {customerInfo.state} {customerInfo.zipCode}</p>
                    </div>
                </div>

                {/* Order Total */}
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                            Total Amount:
                        </span>
                        <span className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                            ${orderTotal.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Security Features */}
                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                    <div className="flex items-center text-green-700 dark:text-green-300">
                        <FaLock className="mr-2" />
                        <div>
                            <p className="font-medium">Secure Payment</p>
                            <p className="text-sm">Your payment information is encrypted and secure</p>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!stripe || processing}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-lg font-semibold"
                >
                    {processing ? (
                        <>
                            <FaSpinner className="animate-spin mr-2" />
                            Processing Payment...
                        </>
                    ) : (
                        <>
                            <FaLock className="mr-2" />
                            Pay ${orderTotal.toFixed(2)}
                        </>
                    )}
                </button>

                {/* Payment Terms */}
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center space-y-1">
                    <p>By completing your purchase, you agree to our Terms of Service and Privacy Policy.</p>
                    <p>Your payment will be processed securely by Stripe.</p>
                </div>
            </form>
        </div>
    );
};

export default PaymentSection;
