import { useState } from "react";
import {
  Box,
  TextField,
  Paper,
  Typography,
  Chip,
  IconButton,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const MyApplicationCard = () => {
  const [title, setTitle] = useState("Teacher");
  const [priority, setPriority] = useState("prio1");
  const [reminderDate, setReminderDate] = useState("2026-06-06");
  const [location, setLocation] = useState("Stockholm");
  const [extraInfoEmail, setExtraInfoEmail] = useState("test@example.com");
  const [extraInfoPhone, setExtraInfoPhone] = useState("0707-060606");
  const files = ["CV.pdf", "Portfolio.zip"];

  const [isEditing, setIsEditing] = useState(false);

  const priorityEmoji =
    priority === "prio1" ? "🔥" : priority === "prio2" ? "🤷" : "🤦";

  const handleFileClick = (fileName: string) => alert(`Open file: ${fileName}`);
  const handleDelete = () => alert("Delete this application");

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        width: 300,
        bgcolor: "#e3f2fd",
        position: "relative",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
        cursor: "pointer",
      }}
    >
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        InputProps={{ readOnly: !isEditing }}
      />

      {isEditing ? (
        <Select
          value={priority}
          size="small"
          onChange={(e) => setPriority(e.target.value)}
          sx={{ mt: 1 }}
        >
          <MenuItem value="prio1">🔥 Priority 1</MenuItem>
          <MenuItem value="prio2">🤷 Priority 2</MenuItem>
          <MenuItem value="prio3">🤦 Priority 3</MenuItem>
        </Select>
      ) : (
        <Typography sx={{ mt: 1, fontSize: "40px" }}>
          {priorityEmoji}
        </Typography>
      )}

      <TextField
        fullWidth
        size="small"
        label="Extra Info"
        variant="outlined"
        value={extraInfoEmail}
        onChange={(e) => setExtraInfoEmail(e.target.value)}
        InputProps={{
          readOnly: !isEditing,
          endAdornment: isEditing && (
            <InputAdornment position="end"></InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        size="small"
        label="Extra Info"
        variant="outlined"
        value={extraInfoPhone}
        onChange={(e) => setExtraInfoPhone(e.target.value)}
        InputProps={{
          readOnly: !isEditing,
          endAdornment: isEditing && (
            <InputAdornment position="end"></InputAdornment>
          ),
        }}
      />

      <TextField
        size="small"
        label="Reminder"
        variant="outlined"
        value={reminderDate}
        onChange={(e) => setReminderDate(e.target.value)}
        InputProps={{ readOnly: !isEditing }}
      />

      <TextField
        fullWidth
        size="small"
        label="Location"
        variant="outlined"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        InputProps={{ readOnly: !isEditing }}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          Applied:
        </Typography>
        <Typography variant="body2">2025-06-06</Typography>
      </Box>

      <Typography sx={{ fontWeight: "bold", mt: 0.5, fontSize: 12 }}>
        Attachments:
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {files.map((file, idx) => (
          <Chip
            key={idx}
            label={file}
            size="small"
            clickable
            onClick={() => handleFileClick(file)}
            sx={{
              "&:hover": { bgcolor: "#bbdefb", transform: "scale(1.05)" },
              transition: "transform 0.2s, background-color 0.2s",
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          display: "flex",
          gap: 1,
        }}
      >
        <IconButton
          onClick={handleDelete}
          sx={{
            bgcolor: "rgba(255,255,255,0.7)",
            "&:hover": { bgcolor: "primary.main", color: "white" },
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={() => setIsEditing(!isEditing)}
          sx={{
            bgcolor: "rgba(255,255,255,0.7)",
            "&:hover": { bgcolor: "primary.main", color: "white" },
          }}
        >
          {isEditing ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </Box>
    </Paper>
  );
};

export default MyApplicationCard;
