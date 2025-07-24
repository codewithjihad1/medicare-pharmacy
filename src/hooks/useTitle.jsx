/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import { useReTitle, ReTitle } from 're-title';

export const useTitle = (title, suffix = 'MediShop') => {
    const setTitle = useReTitle();

    useEffect(() => {
        if (title && setTitle) {
            const fullTitle = suffix ? `${title} | ${suffix}` : title;
            setTitle(fullTitle);
        }
    }, [title, suffix, setTitle]);
};

/**
 * Component-based approach for setting page titles
 * @param {string} title - The title to set for the page
 * @param {string} suffix - Optional suffix to append (defaults to site name)
 */
export const PageTitle = ({ title, suffix = 'MediShop' }) => {
    const fullTitle = suffix ? `${title} | ${suffix}` : title;
    return <ReTitle title={fullTitle} />;
};

// Predefined titles for consistency
export const PAGE_TITLES = {
    HOME: 'Home',
    SHOP: 'Medicine Shop',
    CATEGORIES: 'Medicine Categories',
    CART: 'Shopping Cart',
    CHECKOUT: 'Checkout',
    INVOICE: 'Invoice',
    LOGIN: 'Login',
    SIGNUP: 'Sign Up',
    FORGOT_PASSWORD: 'Forgot Password',

    // Dashboard
    DASHBOARD: 'Dashboard',
    ADMIN_DASHBOARD: 'Admin Dashboard',
    SELLER_DASHBOARD: 'Seller Dashboard',
    USER_DASHBOARD: 'User Dashboard',

    // Admin pages
    ADMIN_HOME: 'Admin Overview',
    MANAGE_USERS: 'Manage Users',
    MANAGE_CATEGORY: 'Manage Categories',
    SALES_REPORT: 'Sales Report',
    PAYMENT_MANAGEMENT: 'Payment Management',
    BANNER_ADVERTISEMENT: 'Banner Advertisement',

    // Seller pages
    SELLER_HOME: 'Seller Overview',
    MANAGE_MEDICINES: 'Manage Medicines',
    PAYMENT_HISTORY: 'Payment History',
    ASK_FOR_ADVERTISEMENT: 'Request Advertisement',

    // User pages
    USER_HOME: 'User Overview',
    PAYMENT_HISTORY_USER: 'My Payment History',
};
