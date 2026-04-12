import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';

export default function VendorDashboard({ stats }) {
    const shop = stats?.shop;

    return (
        <AuthenticatedLayout header="Vendor Dashboard">
            {/* Shop Status */}
            {shop && shop.status !== 'active' && (
                <div className={`mb-6 p-4 rounded-xl ${shop.status === 'pending' ? 'bg-yellow-50 border border-yellow-200' :
                        'bg-red-50 border border-red-200'
                    }`}>
                    <div className="flex items-center gap-3">
                        <svg className={`w-5 h-5 ${shop.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div>
                            <p className={`text-sm font-medium ${shop.status === 'pending' ? 'text-yellow-800' : 'text-red-800'}`}>
                                Your shop is {shop.status}
                            </p>
                            <p className={`text-xs ${shop.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                                {shop.status === 'pending' ? 'Your shop is under review. You will be notified once approved.' : 'Your shop has been suspended. Please contact support.'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    title="Total Products"
                    value={stats?.total_products || 0}
                    color="blue"
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
                />
                <StatCard
                    title="Active Products"
                    value={stats?.active_products || 0}
                    color="green"
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
                <StatCard
                    title="Total Orders"
                    value={stats?.total_orders || 0}
                    color="purple"
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                />
                <StatCard
                    title="Revenue"
                    value={`৳${Number(stats?.total_revenue || 0).toLocaleString()}`}
                    color="orange"
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
            </div>

            {/* Shop Info Card */}
            {shop && (
                <div className="card p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop Information</h3>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-nexa-blue/10 flex items-center justify-center shrink-0">
                            <span className="text-2xl font-bold text-nexa-blue">{shop.name?.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-800">{shop.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">{shop.description || 'No description added'}</p>
                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                                <span className="flex items-center gap-1">⭐ {Number(shop.rating).toFixed(1)} rating</span>
                                <span className="flex items-center gap-1">📦 {shop.total_products} products</span>
                                <span className="flex items-center gap-1">🛒 {shop.total_orders} orders</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Orders */}
            <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
                {stats?.recent_orders?.length > 0 ? (
                    <div className="space-y-3">
                        {stats.recent_orders.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-nexa-blue/10 flex items-center justify-center">
                                        <span className="text-xs font-bold text-nexa-blue">#{item.order?.id}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{item.product_name}</p>
                                        <p className="text-xs text-gray-500">by {item.order?.user?.name} • Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-gray-800">৳{Number(item.total).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-400">
                        <p className="text-sm">No orders received yet</p>
                        <p className="text-xs mt-1">Orders will appear here once customers start purchasing</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
