import { useState } from "react";
import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const COLLAPSED_HEIGHT = 118;

const Review = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  if (!review) return null;

  const rating = Number(review.rating?.N || 0);
  const formattedDate = review.createdAt?.S
    ? new Date(review.createdAt.S).toLocaleDateString("sv-SE")
    : "";

  const comment = review.comment?.S || "";
  const name = review.name?.S || "Anonymous";
  const initial = name[0]?.toUpperCase() || "?";

  const showToggle = comment.length > 85;

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        p: 0.7,
        borderRadius: 3,
        background:
          "linear-gradient(135deg, rgba(227,242,253,1) 0%, rgba(255,255,255,1) 100%)",
        border: "1px solid rgba(25,118,210,0.15)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        height: expanded ? "auto" : `${COLLAPSED_HEIGHT}px`,
        overflow: "hidden",
        transition:
          "transform 0.25s ease, box-shadow 0.25s ease, height 0.25s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.7,
          mb: 0.45,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1976d2, #42a5f5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 11,
            color: "white",
            flexShrink: 0,
            boxShadow: "0 3px 10px rgba(25,118,210,0.3)",
          }}
        >
          {initial}
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 11,
              color: "#111",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.15,
            }}
          >
            {name}
          </Typography>

          <Typography
            sx={{
              pt: 0.5,
              fontSize: 8.5,
              color: "#666",
              lineHeight: 1.15,
            }}
          >
            {formattedDate}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.15,
          mb: 0.4,
          flexShrink: 0,
        }}
      >
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            sx={{
              color: i < rating ? "#FFD54F" : "#d9d9d9",
              fontSize: 12,
              filter:
                i < rating ? "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" : "none",
            }}
          />
        ))}

        <Typography
          sx={{
            ml: 0.35,
            fontSize: 8.5,
            fontWeight: 600,
            color: "#444",
          }}
        >
          {rating}/5
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minHeight: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: 9,
            color: "#222",
            lineHeight: 1.3,
            wordBreak: "break-word",
            whiteSpace: "normal",
            opacity: 0.9,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: expanded ? "unset" : 2,
            overflow: "hidden",
          }}
        >
          {comment}
        </Typography>

        <Box
          sx={{
            mt: "auto",
            minHeight: 16,
            display: "flex",
            alignItems: "flex-end",
            pt: 0.3,
          }}
        >
          {showToggle ? (
            <Typography
              onClick={() => setExpanded((prev) => !prev)}
              sx={{
                fontSize: 8.5,
                fontWeight: 700,
                color: "#1976d2",
                cursor: "pointer",
                userSelect: "none",
                lineHeight: 1.2,
              }}
            >
              {expanded ? "Show less" : "Show more"}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Review;
