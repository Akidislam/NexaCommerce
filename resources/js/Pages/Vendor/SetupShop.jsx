import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function SetupShop() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout header="Setup Your Shop">
            <div className="max-w-2xl mx-auto">
                <div className="card p-8 text-center">
                    <div className="w-20 h-20 rounded-2xl gradient-blue flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Set Up Your Shop</h2>
                    <p className="text-gray-500 mb-8">Welcome {auth.user?.name}! You need to create a shop before you can start selling on NexaCommerce.</p>

                    <div className="text-left space-y-4 mb-8 bg-gray-50 rounded-xl p-6">
                        <h3 className="font-semibold text-gray-700 mb-3">What you'll need:</h3>
                        {[
                            'Shop name and description',
                            'Contact information (phone, email)',
                            'Shop logo (optional)',
                            'Business address',
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-nexa-blue/10 flex items-center justify-center shrink-0">
                                    <span className="text-xs font-bold text-nexa-blue">{index + 1}</span>
                                </div>
                                <span className="text-sm text-gray-600">{item}</span>
                            </div>
                        ))}
                    </div>

                    <button className="btn-primary px-8 py-3 text-base">
                        Create My Shop →
                    </button>
                    <p className="text-xs text-gray-400 mt-3">Your shop will be reviewed before activation</p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
