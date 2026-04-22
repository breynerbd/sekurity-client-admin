export const ReportModal = ({ isOpen, onClose, report }) => {
    if (!isOpen || !report) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div
                    className="p-6 text-white flex justify-between items-center"
                    style={{ background: "linear-gradient(90deg, #1d4ed8 0%, #1956a3 100%)" }}
                >
                    <div>
                        <h2 className="text-2xl font-bold">Detalles del Reporte</h2>
                        <p className="text-blue-100 text-xs mt-1 italic">ID: #{report.id || 'REF-001'}</p>
                    </div>
                    <button onClick={onClose} className="text-2xl hover:scale-110 transition">&times;</button>
                </div>

                <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block mb-2">Título del Incidente</label>
                            <p className="text-xl font-bold text-gray-900 bg-gray-50 p-4 rounded-2xl border border-gray-100">{report.title}</p>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block mb-2">Estado Actual</label>
                            <select className="w-full p-3 rounded-xl border-2 border-gray-100 font-semibold text-gray-700 focus:border-blue-500 outline-none">
                                <option value="Pendiente">Pendiente</option>
                                <option value="En Progreso">En Progreso</option>
                                <option value="Resuelto">Resuelto</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block mb-2">Prioridad</label>
                            <div className="flex gap-2">
                                {['Baja', 'Media', 'Alta'].map(p => (
                                    <span key={p} className={`flex-1 text-center py-2 rounded-xl text-xs font-bold border-2 ${report.priority === p ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-50 text-gray-300'}`}>
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block mb-2">Descripción Detallada</label>
                            <textarea
                                readOnly
                                rows="3"
                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-600 italic"
                                value={report.description}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t">
                        <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition">
                            Cerrar
                        </button>
                        <button className="px-8 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};