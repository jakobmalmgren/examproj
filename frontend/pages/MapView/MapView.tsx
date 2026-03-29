import "./MapView.css";
import "leaflet/dist/leaflet.css";
import { useTheme } from "@mui/material/styles";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { readApplication } from "../../apis/readApplication";

const pinImage = "/images/pinflat_105979.svg";

function MapView() {
  const [jobs, setJobs] = useState([]);
  const theme = useTheme();

  const customIcon = L.icon({
    iconUrl: pinImage,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const data = await readApplication();
        console.log("data1111", data);
        console.log("data22222", data.data);
        setJobs(data.data || []);
      } catch (error) {
        console.error("Could not fetch applications:", error);
      }
    };

    fetchApplication();
  }, []);

  const jobsWithOffset = useMemo(() => {
    const seenPositions = {};

    return jobs
      .filter(
        (job) =>
          job.location?.latitude !== undefined &&
          job.location?.longitude !== undefined,
      )
      .map((job) => {
        const baseLat = Number(job.location.latitude);
        const baseLng = Number(job.location.longitude);
        const key = `${baseLat}-${baseLng}`;

        const count = seenPositions[key] || 0;
        seenPositions[key] = count + 1;

        const offsetStep = 0.0025;
        const angle = count * 0.8;

        return {
          ...job,
          adjustedLat: baseLat + Math.sin(angle) * offsetStep * count,
          adjustedLng: baseLng + Math.cos(angle) * offsetStep * count,
        };
      });
  }, [jobs]);

  return (
    <MapContainer
      center={[55.6, 13.0]}
      zoom={5}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

      {jobsWithOffset.map((job, index) => (
        <Marker
          key={job.sk || index}
          position={[job.adjustedLat, job.adjustedLng]}
          icon={customIcon}
        >
          <Tooltip direction="top" offset={[0, -12]} opacity={1}>
            <div
              className="tooltip-box"
              style={{
                fontFamily: theme.typography.fontFamily,
                minWidth: "270px",
                padding: "14px 16px",
                borderRadius: "12px",
                background: "rgba(20, 20, 20, 0.92)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {[
                { label: "Application Title:", value: job.title },
                {
                  label: "Location:",
                  value: job.location?.city || "No location",
                },
                { label: "Category:", value: job.category || "No category" },
                {
                  label: "Application Date:",
                  value: job.applicationDate || "No date",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "6px",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      minWidth: "120px",
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      fontSize: "13px",
                    }}
                  >
                    {row.label}
                  </span>

                  <span
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: "13px",
                      wordBreak: "break-word",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
