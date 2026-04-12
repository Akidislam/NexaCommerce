import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Users({ users }) {
    return (
        <AuthenticatedLayout header="User Management">
            <div className="card overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">All Users</h3>
                        <div className="flex items-center gap-2">
                            <input type="text" placeholder="Search users..." className="input-field text-sm py-2 w-48" />
                            <select className="input-field text-sm py-2 w-32">
                                <option value="">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="vendor">Vendor</option>
                                <option value="customer">Customer</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users?.data?.length > 0 ? users.data.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-nexa-blue/10 flex items-center justify-center">
                                                <span className="text-sm font-semibold text-nexa-blue">{user.name?.charAt(0)?.toUpperCase()}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full uppercase ${user.role === 'admin' ? 'bg-red-100 text-red-700' :
                                                user.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-green-100 text-green-700'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${user.is_active ? 'badge-success' : 'badge-danger'}`}>
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-sm text-nexa-blue hover:underline">View</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                        <p className="text-sm">No users found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
