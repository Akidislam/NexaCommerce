import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Users({ vendors = [], customers = [] }) {
    const [activeTab, setActiveTab] = useState('vendors');

    return (
        <AuthenticatedLayout header="User Management">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                    <div className="p-6 border-b border-blue-100 bg-blue-50">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <h3 className="text-xl font-bold text-blue-900">User Management</h3>
                            <div className="flex bg-white rounded-lg p-1 border border-blue-200">
                                <button
                                    onClick={() => setActiveTab('vendors')}
                                    className={`px-6 py-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'vendors' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'
                                        }`}
                                >
                                    Vendors ({vendors.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('customers')}
                                    className={`px-6 py-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'customers' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'
                                        }`}
                                >
                                    Customers ({customers.length})
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                    {activeTab === 'vendors' ? (
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Shop Name</th>
                                    ) : (
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Orders</th>
                                    )}
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 p-0">
                                {activeTab === 'vendors' ? (
                                    vendors.length > 0 ? vendors.map((vendor) => (
                                        <UserRow key={vendor.id} user={vendor} extraData={vendor.shop?.name || 'No Shop yet'} isVendor={true} />
                                    )) : (
                                        <EmptyRow message="No vendors registered yet." />
                                    )
                                ) : (
                                    customers.length > 0 ? customers.map((customer) => (
                                        <UserRow key={customer.id} user={customer} extraData={`${customer.orders_count || 0} Orders`} isVendor={false} />
                                    )) : (
                                        <EmptyRow message="No customers registered yet." />
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function UserRow({ user, extraData, isVendor }) {
    return (
        <tr className="hover:bg-blue-50/50 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                        <span className="text-sm font-bold text-blue-700">{user.name?.charAt(0)?.toUpperCase()}</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-800">{user.name}</p>
                        <p className="text-xs font-medium text-gray-500">{user.email}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-sm font-medium text-gray-700">
                {extraData}
            </td>
            <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${user.is_active ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                    {user.is_active ? 'Active' : 'Deactivated'}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                {isVendor ? (
                    <Link
                        href={route('admin.users.toggleStatus', user.id)}
                        method="post" as="button" preserveScroll
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${user.is_active
                            ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                            : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
                            }`}
                    >
                        {user.is_active ? 'Deactivate User' : 'Activate User'}
                    </Link>
                ) : (
                    <button className="px-4 py-1.5 rounded-md text-xs font-bold transition-colors bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200">
                        View Profile
                    </button>
                )}
            </td>
        </tr>
    );
}

function EmptyRow({ message }) {
    return (
        <tr>
            <td colSpan="4" className="px-6 py-12 text-center text-gray-400 font-medium">
                {message}
            </td>
        </tr>
    );
}
