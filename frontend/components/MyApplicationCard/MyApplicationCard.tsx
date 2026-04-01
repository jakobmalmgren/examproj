import { useState } from "react";
import FileViewerModal from "../../components/FileViewerModal/FileViewerModal";
import { Tooltip } from "@mui/material";
import { Box, Paper, Typography, Chip, IconButton } from "@mui/material";
import EditModal from "../EditModal/EditModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const MyApplicationCard = ({ data, onDelete, setRefreshKey }) => {
  const id = data.sk.split("#")[1];

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

  const validExtraInfo = extraInfo.filter((i) => i.trim() !== "");

  const city = location?.city || "";

  const [editOpen, setEditOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedFile(null);
  };

  const priorityEmoji = priority === 1 ? "🔥" : priority === 2 ? "🤷" : "🤦";

  const handleDelete = async () => {
    await onDelete(data.sk);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        // width: 350,
        maxHeight: 400,
        bgcolor: "#e3f2fd",
        width: {
          xs: 300, // mobil
          sm: 350, // small screens
          md: 350, // desktop (valfritt)
        },
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

        {validExtraInfo.length === 0 ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src="/images/info.svg"
              alt="info Icon"
              style={{ height: 24, width: 24 }}
            />

            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Extra Info:
            </Typography>

            <Typography variant="body2">-</Typography>
          </Box>
        ) : (
          validExtraInfo.map((item, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <img
                src="/images/info.svg"
                alt="info Icon"
                style={{ height: 24, width: 24 }}
              />

              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Extra Info:
              </Typography>

              <Typography variant="body2">{item}</Typography>
            </Box>
          ))
        )}

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
            <Typography variant="body2">
              {reminder ? `✅ ${reminderDate}` : `❌ No reminder`}
            </Typography>
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
        <Tooltip
          title="Delete"
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
          <IconButton onClick={handleDelete} size="small" color="primary">
            <DeleteIcon fontSize="small" sx={{ color: "black" }} />
          </IconButton>
        </Tooltip>

        <Tooltip
          title="Edit"
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
          <IconButton size="small" onClick={() => setEditOpen(true)}>
            <EditIcon fontSize="small" sx={{ color: "black" }} />
          </IconButton>
        </Tooltip>
        <EditModal
          data={data}
          setRefreshKey={setRefreshKey}
          id={id}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      </Box>
    </Paper>
  );
};

export default MyApplicationCard;
