import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      name: name.trim() === "" ? "Unknown" : name,
      rating,
      comment,
    };

    console.log("Review submitted:", reviewData);

    setRating(0);
    setName("");
    setComment("");
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
        border: "1px solid #ccc",
        borderRadius: 2,
        bgcolor: "#e3f2fd",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        How was your experience?
      </Typography>
      <Rating
        name="review-rating"
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
        max={5}
        size="large"
      />

      {/* Namn + ikon */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <Tooltip
          title='If no name is submitted, your name will be "Unknown"'
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
          <IconButton>
            <InfoOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} />
          </IconButton>
        </Tooltip>
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
