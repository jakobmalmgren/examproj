import "./MapView.css";
import "leaflet/dist/leaflet.css";
import { useTheme } from "@mui/material/styles";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { readApplication } from "../../apis/readApplication";
import { Box } from "@mui/material";
import type { Application } from "../../sharedTypes/types";
import type { LatLngExpression, LatLngBoundsExpression } from "leaflet";

const pinImage = "/images/pinflat_105979.svg";

function MapView() {
  const [jobs, setJobs] = useState<Application[]>([]);
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
        setJobs(data.data || []);
      } catch (error) {
        console.error("Could not fetch applications:", error);
      }
    };

    fetchApplication();
  }, []);

  const jobsWithOffset = useMemo(() => {
    // const seenPositions = {};
    const seenPositions: { [key: string]: number } = {};

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

  const center = useMemo((): LatLngExpression => {
    if (jobsWithOffset.length === 0) return [55.6, 13.0];

    const avgLat =
      jobsWithOffset.reduce((sum, j) => sum + j.adjustedLat, 0) /
      jobsWithOffset.length;

    const avgLng =
      jobsWithOffset.reduce((sum, j) => sum + j.adjustedLng, 0) /
      jobsWithOffset.length;

    return [avgLat, avgLng];
  }, [jobsWithOffset]);

  const bounds: LatLngBoundsExpression = [
    [-85, -180],
    [85, 180],
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: {
          xs: "calc(100vh - 56px - 80px)",
          sm: "calc(100vh - 64px - 80px)",
        },
      }}
    >
      <MapContainer
        center={center}
        zoom={5}
        minZoom={4}
        maxZoom={12}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

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
                        color: "white",
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
    </Box>
  );
}

export default MapView;
