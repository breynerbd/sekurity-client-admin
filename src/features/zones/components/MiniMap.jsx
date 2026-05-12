import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

// Componente auxiliar mejorado
function ResizeMap() {
    const map = useMap();

    useEffect(() => {
        // Verificamos que 'map' y sus métodos internos existan
        if (!map) return;

        const timer = setTimeout(() => {
            try {
                // Solo ejecutamos si el mapa está vinculado a un contenedor real
                if (map.getContainer()) {
                    map.invalidateSize();
                }
            } catch (e) {
                console.warn("Leaflet: Reintentando ajuste de tamaño...", e);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [map]);

    return null;
}

export const MiniMap = ({ lat, lng }) => {
    // Validación de coordenadas para evitar que Leaflet intente renderizar [null, null]
    if (lat === undefined || lng === undefined || lat === null || lng === null) {
        return (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Sin coordenadas
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-hidden">
            <MapContainer
                center={[lat, lng]}
                zoom={14}
                style={{ height: "100%", width: "100%", zIndex: 1 }}
                zoomControl={false}
                scrollWheelZoom={false}
                dragging={false}
                doubleClickZoom={false}
                attributionControl={false} // Limpia el mapa para que sea más "mini"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[lat, lng]} />

                <ResizeMap />
            </MapContainer>
        </div>
    );
};