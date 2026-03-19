import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { type ReviewTypes } from "../Carousel/Carousel";

interface ReviewProps {
  review: ReviewTypes;
}

const Review = ({ review }: ReviewProps) => {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        p: 2,
        width: 500,
        // bgcolor: "rgba(249, 249, 249, 0.75)",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        boxShadow: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Circle for image */}
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            bgcolor: "#dad6d645",
          }}
        />

        {/* Name + stars + date */}
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Typography sx={{ fontWeight: "bold", color: "#111" }}>
            {review.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
            {[...Array(review.stars)].map((_, idx) => (
              <StarIcon key={idx} sx={{ color: "#FFD700", fontSize: 18 }} />
            ))}
            <Typography sx={{ fontSize: 12, color: "#555", ml: 1 }}>
              {review.date}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Review text */}
      <Typography sx={{ fontSize: 14, color: "#111" }}>
        {review.text}
      </Typography>
    </Box>
  );
};

export default Review;
