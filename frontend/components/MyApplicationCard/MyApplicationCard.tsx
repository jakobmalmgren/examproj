import { useState } from "react";
import FileViewerModal from "../../components/FileViewerModal/FileViewerModal";
import { Tooltip } from "@mui/material";
import {
  Box,
  // TextField,
  Paper,
  Typography,
  Chip,
  IconButton,
  // Select,
  // MenuItem,
} from "@mui/material";
import EditModal from "../EditModal/EditModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";

const MyApplicationCard = ({ data }: { data: any }) => {
  console.log("caaardloggdata", data);

  const {
    category,
    extraInfo = [],
    files = [],
    location,
    priority,
    reminder,
    reminderDate,
    applicationDate,
    title,
  } = data;

  const city = location?.city || "";

  const [editOpen, setEditOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedFile(null);
  };

  const [responded, setResponded] = useState(false);

  const priorityEmoji = priority === 1 ? "🔥" : priority === 2 ? "🤷" : "🤦";

  const handleDelete = () => alert("Delete this application");

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        width: 350,
        maxHeight: 400,
        bgcolor: "#e3f2fd",
      }}
    >
      <Box
        sx={{
          overflowY: "auto",
          pr: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Typography sx={{ fontSize: "40px" }}>{priorityEmoji}</Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="/images/position.svg"
            alt="position Icon"
            style={{ height: 24, width: 24 }}
          />
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Application Title:
          </Typography>

          <Typography variant="body2">{title || "-"}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="/images/info.svg"
            alt="info Icon"
            style={{ height: 24, width: 24 }}
          />
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Extra Info:
          </Typography>

          <Typography variant="body2">
            {extraInfo.length > 0 ? extraInfo.join(", ") : "-"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="/images/clock.svg"
            alt="Clock Icon"
            style={{ height: 24, width: 24 }}
          />
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Reminder:
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {reminder ? ` ✅ ${reminderDate}` : `❌ No reminder`}
            <Typography
              variant="body2"
              sx={{ color: "green", display: "flex", alignItems: "center" }}
            ></Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="/images/earth.svg"
            alt="earth Icon"
            style={{ height: 24, width: 24 }}
          />
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Location:
          </Typography>

          <Typography variant="body2">{city || "-"}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="/images/calender.svg"
            alt="calender Icon"
            style={{ height: 24, width: 24 }}
          />
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Application Date:
          </Typography>

          <Typography variant="body2">{applicationDate}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <img
            src="/images/briefcase.svg"
            alt="briefcase Icon"
            style={{ height: 24, width: 24 }}
          />
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Category:
          </Typography>

          <Typography variant="body2">{category || "-"}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="/images/attach.svg"
            alt="attach Icon"
            style={{ height: 24, width: 24 }}
          />
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Attachments:
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {files.length > 0 ? (
            files.map((file: any, idx: number) => (
              <Box
                key={file.key || idx}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Chip
                  label={file.name}
                  size="small"
                  clickable
                  onClick={() => {
                    setModalOpen(true);
                    setSelectedFile(file);
                    console.log("clicked file", file);
                  }}
                  sx={{
                    display: "flex",
                    padding: 1,
                    mx: "auto", // 👈 centrerar horisontellt
                    height: 22,
                    fontSize: "0.7rem",
                    "& .MuiChip-label": {
                      px: 0.5,
                    },
                    "&:hover": {
                      bgcolor: "#bbdefb",
                      transform: "scale(1.05)",
                    },
                    transition: "transform 0.2s, background-color 0.2s",
                  }}
                />
              </Box>
            ))
          ) : (
            <Typography variant="body2">No attachments</Typography>
          )}
        </Box>

        <FileViewerModal
          open={modalOpen}
          onClose={handleCloseModal}
          file={selectedFile}
        />
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5, mt: 1 }}
      >
        <Tooltip title={responded ? "Responded" : "Not Responded"} arrow>
          <IconButton onClick={() => setResponded(!responded)} size="small">
            {responded ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="green">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="red">
                <path d="M18.3 5.71L12 12.01 5.7 5.71 4.29 7.12 10.59 13.42 4.29 19.71 5.7 21.12 12 14.82 18.3 21.12 19.71 19.71 13.41 13.42 19.71 7.12 18.3 5.71z" />
              </svg>
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete" arrow>
          <IconButton onClick={handleDelete} size="small" color="primary">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title={"Edit"} arrow>
          <IconButton size="small" onClick={() => setEditOpen(true)}>
            <EditIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
        <EditModal open={editOpen} onClose={() => setEditOpen(false)} />
      </Box>
    </Paper>
  );
};

export default MyApplicationCard;
