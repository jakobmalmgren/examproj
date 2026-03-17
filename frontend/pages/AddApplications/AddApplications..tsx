import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  FormControlLabel,
  Tooltip,
  Switch,
  MenuItem,
  Button,
  Paper,
  Chip,
  Checkbox,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import TitleIcon from "@mui/icons-material/Title";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const AddApplications = () => {
  const [extraInfo, setExtraInfo] = useState<string[]>([""]);
  const [priority, setPriority] = useState("prio1");
  const [reminder, setReminder] = useState(false);
  const [reminderDays, setReminderDays] = useState("5days");
  const [customDate, setCustomDate] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");

  // Extra info handlers
  const addExtraField = () => setExtraInfo([...extraInfo, ""]);
  const removeExtraField = (index: number) =>
    setExtraInfo(extraInfo.filter((_, i) => i !== index));
  const handleExtraChange = (index: number, value: string) => {
    const newArr = [...extraInfo];
    newArr[index] = value;
    setExtraInfo(newArr);
  };

  // Dropzone
  const onDrop = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = () => {
    const data = {
      title,
      extraInfo,
      priority,
      reminder,
      reminderDays: reminder ? reminderDays : null,
      customDate: reminder ? customDate : null,
      files,
      location,
    };
    console.log("Submit:", data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 2,
        width: "50%",
        margin: "0 auto",
      }}
    >
      {/* Application Title */}
      <TextField
        label="Application Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TitleIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: "100%" }}
      />

      {/* Extra Info Fields */}
      {extraInfo.map((val, idx) => (
        <Box key={idx} sx={{ position: "relative", width: "100%", mb: 1 }}>
          <TextField
            fullWidth
            label={`Extra info`}
            variant="outlined"
            value={val}
            onChange={(e) => handleExtraChange(idx, e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InfoIcon />
                </InputAdornment>
              ),
              sx: { pr: 6 }, // lämnar plats för Delete-ikonen
            }}
            sx={{ width: "100%" }}
          />
          <IconButton
            onClick={() => removeExtraField(idx)}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button startIcon={<AddIcon />} onClick={addExtraField}>
        Add Extra Info
      </Button>

      {/* Priority med checkboxar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Tooltip
          title="I want this!!"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "primary.main",
                color: "white",
                fontWeight: "bold",
                fontSize: 14,
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
              },
            },
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={priority === "prio1"}
                onChange={() => setPriority("prio1")}
                sx={{
                  width: 32,
                  height: 32,
                  "& .MuiSvgIcon-root": { fontSize: 32 },
                }}
              />
            }
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>
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
                bgcolor: "primary.main",
                color: "white",
                fontWeight: "bold",
                fontSize: 14,
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
              },
            },
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={priority === "prio2"}
                onChange={() => setPriority("prio2")}
                sx={{
                  width: 32,
                  height: 32,
                  "& .MuiSvgIcon-root": { fontSize: 32 },
                }}
              />
            }
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>
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
                bgcolor: "primary.main",
                color: "white",
                fontWeight: "bold",
                fontSize: 14,
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
              },
            },
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={priority === "prio3"}
                onChange={() => setPriority("prio3")}
                sx={{
                  width: 32,
                  height: 32,
                  "& .MuiSvgIcon-root": { fontSize: 32 },
                }}
              />
            }
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>
                🤦
              </Typography>
            }
          />
        </Tooltip>
        <Tooltip
          title="You can prioritize applications by selecting a priority level"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "primary.main",
                color: "white",
                fontWeight: "bold",
                fontSize: 14,
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
              },
            },
          }}
        >
          <InfoIcon sx={{ color: "primary.main" }} />
        </Tooltip>
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={reminder}
            onChange={(e) => {
              setReminder(e.target.checked);
              if (!e.target.checked) {
                setCustomDate("");
                setReminderDays("5days");
              }
            }}
          />
        }
        label="Set Reminder"
      />
      {reminder && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
          }}
        >
          {/* Checkbox för preset */}
          <FormControlLabel
            control={
              <Checkbox
                checked={!!reminderDays}
                onChange={(e) => {
                  if (e.target.checked) {
                    setReminderDays("5days");
                    setCustomDate("");
                  } else {
                    setReminderDays("");
                  }
                }}
              />
            }
            label="Default"
          />

          {/* Preset dropdown */}
          <TextField
            select
            label="Reminder Time"
            value={reminderDays}
            onChange={(e) => setReminderDays(e.target.value)}
            sx={{
              minWidth: 150,
              opacity: customDate ? 0.5 : 1,
              pointerEvents: customDate ? "none" : "auto",
            }}
          >
            <MenuItem value="5days">5 days</MenuItem>
            <MenuItem value="10days">10 days</MenuItem>
            <MenuItem value="2weeks">2 weeks</MenuItem>
          </TextField>

          {/* Checkbox för custom date */}
          <FormControlLabel
            control={
              <Checkbox
                checked={!!customDate}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCustomDate(new Date().toISOString().split("T")[0]);
                    setReminderDays("");
                  } else {
                    setCustomDate("");
                  }
                }}
              />
            }
            label="Custom"
          />

          {/* Custom date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Custom Date"
              value={customDate ? dayjs(customDate) : null}
              onChange={(newValue) => {
                setCustomDate(newValue ? newValue.format("YYYY-MM-DD") : "");
              }}
              disabled={!!reminderDays}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    minWidth: 150,
                    opacity: reminderDays ? 0.5 : 1,
                    pointerEvents: reminderDays ? "none" : "auto",
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      )}

      {/* Drag & Drop kvadrat */}
      <Paper
        {...getRootProps()}
        variant="outlined"
        sx={{
          width: 300,
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderStyle: "dashed",
          borderColor: isDragActive ? "primary.main" : "gray",
          cursor: "pointer",
          m: "0 auto",
          textAlign: "center",
          flexDirection: "column",
          p: 1,
        }}
      >
        <input {...getInputProps()} />

        <Typography>
          {isDragActive ? "Drop files here..." : "Drag & Drop files"}
        </Typography>

        {files.length > 0 && (
          <Box
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              overflowY: "auto",
              maxHeight: "50%",
              width: "90%",
            }}
          >
            {files.map((file, idx) => (
              <Chip key={idx} label={file.name} size="small" />
            ))}
          </Box>
        )}
      </Paper>

      {/* Location */}
      <TextField
        fullWidth
        label="Location"
        variant="outlined"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOnIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: "100%" }}
      />

      {/* Submit */}
      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default AddApplications;
