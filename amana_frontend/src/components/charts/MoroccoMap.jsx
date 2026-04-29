import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { feature } from "topojson-client";
import moroccoTopo from "morocco-map";

const geoData = feature(moroccoTopo, moroccoTopo.objects.regions);

const cityToRegion = {
    "SALE":                  "Rabat-Salé-Kénitra ⵔⴱⴰⵟ-ⵙⵍⴰ-ⵇⵏⵉⵟⵔⴰ الرباط-سلا-القنيطرة",
    "RABAT":                 "Rabat-Salé-Kénitra ⵔⴱⴰⵟ-ⵙⵍⴰ-ⵇⵏⵉⵟⵔⴰ الرباط-سلا-القنيطرة",
    "KENITRA":               "Rabat-Salé-Kénitra ⵔⴱⴰⵟ-ⵙⵍⴰ-ⵇⵏⵉⵟⵔⴰ الرباط-سلا-القنيطرة",
    "CASABLANCA":            "Casablanca-Settat ⵜⵉⴳⵎⵉ ⵜⵓⵎⵍⵉⵍⵜ-ⵙⵟⵟⴰⵜ الدار البيضاء-سطات",
    "SETTAT":                "Casablanca-Settat ⵜⵉⴳⵎⵉ ⵜⵓⵎⵍⵉⵍⵜ-ⵙⵟⵟⴰⵜ الدار البيضاء-سطات",
    "TANGER":                "Tanger-Tétouan-Al Hoceima ⵟⴰⵏⵊ-ⵟⵉⵜⴰⵡⵉⵏ-ⵍⵃⵓⵙⵉⵎⴰ طنجة تطوان الحسيمة",
    "TETOUAN":               "Tanger-Tétouan-Al Hoceima ⵟⴰⵏⵊ-ⵟⵉⵜⴰⵡⵉⵏ-ⵍⵃⵓⵙⵉⵎⴰ طنجة تطوان الحسيمة",
    "FES":                   "Fès-Meknès ⴼⴰⵙ-ⵎⴽⵏⴰⵙ فاس-مكناس",
    "MEKNES":                "Fès-Meknès ⴼⴰⵙ-ⵎⴽⵏⴰⵙ فاس-مكناس",
    "MARRAKECH":             "Marrakech-Safi ⵎⵕⵕⴰⴽⵛ-ⴰⵙⴼⵉ مراكش-أسفي",
    "SAFI":                  "Marrakech-Safi ⵎⵕⵕⴰⴽⵛ-ⴰⵙⴼⵉ مراكش-أسفي",
    "AGADIR":                "Souss-Massa ⵙⵓⵙⵙ-ⵎⴰⵙⵙⴰ سوس-ماسة",
    "TIZNIT":                "Souss-Massa ⵙⵓⵙⵙ-ⵎⴰⵙⵙⴰ سوس-ماسة",
    "LAAYOUNE":              "Laâyoune-Sakia El Hamra ⵍⵄⵢⵓⵏ-ⵙⴰⵇⵢⴰ ⵍⵃⴰⵎⵔⴰ العيون الساقية الحمراء",
    "DAKHLA OUED EDDAHAB":  "Dakhla-Oued Ed-Dahab ⴷⴰⵅⵍⴰ-ⵡⴰⴷ ⴷⴰⵀⴰⴱ الداخلة-وادي الذهب",
    "OUJDA":                 "Oriental ⵜⴰⵏⴳⵎⵓⴹⵜ الشرقية",
    "NADOR":                 "Oriental ⵜⴰⵏⴳⵎⵓⴹⵜ الشرقية",
    "ERRACHIDIA":            "Drâa-Tafilalet ⴷⴰⵔⵄⴰ-ⵜⴰⴼⵉⵍⴰⵍⵜ درعة تافيلالت",
    "MERZOUGA":              "Drâa-Tafilalet ⴷⴰⵔⵄⴰ-ⵜⴰⴼⵉⵍⴰⵍⵜ درعة تافيلالت",
    "TINEJDAD":              "Drâa-Tafilalet ⴷⴰⵔⵄⴰ-ⵜⴰⴼⵉⵍⴰⵍⵜ درعة تافيلالت",
    "OUARZAZATE":            "Drâa-Tafilalet ⴷⴰⵔⵄⴰ-ⵜⴰⴼⵉⵍⴰⵍⵜ درعة تافيلالت",
    "GUELMIM":               "Guelmim-Oued Noun ⵜⴰⵙⴳⴰ-ⵡⴰⴷ ⵏⵓⵏ كلميم وادي نون",
    "BENI MELLAL":           "Béni Mellal-Khénifra ⴰⵢⵜ ⵎⵍⵍⴰⵍ-ⵅⵏⵉⴼⵕⴰ بني ملال-خنيفرة",
    "KHOURIBGA":             "Béni Mellal-Khénifra ⴰⵢⵜ ⵎⵍⵍⴰⵍ-ⵅⵏⵉⴼⵕⴰ بني ملال-خنيفرة",
};

export default function MoroccoMap({ data = [] }) {
    const regionCount = {};
    data.forEach((b) => {
        if (b.libville) {
            const region = cityToRegion[b.libville.toUpperCase()];
            if (region) {
                regionCount[region] = (regionCount[region] || 0) + 1;
            }
        }
    });

    function getColor(count) {
        if (!count || count === 0) return "#e5e7aa";
        if (count <= 2) return "#fed7aa";
        if (count <= 5) return "#f97316";
        return "#ea580c";
    }

    function styleFeature(feature) {
        const name = feature.properties?.name;
        const count = regionCount[name] || 0;
        return {
            fillColor: getColor(count),
            fillOpacity: 0.8,
            color: "#ffffff",
            weight: 1
        };
    }

    function onEachFeature(feature, layer) {
        const name = feature.properties?.name;
        const count = regionCount[name] || 0;
        layer.bindPopup(`
            <p className="font-weight:600">${name}</p>
            <p className="font-size:11px">${count} colis</p>
        `);
        layer.on("mouseover", () => layer.setStyle({ fillOpacity: 1 }));
        layer.on("mouseout", () => layer.setStyle({ fillOpacity: 0.8 }));
    }

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
                <GeoJSON
                    data={geoData}
                    style={styleFeature}
                    onEachFeature={onEachFeature}
                />
            </MapContainer>

            <div className="flex items-center gap-4 mt-3 justify-center">
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-sm inline-block bg-gray-200" />
                    <span className="text-xs text-gray-400">Aucune livraison</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-sm inline-block bg-orange-200" />
                    <span className="text-xs text-gray-400">1-2 colis</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-sm inline-block bg-orange-500" />
                    <span className="text-xs text-gray-400">3-5 colis</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-sm inline-block bg-orange-600" />
                    <span className="text-xs text-gray-400">5+ colis</span>
                </div>
            </div>
        </div>
    )
}














// import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';



// export default function MoroccoMap({ data = [] }) {
//     const cityMap = {};
//     data.forEach((b) => {
//         if (b.libville) {
//             if (!cityMap[b.libville]) {
//                 cityMap[b.libville] = { count: 0, lat: null, lng: null };
//             }
//             cityMap[b.libville].count += 1;
//             if (b.latitude) cityMap[b.libville].lat = b.latitude;
//             if (b.longitude) cityMap[b.libville].lng = b.longitude;
//         }
//     });

//     // coordinates for known cities
//     const cityCoords = {
//         "SALE":                 { lat:34.0370, lng: -6.8326 },
//         "CASABLANCA":           { lat:33.5731, lng: -7.5898 },
//         "RABAT":                { lat:34.0209, lng: -6.8416 },
//         "TANGER":               { lat:35.7595, lng: -5.8340 },
//         "MERZOUGA":             { lat:31.0801, lng: -3.9733 },
//         "LAAYOUNE":             { lat:27.1536, lng: -13.2033 },
//         "KENITRA":              { lat:34.2610, lng: -6.5802 },
//         "TINEJDAD":             { lat:34.5140, lng: -4.9800 },
//         "DAKHLA OUED EDDAHAB":  { lat:23.6847, lng: -15.9572 },
//         "AGADIR":               { lat:30.4278, lng: -9.5981 },
//         "FES":                  { lat:34.0181, lng: -5.0078 },
//         "MARRAKECH":            { lat:31.6295, lng: -7.9811 },
//         "MEKNES":               { lat:33.8935, lng: -5.5547 },
//         "OUJDA":                { lat:34.6867, lng: -1.9114 },
//         "TETOUAN":              { lat:35.5785, lng: -5.3684 },
//     };

//     const deliveryPoints = Object.entries(cityMap)
//         .map(([city, info]) => {
//             const coords = cityCoords[city.toUpperCase()] || null;
//             return coords ? {
//                 city,
//                 count: info.count,
//                 lat: coords.lat,
//                 lng: coords.lng
//             } : null;
//         })
//         .filter(Boolean);

//     return (
//         <div className="bg-white rounded-xl shadow-sm p-4">
//             <h3 className="text-sm font-semibold text-gray-700 mb-4">
//                 Carte des livraisons
//             </h3>

//             <MapContainer
//                 center={[31.7917, -7.0926]}
//                 zoom={5}
//                 style={{ height: "320px", width: "100%", borderRadius: "12px" }}
//                 scrollWheelZoom={false}
//             >
//                 <TileLayer 
//                     attribution='&copy; OpenStreetMap'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />

//                 {deliveryPoints.map((point) => (
//                     <CircleMarker 
//                         key={point.city}
//                         center={[point.lat, point.lng]}
//                         radius={Math.max(point.count * 4, 6)}
//                         pathOptions={{
//                             color: "#f97316",
//                             fillColor: "#f97316",
//                             fillOpacity: 0.7
//                         }}
//                     >
//                         <Popup>
//                             <p className="font-semibold">{point.city}</p>
//                             <p className="text-xs text-gray-500">{point.count} colis</p>
//                         </Popup>
//                     </CircleMarker>
//                 ))}
//             </MapContainer>
//         </div>
//     )
// }

