import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight, FaEye } from 'react-icons/fa';
import useTheme from '../../../hooks/useTheme';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import BannerLoading from '../../../components/ui/Loading/BannerLoading';
import axiosInstance from '../../../api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

const HeroSlider = () => {
    const { theme } = useTheme();

    const { data: bannerAds, isLoading } = useQuery({
        queryKey: ['bannerAds'],
        queryFn: async () => {
            const response = await axiosInstance.get('/advertise-requests/active/slider');
            return response.data;
        },
        // staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const handleViewDetails = (advertisement) => {
        console.log('View details for:', advertisement);
    };

    if (isLoading) {
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
                                                    Featured Advertisement • {ad.sellerName}
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
                                                {ad.title}
                                            </p>

                                            <div className={
                                                theme === 'dark'
                                                    ? 'text-md max-w-lg leading-relaxed text-gray-200'
                                                    : 'text-md max-w-lg leading-relaxed text-gray-300'
                                            }>
                                                {ad.description}
                                            </div>

                                            {/* Advertisement Info */}
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <span className={
                                                        theme === 'dark'
                                                            ? 'text-2xl font-bold text-green-300'
                                                            : 'text-2xl font-bold text-green-400'
                                                    }>
                                                        Budget: ${ad.budget?.toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm">
                                                    <span className={
                                                        theme === 'dark'
                                                            ? 'px-3 py-1 bg-orange-600/30 text-orange-300 rounded-full border border-orange-500/30'
                                                            : 'px-3 py-1 bg-orange-500/30 text-orange-200 rounded-full border border-orange-400/30'
                                                    }>
                                                        {ad.duration} days campaign
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <button
                                                    onClick={() => handleViewDetails(ad)}
                                                    className={
                                                        theme === 'dark'
                                                            ? 'flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-blue-700 hover:bg-blue-800 text-white'
                                                            : 'flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white'
                                                    }
                                                >
                                                    <FaEye className="w-5 h-5" />
                                                    <span>View Medicine</span>
                                                </button>
                                                <button
                                                    className={
                                                        theme === 'dark'
                                                            ? 'flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-transparent border-2 border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-gray-900'
                                                            : 'flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900'
                                                    }
                                                >
                                                    <span>Learn More</span>
                                                </button>
                                            </div>

                                            {/* Stats */}
                                            <div className="flex items-center space-x-6 text-sm">
                                                <div className="flex items-center space-x-1">
                                                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-200'}>
                                                        👁 {ad.impressions || 0} views
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-200'}>
                                                        👆 {ad.clicks || 0} clicks
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Image */}
                                        <div className="relative">
                                            <div className={
                                                theme === 'dark'
                                                    ? 'relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50'
                                                    : 'relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20'
                                            }>
                                                <img
                                                    src={ad.medicineImage}
                                                    alt={ad.medicineName}
                                                    className="w-full h-64 lg:h-80 object-contain drop-shadow-2xl"
                                                />

                                                {/* Advertisement Badge */}
                                                <div className="absolute top-4 right-4">
                                                    <span className={
                                                        theme === 'dark'
                                                            ? 'px-3 py-1 bg-blue-600/80 text-blue-100 rounded-full text-xs font-medium border border-blue-500/50'
                                                            : 'px-3 py-1 bg-blue-500/80 text-white rounded-full text-xs font-medium border border-blue-400/50'
                                                    }>
                                                        Sponsored
                                                    </span>
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
        </section>
    );
};

export default HeroSlider;
