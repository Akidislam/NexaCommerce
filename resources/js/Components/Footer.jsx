import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg gradient-blue flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.3" />
                                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-white">
                                Nexa<span className="text-nexa-blue-light">Commerce</span>
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Your one-stop multi-vendor marketplace. Shop from thousands of sellers with secure payments and fast delivery.
                        </p>
                        <div className="flex gap-3">
                            {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                                <a key={social} href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-nexa-blue flex items-center justify-center transition-colors duration-200">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="4" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'About Us', href: '#' },
                                { label: 'Contact Us', href: '#' },
                                { label: 'Careers', href: '#' },
                                { label: 'Blog', href: '#' },
                                { label: 'Sitemap', href: '#' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-gray-400 hover:text-nexa-blue-light transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Help Center', href: '#' },
                                { label: 'Returns & Refunds', href: '#' },
                                { label: 'Shipping Info', href: '#' },
                                { label: 'Track Order', href: '#' },
                                { label: 'Payment Methods', href: '#' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-gray-400 hover:text-nexa-blue-light transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Stay Connected</h3>
                        <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive deals and updates.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:border-nexa-blue focus:ring-1 focus:ring-nexa-blue/30 focus:outline-none placeholder:text-gray-500"
                            />
                            <button className="px-4 py-2 bg-nexa-blue text-white rounded-lg text-sm font-medium hover:bg-nexa-blue-dark transition-colors">
                                Join
                            </button>
                        </div>
                        <div className="mt-6">
                            <h4 className="text-white font-medium text-sm mb-3">Download App</h4>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 2.281l-15.44 8.919L5.5 12l-3.417.8L17.523 21.72c.588.34 1.226-.244.96-.879L15.5 12l2.983-8.841c.266-.635-.372-1.219-.96-.879z" /></svg>
                                    <div className="text-left">
                                        <div className="text-[10px] text-gray-400">GET IT ON</div>
                                        <div className="text-xs font-medium text-white">Google Play</div>
                                    </div>
                                </button>
                                <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83" /></svg>
                                    <div className="text-left">
                                        <div className="text-[10px] text-gray-400">Download on</div>
                                        <div className="text-xs font-medium text-white">App Store</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                        <p>© 2024 NexaCommerce. All rights reserved.</p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
                            <Link href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
