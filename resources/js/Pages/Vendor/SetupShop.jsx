import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function SetupShop() {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        address: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('vendor.shop.store'));
    };

    return (
        <AuthenticatedLayout header="Setup Your Shop">
            <Head title="Setup Shop" />
            <div className="max-w-2xl mx-auto">
                <div className="card p-8">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-2xl md:w-20 md:h-20 gradient-blue flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Shop</h2>
                        <p className="text-gray-500">Welcome {auth.user?.name}! Fill in your details below to start selling on NexaCommerce.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name *</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="input-field"
                                placeholder="E.g., Nexa Electronics"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Shop Description *</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="input-field min-h-[100px]"
                                placeholder="Tell us what you sell..."
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Business Address *</label>
                            <textarea
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className="input-field min-h-[60px]"
                                placeholder="Full street address"
                            ></textarea>
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <button type="submit" disabled={processing} className="btn-primary w-full py-3 text-base">
                                {processing ? 'Submitting request...' : 'Create My Shop'}
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-3">Your shop will be reviewed by admins before activation.</p>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
