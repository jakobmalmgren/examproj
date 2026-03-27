// import { Box, Typography } from "@mui/material";
// import StarIcon from "@mui/icons-material/Star";

// const Review = ({ review }) => {
//   console.log("reeeeeev", review);

//   if (!review) return null;

//   return (
//     <Box
//       sx={{
//         border: "1px solid #ccc",
//         borderRadius: 2,
//         p: 2,
//         width: 500,
//         display: "flex",
//         flexDirection: "column",
//         gap: 1.5,
//         boxShadow: 1,
//       }}
//     >
//       <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//         <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
//           <Typography sx={{ fontWeight: "bold", color: "#111" }}>
//             {review.name?.S}
//           </Typography>
//         </Box>
//       </Box>

//       <Typography sx={{ fontSize: 14, color: "#111" }}>
//         {review.comment?.S}
//       </Typography>
//       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
//         {[...Array(Number(review.rating?.N || 0))].map((_, i) => (
//           <StarIcon key={i} sx={{ color: "#FFD700", fontSize: 18 }} />
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default Review;
import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const Review = ({ review }) => {
  if (!review) return null;

  const rating = Number(review.rating?.N || 0);

  return (
    <Box
      sx={{
        width: 500, // samma längd
        p: 2.5,
        borderRadius: 2,
        bgcolor: "#dad6d645", // din transparenta färg
        border: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
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
          {review.name?.S?.[0].toUpperCase()}
        </Box>

        {/* Name + Stars */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontWeight: 600, color: "#111" }}>
            {review.name?.S}
          </Typography>

          <Box sx={{ display: "flex", mt: 0.3 }}>
            {[...Array(rating)].map((_, i) => (
              <StarIcon key={i} sx={{ color: "#FFD700", fontSize: 18 }} />
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
