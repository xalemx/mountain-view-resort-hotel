import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PROPERTIES } from "@/lib/siteContent";
import { PROPERTY_FACTS } from "@/lib/propertyFacts";
import { mapsWebUrl, openInMaps } from "@/lib/mapsLink";

// The two houses on one map, both labelled. The map is drawn with OpenStreetMap
// tiles, which are free to use and need no key, and the pins are our own so the
// map never depends on marker images that a build step can lose.
const HOUSES = PROPERTIES.map((property) => ({
  id: property.id,
  number: property.number,
  name: property.name,
  mapQuery: property.mapQuery,
  pin: PROPERTY_FACTS[property.id].pin,
}));

const CENTRE = [
  HOUSES.reduce((total, house) => total + house.pin.lat, 0) / HOUSES.length,
  HOUSES.reduce((total, house) => total + house.pin.lng, 0) / HOUSES.length,
];

const pinIcon = (number) =>
  L.divIcon({
    className: "",
    html: `<span style="display:flex;height:32px;width:32px;align-items:center;justify-content:center;border-radius:9999px;border:2px solid #f8f6f2;background:#111111;color:#f8f6f2;font:600 12px/1 Inter,Arial,sans-serif;box-shadow:0 2px 10px rgba(0,0,0,.4)">${number}</span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });

export default function PropertiesMap({ labels }) {
  return (
    <MapContainer
      center={CENTRE}
      zoom={13}
      scrollWheelZoom={false}
      className="h-[360px] w-full md:h-[440px]"
      aria-label={labels.mapLabel}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {HOUSES.map((house) => (
        <Marker key={house.id} position={[house.pin.lat, house.pin.lng]} icon={pinIcon(house.number)}>
          <Popup>
            <strong>{house.name}</strong>
            <br />
            {labels.directions[house.id]}
            <br />
            <a href={mapsWebUrl(house.mapQuery)} onClick={(event) => openInMaps(event, house.mapQuery)} target="_blank" rel="noopener">
              {labels.link}
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}