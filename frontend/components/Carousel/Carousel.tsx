import { Box, Fade } from "@mui/material";
import Review from "../Review/Review";
import { useState, useEffect } from "react";

// Mocka reviews
export type ReviewTypes = {
  name: string;
  date: string;
  stars: number;
  text: string;
};
const reviews: ReviewTypes[] = [
  {
    name: "John Doe",
    date: "29 May 2026",
    stars: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Jane Smith",
    date: "15 June 2026",
    stars: 4,
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    name: "Michael Johnson",
    date: "02 July 2026",
    stars: 5,
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        setFadeIn(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Fade in={fadeIn} timeout={500}>
        <Box>
          <Review review={reviews[currentIndex]} />
        </Box>
      </Fade>
    </Box>
  );
};

export default Carousel;
