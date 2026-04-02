import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useTheme } from "@mui/material/styles";

const Review = ({ review }) => {
  const theme = useTheme();
  if (!review) return null;
  console.log("REv", review);

  const rating = Number(review.rating?.N || 0);

  const formattedDate = review.createdAt?.S
    ? new Date(review.createdAt.S).toLocaleDateString("sv-SE")
    : "";

  return (
    <Box
      sx={{
        width: "80%",
        minWidth: 0,
        p: 2.5,
        borderRadius: 2,
        bgcolor: "#dad6d645",
        border: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        boxSizing: "border-box",

        transform: { xs: "scale(0.8)" },
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Avatar */}
        <Box
          sx={{
            width: 45,
            height: 45,
            borderRadius: "50%",
            bgcolor: "#ffffff80",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {review.name?.S?.[0]?.toUpperCase()}
        </Box>

        {/* Name + Stars + Date */}
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          {/* Top row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: 600, color: "#111" }}>
              {review.name?.S}
            </Typography>

            <Typography sx={{ fontSize: 12, color: "#666" }}>
              {formattedDate}
            </Typography>
          </Box>

          {/* Stars */}
          <Box sx={{ display: "flex", mt: 0.3 }}>
            {[...Array(rating)].map((_, i) => (
              <StarIcon
                key={i}
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: 20,
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Comment */}
      <Typography
        sx={{
          fontSize: 14,
          color: "#111",
          lineHeight: 1.5,
        }}
      >
        {review.comment?.S}
      </Typography>
    </Box>
  );
};

export default Review;
