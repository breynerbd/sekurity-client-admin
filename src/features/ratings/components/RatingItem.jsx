export const RatingItem = ({ item }) => {
    const reportData = item.report || item.Report || {};
    const title = reportData.title || item.title || "Reporte sin título";
    const description = reportData.description || item.description || "Sin descripción de incidente";

    const zoneId = reportData.zone_id || item.zone_id;
    const zoneText = zoneId ? `Zona ${zoneId}` : (item.zone || "N/A");

    return (
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
            <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                    {title}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-black bg-gray-100 text-gray-600 rounded-md">
                        {zoneText}
                    </span>
                    <p className="text-xs text-gray-500 font-medium truncate max-w-md">
                        {description}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-gray-700">
                <div className="text-right">
                    <div className="text-blue-600 font-extrabold">
                        {item.average ? Number(item.average).toFixed(1) : "0.0"} ★
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium">
                        {item.totalRatings || 0} votos
                    </div>
                </div>
            </div>
        </div>
    );
};