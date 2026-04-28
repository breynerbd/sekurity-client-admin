import { useState } from "react";

export const ZoneModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header con gradiente azul de Sekurity */}
                <div
                    className="p-6 text-white flex justify-between items-center"
                    style={{ background: "linear-gradient(90deg, #1d4ed8 0%, #1956a3 100%)" }}
                >
                    <div>
                        <h2 className="text-2xl font-bold">Nueva Zona Geográfica</h2>
                        <p className="text-blue-100 text-xs mt-1">Define un nuevo sector de supervisión</p>
                    </div>
                    <button onClick={onClose} className="text-2xl hover:scale-110 transition">&times;</button>
                </div>

                <form className="p-8 space-y-5">
                    <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block mb-2">Nombre de la Zona</label>
                        <input
                            type="text"
                            placeholder="Ej: Zona Residencial Norte"
                            className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none transition font-medium"
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block mb-2">Descripción</label>
                        <textarea
                            rows="3"
                            placeholder="Breve descripción del área comercial o residencial..."
                            className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none transition font-medium"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block mb-2">Latitud</label>
                            <input type="text" placeholder="19.4326" className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none transition" />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block mb-2">Longitud</label>
                            <input type="text" placeholder="-99.1332" className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none transition" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition">
                            Cancelar
                        </button>
                        <button type="submit" className="px-8 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
                            Crear Zona
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};