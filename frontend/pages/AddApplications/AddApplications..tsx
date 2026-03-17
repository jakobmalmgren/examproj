import { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
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
        width: "40%",
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

      {/* Priority */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <RadioGroup
          row
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <FormControlLabel value="prio1" control={<Radio />} label="Prio 1" />
          <FormControlLabel value="prio2" control={<Radio />} label="Prio 2" />
          <FormControlLabel value="prio3" control={<Radio />} label="Prio 3" />
        </RadioGroup>
        <Tooltip title="You can prioritize applications by selecting a priority level">
          <InfoIcon sx={{ color: "gray" }} />
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
          <TextField
            type="date"
            label="Custom Date"
            InputLabelProps={{ shrink: true }}
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
            sx={{
              minWidth: 150,
              opacity: reminderDays ? 0.5 : 1,
              pointerEvents: reminderDays ? "none" : "auto",
            }}
          />
        </Box>
      )}

      {/* Drag & Drop kvadrat */}
      <Paper
        variant="outlined"
        sx={{
          width: 300,
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderStyle: "dashed",
          borderColor: "gray",
          cursor: "pointer",
          m: "0 auto",
          textAlign: "center",
          flexDirection: "column",
          p: 1,
        }}
      >
        <Box
          {...getRootProps()}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
        </Box>
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
