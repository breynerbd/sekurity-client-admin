import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Circle } from "react-leaflet";
import { useZoneActions } from "../hooks/useZoneActions.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapEvents({ setPosition }) {
    useMapEvents({
        click(e) {
            setPosition({
                lat: e.latlng.lat,
                lng: e.latlng.lng
            });
        },
    });
    return null;
}

export const ZoneModal = ({ isOpen, onClose }) => {
    const { addZone } = useZoneActions();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [position, setPosition] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "" });

    const mapRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                if (mapRef.current) {
                    mapRef.current.invalidateSize();
                }
            }, 250);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) return showError("El nombre es obligatorio");
        if (!position) return showError("Por favor, marca una ubicación en el mapa");

        setIsSubmitting(true);
        try {
            await addZone({
                name: formData.name,
                description: formData.description,
                latitude: position.lat,
                longitude: position.lng
            });

            showSuccess("Zona registrada correctamente");
            setFormData({ name: "", description: "" });
            setPosition(null);
            onClose();
        } catch (error) {
            showError("No se pudo registrar la zona");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex justify-center items-end sm:items-center z-[100] p-0 sm:p-4">
            <div className="bg-white rounded-t-[32px] sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto flex flex-col md:flex-row animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">

                <div className="w-full md:w-1/2 h-[300px] md:h-auto min-h-[300px] bg-slate-100 relative">
                    <div className="absolute top-4 left-13 z-[1000] bg-white/90 px-3 py-1.5 rounded-full shadow-md border border-blue-100">
                        <p className="text-[9px] font-black uppercase text-blue-600 tracking-wider flex items-center gap-1">
                            {position ? "📍 Ubicación fijada" : "🖱️ Toca el mapa"}
                        </p>
                    </div>

                    <MapContainer
                        center={[14.62540, -90.53586]}
                        zoom={13}
                        className="h-full w-full"
                        ref={mapRef}
                    >
                        <TileLayer
                            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                        />

                        <MapEvents setPosition={setPosition} />
                        {position && <Marker position={[position.lat, position.lng]} />}
                        {position && (
                            <Circle
                                center={[position.lat, position.lng]}
                                radius={200}
                                pathOptions={{
                                    color: "#3b82f6",
                                    fillColor: "#3b82f6",
                                    fillOpacity: 0.2,
                                    weight: 2,
                                }}
                            />
                        )}
                    </MapContainer>
                </div>

                <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-6 md:p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Nueva Zona</h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black uppercase text-blue-600 block mb-1.5 ml-1">Nombre del Sector</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-gray-50/50 transition-all text-sm"
                                placeholder="Ej: Residencial Santa Elena"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase text-gray-400 block mb-1.5 ml-1">Descripción</label>
                            <textarea
                                rows="2"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-gray-50/50 resize-none transition-all text-sm"
                                placeholder="Puntos de referencia..."
                            />
                        </div>

                        <div className="flex gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                            <div className="flex-1 text-center">
                                <span className="text-[8px] font-bold text-blue-400 uppercase block">Latitud</span>
                                <span className="text-[11px] font-mono text-blue-700 font-bold">{position?.lat.toFixed(5) || "0.00000"}</span>
                            </div>
                            <div className="w-[1px] bg-blue-200 my-1"></div>
                            <div className="flex-1 text-center">
                                <span className="text-[8px] font-bold text-blue-400 uppercase block">Longitud</span>
                                <span className="text-[11px] font-mono text-blue-700 font-bold">{position?.lng.toFixed(5) || "0.00000"}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all disabled:opacity-50 active:scale-95 text-[11px]"
                    >
                        {isSubmitting ? "Guardando..." : "Confirmar Registro"}
                    </button>
                </form>
            </div>
        </div>
    );
};