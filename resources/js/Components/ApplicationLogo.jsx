import { Link } from '@inertiajs/react';

export default function ApplicationLogo({ className = '' }) {
    return (
        <Link href="/" className={`flex items-center gap-2 ${className}`}>
            <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg gradient-blue flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.3" />
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <span className="ml-2 text-xl font-bold">
                    <span className="text-nexa-blue">Nexa</span>
                    <span className="text-gray-800">Commerce</span>
                </span>
            </div>
        </Link>
    );
}
