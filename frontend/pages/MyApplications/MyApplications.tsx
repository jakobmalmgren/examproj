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
  Tooltip,
  CircularProgress,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import InboxIcon from "@mui/icons-material/Inbox";
import { deleteApplication } from "../../apis/deleteApplication";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { readApplication } from "../../apis/readApplication";
import type { Application, SnackbarState } from "../../sharedTypes/types";

const MyApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [priority, setPriority] = useState<string | null>(null);
  const [city, setCity] = useState("");

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handlePriorityChange = (val: string) => {
    if (priority === val) {
      setPriority(null);
    } else {
      setPriority(val);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    // const id = value.replace("APPLICATION#", "");
    console.log("id", id);

    try {
      const result = await deleteApplication(id);

      if (!result.success) {
        setSnackbar({
          open: true,
          message: result.message || "Could not delete application",
          severity: "error",
        });
        return;
      }

      setRefreshKey((prev) => prev + 1);

      setSnackbar({
        open: true,
        message: result.message || "Application deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.log("Network error while deleting application:", error);
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);

        const res = await readApplication();

        if (!res.success) {
          console.log(res.message || "Failed to fetch applications");
          setApplications([]);
          return;
        }

        setApplications(res.data || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [refreshKey]);

  const filteredApplications = applications.filter((app: Application) => {
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
        mt: { xs: 3, sm: 4, md: 5 },
        gap: { xs: 3, sm: 4 },
        px: { xs: 2, sm: 3 },
        pb: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 2, sm: 3 },
          width: "100%",
          maxWidth: { xs: "100%", sm: 600, md: 700 },
          borderRadius: 3,
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 2 },
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Tooltip
            title="I want this"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "black",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 1,
                  px: 1.5,
                  py: 0.5,
                },
              },
              arrow: {
                sx: {
                  color: "black",
                },
              },
            }}
          >
            <FormControlLabel
              sx={{ m: 0 }}
              control={
                <Checkbox
                  checked={priority === "prio1"}
                  onChange={() => handlePriorityChange("prio1")}
                  sx={{
                    width: { xs: 26, sm: 32 },
                    height: { xs: 26, sm: 32 },
                    p: { xs: 0.5, sm: 1 },
                    "& .MuiSvgIcon-root": {
                      fontSize: { xs: 24, sm: 32 },
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: { xs: 20, sm: 24 } }}>
                  🔥
                </Typography>
              }
            />
          </Tooltip>

          <Tooltip
            title="Maybe, maybe not"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "black",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 1,
                  px: 1.5,
                  py: 0.5,
                },
              },
              arrow: {
                sx: {
                  color: "black",
                },
              },
            }}
          >
            <FormControlLabel
              sx={{ m: 0 }}
              control={
                <Checkbox
                  checked={priority === "prio2"}
                  onChange={() => handlePriorityChange("prio2")}
                  sx={{
                    width: { xs: 26, sm: 32 },
                    height: { xs: 26, sm: 32 },
                    p: { xs: 0.5, sm: 1 },
                    "& .MuiSvgIcon-root": {
                      fontSize: { xs: 24, sm: 32 },
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: { xs: 20, sm: 24 } }}>
                  🤷
                </Typography>
              }
            />
          </Tooltip>

          <Tooltip
            title="Ahh, I don't know"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "black",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 1,
                  px: 1.5,
                  py: 0.5,
                },
              },
              arrow: {
                sx: {
                  color: "black",
                },
              },
            }}
          >
            <FormControlLabel
              sx={{ m: 0 }}
              control={
                <Checkbox
                  checked={priority === "prio3"}
                  onChange={() => handlePriorityChange("prio3")}
                  sx={{
                    width: { xs: 26, sm: 32 },
                    height: { xs: 26, sm: 32 },
                    p: { xs: 0.5, sm: 1 },
                    "& .MuiSvgIcon-root": {
                      fontSize: { xs: 24, sm: 32 },
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: { xs: 20, sm: 24 } }}>
                  🤦
                </Typography>
              }
            />
          </Tooltip>
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
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon
                    sx={{
                      color: "primary.main",
                      fontSize: { xs: 20, sm: 24 },
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: { xs: "14px", sm: "16px" },
              },
              "& .MuiInputLabel-root": {
                fontSize: { xs: "14px", sm: "16px" },
              },
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
          width: "100%",
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
              textAlign: "center",
              px: 2,
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
              setRefreshKey={setRefreshKey}
              key={data.sk}
              data={data}
            />
          ))
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyApplications;
