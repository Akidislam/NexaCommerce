import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    const discountPercent = product.discount_price
        ? Math.round(((product.price - product.discount_price) / product.price) * 100)
        : 0;

    return (
        <div className="product-card card overflow-hidden group cursor-pointer">
            {/* Image */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <img
                    src={product.thumbnail || `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}&background=eff6ff&color=2979FF&size=400&font-size=0.3`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {discountPercent > 0 && (
                    <div className="absolute top-2 left-2 bg-nexa-orange text-white text-xs font-bold px-2 py-1 rounded-md">
                        -{discountPercent}%
                    </div>
                )}
                {product.is_featured && (
                    <div className="absolute top-2 right-2 bg-nexa-blue text-white text-xs font-medium px-2 py-1 rounded-md">
                        Featured
                    </div>
                )}
                {/* Quick actions */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-center gap-2">
                        <button className="w-8 h-8 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-nexa-blue hover:text-white transition-colors shadow-md">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-nexa-blue hover:text-white transition-colors shadow-md">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4">
                {product.shop && (
                    <p className="text-xs text-gray-400 mb-1 truncate">{product.shop.name}</p>
                )}
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 min-h-[2.5rem] leading-tight">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-end gap-2 mb-2">
                    <span className="text-lg font-bold text-nexa-orange">
                        ৳{product.discount_price ? Number(product.discount_price).toLocaleString() : Number(product.price).toLocaleString()}
                    </span>
                    {product.discount_price && (
                        <span className="text-xs text-gray-400 line-through">
                            ৳{Number(product.price).toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Rating & Sold */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    className={`w-3 h-3 ${star <= Math.round(product.rating || 0) ? 'text-yellow-400' : 'text-gray-200'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span>({product.total_reviews || 0})</span>
                    </div>
                    <span>{product.total_sold || 0} sold</span>
                </div>
            </div>
        </div>
    );
}
