import { Box, Fade } from "@mui/material";
import Review from "../Review/Review";
import { useState, useEffect } from "react";
import { readReview } from "../../apis/readReview";

const Carousel = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await readReview();
      const updateData = data.data.Items || [];
      console.log("datakalle", updateData);
      setReviews(updateData);
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setFadeIn(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        setFadeIn(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews]);

  return (
    <Box
      sx={{
        width: "100%",
        mt: 5,
      }}
    >
      <Fade in={fadeIn} timeout={500}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Review review={reviews[currentIndex]} />
        </Box>
      </Fade>
    </Box>
  );
};

export default Carousel;
