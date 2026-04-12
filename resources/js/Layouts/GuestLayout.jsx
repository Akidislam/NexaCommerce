import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function GuestLayout({ children, title = '' }) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen flex flex-col bg-nexa-gray-50">
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}
