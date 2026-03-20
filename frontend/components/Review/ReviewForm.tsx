import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Tooltip,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditIcon from "@mui/icons-material/Edit";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("Jakob"); // default name
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      name: name.trim() === "" ? "Unknown" : name,
      rating,
      comment,
    };

    console.log("Review submitted:", reviewData);

    setRating(0);
    setComment("");
    setAnonymous(false);
    setIsEditing(false);
    setName("Jakob");
  };

  const handleToggleAnonymous = () => {
    setAnonymous((prev) => !prev);
    if (!anonymous) {
      // Toggle sätts på → default "Unknown", låst tills edit
      setName("Unknown");
      setIsEditing(false);
    } else {
      // Toggle av → återställ default, låst
      setName("Jakob");
      setIsEditing(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: 2,
        bgcolor: "#e3f2fd",
      }}
    >
      <Typography
        color="primary"
        variant="subtitle1"
        sx={{ fontWeight: "bold" }}
      >
        How was your experience?
      </Typography>

      <Rating
        name="review-rating"
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
        max={5}
        size="large"
      />

      {/* Name field + anonymous toggle */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          InputProps={{
            readOnly: !isEditing, // alltid låst tills man klickar på edit
          }}
        />

        {/* Edit icon visas endast när anonym-toggle är på */}
        {anonymous && (
          <Tooltip
            title={isEditing ? "Lock name" : "Edit name"}
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
                  "& .MuiTooltip-arrow": {
                    color: "primary.main",
                  },
                },
              },
            }}
          >
            <IconButton onClick={() => setIsEditing((prev) => !prev)}>
              <EditIcon fontSize="small" sx={{ color: "primary.main" }} />
            </IconButton>
          </Tooltip>
        )}

        {/* Anonymous toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={anonymous}
              onChange={handleToggleAnonymous}
              sx={{
                "& .MuiSwitch-track": {
                  backgroundColor: "primary.light",
                },
                "& .MuiSwitch-thumb": {
                  color: "primary.main",
                },
              }}
            />
          }
          label={
            <Tooltip
              title="Enable this to be anonymous, but you can click the pen to edit name of your preference"
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
                    "& .MuiTooltip-arrow": { color: "primary.main" },
                  },
                },
              }}
            >
              <InfoOutlinedIcon fontSize="small" sx={{ cursor: "pointer" }} />
            </Tooltip>
          }
        />
      </Box>

      <TextField
        label="Comment"
        variant="outlined"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewForm;
