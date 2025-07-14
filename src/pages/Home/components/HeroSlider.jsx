import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight, FaShoppingCart, FaEye } from 'react-icons/fa';
import useTheme from '../../../hooks/useTheme';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import BannerLoading from '../../../components/ui/Loading/BannerLoading';

// Mock data for development - Replace with actual API call
const mockBannerAds = [
    {
        _id: '1',
        medicineImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000',
        medicineName: 'Aspirin Plus',
        description: 'Fast-acting pain relief medication for headaches and fever. Trusted by doctors worldwide.',
        sellerEmail: 'seller1@example.com',
        price: 15.99,
        discount: 20,
        company: 'PharmaCorp',
        category: 'Tablet',
        isActive: true
    },
    {
        _id: '2',
        medicineImage: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=1000',
        medicineName: 'Vitamin D3',
        description: 'Essential vitamin supplement for bone health and immune system support.',
        sellerEmail: 'seller2@example.com',
        price: 24.50,
        discount: 15,
        company: 'HealthMax',
        category: 'Capsule',
        isActive: true
    },
    {
        _id: '3',
        medicineImage: 'https://images.unsplash.com/photo-1671493229066-f36e86b35841?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        medicineName: 'Cough Syrup',
        description: 'Natural honey-based cough syrup for dry and wet cough relief.',
        sellerEmail: 'seller3@example.com',
        price: 12.75,
        discount: 10,
        company: 'NaturalCure',
        category: 'Syrup',
        isActive: true
    },
    {
        _id: '4',
        medicineImage: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1000',
        medicineName: 'Antibiotic Injection',
        description: 'Broad-spectrum antibiotic injection for serious bacterial infections.',
        sellerEmail: 'seller4@example.com',
        price: 45.00,
        discount: 25,
        company: 'MediTech',
        category: 'Injection',
        isActive: true
    }
];

const HeroSlider = () => {
    const [bannerAds, setBannerAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        // Simulate API call to fetch banner advertisements
        const fetchBannerAds = async () => {
            try {
                setLoading(true);
                // TODO: Replace with actual API call
                // const response = await fetch('/api/banner-ads/active');
                // const data = await response.json();

                // For now, using mock data
                setTimeout(() => {
                    setBannerAds(mockBannerAds);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching banner ads:', error);
                setLoading(false);
            }
        };

        fetchBannerAds();
    }, []);

    const calculateDiscountedPrice = (price, discount) => {
        return (price - (price * discount / 100)).toFixed(2);
    };

    const handleAddToCart = (medicine) => {
        // TODO: Implement add to cart functionality
        console.log('Adding to cart:', medicine);
    };

    const handleViewDetails = (medicine) => {
        // TODO: Implement view details modal or navigation
        console.log('View details:', medicine);
    };

    if (loading) {
        return <BannerLoading />;
    }

    if (!bannerAds.length) {
        return (
            <div className={
                theme === 'dark'
                    ? 'h-96 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center'
                    : 'h-96 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center'
            }>
                <div className="text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Welcome to MediStore</h2>
                    <p className="text-lg">No featured products available at the moment.</p>
                </div>
            </div>
        );
    }

    return (
        <section className={
            theme === 'dark'
                ? 'relative w-full h-[500px] lg:h-[600px] overflow-hidden bg-gray-900'
                : 'relative w-full h-[500px] lg:h-[600px] overflow-hidden bg-white'
        }>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet-custom',
                    bulletActiveClass: 'swiper-pagination-bullet-active-custom',
                    dynamicBullets: false,
                    el: '.swiper-pagination-custom',
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                effect="fade"
                fadeEffect={{
                    crossFade: true,
                }}
                loop={true}
                className="w-full h-full"
            >
                {bannerAds.map((ad) => (
                    <SwiperSlide key={ad._id}>
                        <div className="relative w-full h-full">
                            {/* Background Image with Overlay */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${ad.medicineImage})`,
                                }}
                            >
                                {/* Dynamic overlay based on theme */}
                                {theme === 'dark' ? (
                                    <div className="absolute inset-0 bg-black/60"></div>
                                ) : (
                                    <div className="absolute inset-0 bg-black/40"></div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex items-center h-full">
                                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                        {/* Text Content */}
                                        <div className="text-white space-y-6">
                                            <div className="space-y-2">
                                                <p className={
                                                    theme === 'dark'
                                                        ? 'text-sm font-medium uppercase tracking-wide text-blue-400'
                                                        : 'text-sm font-medium uppercase tracking-wide text-blue-300'
                                                }>
                                                    {ad.category} • {ad.company}
                                                </p>
                                                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
                                                    {ad.medicineName}
                                                </h1>
                                            </div>

                                            <p className={
                                                theme === 'dark'
                                                    ? 'text-lg lg:text-xl max-w-lg leading-relaxed text-gray-100'
                                                    : 'text-lg lg:text-xl max-w-lg leading-relaxed text-gray-200'
                                            }>
                                                {ad.description}
                                            </p>

                                            {/* Price Section */}
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <span className={
                                                        theme === 'dark'
                                                            ? 'text-3xl font-bold text-green-300'
                                                            : 'text-3xl font-bold text-green-400'
                                                    }>
                                                        ${calculateDiscountedPrice(ad.price, ad.discount)}
                                                    </span>
                                                    {ad.discount > 0 && (
                                                        <>
                                                            <span className={
                                                                theme === 'dark'
                                                                    ? 'text-lg line-through text-gray-300'
                                                                    : 'text-lg line-through text-gray-400'
                                                            }>
                                                                ${ad.price}
                                                            </span>
                                                            <span className={
                                                                theme === 'dark'
                                                                    ? 'px-2 py-1 rounded-full text-sm font-medium bg-red-600 text-white'
                                                                    : 'px-2 py-1 rounded-full text-sm font-medium bg-red-500 text-white'
                                                            }>
                                                                -{ad.discount}%
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <button
                                                    onClick={() => handleAddToCart(ad)}
                                                    className={
                                                        theme === 'dark'
                                                            ? 'flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-blue-700 hover:bg-blue-800 text-white'
                                                            : 'flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white'
                                                    }
                                                >
                                                    <FaShoppingCart className="w-5 h-5" />
                                                    <span>Add to Cart</span>
                                                </button>
                                                <button
                                                    onClick={() => handleViewDetails(ad)}
                                                    className={
                                                        theme === 'dark'
                                                            ? 'flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-transparent border-2 border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-gray-900'
                                                            : 'flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900'
                                                    }
                                                >
                                                    <FaEye className="w-5 h-5" />
                                                    <span>View Details</span>
                                                </button>
                                            </div>

                                            {/* Seller Info */}
                                            <div className={
                                                theme === 'dark'
                                                    ? 'pt-4 border-t border-gray-500'
                                                    : 'pt-4 border-t border-gray-600'
                                            }>
                                                <p className={
                                                    theme === 'dark'
                                                        ? 'text-sm text-gray-200'
                                                        : 'text-sm text-gray-300'
                                                }>
                                                    Sold by: <span className="text-white font-medium">{ad.sellerEmail}</span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Product Image */}
                                        <div className="hidden lg:block">
                                            <div className="relative">
                                                <div className={
                                                    theme === 'dark'
                                                        ? 'rounded-2xl p-8 bg-gray-800/80 backdrop-blur-sm'
                                                        : 'rounded-2xl p-8 bg-white/10 backdrop-blur-sm'
                                                }>
                                                    <img
                                                        src={ad.medicineImage}
                                                        alt={ad.medicineName}
                                                        className="w-full h-80 object-cover rounded-xl shadow-2xl"
                                                    />
                                                    {ad.discount > 0 && (
                                                        <div className={
                                                            theme === 'dark'
                                                                ? 'absolute top-4 right-4 px-4 py-2 rounded-full font-bold text-lg bg-red-600 text-white'
                                                                : 'absolute top-4 right-4 px-4 py-2 rounded-full font-bold text-lg bg-red-500 text-white'
                                                        }>
                                                            SAVE {ad.discount}%
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Pagination Container */}
            <div className="swiper-pagination-custom absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"></div>

            {/* Custom Navigation Buttons */}
            <div className={
                theme === 'dark'
                    ? 'swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full cursor-pointer transition-all duration-200 bg-gray-800/80 hover:bg-gray-700 text-white'
                    : 'swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full cursor-pointer transition-all duration-200 bg-black/30 hover:bg-black/50 text-white'
            }>
                <FaArrowLeft className="w-6 h-6" />
            </div>
            <div className={
                theme === 'dark'
                    ? 'swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full cursor-pointer transition-all duration-200 bg-gray-800/80 hover:bg-gray-700 text-white'
                    : 'swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full cursor-pointer transition-all duration-200 bg-black/30 hover:bg-black/50 text-white'
            }>
                <FaArrowRight className="w-6 h-6" />
            </div>

            {/* Custom Pagination Styles */}
            <style jsx global>{`
                .swiper-pagination-bullet-custom {
                    width: 12px !important;
                    height: 12px !important;
                    background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.5)'} !important;
                    border-radius: 50% !important;
                    margin: 0 4px !important;
                    cursor: pointer !important;
                    transition: all 0.3s ease !important;
                    opacity: 1 !important;
                }
                .swiper-pagination-bullet-active-custom {
                    background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'white'} !important;
                    transform: scale(1.2) !important;
                }
                
                /* Fix Swiper default styles override */
                .swiper-pagination {
                    position: absolute !important;
                    bottom: 20px !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                    width: auto !important;
                    height: auto !important;
                }
            `}</style>
        </section>
    );
};

export default HeroSlider;
