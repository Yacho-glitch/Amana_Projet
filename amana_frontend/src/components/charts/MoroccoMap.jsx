import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

const deliveryPoints = [
    { city: "Salé", lat: 34.0370, lng: -6.8326, count: 1 },
    { city: "Casablanca", lat: 33.5731, lng: -7.5898, count: 10 },
    { city: "Rabat", lat: 34.0209, lng: -6.8416, count: 5 },
    { city: "Tanger", lat: 35.7595, lng: -5.8340, count: 3 },
    { city: "Merzouga", lat: 31.0801, lng: -3.9733, count: 1 },
    { city: "Laayoune", lat: 27.1536, lng: -13.2033, count: 2 }
];

export default function MoroccoMap() {
    return (
        <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Carte des livraisons
            </h3>

            <MapContainer
                center={[31.7917, -7.0926]}
                zoom={5}
                style={{ height: "320px", width: "100%", borderRadius: "12px" }}
                scrollWheelZoom={false}
            >
                <TileLayer 
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {deliveryPoints.map((point) => (
                    <CircleMarker 
                        key={point.city}
                        center={[point.lat, point.lng]}
                        radius={point.count * 4}
                        pathOptions={{
                            color: "#f97316",
                            fillColor: "#f97316",
                            fillOpacity: 0.7
                        }}
                    >
                        <Popup>
                            <p className="font-semibold">{point.city}</p>
                            <p className="text-xs text-gray-500">{point.count} colis</p>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    )
}

