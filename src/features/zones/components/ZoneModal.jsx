import { useState } from "react";
import { useZoneActions } from "../hooks/useZoneActions.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";

export const ZoneModal = ({ isOpen, onClose }) => {
    const { addZone } = useZoneActions();
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) return showError("El nombre es obligatorio");

        setIsSubmitting(true);
        try {
            await addZone(formData);
            showSuccess("Zona creada con éxito");
            setFormData({ name: "", description: "" }); // Reset
            onClose();
        } catch (error) {
            showError("Error al crear la zona");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-lg overflow-hidden">
                <div className="p-6 text-white flex justify-between items-center" style={{ background: "linear-gradient(90deg, #1d4ed8 0%, #1956a3 100%)" }}>
                    <div>
                        <h2 className="text-2xl font-bold">Nueva Zona Geográfica</h2>
                    </div>
                    <button onClick={onClose} className="text-2xl hover:scale-110 transition">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-2">Nombre de la Zona</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ej: Zona Residencial Norte"
                            className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-2">Descripción</label>
                        <textarea
                            rows="3"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Breve descripción del área..."
                            className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg disabled:opacity-50"
                        >
                            {isSubmitting ? "Creando..." : "Crear Zona"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};