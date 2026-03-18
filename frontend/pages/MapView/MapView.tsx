import "./MapView.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
const pinImage = "/images/pinflat_105979.svg";

// 🧠 Jobbdata
const jobs = [
  {
    title: "Frontend Dev",
    company: "Spotify",
    lat: 59.33,
    lng: 18.06,
  },
  {
    title: "Backend Dev",
    company: "IKEA",
    lat: 55.61,
    lng: 13.0,
  },
];

function MapView() {
  const customIcon = L.icon({
    iconUrl: pinImage,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
  return (
    <MapContainer
      center={[55.6, 13.0]}
      zoom={5}
      style={{ height: "100vh", width: "100vw" }}
    >
      {/* 🌙 Dark map */}
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

      {jobs.map((job, index) => (
        <Marker key={index} position={[job.lat, job.lng]} icon={customIcon}>
          {/* 🖱️ Hover tooltip */}
          <Tooltip direction="top" offset={[0, -10]} opacity={1}>
            <div className="tooltip-box">
              <strong>{job.title}</strong>
              <br />
              {job.company}
            </div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
