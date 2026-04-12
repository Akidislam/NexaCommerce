import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Shops({ shops }) {
    return (
        <AuthenticatedLayout header="Shop Management">
            <div className="card overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">All Shops</h3>
                        <select className="input-field text-sm py-2 w-40">
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="suspended">Suspended</option>
                        </select>
                    </div>
                </div>

                {shops?.data?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                        {shops.data.map((shop) => (
                            <div key={shop.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-card-hover transition-all">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-nexa-blue/10 flex items-center justify-center shrink-0">
                                        <span className="text-lg font-bold text-nexa-blue">{shop.name?.charAt(0)}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-gray-800 truncate">{shop.name}</h4>
                                        <p className="text-xs text-gray-500">by {shop.owner?.name}</p>
                                    </div>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${shop.status === 'active' ? 'bg-green-100 text-green-700' :
                                            shop.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                        }`}>
                                        {shop.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                    <div className="bg-gray-50 rounded-lg p-2">
                                        <p className="font-semibold text-gray-800">{shop.total_products}</p>
                                        <p className="text-gray-500">Products</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-2">
                                        <p className="font-semibold text-gray-800">{shop.total_orders}</p>
                                        <p className="text-gray-500">Orders</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-2">
                                        <p className="font-semibold text-gray-800">{Number(shop.rating).toFixed(1)}</p>
                                        <p className="text-gray-500">Rating</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center text-gray-400">
                        <p className="text-sm">No shops registered yet</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
