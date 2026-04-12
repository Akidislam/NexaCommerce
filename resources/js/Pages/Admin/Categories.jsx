import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Categories({ categories }) {
    return (
        <AuthenticatedLayout header="Category Management">
            <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">All Categories</h3>
                    <button className="btn-primary text-sm">+ Add Category</button>
                </div>

                {categories?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {categories.filter(c => !c.parent_id).map((category) => (
                            <div key={category.id} className="border border-gray-100 rounded-xl p-4 hover:border-nexa-blue/30 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xl">{category.icon || '📂'}</span>
                                    <h4 className="text-sm font-semibold text-gray-800">{category.name}</h4>
                                </div>
                                {category.children?.length > 0 && (
                                    <div className="ml-8 space-y-1 mt-2">
                                        {category.children.map((child) => (
                                            <p key={child.id} className="text-xs text-gray-500 flex items-center gap-1">
                                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                {child.name}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-400">
                        <p className="text-sm">No categories created yet</p>
                        <p className="text-xs mt-1">Click "+ Add Category" to create your first category</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
