import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';

export default function AdminDashboard({ stats }) {
    return (
        <AuthenticatedLayout header="Admin Dashboard">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    title="Total Users"
                    value={stats?.total_users || 0}
                    color="blue"
                    trend="+12% this month"
                    trendUp={true}
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    }
                />
                <StatCard
                    title="Active Shops"
                    value={stats?.active_shops || 0}
                    color="green"
                    trend={`${stats?.pending_shops || 0} pending`}
                    trendUp={true}
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    }
                />
                <StatCard
                    title="Total Products"
                    value={stats?.total_products || 0}
                    color="purple"
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    }
                />
                <StatCard
                    title="Total Revenue"
                    value={`৳${Number(stats?.total_revenue || 0).toLocaleString()}`}
                    color="orange"
                    trend="+8% this week"
                    trendUp={true}
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Recent Orders */}
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
                        <span className="badge-info">{stats?.total_orders || 0} total</span>
                    </div>
                    {(stats?.recent_orders?.length > 0) ? (
                        <div className="space-y-3">
                            {stats.recent_orders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{order.order_number}</p>
                                        <p className="text-xs text-gray-500">{order.user?.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-800">৳{Number(order.total).toLocaleString()}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-sm">No orders yet</p>
                        </div>
                    )}
                </div>

                {/* Recent Users */}
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Recent Users</h3>
                        <span className="badge-info">{stats?.total_users || 0} total</span>
                    </div>
                    {(stats?.recent_users?.length > 0) ? (
                        <div className="space-y-3">
                            {stats.recent_users.map((user) => (
                                <div key={user.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-9 h-9 rounded-full bg-nexa-blue/10 flex items-center justify-center shrink-0">
                                        <span className="text-sm font-semibold text-nexa-blue">{user.name?.charAt(0)?.toUpperCase()}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase ${user.role === 'admin' ? 'bg-red-100 text-red-700' :
                                            user.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                                                'bg-green-100 text-green-700'
                                        }`}>
                                        {user.role}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
                            </svg>
                            <p className="text-sm">No users yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Platform Summary */}
            <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Vendors', value: stats?.total_vendors || 0, color: 'text-nexa-blue' },
                        { label: 'Customers', value: stats?.total_customers || 0, color: 'text-green-600' },
                        { label: 'Categories', value: stats?.total_categories || 0, color: 'text-purple-600' },
                        { label: 'Total Orders', value: stats?.total_orders || 0, color: 'text-nexa-orange' },
                    ].map((item) => (
                        <div key={item.label} className="text-center p-4 bg-gray-50 rounded-xl">
                            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
