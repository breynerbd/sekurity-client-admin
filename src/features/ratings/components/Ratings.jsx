import { RatingItem } from "./RatingItem.jsx";

export const Ratings = ({ ratings = [] }) => {
    return (
        <div className="w-full font-sans">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Calificaciones de Reportes</h1>
                <p className="text-gray-500 text-sm">Analiza las calificaciones y feedback de los usuarios</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl border border-blue-100">⭐</div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Calificación Promedio</p>
                        <p className="text-2xl font-bold text-gray-900">4.1 <span className="text-amber-400 text-xl">★</span></p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-2xl border border-green-100">📈</div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Calificaciones</p>
                        <p className="text-2xl font-bold text-gray-900">79</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-2xl border border-amber-100">📄</div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mejor Calificado</p>
                        <p className="text-sm font-bold text-gray-900 truncate max-w-[150px]">Robo a mano armada e...</p>
                    </div>
                </div>
            </div>

            {/* Selector de ordenamiento */}
            <div className="flex items-center gap-3 mb-8 bg-gray-50/50 p-4 rounded-2xl w-fit border border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest italic">📊 Ordenar por:</span>
                <select className="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer hover:text-blue-600 transition">
                    <option>Mayor calificación</option>
                    <option>Menor calificación</option>
                    <option>Más recientes</option>
                </select>
            </div>

            {/* Listado de Calificaciones */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                {ratings.length > 0 ? (
                    ratings.map((item) => <RatingItem key={item.id} item={item} />)
                ) : (
                    <div className="p-20 text-center text-gray-400 italic">No hay datos de calificación disponibles.</div>
                )}
            </div>
        </div>
    );
};