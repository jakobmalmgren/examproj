import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const Review = ({ review }) => {
  if (!review) return null;

  const rating = Number(review.rating?.N || 0);
  const formattedDate = review.createdAt?.S
    ? new Date(review.createdAt.S).toLocaleDateString("sv-SE")
    : "";

  const comment = review.comment?.S || "";

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minWidth: 0,
        p: 0.9,
        borderRadius: 2,
        bgcolor: "#e3f2fd",
        border: "1px solid rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.8,
          mb: 0.6,
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            bgcolor: "#ffffff80",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 11,
            color: "#333",
            flexShrink: 0,
          }}
        >
          {review.name?.S?.[0]?.toUpperCase()}
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 0.25,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 11,
              color: "#111",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.2,
            }}
          >
            {review.name?.S}
          </Typography>

          <Typography
            sx={{
              fontSize: 8.8,
              color: "#555",
              lineHeight: 1.2,
            }}
          >
            {formattedDate}
          </Typography>
        </Box>
      </Box>

      {/* Stars */}
      <Box sx={{ display: "flex", mb: 0.5 }}>
        {[...Array(rating)].map((_, i) => (
          <StarIcon
            key={i}
            sx={{
              color: "#FFD700",
              fontSize: 12,
            }}
          />
        ))}
      </Box>

      {/* Comment */}
      <Box
        sx={{
          height: 40,
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            fontSize: 10,
            color: "#111",
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            wordBreak: "break-word",
          }}
        >
          {comment}
        </Typography>
      </Box>
    </Box>
  );
};

export default Review;
