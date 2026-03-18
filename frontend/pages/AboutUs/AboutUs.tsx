import JakobImage from "../../public/images/me.jpg";
import { Box, Typography, Avatar, Grid, Button, Collapse } from "@mui/material";
import ReviewForm from "../../components/Review/ReviewForm";

import { useState } from "react";
const leadership = [
  {
    name: "Jakob Malmgren",
    role: "CEO",
    image: JakobImage,
    quote:
      "Our vision is to revolutionize the way people approach their careers. We believe in innovation and creativity above all.",
  },
  {
    name: "Jakob Malmgren",
    role: "CTO",
    image: JakobImage,
    quote:
      "Technology is the backbone of our mission. We strive to make every process seamless and fun.",
  },
  {
    name: "Jakob Malmgren",
    role: "COO",
    image: JakobImage,
    quote:
      "Operations are key. We ensure everything runs smoothly while keeping our team inspired.",
  },
];

const AboutUs = () => {
  const [openForm, setOpenForm] = useState(false); // toggle för review-form

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        mt: 4,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        color: "primary.main",
      }}
    >
      {/* About Us text */}
      <Box>
        <Typography variant="h3" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Welcome to our world of unparalleled opportunities! Our platform is
          designed for anyone seeking jobs, internships, or just a little extra
          inspiration in their career journey.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We believe in empowering individuals to reach their full potential.
          Through a combination of innovation, creativity, and collaboration, we
          create tools and opportunities that make career development not only
          accessible but also enjoyable.
        </Typography>
        <Typography variant="body1">
          Our team is dedicated to building a supportive community where
          learning, growth, and experimentation are encouraged. Every project we
          undertake is driven by our core values: transparency, integrity, and a
          relentless pursuit of excellence.
        </Typography>
      </Box>

      {/* Leadership section */}
      <Box>
        <Grid container spacing={4} justifyContent="center">
          {leadership.map((member, index) => (
            <Grid item xs={12} sm={4} key={index} sx={{ textAlign: "center" }}>
              <Box
                sx={{ position: "relative", display: "inline-block", mb: 2 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    position: "absolute",
                    top: -20,
                    left: -20,
                    color: "primary.main",
                    fontWeight: "bold",
                  }}
                >
                  “
                </Typography>
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{ width: 120, height: 120, mx: "auto" }}
                />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontStyle: "italic",
                  mt: 2,
                  maxWidth: 300,
                  mx: "auto",
                  color: "primary.main",
                }}
              >
                {member.quote}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 1,
                  fontWeight: "bold",
                  color: "primary.main",
                  fontStyle: "italic",
                }}
              >
                {member.name}
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary.main"
                sx={{ fontStyle: "italic" }}
              >
                {member.role}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ReviewForm med toggle */}
      <Box>
        <Button
          variant="contained"
          onClick={() => setOpenForm(!openForm)}
          sx={{ mb: 2 }}
        >
          {openForm ? "− Leave a Review" : "+ Leave a Review"}
        </Button>

        <Collapse in={openForm}>
          <ReviewForm />
        </Collapse>
      </Box>
    </Box>
  );
};

export default AboutUs;
