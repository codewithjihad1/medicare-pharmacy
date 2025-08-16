import React, { useState, useEffect, useMemo } from 'react';
import { FaUserMd, FaCalendarAlt, FaClock, FaTag, FaBookmark, FaShare, FaSearch, FaFilter, FaChevronLeft, FaChevronRight, FaEye, FaHeart, FaComment } from 'react-icons/fa';
import { useTitle, PAGE_TITLES } from '../../hooks/useTitle';

const HealthBlog = () => {
    useTitle('Health Blog - Expert Health Tips & Medicine Guides');

    // Sample blog data based on the provided JSON structure
    const blogPosts = useMemo(() => [
        {
            id: 1,
            title: "Understanding Blood Pressure Medications: A Complete Guide",
            author: "Dr. Sarah Johnson",
            authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop&crop=face",
            date: "2024-01-15",
            category: "Cardiology",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
            excerpt: "Learn about different types of blood pressure medications, their mechanisms, side effects, and when they're prescribed...",
            content: `
        <p>High blood pressure, or hypertension, affects millions of people worldwide and is often called the "silent killer" because it typically has no symptoms until serious complications develop. Understanding the medications used to treat this condition is crucial for both patients and healthcare providers.</p>
        
        <h3>Types of Blood Pressure Medications</h3>
        <p>There are several classes of medications used to treat high blood pressure:</p>
        
        <h4>1. ACE Inhibitors</h4>
        <p>Angiotensin-converting enzyme (ACE) inhibitors work by relaxing blood vessels. Common examples include lisinopril, enalapril, and captopril. These medications are often first-line treatments for hypertension.</p>
        
        <h4>2. Diuretics</h4>
        <p>Often called "water pills," diuretics help your kidneys remove sodium and water from your body, reducing blood volume and pressure. Hydrochlorothiazide and furosemide are common examples.</p>
        
        <h4>3. Beta-blockers</h4>
        <p>These medications reduce heart rate and the heart's output of blood. Examples include metoprolol, atenolol, and propranolol.</p>
        
        <h3>Side Effects and Considerations</h3>
        <p>Each class of medication has potential side effects. It's important to work closely with your healthcare provider to find the right medication and dosage for your specific situation.</p>
        
        <h3>Lifestyle Factors</h3>
        <p>While medications are important, lifestyle changes such as reducing sodium intake, regular exercise, and stress management play crucial roles in managing blood pressure.</p>
      `,
            tags: ["Hypertension", "Heart Health", "Medication Guide", "Prevention"],
            views: 1250,
            likes: 89,
            comments: 23,
            featured: true
        },
        {
            id: 2,
            title: "Diabetes Management: Modern Insulin Therapies and Monitoring",
            author: "Dr. Michael Chen",
            authorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=60&h=60&fit=crop&crop=face",
            date: "2024-01-12",
            category: "Endocrinology",
            readTime: "10 min read",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
            excerpt: "Explore the latest advances in diabetes management, including new insulin formulations and continuous glucose monitoring...",
            content: `
        <p>Diabetes management has evolved significantly over the past decade with new technologies and treatment options that provide better glucose control and improved quality of life for patients.</p>
        
        <h3>Types of Insulin</h3>
        <p>Modern insulin therapies offer various options tailored to individual needs:</p>
        
        <h4>Rapid-acting Insulin</h4>
        <p>These insulins work quickly to manage blood sugar spikes after meals. Examples include insulin lispro, aspart, and glulisine.</p>
        
        <h4>Long-acting Insulin</h4>
        <p>Provides steady insulin levels throughout the day. Insulin glargine and detemir are common long-acting options.</p>
        
        <h3>Continuous Glucose Monitoring (CGM)</h3>
        <p>CGM devices provide real-time glucose readings, allowing for better diabetes management and reducing the need for frequent finger stick tests.</p>
        
        <h3>Insulin Pumps</h3>
        <p>These devices deliver insulin continuously and can be programmed to match your body's needs throughout the day.</p>
      `,
            tags: ["Diabetes", "Insulin", "Blood Sugar", "Medical Devices"],
            views: 987,
            likes: 76,
            comments: 18,
            featured: false
        },
        {
            id: 3,
            title: "Mental Health Medications: Breaking the Stigma",
            author: "Dr. Emily Rodriguez",
            authorImage: "https://images.unsplash.com/photo-1594824475063-b7574bc1f7ec?w=60&h=60&fit=crop&crop=face",
            date: "2024-01-10",
            category: "Psychiatry",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop",
            excerpt: "Understanding antidepressants, anti-anxiety medications, and the importance of mental health treatment...",
            content: `
        <p>Mental health medications play a crucial role in treating various psychiatric conditions. Despite their effectiveness, stigma surrounding mental health treatment persists.</p>
        
        <h3>Common Mental Health Medications</h3>
        
        <h4>Antidepressants</h4>
        <p>SSRIs (Selective Serotonin Reuptake Inhibitors) like sertraline and fluoxetine are commonly prescribed for depression and anxiety disorders.</p>
        
        <h4>Anti-anxiety Medications</h4>
        <p>Benzodiazepines and other anti-anxiety medications can provide relief for acute anxiety symptoms when used appropriately.</p>
        
        <h3>Breaking the Stigma</h3>
        <p>Mental health conditions are medical conditions that deserve the same attention and treatment as physical ailments. Seeking help is a sign of strength, not weakness.</p>
      `,
            tags: ["Mental Health", "Depression", "Anxiety", "Stigma"],
            views: 1456,
            likes: 102,
            comments: 34,
            featured: true
        },
        {
            id: 4,
            title: "Antibiotic Resistance: What You Need to Know",
            author: "Dr. Robert Kim",
            authorImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=60&h=60&fit=crop&crop=face",
            date: "2024-01-08",
            category: "Infectious Disease",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?w=800&h=400&fit=crop",
            excerpt: "Learn about antibiotic resistance, proper antibiotic use, and how to prevent the development of resistant bacteria...",
            content: `
        <p>Antibiotic resistance is one of the most pressing public health challenges of our time. Understanding how to use antibiotics responsibly is crucial for preserving their effectiveness.</p>
        
        <h3>What is Antibiotic Resistance?</h3>
        <p>Antibiotic resistance occurs when bacteria evolve to survive exposure to antibiotics that would normally kill them or stop their growth.</p>
        
        <h3>Proper Antibiotic Use</h3>
        <p>Always complete the full course of antibiotics as prescribed, even if you feel better. Never share antibiotics or save leftover doses.</p>
        
        <h3>Prevention Strategies</h3>
        <p>Good hygiene, vaccination, and following healthcare provider instructions are key to preventing antibiotic resistance.</p>
      `,
            tags: ["Antibiotics", "Resistance", "Public Health", "Prevention"],
            views: 834,
            likes: 67,
            comments: 15,
            featured: false
        },
        {
            id: 5,
            title: "Pain Management: Beyond Traditional Medications",
            author: "Dr. Lisa Thompson",
            authorImage: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=60&h=60&fit=crop&crop=face",
            date: "2024-01-05",
            category: "Pain Management",
            readTime: "9 min read",
            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=400&fit=crop",
            excerpt: "Explore modern approaches to pain management including non-pharmacological treatments and alternative therapies...",
            content: `
        <p>Chronic pain affects millions of people worldwide, and traditional pain medications aren't always the best solution. Modern pain management takes a holistic approach.</p>
        
        <h3>Multi-modal Pain Management</h3>
        <p>Combining different treatment approaches often provides better results than relying on medications alone.</p>
        
        <h4>Physical Therapy</h4>
        <p>Exercise and movement therapy can help strengthen muscles, improve flexibility, and reduce pain naturally.</p>
        
        <h4>Cognitive Behavioral Therapy</h4>
        <p>CBT helps patients develop coping strategies and change thought patterns that may contribute to pain perception.</p>
        
        <h3>Alternative Therapies</h3>
        <p>Acupuncture, massage therapy, and mindfulness meditation have shown promise in managing chronic pain conditions.</p>
      `,
            tags: ["Pain Management", "Alternative Medicine", "Chronic Pain", "Holistic Health"],
            views: 1123,
            likes: 94,
            comments: 27,
            featured: false
        },
        {
            id: 6,
            title: "Pediatric Medications: Safety First for Children",
            author: "Dr. Amanda Foster",
            authorImage: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=60&h=60&fit=crop&crop=face",
            date: "2024-01-03",
            category: "Pediatrics",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
            excerpt: "Essential guidelines for administering medications to children, dosage calculations, and safety considerations...",
            content: `
        <p>Administering medications to children requires special attention to dosing, safety, and age-appropriate formulations. Children are not simply small adults when it comes to medication.</p>
        
        <h3>Dosing Considerations</h3>
        <p>Pediatric dosing is typically based on weight or body surface area rather than age alone. Accurate weight measurement is crucial for safe dosing.</p>
        
        <h3>Common Pediatric Medications</h3>
        
        <h4>Fever Reducers</h4>
        <p>Acetaminophen and ibuprofen are commonly used to reduce fever in children, but proper dosing is essential.</p>
        
        <h4>Antibiotics</h4>
        <p>Many antibiotics have pediatric formulations that are easier for children to take and properly dosed.</p>
        
        <h3>Safety Tips for Parents</h3>
        <p>Always use the measuring device that comes with the medication, never use household spoons, and keep medications out of reach of children.</p>
      `,
            tags: ["Pediatrics", "Child Safety", "Dosing", "Parent Education"],
            views: 976,
            likes: 82,
            comments: 21,
            featured: true
        }
    ], []);

    const [filteredPosts, setFilteredPosts] = useState(blogPosts);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);
    const postsPerPage = 6;

    // Get unique categories
    const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

    // Filter posts based on category and search term
    useEffect(() => {
        let filtered = blogPosts;

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(post => post.category === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredPosts(filtered);
        setCurrentPage(1);
    }, [selectedCategory, searchTerm, blogPosts]);

    // Pagination logic
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    // Initialize AOS
    useEffect(() => {
        if (typeof window !== 'undefined' && window.AOS) {
            window.AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
        }
    }, []);

    if (selectedPost) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                {/* Article Header */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="container mx-auto px-4 py-4">
                        <button
                            onClick={() => setSelectedPost(null)}
                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                            <FaChevronLeft /> Back to Health Blog
                        </button>
                    </div>
                </div>

                {/* Article Content */}
                <article className="container mx-auto px-4 py-8 max-w-4xl">
                    {/* Featured Image */}
                    <div className="mb-8">
                        <img
                            src={selectedPost.image}
                            alt={selectedPost.title}
                            className="w-full h-80 object-cover rounded-xl shadow-lg"
                        />
                    </div>

                    {/* Article Meta */}
                    <div className="mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                {selectedPost.category}
                            </span>
                            {selectedPost.featured && (
                                <span className="bg-yellow-500 dark:bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Featured
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {selectedPost.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <img
                                    src={selectedPost.authorImage}
                                    alt={selectedPost.author}
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="font-medium">{selectedPost.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FaCalendarAlt className="text-green-500" />
                                <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FaClock className="text-blue-500" />
                                <span>{selectedPost.readTime}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                    <FaEye className="text-gray-500" />
                                    {selectedPost.views}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaHeart className="text-red-500" />
                                    {selectedPost.likes}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaComment className="text-blue-500" />
                                    {selectedPost.comments}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                        <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                    </div>

                    {/* Tags */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedPost.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Share & Actions */}
                    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                                <FaHeart /> Like ({selectedPost.likes})
                            </button>
                            <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors">
                                <FaBookmark /> Save
                            </button>
                            <button className="flex items-center gap-2 text-green-500 hover:text-green-600 transition-colors">
                                <FaShare /> Share
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-700 dark:to-green-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4" data-aos="fade-up">
                        Health & Wellness Blog
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Expert insights, medication guides, and health tips from certified healthcare professionals
                    </p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles, topics, or tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2">
                            <FaFilter className="text-gray-500 dark:text-gray-400" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Featured Posts */}
                {selectedCategory === 'All' && !searchTerm && (
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8" data-aos="fade-up">
                            Featured Articles
                        </h2>
                        <div className="grid lg:grid-cols-2 gap-8">
                            {blogPosts.filter(post => post.featured).slice(0, 2).map((post) => (
                                <article
                                    key={post.id}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30 transition-all duration-300 overflow-hidden cursor-pointer group"
                                    onClick={() => setSelectedPost(post)}
                                    data-aos="fade-up"
                                >
                                    <div className="relative">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-yellow-500 dark:bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                                                Featured
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={post.authorImage}
                                                    alt={post.author}
                                                    className="w-6 h-6 rounded-full"
                                                />
                                                <span>{post.author}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1">
                                                    <FaCalendarAlt className="text-green-500" />
                                                    {new Date(post.date).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaClock className="text-blue-500" />
                                                    {post.readTime}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <FaEye /> {post.views}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaHeart className="text-red-500" /> {post.likes}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaComment className="text-blue-500" /> {post.comments}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Posts Grid */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8" data-aos="fade-up">
                        {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
                        <span className="text-lg font-normal text-gray-500 dark:text-gray-400 ml-2">
                            ({filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'})
                        </span>
                    </h2>

                    {currentPosts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentPosts.map((post, index) => (
                                <article
                                    key={post.id}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30 transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100 dark:border-gray-700"
                                    onClick={() => setSelectedPost(post)}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="relative">
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
                                        {post.featured && (
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-yellow-500 dark:bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                                                    Featured
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={post.authorImage}
                                                    alt={post.author}
                                                    className="w-5 h-5 rounded-full"
                                                />
                                                <span className="text-xs">{post.author}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="flex items-center gap-1 text-xs">
                                                    <FaCalendarAlt className="text-green-500" />
                                                    {new Date(post.date).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1 text-xs">
                                                    <FaClock className="text-blue-500" />
                                                    {post.readTime}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <FaEye /> {post.views}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaHeart className="text-red-500" /> {post.likes}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaComment className="text-blue-500" /> {post.comments}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-2 transition-all">
                                                Read More <FaChevronRight className="text-xs" />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Try adjusting your search criteria or browse different categories.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('All');
                                }}
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Show All Articles
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <FaChevronLeft /> Previous
                        </button>

                        <div className="flex items-center gap-1">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === index + 1
                                            ? 'bg-blue-600 text-white dark:bg-blue-500'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>

            {/* Newsletter Section */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-700 dark:to-green-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">
                        Stay Updated with Health Insights
                    </h2>
                    <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Subscribe to our newsletter for the latest health tips, medication guides, and expert advice
                    </p>
                    <div className="max-w-md mx-auto flex gap-4" data-aos="fade-up" data-aos-delay="400">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthBlog;
