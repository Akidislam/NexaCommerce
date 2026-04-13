import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import { Link } from '@inertiajs/react';

export default function AdminDashboard({ stats, shops = [], pendingProducts = [] }) {
    return (
        <AuthenticatedLayout header="Admin Dashboard">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                {/* Stats Grid - White & Royal Blue Theme Focus */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Users"
                        value={stats?.total_users || 0}
                        color="blue"
                        icon={
                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        }
                    />
                    <StatCard
                        title="Total Vendors"
                        value={stats?.total_vendors || 0}
                        color="blue"
                        icon={
                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        }
                    />
                    <StatCard
                        title="Total Products"
                        value={stats?.total_products || 0}
                        color="blue"
                        icon={
                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        }
                    />
                    <StatCard
                        title="Pending Product Approvals"
                        value={stats?.pending_products || 0}
                        color="red"
                        icon={
                            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* All Shops Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-50">
                            <h3 className="text-lg font-bold text-blue-900">All Shops</h3>
                        </div>
                        <div className="p-0 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 text-sm uppercase">
                                        <th className="p-4 font-semibold">Shop Name</th>
                                        <th className="p-4 font-semibold">Owner</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {shops.length > 0 ? shops.map((shop) => (
                                        <tr key={shop.id} className="hover:bg-gray-50">
                                            <td className="p-4 font-medium text-gray-800">{shop.name}</td>
                                            <td className="p-4 text-sm text-gray-600">{shop.owner?.name}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${shop.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {shop.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <Link
                                                    href={route('admin.shops.toggleStatus', shop.id)}
                                                    method="post"
                                                    as="button"
                                                    preserveScroll
                                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${shop.status === 'active'
                                                            ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                                                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
                                                        }`}
                                                >
                                                    {shop.status === 'active' ? 'Deactivate' : 'Activate'}
                                                </Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="p-8 text-center text-gray-500">No shops found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pending Products Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-50">
                            <h3 className="text-lg font-bold text-blue-900">Pending Products</h3>
                        </div>
                        <div className="p-0 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 text-sm uppercase">
                                        <th className="p-4 font-semibold">Product</th>
                                        <th className="p-4 font-semibold">Shop</th>
                                        <th className="p-4 font-semibold">Price</th>
                                        <th className="p-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {pendingProducts.length > 0 ? pendingProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="p-4 font-medium text-gray-800">{product.name}</td>
                                            <td className="p-4 text-sm text-gray-600">{product.shop?.name}</td>
                                            <td className="p-4 text-sm font-semibold text-blue-600">৳{product.price}</td>
                                            <td className="p-4 text-right space-x-2">
                                                <Link
                                                    href={route('admin.products.updateStatus', { id: product.id, status: 'active' })}
                                                    method="post"
                                                    as="button"
                                                    preserveScroll
                                                    className="px-3 py-1.5 rounded-md text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-colors"
                                                >
                                                    Approve
                                                </Link>
                                                <Link
                                                    href={route('admin.products.updateStatus', { id: product.id, status: 'rejected' })}
                                                    method="post"
                                                    as="button"
                                                    preserveScroll
                                                    className="px-3 py-1.5 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                                                >
                                                    Reject
                                                </Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="p-8 text-center text-gray-500">No pending products.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
