import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight, FaEye } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import BannerLoading from '../../../components/ui/Loading/BannerLoading';
import axiosInstance from '../../../api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const HeroSlider = () => {
    const navigate = useNavigate();
    const { data: bannerAds, isLoading } = useQuery({
        queryKey: ['bannerAds'],
        queryFn: async () => {
            const response = await axiosInstance.get('/advertise-requests/active/slider');
            return response.data;
        },
        // staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const handleViewDetails = (medicineId) => {
        // Navigate to the medicine details page
        navigate(`/medicine/${medicineId}`);
    };

    if (isLoading) {
        return <BannerLoading />;
    }

    if (!bannerAds.length) {
        return (
            <div className="h-96 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Welcome to MediStore</h2>
                    <p className="text-lg">No featured products available at the moment.</p>
                </div>
            </div>
        );
    }

    return (
        <section className="relative w-full overflow-hidden bg-white dark:bg-gray-900">
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
                        <div className="relative w-full min-h-[90vh] h-full">
                            {/* Background Image with Overlay */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${ad.medicineImage})`,
                                }}
                            >
                                {/* Dynamic overlay based on theme */}
                                <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex items-center h-full">
                                <div className="container mx-auto min-h-[70vh] h-full px-4 sm:px-6 lg:px-8 py-16">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                        {/* Text Content */}
                                        <div className="text-white space-y-6">
                                            <div className="space-y-2">
                                                <p className="text-sm font-medium uppercase tracking-wide text-blue-300 dark:text-blue-400">
                                                    Featured Advertisement • {ad.sellerName}
                                                </p>
                                                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
                                                    {ad.medicineName}
                                                </h1>
                                            </div>

                                            <p className="text-lg lg:text-xl max-w-lg leading-relaxed text-gray-200 dark:text-gray-100">
                                                {ad.title}
                                            </p>

                                            <div className="text-md max-w-lg leading-relaxed text-gray-300 dark:text-gray-200">
                                                {ad.description}
                                            </div>

                                            {/* Advertisement Info */}
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-2xl font-bold text-green-400 dark:text-green-300">
                                                        Budget: ${ad.budget?.toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm">
                                                    <span className="px-3 py-1 bg-orange-500/30 border border-orange-400/30 text-orange-200 rounded-full dark:bg-orange-600/30 dark:border-orange-500/30 dark:text-orange-300">
                                                        {ad.duration} days campaign
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <button
                                                    onClick={() => handleViewDetails(ad.medicineId)}
                                                    className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
                                                >
                                                    <FaEye className="w-5 h-5" />
                                                    <span>View Medicine</span>
                                                </button>
                                                <button
                                                    className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900"
                                                >
                                                    <span>Learn More</span>
                                                </button>
                                            </div>

                                            {/* Stats */}
                                            <div className="flex items-center space-x-6 text-sm">
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-gray-200 dark:text-gray-300">
                                                        👁 {ad.impressions || 0} views
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-gray-200 dark:text-gray-300">
                                                        👆 {ad.clicks || 0} clicks
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Image */}
                                        <div className="hidden lg:block relative">
                                            <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:from-gray-800/40 dark:to-gray-900/40 dark:border-gray-700/50">
                                                <img
                                                    src={ad.medicineImage}
                                                    alt={ad.medicineName}
                                                    className="w-full h-64 lg:h-80 object-contain drop-shadow-2xl"
                                                />

                                                {/* Advertisement Badge */}
                                                <div className="absolute top-4 right-4">
                                                    <span className="px-3 py-1 bg-blue-500/80 text-white rounded-full text-xs font-medium border border-blue-400/50 dark:bg-blue-600/80 dark:text-blue-100 dark:border-blue-500/50">
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
            <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full cursor-pointer transition-all duration-200 bg-black/30 hover:bg-black/50 text-white dark:bg-gray-800/80 dark:hover:bg-gray-700">
                <FaArrowLeft className="w-6 h-6" />
            </div>
            <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full cursor-pointer transition-all duration-200 bg-black/30 hover:bg-black/50 text-white dark:bg-gray-800/80 dark:hover:bg-gray-700">
                <FaArrowRight className="w-6 h-6" />
            </div>
        </section>
    );
};

export default HeroSlider;
