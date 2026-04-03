import { Box } from "@mui/material";
import Review from "../Review/Review";
import { useState, useEffect, useMemo } from "react";
import { readReview } from "../../apis/readReview";

const Carousel = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await readReview();
      const updateData = data.data.Items || [];
      setReviews(updateData);
    };

    fetchReviews();
    const interval = setInterval(fetchReviews, 5000);
    return () => clearInterval(interval);
  }, []);

  const loopedReviews = useMemo(() => {
    if (!reviews.length) return [];
    return [...reviews, ...reviews];
  }, [reviews]);

  if (!reviews.length) return null;

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1.2,
          width: "max-content",
          minWidth: "100%",
          alignItems: "stretch",
          animation: "scroll 60s linear infinite",

          "@keyframes scroll": {
            "0%": {
              transform: "translateX(0)",
            },
            "100%": {
              transform: "translateX(-50%)",
            },
          },
        }}
      >
        {loopedReviews.map((review, index) => (
          <Box
            key={`${review?.createdAt?.S || "review"}-${index}`}
            sx={{
              width: {
                xs: "200px",
                sm: "220px",
                md: "250px",
              },
              minWidth: {
                xs: "200px",
                sm: "220px",
                md: "250px",
              },
              height: 100,
              flexShrink: 0,
              display: "flex",
            }}
          >
            <Review review={review} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;
