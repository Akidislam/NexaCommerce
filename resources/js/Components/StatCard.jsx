export default function StatCard({ title, value, icon, trend, trendUp, color = 'blue' }) {
    const colorClasses = {
        blue: 'bg-blue-50 text-nexa-blue',
        orange: 'bg-orange-50 text-nexa-orange',
        green: 'bg-green-50 text-nexa-success',
        red: 'bg-red-50 text-nexa-danger',
        purple: 'bg-purple-50 text-purple-600',
    };

    return (
        <div className="card p-5 sm:p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium">{title}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">{value}</p>
                    {trend && (
                        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={trendUp ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'} />
                            </svg>
                            {trend}
                        </div>
                    )}
                </div>
                <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
