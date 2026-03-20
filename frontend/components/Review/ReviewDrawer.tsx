// import { useState } from "react";
// import { Box, IconButton, Tooltip } from "@mui/material";
// import { keyframes } from "@mui/system";
// import RateReviewIcon from "@mui/icons-material/RateReview";
// import CloseIcon from "@mui/icons-material/Close";
// import ReviewForm from "../Review/ReviewForm";

// // Pulseringsanimation
// const pulse = keyframes`
//   0% { transform: translateY(-50%) scale(1); opacity: 1; }
//   50% { transform: translateY(-50%) scale(1.1); opacity: 0.8; }
//   100% { transform: translateY(-50%) scale(1); opacity: 1; }
// `;

// const ReviewDrawer = () => {
//   const [open, setOpen] = useState(false);

//   const toggleDrawer = () => setOpen((prev) => !prev);

//   return (
//     <>
//       {/* Flytande flik med puls och tooltip */}
//       {!open && (
//         <Tooltip title="Leave a Review" placement="right" arrow>
//           <IconButton
//             onClick={toggleDrawer}
//             sx={{
//               position: "fixed",
//               top: "50%",
//               left: 0,
//               transform: "translateY(-50%)",
//               bgcolor: "primary.main",
//               color: "white",
//               borderTopRightRadius: 8,
//               borderBottomRightRadius: 8,
//               px: 1,
//               "&:hover": { bgcolor: "primary.dark" },
//               zIndex: 1400,
//               animation: `${pulse} 1.5s infinite`,
//             }}
//           >
//             <RateReviewIcon />
//           </IconButton>
//         </Tooltip>
//       )}

//       {/* Backdrop */}
//       {open && (
//         <Box
//           onClick={toggleDrawer} // klick utanför stänger drawer
//           sx={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             bgcolor: "rgba(0,0,0,0.5)",
//             zIndex: 1490,
//           }}
//         />
//       )}

//       {/* Drawer som glider in från vänster, vertikalt centrerad */}
//       <Box
//         sx={{
//           position: "fixed",
//           top: "50%",
//           left: 0,
//           transform: open
//             ? "translateY(-50%) translateX(0)"
//             : "translateY(-50%) translateX(-420px)", // start utanför
//           transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1)",
//           width: 400,
//           bgcolor: "#e3f2fd",
//           borderRadius: 2,
//           boxShadow: 3,
//           p: 3,
//           maxHeight: "90vh",
//           overflow: "auto",
//           zIndex: 1500,
//         }}
//         onClick={(e) => e.stopPropagation()} // förhindrar stängning när man klickar i boxen
//       >
//         {/* Stäng-knapp uppe i högra hörnet */}
//         <IconButton
//           onClick={toggleDrawer}
//           sx={{
//             position: "absolute",
//             top: 16,
//             right: 16,
//             color: "primary.main",
//             bgcolor: "white",
//             "&:hover": { bgcolor: "#f0f0f0" },
//             zIndex: 1600,
//           }}
//         >
//           <CloseIcon />
//         </IconButton>

//         <ReviewForm />
//       </Box>
//     </>
//   );
// };

// export default ReviewDrawer;
import { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { keyframes } from "@mui/system";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CloseIcon from "@mui/icons-material/Close";
import ReviewForm from "../Review/ReviewForm";

// Pulseringsanimation
const pulse = keyframes`
  0% { transform: translateY(-50%) scale(1); opacity: 1; }
  50% { transform: translateY(-50%) scale(1.1); opacity: 0.8; }
  100% { transform: translateY(-50%) scale(1); opacity: 1; }
`;

const ReviewDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <>
      {/* Flytande flik med puls och tooltip */}
      {!open && (
        <Tooltip
          title="Leave a Review"
          placement="right"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "primary.main", // tooltip bakgrund
                color: "white",
                fontSize: 14,
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
                "& .MuiTooltip-arrow": {
                  color: "primary.main", // pil
                },
              },
            },
          }}
        >
          <IconButton
            onClick={toggleDrawer}
            sx={{
              position: "fixed",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              bgcolor: "primary.main", // ikonfärg tillbaka
              color: "white",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              px: 1,
              "&:hover": { bgcolor: "primary.dark" },
              zIndex: 1400,
              animation: `${pulse} 1.5s infinite`,
            }}
          >
            <RateReviewIcon />
          </IconButton>
        </Tooltip>
      )}

      {/* Backdrop */}
      {open && (
        <Box
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0,0,0,0.5)",
            zIndex: 1490,
          }}
        />
      )}

      {/* Drawer som glider in från vänster, vertikalt centrerad */}
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: 0,
          transform: open
            ? "translateY(-50%) translateX(0)"
            : "translateY(-50%) translateX(-420px)",
          transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1)",
          width: 400,
          bgcolor: "#e3f2fd",
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
          maxHeight: "90vh",
          overflow: "auto",
          zIndex: 1500,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Stäng-knapp uppe i högra hörnet */}
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "primary.main",
            bgcolor: "white",
            "&:hover": { bgcolor: "#f0f0f0" },
            zIndex: 1600,
          }}
        >
          <CloseIcon />
        </IconButton>

        <ReviewForm />
      </Box>
    </>
  );
};

export default ReviewDrawer;
