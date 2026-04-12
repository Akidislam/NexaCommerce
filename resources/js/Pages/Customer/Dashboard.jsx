import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function CustomerDashboard({ orders = [] }) {
    return (
        <AuthenticatedLayout header="My Dashboard">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                    { icon: '🛒', label: 'Continue Shopping', href: '/', color: 'bg-blue-50' },
                    { icon: '📦', label: 'My Orders', href: route('customer.orders'), color: 'bg-green-50' },
                    { icon: '❤️', label: 'Wishlist', href: '#', color: 'bg-red-50' },
                    { icon: '⚙️', label: 'Settings', href: route('profile.edit'), color: 'bg-purple-50' },
                ].map((action) => (
                    <Link
                        key={action.label}
                        href={action.href}
                        className={`card p-4 sm:p-6 text-center hover:shadow-card-hover transition-all ${action.color}`}
                    >
                        <span className="text-2xl sm:text-3xl block mb-2">{action.icon}</span>
                        <span className="text-xs sm:text-sm font-medium text-gray-700">{action.label}</span>
                    </Link>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
                    <Link href={route('customer.orders')} className="text-sm text-nexa-blue hover:underline">View All</Link>
                </div>

                {orders.length > 0 ? (
                    <div className="space-y-3">
                        {orders.map((order) => (
                            <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-3">
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{order.order_number}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {order.items?.length || 0} items • {new Date(order.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                    <p className="text-sm font-bold text-gray-800">৳{Number(order.total).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <span className="text-4xl block mb-3">🛍️</span>
                        <p className="text-sm text-gray-500 font-medium">No orders yet</p>
                        <p className="text-xs text-gray-400 mt-1 mb-4">Start shopping to see your orders here</p>
                        <Link href="/" className="btn-primary text-sm">Start Shopping</Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
