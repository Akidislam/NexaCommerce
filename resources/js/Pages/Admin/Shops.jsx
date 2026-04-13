import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Shops({ shops }) {
    return (
        <AuthenticatedLayout header="Shop Management">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                    <div className="p-6 border-b border-blue-100 bg-blue-50">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <h3 className="text-xl font-bold text-blue-900">All Shops</h3>
                        </div>
                    </div>

                    {shops?.data?.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                            {shops.data.map((shop) => (
                                <div key={shop.id} className="border border-blue-50 rounded-xl p-5 hover:shadow-md transition-all bg-white relative group">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200">
                                            <span className="text-xl font-bold text-blue-700">{shop.name?.charAt(0)}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-lg font-bold text-gray-800 truncate">{shop.name}</h4>
                                            <p className="text-sm text-gray-500">by <span className="font-medium text-gray-700">{shop.owner?.name}</span></p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${shop.status === 'active' ? 'bg-green-100 text-green-700 border border-green-200' :
                                                shop.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                                                    'bg-red-100 text-red-700 border border-red-200'
                                            }`}>
                                            {shop.status}
                                        </span>
                                    </div>

                                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between gap-2">
                                        <span className="text-sm font-medium text-gray-500">Change Status:</span>
                                        <div className="flex space-x-2">
                                            {shop.status !== 'active' && (
                                                <Link
                                                    href={route('admin.shops.updateStatus', { id: shop.id, status: 'active' })}
                                                    method="post" as="button" preserveScroll
                                                    className="px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 rounded-md text-xs font-bold transition-colors"
                                                >
                                                    Set Active
                                                </Link>
                                            )}
                                            {shop.status !== 'pending' && (
                                                <Link
                                                    href={route('admin.shops.updateStatus', { id: shop.id, status: 'pending' })}
                                                    method="post" as="button" preserveScroll
                                                    className="px-3 py-1.5 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border border-yellow-200 rounded-md text-xs font-bold transition-colors"
                                                >
                                                    Set Pending
                                                </Link>
                                            )}
                                            {shop.status !== 'suspended' && (
                                                <Link
                                                    href={route('admin.shops.updateStatus', { id: shop.id, status: 'suspended' })}
                                                    method="post" as="button" preserveScroll
                                                    className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-md text-xs font-bold transition-colors"
                                                >
                                                    Suspend
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-gray-400">
                            <svg className="w-12 h-12 mx-auto mb-3 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <p className="text-sm">No shops registered yet</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
