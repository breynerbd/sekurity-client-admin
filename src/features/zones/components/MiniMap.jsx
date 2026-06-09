import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, Circle } from "react-leaflet";

function ResizeMap() {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const timer = setTimeout(() => {
            try {
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
                zoom={16}
                style={{ height: "100%", width: "100%", zIndex: 1 }}
                zoomControl={false}
                scrollWheelZoom={false}
                dragging={false}
                doubleClickZoom={false}
                attributionControl={false}
            >
                <TileLayer
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                />
                <Circle
                    center={[lat, lng]}
                    radius={200}
                    pathOptions={{
                        color: "#3b82f6",
                        fillColor: "#3b82f6",
                        fillOpacity: 0.2,
                        weight: 2,
                    }}
                />
                <Marker position={[lat, lng]} />

                <ResizeMap />
            </MapContainer>
        </div>
    );
};