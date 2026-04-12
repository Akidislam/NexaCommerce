import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Products({ products, shop }) {
    return (
        <AuthenticatedLayout header="My Products">
            <div className="card overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">Products ({products?.total || 0})</h3>
                        <button className="btn-primary text-sm">+ Add Product</button>
                    </div>
                </div>

                {products?.data?.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sold</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.data.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                                    <span className="text-xs text-gray-400">IMG</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">{product.name}</p>
                                                    <p className="text-xs text-gray-500">{product.category?.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold text-gray-800">৳{Number(product.price).toLocaleString()}</p>
                                            {product.discount_price && (
                                                <p className="text-xs text-nexa-orange">৳{Number(product.discount_price).toLocaleString()}</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-sm ${product.quantity < 10 ? 'text-red-500 font-medium' : 'text-gray-700'}`}>
                                                {product.quantity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-700' :
                                                    product.status === 'draft' ? 'bg-gray-100 text-gray-600' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{product.total_sold}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-sm text-nexa-blue hover:underline mr-3">Edit</button>
                                            <button className="text-sm text-red-500 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center text-gray-400">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <p className="text-sm font-medium">No products yet</p>
                        <p className="text-xs mt-1">Click "+ Add Product" to list your first product</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
