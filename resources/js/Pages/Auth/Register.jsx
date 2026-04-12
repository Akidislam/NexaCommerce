import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'customer',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen flex">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    <div className="relative z-10 text-white text-center max-w-md">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.3" />
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" />
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-3">Join NexaCommerce</h2>
                        <p className="text-blue-200 mb-8">Create your account and start exploring thousands of products or become a vendor and reach millions of customers.</p>
                        <div className="grid grid-cols-2 gap-4 text-left">
                            {[
                                { title: 'Customers', desc: 'Shop, track orders, and get exclusive deals' },
                                { title: 'Vendors', desc: 'Sell products, manage inventory, and earn' },
                            ].map((item) => (
                                <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                    <h3 className="font-semibold mb-1">{item.title}</h3>
                                    <p className="text-xs text-blue-200">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-white">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center justify-center mb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl gradient-blue flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.3" />
                                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" />
                                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold">
                                    <span className="text-nexa-blue">Nexa</span><span className="text-gray-800">Commerce</span>
                                </span>
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h1>
                        <p className="text-gray-500 text-sm mb-6">Fill in your details to get started</p>

                        <form onSubmit={submit} className="space-y-4">
                            {/* Role Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">I want to</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setData('role', 'customer')}
                                        className={`p-3 rounded-xl border-2 text-center transition-all ${data.role === 'customer'
                                                ? 'border-nexa-blue bg-nexa-blue/5 text-nexa-blue'
                                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                    >
                                        <span className="text-2xl block mb-1">🛍️</span>
                                        <span className="text-sm font-medium">Shop</span>
                                        <p className="text-xs text-gray-400 mt-0.5">Buy products</p>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setData('role', 'vendor')}
                                        className={`p-3 rounded-xl border-2 text-center transition-all ${data.role === 'vendor'
                                                ? 'border-nexa-blue bg-nexa-blue/5 text-nexa-blue'
                                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                    >
                                        <span className="text-2xl block mb-1">🏪</span>
                                        <span className="text-sm font-medium">Sell</span>
                                        <p className="text-xs text-gray-400 mt-0.5">Open a shop</p>
                                    </button>
                                </div>
                                {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="input-field"
                                    placeholder="John Doe"
                                    required
                                    autoFocus
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="input-field"
                                    placeholder="you@example.com"
                                    required
                                />
                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="input-field"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="input-field"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password_confirmation && <p className="mt-1 text-xs text-red-500">{errors.password_confirmation}</p>}
                            </div>

                            <button type="submit" disabled={processing} className="btn-primary w-full py-3 text-base">
                                {processing ? (
                                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                ) : null}
                                {processing ? 'Creating Account...' : `Create ${data.role === 'vendor' ? 'Vendor' : 'Customer'} Account`}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link href={route('login')} className="text-nexa-blue font-medium hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
