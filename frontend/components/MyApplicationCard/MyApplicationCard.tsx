// import { useState } from "react";
// import FileViewerModal from "../../components/FileViewerModal/FileViewerModal";
// import { Tooltip } from "@mui/material";
// import {
//   Box,
//   TextField,
//   Paper,
//   Typography,
//   Chip,
//   IconButton,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";

// // Day.js DatePicker
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";

// const MyApplicationCard = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const handleOpenFile = () => setModalOpen(true);
//   const handleCloseModal = () => setModalOpen(false);

//   const [responded, setResponded] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   // Editable fields
//   const [title, setTitle] = useState("Teacher");
//   const [priority, setPriority] = useState("prio1");
//   const [extraInfoEmail, setExtraInfoEmail] = useState("test@example.com");
//   const [extraInfoPhone, setExtraInfoPhone] = useState("0707-060606");
//   const [reminderDate, setReminderDate] = useState("");
//   const [customDate, setCustomDate] = useState("");
//   const [location, setLocation] = useState("Stockholm");
//   const [category, setCategory] = useState("Education");

//   const [files, setFiles] = useState(["CV.pdf", "Portfolio.zip"]);

//   const priorityEmoji =
//     priority === "prio1" ? "🔥" : priority === "prio2" ? "🤷" : "🤦";

//   const handleDelete = () => alert("Delete this application");
//   const handleDeleteField = (field) => {
//     switch (field) {
//       case "title":
//         setTitle("");
//         break;
//       case "extraEmail":
//         setExtraInfoEmail("");
//         break;
//       case "extraPhone":
//         setExtraInfoPhone("");
//         break;
//       case "location":
//         setLocation("");
//         break;
//       case "category":
//         setCategory("");
//         break;
//       case "reminder":
//         setReminderDate("");
//         setCustomDate("");
//         break;
//       default:
//         break;
//     }
//   };

//   const handleDeleteFile = (fileToDelete) => {
//     setFiles((prev) => prev.filter((file) => file !== fileToDelete));
//   };

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: 2,
//         borderRadius: 2,
//         display: "flex",
//         flexDirection: "column",
//         width: 350,
//         maxHeight: 400,
//         bgcolor: "#e3f2fd",
//       }}
//     >
//       <Box
//         sx={{
//           overflowY: "auto",
//           pr: 1,
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           gap: 1.5,
//         }}
//       >
//         {/* Priority */}
//         {isEditing ? (
//           <Select
//             value={priority}
//             size="small"
//             onChange={(e) => setPriority(e.target.value)}
//           >
//             <MenuItem value="prio1">🔥 Priority 1</MenuItem>
//             <MenuItem value="prio2">🤷 Priority 2</MenuItem>
//             <MenuItem value="prio3">🤦 Priority 3</MenuItem>
//           </Select>
//         ) : (
//           <Typography sx={{ fontSize: "40px" }}>{priorityEmoji}</Typography>
//         )}

//         {/* Position / Role */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <img
//             src="/images/position.svg"
//             alt="position Icon"
//             style={{ height: 24, width: 24 }}
//           />
//           <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//             Position / Role:
//           </Typography>
//           {isEditing ? (
//             <>
//               <TextField
//                 size="small"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//               <IconButton
//                 size="small"
//                 onClick={() => handleDeleteField("title")}
//                 color="primary"
//               >
//                 <DeleteIcon fontSize="small" />
//               </IconButton>
//             </>
//           ) : (
//             <Typography variant="body2">{title}</Typography>
//           )}
//         </Box>

//         {/* Extra Info Email */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <img
//             src="/images/info.svg"
//             alt="info Icon"
//             style={{ height: 24, width: 24 }}
//           />
//           <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//             Extra Info:
//           </Typography>
//           {isEditing ? (
//             <>
//               <TextField
//                 size="small"
//                 value={extraInfoEmail}
//                 onChange={(e) => setExtraInfoEmail(e.target.value)}
//               />
//               <IconButton
//                 size="small"
//                 onClick={() => handleDeleteField("extraEmail")}
//                 color="primary"
//               >
//                 <DeleteIcon fontSize="small" />
//               </IconButton>
//             </>
//           ) : (
//             <Typography variant="body2">{extraInfoEmail}</Typography>
//           )}
//         </Box>

//         {/* Extra Info Phone */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <img
//             src="/images/info.svg"
//             alt="info Icon"
//             style={{ height: 24, width: 24 }}
//           />
//           <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//             Extra Info:
//           </Typography>
//           {isEditing ? (
//             <>
//               <TextField
//                 size="small"
//                 value={extraInfoPhone}
//                 onChange={(e) => setExtraInfoPhone(e.target.value)}
//               />
//               <IconButton
//                 size="small"
//                 onClick={() => handleDeleteField("extraPhone")}
//                 color="primary"
//               >
//                 <DeleteIcon fontSize="small" />
//               </IconButton>
//             </>
//           ) : (
//             <Typography variant="body2">{extraInfoPhone}</Typography>
//           )}
//         </Box>

//         {/* Reminder */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <img
//             src="/images/clock.svg"
//             alt="Clock Icon"
//             style={{ height: 24, width: 24 }}
//           />
//           <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//             Reminder:
//           </Typography>
//           {reminderDate ? (
//             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//               {isEditing ? (
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DatePicker
//                     label="Custom Date"
//                     value={customDate ? dayjs(customDate) : null}
//                     onChange={(newValue) => {
//                       const formatted = newValue
//                         ? newValue.format("YYYY-MM-DD")
//                         : "";
//                       setCustomDate(formatted);
//                       setReminderDate(formatted);
//                     }}
//                     slotProps={{
//                       textField: { size: "medium", sx: { width: 150 } },
//                     }}
//                   />
//                   <IconButton
//                     size="small"
//                     onClick={() => handleDeleteField("reminder")}
//                     color="primary"
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </IconButton>
//                 </LocalizationProvider>
//               ) : (
//                 <Typography
//                   variant="body2"
//                   sx={{ color: "green", display: "flex", alignItems: "center" }}
//                 >
//                   ✅ {reminderDate}
//                 </Typography>
//               )}
//             </Box>
//           ) : isEditing ? (
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="Custom Date"
//                 value={customDate ? dayjs(customDate) : null}
//                 onChange={(newValue) => {
//                   const formatted = newValue
//                     ? newValue.format("YYYY-MM-DD")
//                     : "";
//                   setCustomDate(formatted);
//                   setReminderDate(formatted);
//                 }}
//                 slotProps={{
//                   textField: { size: "small", sx: { minWidth: 150 } },
//                 }}
//               />
//               <IconButton
//                 size="small"
//                 onClick={() => handleDeleteField("reminder")}
//                 color="primary"
//               >
//                 <DeleteIcon fontSize="small" />
//               </IconButton>
//             </LocalizationProvider>
//           ) : (
//             <Typography variant="body2" sx={{ color: "red" }}>
//               ❌ No reminder
//             </Typography>
//           )}
//         </Box>

//         {/* Location */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <img
//             src="/images/earth.svg"
//             alt="earth Icon"
//             style={{ height: 24, width: 24 }}
//           />
//           <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//             Location:
//           </Typography>
//           {isEditing ? (
//             <>
//               <TextField
//                 size="small"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//               />
//               <IconButton
//                 size="small"
//                 onClick={() => handleDeleteField("location")}
//                 color="primary"
//               >
//                 <DeleteIcon fontSize="small" />
//               </IconButton>
//             </>
//           ) : (
//             <Typography variant="body2">{location}</Typography>
//           )}
//         </Box>

//         {/* Applied */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <img
//             src="/images/calender.svg"
//             alt="calender Icon"
//             style={{ height: 24, width: 24 }}
//           />
//           <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//             Applied:
//           </Typography>
//           <Typography variant="body2">2025-06-06</Typography>
//         </Box>

//         {/* Category */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
//           <img
//             src="/images/briefcase.svg"
//             alt="briefcase Icon"
//             style={{ height: 24, width: 24 }}
//           />
//           <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//             Category:
//           </Typography>
//           {isEditing ? (
//             <>
//               <TextField
//                 select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 size="small"
//                 sx={{ ml: 1, flex: 1 }}
//               >
//                 <MenuItem value="IT & Tech">IT & Tech</MenuItem>
//                 <MenuItem value="Education">Education</MenuItem>
//                 <MenuItem value="Healthcare">Healthcare</MenuItem>
//                 <MenuItem value="Finance">Finance</MenuItem>
//                 <MenuItem value="Marketing">Marketing</MenuItem>
//                 <MenuItem value="Engineering">Engineering</MenuItem>
//                 <MenuItem value="Support">Support</MenuItem>
//                 <MenuItem value="Other">Other</MenuItem>
//               </TextField>
//               <IconButton
//                 size="small"
//                 onClick={() => handleDeleteField("category")}
//                 color="primary"
//               >
//                 <DeleteIcon fontSize="small" />
//               </IconButton>
//             </>
//           ) : (
//             <Typography variant="body2">{category}</Typography>
//           )}
//         </Box>

//         {/* Attachments */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <img
//             src="/images/attach.svg"
//             alt="attach Icon"
//             style={{ height: 24, width: 24 }}
//           />
//           <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//             Attachments:
//           </Typography>
//         </Box>

//         <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//           {files.map((file, idx) => (
//             <Box
//               key={idx}
//               sx={{ display: "flex", alignItems: "center", gap: 1 }}
//             >
//               <Chip
//                 label={file}
//                 size="small"
//                 clickable
//                 onClick={() => handleOpenFile()}
//                 sx={{
//                   flex: 1,
//                   "&:hover": { bgcolor: "#bbdefb", transform: "scale(1.05)" },
//                   transition: "transform 0.2s, background-color 0.2s",
//                 }}
//               />
//               {isEditing && (
//                 <IconButton
//                   size="small"
//                   onClick={() => handleDeleteFile(file)}
//                   color="primary"
//                 >
//                   <DeleteIcon fontSize="small" />
//                 </IconButton>
//               )}
//             </Box>
//           ))}
//         </Box>

//         <FileViewerModal open={modalOpen} onClose={handleCloseModal} />
//       </Box>

//       {/* Bottom icons */}
//       <Box
//         sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5, mt: 1 }}
//       >
//         <Tooltip
//           title={responded ? "Responded" : "Not Responded"}
//           arrow
//           componentsProps={{
//             tooltip: {
//               sx: {
//                 bgcolor: "primary.main",
//                 color: "white",
//                 fontSize: 14,
//                 borderRadius: 1,
//                 px: 1.5,
//                 py: 0.5,
//               },
//             },
//           }}
//         >
//           <IconButton onClick={() => setResponded(!responded)} size="small">
//             {responded ? (
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="green">
//                 <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
//               </svg>
//             ) : (
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="red">
//                 <path d="M18.3 5.71L12 12.01 5.7 5.71 4.29 7.12 10.59 13.42 4.29 19.71 5.7 21.12 12 14.82 18.3 21.12 19.71 19.71 13.41 13.42 19.71 7.12 18.3 5.71z" />
//               </svg>
//             )}
//           </IconButton>
//         </Tooltip>

//         <Tooltip
//           title="Delete"
//           arrow
//           componentsProps={{
//             tooltip: {
//               sx: {
//                 bgcolor: "primary.main",
//                 color: "white",
//                 fontSize: 14,
//                 borderRadius: 1,
//                 px: 1.5,
//                 py: 0.5,
//               },
//             },
//           }}
//         >
//           <IconButton onClick={handleDelete} size="small" color="primary">
//             <DeleteIcon fontSize="small" />
//           </IconButton>
//         </Tooltip>

//         <Tooltip
//           title={isEditing ? "Save" : "Edit"}
//           arrow
//           componentsProps={{
//             tooltip: {
//               sx: {
//                 bgcolor: "primary.main",
//                 color: "white",
//                 fontSize: 14,
//                 borderRadius: 1,
//                 px: 1.5,
//                 py: 0.5,
//               },
//             },
//           }}
//         >
//           <IconButton onClick={() => setIsEditing(!isEditing)} size="small">
//             {isEditing ? (
//               <SaveIcon fontSize="small" color="primary" />
//             ) : (
//               <EditIcon fontSize="small" color="primary" />
//             )}
//           </IconButton>
//         </Tooltip>
//       </Box>
//     </Paper>
//   );
// };

// export default MyApplicationCard;
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

// Day.js DatePicker
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const MyApplicationCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenFile = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const [responded, setResponded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Editable fields
  const [title, setTitle] = useState("Teacher");
  const [priority, setPriority] = useState("prio1");
  const [extraInfoEmail, setExtraInfoEmail] = useState("test@example.com");
  const [extraInfoPhone, setExtraInfoPhone] = useState("0707-060606");
  const [reminderDate, setReminderDate] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [location, setLocation] = useState("Stockholm");
  const [category, setCategory] = useState("Education");

  const [files, setFiles] = useState(["CV.pdf", "Portfolio.zip"]);

  const priorityEmoji =
    priority === "prio1" ? "🔥" : priority === "prio2" ? "🤷" : "🤦";

  const handleDelete = () => alert("Delete this application");
  const handleDeleteField = (field) => {
    switch (field) {
      case "extraEmail":
        setExtraInfoEmail("");
        break;
      case "extraPhone":
        setExtraInfoPhone("");
        break;
      case "reminder":
        setReminderDate("");
        setCustomDate("");
        break;
      default:
        break;
    }
  };

  const handleDeleteFile = (fileToDelete) => {
    setFiles((prev) => prev.filter((file) => file !== fileToDelete));
  };

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
        {/* Priority */}
        {isEditing ? (
          <Select
            value={priority}
            size="small"
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="prio1">🔥 Priority 1</MenuItem>
            <MenuItem value="prio2">🤷 Priority 2</MenuItem>
            <MenuItem value="prio3">🤦 Priority 3</MenuItem>
          </Select>
        ) : (
          <Typography sx={{ fontSize: "40px" }}>{priorityEmoji}</Typography>
        )}

        {/* Position / Role */}
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
            <TextField
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
          ) : (
            <Typography variant="body2">{title}</Typography>
          )}
        </Box>

        {/* Extra Info Email */}
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
              <TextField
                size="small"
                value={extraInfoEmail}
                onChange={(e) => setExtraInfoEmail(e.target.value)}
              />
              <IconButton
                size="small"
                onClick={() => handleDeleteField("extraEmail")}
                color="primary"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <Typography variant="body2">{extraInfoEmail}</Typography>
          )}
        </Box>

        {/* Extra Info Phone */}
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
              <TextField
                size="small"
                value={extraInfoPhone}
                onChange={(e) => setExtraInfoPhone(e.target.value)}
              />
              <IconButton
                size="small"
                onClick={() => handleDeleteField("extraPhone")}
                color="primary"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <Typography variant="body2">{extraInfoPhone}</Typography>
          )}
        </Box>

        {/* Reminder */}
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
                    value={customDate ? dayjs(customDate) : null}
                    onChange={(newValue) => {
                      const formatted = newValue
                        ? newValue.format("YYYY-MM-DD")
                        : "";
                      setCustomDate(formatted);
                      setReminderDate(formatted);
                    }}
                    slotProps={{
                      textField: { size: "medium", sx: { width: 150 } },
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteField("reminder")}
                    color="primary"
                  >
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
                value={customDate ? dayjs(customDate) : null}
                onChange={(newValue) => {
                  const formatted = newValue
                    ? newValue.format("YYYY-MM-DD")
                    : "";
                  setCustomDate(formatted);
                  setReminderDate(formatted);
                }}
                slotProps={{
                  textField: { size: "small", sx: { minWidth: 150 } },
                }}
              />
              <IconButton
                size="small"
                onClick={() => handleDeleteField("reminder")}
                color="primary"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </LocalizationProvider>
          ) : (
            <Typography variant="body2" sx={{ color: "red" }}>
              ❌ No reminder
            </Typography>
          )}
        </Box>

        {/* Location */}
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
            <TextField
              size="small"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />
          ) : (
            <Typography variant="body2">{location}</Typography>
          )}
        </Box>

        {/* Applied */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="/images/calender.svg"
            alt="calender Icon"
            style={{ height: 24, width: 24 }}
          />
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Applied:
          </Typography>
          <Typography variant="body2">2025-06-06</Typography>
        </Box>

        {/* Category */}
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
            <TextField
              select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              size="small"
              fullWidth
            >
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
            <Typography variant="body2">{category}</Typography>
          )}
        </Box>

        {/* Attachments */}
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
          {files.map((file, idx) => (
            <Box
              key={idx}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Chip
                label={file}
                size="small"
                clickable
                onClick={() => handleOpenFile()}
                sx={{
                  flex: 1,
                  "&:hover": { bgcolor: "#bbdefb", transform: "scale(1.05)" },
                  transition: "transform 0.2s, background-color 0.2s",
                }}
              />
              {isEditing && (
                <IconButton
                  size="small"
                  onClick={() => handleDeleteFile(file)}
                  color="primary"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>

        <FileViewerModal open={modalOpen} onClose={handleCloseModal} />
      </Box>

      {/* Bottom icons */}
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5, mt: 1 }}
      >
        <Tooltip
          title={responded ? "Responded" : "Not Responded"}
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
