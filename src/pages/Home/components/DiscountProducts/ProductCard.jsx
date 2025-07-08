import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'

const ProductCard = ({ product }) => {

    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-400 fill-current" />)
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 fill-current" />)
        }

        const remainingStars = 5 - Math.ceil(rating)
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<FaStar key={`empty-${i}`} className="text-gray-300 dark:text-gray-600" />)
        }

        return stars
    }


    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
            {/* Discount Badge */}
            <div className="relative">
                <div className="absolute top-3 left-3 z-10">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                        -{product.discount}%
                    </span>
                </div>

                {/* Quick Action Buttons */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-col space-y-2">
                        <button className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                            <FiHeart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>
                        <button className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                            <FiEye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>
                </div>

                {/* Product Image */}
                <div className="h-48 overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Brand */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{product.brand}</p>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                    <div className="flex space-x-1">
                        {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        ({product.reviews})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        ${product.discountPrice}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${product.originalPrice}
                    </span>
                </div>

                {/* Stock Status & Add to Cart */}
                <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${product.inStock
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-500 dark:text-red-400'
                        }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>

                    <button
                        disabled={!product.inStock}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${product.inStock
                            ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105'
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <FiShoppingCart className="w-4 h-4" />
                        <span className="text-sm font-medium">Add</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;