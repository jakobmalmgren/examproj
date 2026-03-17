import { useState } from "react";
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

const MyApplications = () => {
  const [priority, setPriority] = useState<string | null>(null);
  const [city, setCity] = useState("");

  const handlePriorityChange = (val: string) => {
    if (priority === val) {
      setPriority(null);
    } else {
      setPriority(val);
    }
  };

  // check later how to send the data to backend
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 8,
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
        <Box sx={{ position: "relative", width: "100%" }}>
          <TextField
            fullWidth
            label="Search city"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default MyApplications;
