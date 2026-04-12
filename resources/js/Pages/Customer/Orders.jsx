import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function CustomerOrders({ orders }) {
    return (
        <AuthenticatedLayout header="My Orders">
            <div className="card overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800">Order History</h3>
                </div>

                {orders?.data?.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {orders.data.map((order) => (
                            <div key={order.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{order.order_number}</p>
                                        <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                        <p className="text-lg font-bold text-gray-800">৳{Number(order.total).toLocaleString()}</p>
                                    </div>
                                </div>

                                {order.items?.length > 0 && (
                                    <div className="space-y-2 ml-0 sm:ml-4">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-3 text-sm text-gray-600">
                                                <span className="w-1.5 h-1.5 bg-nexa-blue rounded-full shrink-0"></span>
                                                <span className="flex-1">{item.product_name} × {item.quantity}</span>
                                                <span className="font-medium">৳{Number(item.total).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <span className="text-4xl block mb-3">📦</span>
                        <p className="text-sm text-gray-500 font-medium">No orders found</p>
                        <p className="text-xs text-gray-400 mt-1">Your order history will appear here</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
