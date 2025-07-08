import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules'


// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import ProductCard from './ProductCard'

const DiscountProducts = () => {
  // Sample discount products data
  const discountProducts = [
    {
      id: 1,
      name: "Premium Multivitamin",
      originalPrice: 49.99,
      discountPrice: 34.99,
      discount: 30,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 128,
      brand: "HealthCare Plus",
      inStock: true
    },
    {
      id: 2,
      name: "Omega-3 Fish Oil",
      originalPrice: 29.99,
      discountPrice: 19.99,
      discount: 33,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 89,
      brand: "Ocean Pure",
      inStock: true
    },
    {
      id: 3,
      name: "Vitamin D3 Capsules",
      originalPrice: 24.99,
      discountPrice: 16.99,
      discount: 32,
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 156,
      brand: "SunVita",
      inStock: true
    },
    {
      id: 4,
      name: "Probiotics Complex",
      originalPrice: 39.99,
      discountPrice: 24.99,
      discount: 38,
      image: "https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 203,
      brand: "BioBalance",
      inStock: true
    },
    {
      id: 5,
      name: "Calcium + Magnesium",
      originalPrice: 34.99,
      discountPrice: 22.99,
      discount: 34,
      image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 94,
      brand: "BoneHealth",
      inStock: false
    },
    {
      id: 6,
      name: "Iron Supplement",
      originalPrice: 19.99,
      discountPrice: 12.99,
      discount: 35,
      image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&h=300&fit=crop",
      rating: 4.2,
      reviews: 67,
      brand: "IronMax",
      inStock: true
    }
  ]

  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Special Discount Products
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't miss out on our exclusive deals! Get up to 40% off on premium health supplements and medicines.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Products Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, FreeMode]}
            spaceBetween={24}
            slidesPerView={1}
            freeMode={true}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            loop={true}
            className="discount-products-swiper pb-12"
          >
            {discountProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>

          <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
            View All Discount Products
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .discount-products-swiper .swiper-pagination-bullet {
          background: #3b82f6;
          opacity: 0.3;
        }
        
        .discount-products-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.2);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default DiscountProducts
