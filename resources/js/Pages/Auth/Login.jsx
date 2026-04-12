import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen flex">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    <div className="relative z-10 text-white text-center max-w-md">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.3" />
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" />
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-3">Welcome Back to NexaCommerce</h2>
                        <p className="text-blue-200">Your one-stop multi-vendor marketplace. Login to access your dashboard, manage orders, and start shopping!</p>
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

                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Sign In</h1>
                        <p className="text-gray-500 text-sm mb-6">Enter your credentials to access your account</p>

                        {status && (
                            <div className="mb-4 text-sm text-green-600 bg-green-50 rounded-lg p-3">{status}</div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="input-field"
                                    placeholder="you@example.com"
                                    required
                                    autoFocus
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

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-nexa-blue focus:ring-nexa-blue/30"
                                    />
                                    <span className="text-sm text-gray-600">Remember me</span>
                                </label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-sm text-nexa-blue hover:underline">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <button type="submit" disabled={processing} className="btn-primary w-full py-3 text-base">
                                {processing ? (
                                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                ) : null}
                                {processing ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            Don't have an account?{' '}
                            <Link href={route('register')} className="text-nexa-blue font-medium hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
