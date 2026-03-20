import { useState } from "react";
import FileViewerModal from "../../components/FileViewerModal/FileViewerModal";
import { Tooltip } from "@mui/material";
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
  // inne i MyApplicationCard
  const [modalOpen, setModalOpen] = useState(false);
  //   const [currentFileUrl, setCurrentFileUrl] = useState("");
  //   const [currentFileType, setCurrentFileType] = useState<"pdf" | "docx">("pdf");

  const handleOpenFile = () => {
    // const url = `/uploads/${fileName}`; // ändra till rätt path
    // const type = fileName.endsWith(".pdf") ? "pdf" : "docx";
    // setCurrentFileUrl(url);
    // setCurrentFileType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const [responded, setResponded] = useState(false);
  const [title, setTitle] = useState("Teacher");
  const [priority, setPriority] = useState("prio1");
  const [reminderDate, setReminderDate] = useState("2026-06-06");
  // can toggle on an off to visualize for now if there are reminders or not
  // can change the text later from Reminder to maybe a clock?
  //    const [reminderDate, setReminderDate] = useState("");
  const [location, setLocation] = useState("Stockholm");
  const [extraInfoEmail, setExtraInfoEmail] = useState("test@example.com");
  const [extraInfoPhone, setExtraInfoPhone] = useState("0707-060606");
  const files = ["CV.pdf", "Portfolio.zip"];

  const [isEditing, setIsEditing] = useState(false);

  const priorityEmoji =
    priority === "prio1" ? "🔥" : priority === "prio2" ? "🤷" : "🤦";

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
        label="Position / Role"
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
          Reminder:
        </Typography>
        {reminderDate ? (
          <Typography
            variant="body2"
            sx={{
              color: "green",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            ✅ {reminderDate}
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ color: "red" }}>
            No reminder
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          Applied:
        </Typography>
        <Typography variant="body2">2025-06-06</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          Category:
        </Typography>
        <Typography variant="body2">Education</Typography>
      </Box>

      <Typography sx={{ fontWeight: "bold", mt: 0.5, fontSize: 12 }}>
        Attachments:
      </Typography>
      {/* <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
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
      </Box> */}
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {files.map((file, idx) => (
          <Chip
            key={idx}
            label={file}
            size="small"
            clickable
            onClick={() => handleOpenFile()}
            sx={{
              "&:hover": { bgcolor: "#bbdefb", transform: "scale(1.05)" },
              transition: "transform 0.2s, background-color 0.2s",
            }}
          />
        ))}
      </Box>

      <FileViewerModal
        open={modalOpen}
        onClose={handleCloseModal}
        // fileUrl={currentFileUrl}
        // fileType={currentFileType}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          display: "flex",
          gap: 0.5,
          alignItems: "center",
        }}
      >
        {/* Responded Button */}
        <Tooltip
          title="Responded"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "primary.main",
                color: "white",
                fontSize: 14,
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
              },
            },
          }}
        >
          <IconButton onClick={() => setResponded(!responded)} size="small">
            {responded ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="green"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.3 5.71L12 12.01 5.7 5.71 4.29 7.12 10.59 13.42 4.29 19.71 5.7 21.12 12 14.82 18.3 21.12 19.71 19.71 13.41 13.42 19.71 7.12 18.3 5.71z" />
              </svg>
            )}
          </IconButton>
        </Tooltip>

        {/* Delete Button */}
        <Tooltip
          title="Delete"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "primary.main",
                color: "white",
                fontSize: 14,
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
              },
            },
          }}
        >
          <IconButton onClick={handleDelete} size="small" color="primary">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Edit / Save Button */}
        <Tooltip
          title={isEditing ? "Save" : "Edit"}
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "primary.main",
                color: "white",
                fontSize: 14,
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
              },
            },
          }}
        >
          <IconButton onClick={() => setIsEditing(!isEditing)} size="small">
            {isEditing ? (
              <SaveIcon fontSize="small" color="primary" />
            ) : (
              <EditIcon fontSize="small" color="primary" />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default MyApplicationCard;
