import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";

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

    // Reset form
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
      <Typography variant="h6">Write a Review</Typography>

      <Rating
        name="review-rating"
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
        max={5}
        size="large"
      />

      <TextField
        label="Name (optional)"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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
