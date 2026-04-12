import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function VendorOrders({ orderItems, shop }) {
    return (
        <AuthenticatedLayout header="My Orders">
            <div className="card overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800">Orders for {shop?.name}</h3>
                </div>

                {orderItems?.data?.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orderItems.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-nexa-blue font-medium">#{item.order?.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{item.product_name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.order?.user?.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.quantity}</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">৳{Number(item.total).toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${item.order?.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                    item.order?.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {item.order?.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center text-gray-400">
                        <p className="text-sm">No orders received yet</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
