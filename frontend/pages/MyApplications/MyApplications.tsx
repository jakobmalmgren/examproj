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

import InboxIcon from "@mui/icons-material/Inbox";
import { deleteApplication } from "../../apis/deleteApplication";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { readApplication } from "../../apis/readApplication";
import { CircularProgress } from "@mui/material";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [priority, setPriority] = useState<string | null>(null);
  const [city, setCity] = useState("");

  const handlePriorityChange = (val: string) => {
    if (priority === val) {
      setPriority(null);
    } else {
      setPriority(val);
    }
  };

  const handleDeleteApplication = async (sk: string) => {
    const id = sk.replace("APPLICATION#", "");
    const result = await deleteApplication(id);

    if (result.success) {
      setRefreshKey((prev) => prev + 1);
    }
  };

  // kolla
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await readApplication();
        console.log("APPPPPPPPPPPPP", res);
        setApplications(res.data);

        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [refreshKey]);

  const filteredApplications = applications.filter((app) => {
    const matchesPriority =
      !priority ||
      (priority === "prio1" && Number(app.priority) === 1) ||
      (priority === "prio2" && Number(app.priority) === 2) ||
      (priority === "prio3" && Number(app.priority) === 3);

    const matchesCity =
      !city || app.location.city?.toLowerCase().includes(city.toLowerCase());

    return matchesPriority && matchesCity;
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 8,
        gap: 4,
      }}
    >
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

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : applications.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mt: 4,
              color: "text.primary",
            }}
          >
            <InboxIcon sx={{ fontSize: 60, opacity: 0.6 }} />
            <Typography variant="h6" sx={{ color: "text.primary" }}>
              No Applications
            </Typography>
            <Typography variant="h6" sx={{ color: "text.primary" }}>
              Pssst.. You have no applications yet! But it's never too late! 😊
            </Typography>
          </Box>
        ) : (
          filteredApplications.map((data) => (
            <MyApplicationCard
              onDelete={handleDeleteApplication}
              key={data.sk}
              data={data}
            ></MyApplicationCard>
          ))
        )}
      </Box>
    </Box>
  );
};

export default MyApplications;
