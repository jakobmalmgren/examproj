import { useEffect, useState } from "react";
import MyApplicationCard from "../../components/MyApplicationCard/MyApplicationCard";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { readApplication } from "../../apis/readApplication";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  // const [loading, setLoading] = useState(true);

  const [priority, setPriority] = useState<string | null>(null);
  const [city, setCity] = useState("");

  const handlePriorityChange = (val: string) => {
    if (priority === val) {
      setPriority(null);
    } else {
      setPriority(val);
    }
  };

  // kolla
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await readApplication();
        console.log("result from my apppl", res);
        console.log("fjjf", res.data);

        setApplications(res.data); // 👈 från din lambda
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // kolumnlayout så filter överst, kort under
        alignItems: "center",
        mt: 8,
        gap: 4, // lite mellanrum mellan filter och kort
      }}
    >
      {/* Filterpanel */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          minWidth: 700,
          borderRadius: 3,
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
        }}
      >
        {/* 🔥 Prio single-choice "checkbox" */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={priority === "prio1"}
                onChange={() => handlePriorityChange("prio1")}
                sx={{
                  width: 32,
                  height: 32,

                  "& .MuiSvgIcon-root": { fontSize: 32 },
                }}
              />
            }
            label={<Typography sx={{ fontSize: 24 }}>🔥</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={priority === "prio2"}
                onChange={() => handlePriorityChange("prio2")}
                sx={{
                  width: 32,
                  height: 32,
                  "& .MuiSvgIcon-root": { fontSize: 32 },
                }}
              />
            }
            label={<Typography sx={{ fontSize: 24 }}>🤷</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={priority === "prio3"}
                onChange={() => handlePriorityChange("prio3")}
                sx={{
                  width: 32,
                  height: 32,
                  "& .MuiSvgIcon-root": { fontSize: 32 },
                }}
              />
            }
            label={<Typography sx={{ fontSize: 24 }}>🤦</Typography>}
          />
        </Box>

        {/* 🔍 Stad input med LocationOnIcon */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          <TextField
            fullWidth
            label="City"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon
                    sx={{
                      color: "primary.main",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Paper>

      {/* Korten ligger här under filtreringen */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {applications.length === 0 ? (
          <p>Inga applications</p>
        ) : (
          applications.map((data) => (
            <MyApplicationCard key={data.sk} data={data}></MyApplicationCard>
          ))
        )}
      </Box>
    </Box>
  );
};

export default MyApplications;
