export const RatingItem = ({ item }) => {
    const getWidth = (votes) => {
        const total = item.totalRatings || 1;
        return `${(votes / total) * 100}%`;
    };

    return (
        <div className="p-8 border-b border-gray-50 last:border-0 hover:bg-gray-50/30 transition-colors">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-400 font-medium">{item.zone}</p>
                </div>
                <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-100 flex flex-col items-center">
                    <span className="text-green-600 font-bold text-xl">{item.average} ★</span>
                    <span className="text-[10px] text-green-500 font-semibold uppercase">{item.totalRatings} calificaciones</span>
                </div>
            </div>

            {/* Distribución de Estrellas */}
            <div className="space-y-3 max-w-3xl">
                {[5, 4, 3, 2, 1].map((star) => {
                    const votes = item.distribution[star] || 0;
                    return (
                        <div key={star} className="flex items-center gap-4">
                            <span className="text-xs font-bold text-amber-500 w-4">{star} ★</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                                    style={{ width: getWidth(votes) }}
                                ></div>
                            </div>
                            <span className="text-xs font-bold text-gray-400 w-4 text-right">{votes}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};