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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const MyApplicationCard = ({ data }: { data: any }) => {
  console.log("caaardloggdata", data);

  const {
    category,
    createdAt,
    extraInfo = [],
    files = [],
    location,
    priority,
    reminder,
    reminderDate,
    title,
  } = data;

  const city = location?.city || "";

  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => setModalOpen(false);

  const [responded, setResponded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
        {isEditing ? (
          <Select value={priority} size="small">
            <MenuItem value={1}>🔥 Priority 1</MenuItem>
            <MenuItem value={2}>🤷 Priority 2</MenuItem>
            <MenuItem value={3}>🤦 Priority 3</MenuItem>
          </Select>
        ) : (
          <Typography sx={{ fontSize: "40px" }}>{priorityEmoji}</Typography>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="/images/position.svg"
            alt="position Icon"
            style={{ height: 24, width: 24 }}
          />
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Position / Role:
          </Typography>
          {isEditing ? (
            <TextField size="small" value={title || ""} fullWidth />
          ) : (
            <Typography variant="body2">{title || "-"}</Typography>
          )}
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
          {isEditing ? (
            <>
              <TextField size="small" value={extraInfo.join(", ")} />
              <IconButton size="small" color="primary">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <Typography variant="body2">
              {extraInfo.length > 0 ? extraInfo.join(", ") : "-"}
            </Typography>
          )}
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

          {reminderDate ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {isEditing ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Custom Date"
                    value={reminderDate ? dayjs(reminderDate) : null}
                    slotProps={{
                      textField: { size: "medium", sx: { width: 150 } },
                    }}
                  />
                  <IconButton size="small" color="primary">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </LocalizationProvider>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: "green", display: "flex", alignItems: "center" }}
                >
                  ✅ {reminderDate}
                </Typography>
              )}
            </Box>
          ) : isEditing ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Custom Date"
                slotProps={{
                  textField: { size: "small", sx: { minWidth: 150 } },
                }}
              />
              <IconButton size="small" color="primary">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </LocalizationProvider>
          ) : (
            <Typography variant="body2" sx={{ color: "red" }}>
              {reminder ? "⏰ Reminder on" : "❌ No reminder"}
            </Typography>
          )}
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
          {isEditing ? (
            <TextField size="small" value={city} fullWidth />
          ) : (
            <Typography variant="body2">{city || "-"}</Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="/images/calender.svg"
            alt="calender Icon"
            style={{ height: 24, width: 24 }}
          />
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Applied:
          </Typography>
          <Typography variant="body2">
            {createdAt ? dayjs(createdAt).format("YYYY-MM-DD") : "-"}
          </Typography>
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
          {isEditing ? (
            <TextField select value={category || ""} size="small" fullWidth>
              <MenuItem value="IT & Tech">IT & Tech</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Healthcare">Healthcare</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Support">Support</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          ) : (
            <Typography variant="body2">{category || "-"}</Typography>
          )}
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
                  onClick={() => setModalOpen(true)}
                  sx={{
                    flex: 1,
                    "&:hover": { bgcolor: "#bbdefb", transform: "scale(1.05)" },
                    transition: "transform 0.2s, background-color 0.2s",
                  }}
                />
                {isEditing && (
                  <IconButton size="small" color="primary">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            ))
          ) : (
            <Typography variant="body2">No attachments</Typography>
          )}
        </Box>

        <FileViewerModal open={modalOpen} onClose={handleCloseModal} />
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

        <Tooltip title={isEditing ? "Save" : "Edit"} arrow>
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
