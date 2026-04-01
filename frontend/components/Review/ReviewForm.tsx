import Snackbar from "@mui/material/Snackbar";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { postReview } from "../../apis/postReview";
import Alert from "@mui/material/Alert";
import {
  Box,
  TextField,
  Button,
  Typography,
  Tooltip,
  Switch,
  FormControlLabel,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ReviewForm = ({ open }) => {
  const [toggleSwitch, setToggleSwitch] = useState(false);

  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: "",
    name: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  useEffect(() => {
    if (!open || !token) return;

    try {
      setReviewForm({
        rating: 0,
        comment: "",
        name: decoded.username.S,
      });
      setToggleSwitch(false);
    } catch (err) {
      console.log("Invalid token", err);
    }
  }, [open]);

  const handleToggleSwitch = (e) => {
    const checked = e.target.checked;

    setToggleSwitch(checked);

    setReviewForm((prev) => ({
      ...prev,
      name: checked ? "Unknown" : decoded.username.S,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await postReview(reviewForm);
      setToggleSwitch(false);

      if (!result.success) {
        if (result.status === 400 || result.status === 401) {
          setSnackbar({
            open: true,
            message: result.message || "Failed to submit review",
            severity: "error",
          });
        }
        return;
      }

      setReviewForm({
        rating: 0,
        comment: "",
        name: decoded.username.S,
      });

      setSnackbar({
        open: true,
        message: result.message || "Review submitted successfully",
        severity: "success",
      });
    } catch (error) {
      console.log("Network error while posting review:", error);
    }
  };

  console.log("fooorm", reviewForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
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
        transform: { xs: "scale(0.8)", sm: "scale(1)" },
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
        name="rating"
        max={5}
        size="large"
        value={reviewForm.rating}
        onChange={(event, newValue) => {
          setReviewForm((prev) => ({
            ...prev,
            rating: newValue ?? 0,
          }));
        }}
        sx={{
          color: "primary.main",
        }}
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          value={reviewForm.name}
          onChange={handleChange}
          fullWidth
          InputProps={{
            readOnly: toggleSwitch,
          }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={toggleSwitch}
              onChange={handleToggleSwitch}
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
              title="Enable this to be anonymous"
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
              <InfoOutlinedIcon
                fontSize="small"
                sx={{ color: "primary.main" }}
              />
            </Tooltip>
          }
        />
      </Box>

      <TextField
        label="Comment"
        value={reviewForm.comment}
        onChange={handleChange}
        name="comment"
        variant="outlined"
        multiline
        rows={4}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit Review
      </Button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReviewForm;
