import React from 'react';
import { FaUserMd, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const HealthBlog = () => {
    const blogPosts = [
        {
            id: 1,
            title: "Understanding Generic vs Brand Medicines: What You Need to Know",
            excerpt: "Learn the differences between generic and brand medicines, their effectiveness, and how to make informed decisions for your health.",
            author: "Dr. Sarah Ahmed",
            date: "2025-07-05",
            image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=240&fit=crop",
            category: "Medicine Guide",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "Essential First Aid Medicines Every Home Should Have",
            excerpt: "Discover the must-have medicines for your home first aid kit and how to use them safely in emergency situations.",
            author: "Dr. Michael Rahman",
            date: "2025-07-03",
            image: "https://images.unsplash.com/photo-1603398938361-99af5c5c3b44?w=400&h=240&fit=crop",
            category: "Health Tips",
            readTime: "7 min read"
        },
        {
            id: 3,
            title: "How to Store Medicines Properly: A Complete Guide",
            excerpt: "Proper medicine storage can extend shelf life and maintain effectiveness. Learn the best practices for storing different types of medications.",
            author: "Pharmacist Lisa Khan",
            date: "2025-07-01",
            image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=240&fit=crop",
            category: "Safety Guide",
            readTime: "4 min read"
        }
    ];

    return (
        <section className="health-blog-section py-16 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        Health & Wellness <span className="text-blue-600 dark:text-blue-400">Insights</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Stay informed with expert advice, medicine guides, and health tips from our certified healthcare professionals
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30 transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700">
                            <div className="relative overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    <div className="flex items-center gap-2">
                                        <FaUserMd className="text-blue-500 dark:text-blue-400" />
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <FaCalendarAlt className="text-green-500 dark:text-green-400" />
                                            <span>{new Date(post.date).toLocaleDateString()}</span>
                                        </div>
                                        <span className="text-blue-500 dark:text-blue-400 font-medium">{post.readTime}</span>
                                    </div>
                                </div>

                                <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors group-hover:gap-3">
                                    Read More <FaArrowRight className="transition-all duration-300" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30 transform hover:scale-105">
                        View All Health Articles
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HealthBlog;