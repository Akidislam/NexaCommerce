import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import ProductCard from '@/Components/ProductCard';

export default function Show({ category, products }) {
    return (
        <GuestLayout title={category.name}>
            {/* Category Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-nexa-blue/10 flex items-center justify-center text-4xl sm:text-5xl shrink-0">
                            {category.icon || '📦'}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                                {category.name}
                            </h1>
                            <p className="text-gray-500 max-w-2xl">
                                {category.description || `Browse the best products in ${category.name}. Check out our top sellers and deals.`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex text-sm text-gray-500" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link href="/" className="hover:text-nexa-blue transition-colors">Home</Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <span className="text-gray-800 font-medium">{category.name}</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Products Section */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {products?.data?.length > 0 ? (
                        <>
                            <div className="mb-6 flex justify-between items-center text-sm text-gray-600">
                                <span>Showing {products.from || 0}-{products.to || 0} of {products.total} products</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                                {products.data.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* Pagination Placeholder (Basic) */}
                            {products.last_page > 1 && (
                                <div className="mt-10 flex justify-center">
                                    <div className="inline-flex rounded-md shadow-sm gap-2">
                                        <button className="px-4 py-2 text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 rounded-lg">Prev</button>
                                        <button className="px-4 py-2 text-sm font-medium border border-nexa-blue bg-nexa-blue text-white rounded-lg">1</button>
                                        <button className="px-4 py-2 text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 rounded-lg">Next</button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm mt-4">
                            <div className="mb-6 mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-5xl">
                                🛍️
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">No products found</h2>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                We couldn't find any products in the <span className="font-semibold text-gray-700">{category.name}</span> category right now. Check back later or explore other categories.
                            </p>
                            <Link href="/" className="btn-primary inline-flex gap-2 items-center">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Home
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </GuestLayout>
    );
}
