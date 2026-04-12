import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useCart } from '@/Contexts/CartContext';

export default function Navbar() {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { cartTotalCount } = useCart();

    return (
        <>
            {/* Top bar */}
            <div className="bg-nexa-blue text-white text-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
                    <div className="hidden sm:flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Helpline: +880-1234-567890
                        </span>
                        <span>|</span>
                        <span>Free Shipping on Orders Over ৳500</span>
                    </div>
                    <div className="flex items-center gap-4 ml-auto">
                        <Link href="#" className="hover:underline">Sell on NexaCommerce</Link>
                        <span>|</span>
                        <Link href="#" className="hover:underline">Download App</Link>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="bg-white shadow-navbar sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 gap-4">
                        {/* Logo */}
                        <ApplicationLogo className="shrink-0" />

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-xl mx-4">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products, brands and categories..."
                                    className="w-full pl-4 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-nexa-blue focus:ring-2 focus:ring-nexa-blue/20 focus:bg-white transition-all"
                                />
                                <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-nexa-blue text-white p-2 rounded-md hover:bg-nexa-blue-dark transition-colors">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Cart (Visible to everyone) */}
                            <Link href="#" className="relative p-2 text-gray-600 hover:text-nexa-blue transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-nexa-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                    {cartTotalCount}
                                </span>
                            </Link>

                            {auth?.user ? (
                                <>
                                    {/* User Menu */}
                                    <div className="relative group">
                                        <button className="flex items-center gap-2 p-2 text-gray-600 hover:text-nexa-blue transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-nexa-blue/10 flex items-center justify-center">
                                                <span className="text-sm font-semibold text-nexa-blue">
                                                    {auth.user.name?.charAt(0)?.toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="hidden sm:block text-sm font-medium">{auth.user.name}</span>
                                            <svg className="w-4 h-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <div className="absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-dropdown border border-gray-100 py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-800">{auth.user.name}</p>
                                                <p className="text-xs text-gray-500">{auth.user.email}</p>
                                                <span className="inline-block mt-1 badge-info text-[10px] uppercase tracking-wider">{auth.user.role}</span>
                                            </div>
                                            <Link href={route('dashboard')} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                                Dashboard
                                            </Link>
                                            <Link href={route('profile.edit')} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                My Profile
                                            </Link>
                                            <div className="border-t border-gray-100 mt-1 pt-1">
                                                <Link href={route('logout')} method="post" as="button" className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                                    Log Out
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link href={route('login')} className="btn-secondary text-xs sm:text-sm py-2 px-3 sm:px-5">
                                        Login
                                    </Link>
                                    <Link href={route('register')} className="btn-primary text-xs sm:text-sm py-2 px-3 sm:px-5">
                                        Sign Up
                                    </Link>
                                </div>
                            )}

                            {/* Mobile menu */}
                            <button
                                className="md:hidden p-2 text-gray-600"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {menuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search */}
                    <div className="md:hidden pb-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-4 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-nexa-blue focus:ring-2 focus:ring-nexa-blue/20"
                            />
                            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-nexa-blue text-white p-2 rounded-md">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {menuOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white animate-slide-down">
                        <div className="px-4 py-3 space-y-1">
                            <Link href="/" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Home</Link>
                            <Link href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Categories</Link>
                            <Link href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Deals</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Categories Bar */}
            <div className="bg-white border-b border-gray-100 hidden lg:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6 h-10 text-sm">
                        <Link href="#" className="flex items-center gap-1 text-gray-600 hover:text-nexa-blue transition-colors font-medium">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                            All Categories
                        </Link>
                        <span className="text-gray-200">|</span>
                        {['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Groceries', 'Toys'].map((cat) => (
                            <Link key={cat} href={route('category.show', cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'))} className="text-gray-500 hover:text-nexa-blue transition-colors whitespace-nowrap">
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
