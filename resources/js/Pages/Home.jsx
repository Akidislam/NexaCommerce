import { Head, Link, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import ProductCard from '@/Components/ProductCard';

export default function Home({ categories = [], featuredProducts = [], latestProducts = [], topShops = [] }) {
    const { auth } = usePage().props;

    // Demo data for showcase when database is empty
    const demoCategories = categories.length > 0 ? categories : [
        { id: 1, name: 'Electronics', icon: '📱', slug: 'electronics' },
        { id: 2, name: 'Fashion', icon: '👗', slug: 'fashion' },
        { id: 3, name: 'Home & Living', icon: '🏠', slug: 'home-living' },
        { id: 4, name: 'Beauty', icon: '💄', slug: 'beauty' },
        { id: 5, name: 'Sports', icon: '⚽', slug: 'sports' },
        { id: 6, name: 'Groceries', icon: '🛒', slug: 'groceries' },
        { id: 7, name: 'Toys & Games', icon: '🎮', slug: 'toys' },
        { id: 8, name: 'Automotive', icon: '🚗', slug: 'automotive' },
        { id: 9, name: 'Books', icon: '📚', slug: 'books' },
        { id: 10, name: 'Health', icon: '💊', slug: 'health' },
    ];

    const demoProducts = latestProducts.length > 0 ? latestProducts : Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: ['Wireless Bluetooth Headphones', 'Smart Watch Ultra Pro', 'Laptop Backpack Premium', 'USB-C Hub Adapter', 'Mechanical Keyboard RGB', 'Portable Power Bank 20000mAh', 'Noise Canceling Earbuds', 'Tablet Stand Adjustable', 'LED Desk Lamp Smart', 'Webcam HD 1080p', 'Wireless Mouse Ergonomic', 'Phone Case Premium'][i],
        price: [2500, 8999, 1800, 1200, 4500, 1500, 3200, 800, 1800, 2200, 1100, 500][i],
        discount_price: [1999, 6999, null, 899, 3499, null, 2499, null, 1399, 1799, null, 350][i],
        rating: [4.5, 4.8, 4.2, 4.6, 4.7, 4.3, 4.9, 4.1, 4.4, 4.5, 4.3, 4.0][i],
        total_reviews: [128, 256, 64, 89, 194, 72, 312, 45, 98, 67, 51, 23][i],
        total_sold: [1200, 890, 340, 567, 780, 456, 1100, 230, 450, 320, 290, 180][i],
        is_featured: i < 4,
        thumbnail: null,
        shop: { name: ['TechZone', 'SmartGear', 'BagWorld', 'GadgetHub', 'KeyMaster', 'PowerUp', 'AudioElite', 'DeskPro', 'LightHouse', 'CamWorld', 'MouseMart', 'CaseCraft'][i] },
    }));

    return (
        <GuestLayout title="Home">
            {/* Hero Banner */}
            <section className="gradient-hero text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="animate-fade-in">
                            <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                                🎉 Grand Opening Sale - Up to 50% OFF
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                                Shop From
                                <span className="block text-yellow-300">Thousands of Vendors</span>
                            </h1>
                            <p className="text-base sm:text-lg text-blue-100 mb-6 max-w-md">
                                Discover amazing products from verified sellers. Free shipping on orders over ৳500.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link href="#products" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-nexa-blue font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Start Shopping
                                </Link>
                                {!auth?.user && (
                                    <Link href={route('register')} className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                                        Become a Seller
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="hidden lg:grid grid-cols-2 gap-4 animate-slide-up">
                            {[
                                { label: 'Active Sellers', value: '5,000+', icon: '🏪' },
                                { label: 'Products', value: '50,000+', icon: '📦' },
                                { label: 'Happy Customers', value: '100K+', icon: '😊' },
                                { label: 'Orders Delivered', value: '250K+', icon: '🚚' },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
                                    <div className="text-3xl mb-2">{stat.icon}</div>
                                    <div className="text-xl font-bold">{stat.value}</div>
                                    <div className="text-sm text-blue-200">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Bar */}
            <section className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 sm:py-6">
                        {[
                            { icon: '🚚', title: 'Free Shipping', desc: 'Orders over ৳500' },
                            { icon: '🔒', title: 'Secure Payment', desc: '100% protected' },
                            { icon: '↩️', title: 'Easy Returns', desc: '7-day return policy' },
                            { icon: '🎧', title: '24/7 Support', desc: 'Dedicated support' },
                        ].map((feature) => (
                            <div key={feature.title} className="flex items-center gap-3 px-3 py-2">
                                <span className="text-2xl">{feature.icon}</span>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{feature.title}</p>
                                    <p className="text-xs text-gray-500">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Browse Categories</h2>
                        <Link href="#" className="text-nexa-blue text-sm font-medium hover:underline">View All →</Link>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-3">
                        {demoCategories.map((cat) => (
                            <Link
                                key={cat.id}
                                href="#"
                                className="category-card flex flex-col items-center gap-2 p-3 sm:p-4 bg-white rounded-xl border border-gray-100 hover:border-nexa-blue/30 transition-all text-center"
                            >
                                <span className="text-2xl sm:text-3xl">{cat.icon}</span>
                                <span className="text-xs sm:text-sm font-medium text-gray-700 leading-tight">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Flash Deals Banner */}
            <section className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="gradient-orange rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <svg className="w-6 h-6 animate-pulse-soft" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <h3 className="text-xl sm:text-2xl font-bold">Flash Deals</h3>
                            </div>
                            <p className="text-orange-100 text-sm">Ending in 23:59:59 — Don&apos;t miss out!</p>
                        </div>
                        <Link href="#" className="px-6 py-2.5 bg-white text-nexa-orange font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm">
                            Shop Now →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section id="products" className="py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Just For You</h2>
                        <Link href="#" className="text-nexa-blue text-sm font-medium hover:underline">View All →</Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                        {demoProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Become a Vendor CTA */}
            <section className="py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-nexa-blue/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-nexa-orange/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                        <div className="relative z-10 max-w-2xl">
                            <h3 className="text-2xl sm:text-3xl font-bold mb-3">Start Selling on NexaCommerce</h3>
                            <p className="text-gray-400 mb-6">Join thousands of vendors and grow your business. Low commission, powerful tools, and millions of customers.</p>
                            <div className="flex flex-wrap gap-4 mb-6">
                                {['Low Commission Fees', 'Easy Store Setup', 'Marketing Tools', 'Fast Payments'].map((item) => (
                                    <div key={item} className="flex items-center gap-2 text-sm">
                                        <svg className="w-4 h-4 text-nexa-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <Link href={route('register')} className="inline-flex items-center gap-2 px-6 py-3 bg-nexa-blue text-white font-semibold rounded-xl hover:bg-nexa-blue-dark transition-colors">
                                Register as Vendor
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
