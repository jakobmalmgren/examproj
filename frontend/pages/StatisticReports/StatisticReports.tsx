// import { BarChart } from "@mui/x-charts/BarChart";
// import { Box, Typography, useTheme } from "@mui/material";
// import { useEffect, useMemo, useState } from "react";
// import { readApplication } from "../../apis/readApplication";

// const categories = [
//   "IT & Tech",
//   "Education",
//   "Healthcare",
//   "Finance",
//   "Marketing",
//   "Engineering",
//   "Support",
//   "Other",
// ];

// const StatisticReports = () => {
//   const theme = useTheme();
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       const result = await readApplication();
//       console.log("applications result", result);

//       if (result.success) {
//         setApplications(result.data || []);
//       } else {
//         console.error(result.message);
//       }
//     };

//     fetchApplications();
//   }, []);

//   const chartData = useMemo(() => {
//     const categoryCount = Object.fromEntries(categories.map((cat) => [cat, 0]));

//     applications.forEach((app) => {
//       const cat = app.category || "Other";

//       if (categoryCount[cat] !== undefined) {
//         categoryCount[cat] += 1;
//       } else {
//         categoryCount["Other"] += 1;
//       }
//     });

//     return categories.map((cat) => categoryCount[cat]);
//   }, [applications]);

//   const priorityByCategory = useMemo(() => {
//     const counts = Object.fromEntries(
//       categories.map((cat) => [
//         cat,
//         {
//           1: 0,
//           2: 0,
//           3: 0,
//         },
//       ]),
//     );

//     applications.forEach((app) => {
//       const cat = app.category || "Other";
//       const priority = Number(app.priority);

//       if (!counts[cat]) {
//         counts["Other"][3] += 1;
//         return;
//       }

//       if (priority === 1 || priority === 2 || priority === 3) {
//         counts[cat][priority] += 1;
//       }
//     });

//     return {
//       priority1: categories.map((cat) => counts[cat][1]),
//       priority2: categories.map((cat) => counts[cat][2]),
//       priority3: categories.map((cat) => counts[cat][3]),
//     };
//   }, [applications]);

//   return (
//     <Box sx={{ p: 3, color: "primary.main" }}>
//       <Typography variant="h6" gutterBottom textAlign="center">
//         Statistics Overview
//       </Typography>

//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 4,
//         }}
//       >
//         <Box sx={{ flex: "1 1 300px", p: 2, maxWidth: 500 }}>
//           <Typography variant="subtitle1" gutterBottom textAlign="center">
//             Applications by Category
//           </Typography>

//           <BarChart
//             xAxis={[{ scaleType: "band", data: categories }]}
//             series={[
//               {
//                 data: chartData,
//                 label: "Applications",
//                 color: theme.palette.primary.main,
//               },
//             ]}
//             height={300}
//           />
//         </Box>

//         <Box sx={{ flex: "1 1 300px", p: 2, maxWidth: 600 }}>
//           <Typography variant="subtitle1" gutterBottom textAlign="center">
//             Priority Distribution by Category
//           </Typography>

//           {/* <BarChart
//             xAxis={[{ scaleType: "band", data: categories }]}
//             series={[
//               {
//                 data: priorityByCategory.priority1,
//                 label: "Priority 1",
//                 color: theme.palette.primary.main,
//               },
//               {
//                 data: priorityByCategory.priority2,
//                 label: "Priority 2",
//                 color: theme.palette.primary.light,
//               },
//               {
//                 data: priorityByCategory.priority3,
//                 label: "Priority 3",
//                 color: theme.palette.primary.dark,
//               },
//             ]}
//             height={300}
//           /> */}
//           <BarChart
//             xAxis={[{ scaleType: "band", data: categories }]}
//             series={[
//               {
//                 data: priorityByCategory.priority1,
//                 label: "Priority 1",
//                 color: "#f44336",
//               },
//               {
//                 data: priorityByCategory.priority2,
//                 label: "Priority 2",
//                 color: "#ff9800",
//               },
//               {
//                 data: priorityByCategory.priority3,
//                 label: "Priority 3",
//                 color: "#ffc107",
//               },
//             ]}
//             height={300}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default StatisticReports;
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { readApplication } from "../../apis/readApplication";

const categories = [
  "IT & Tech",
  "Education",
  "Healthcare",
  "Finance",
  "Marketing",
  "Engineering",
  "Support",
  "Other",
];

const StatisticReports = () => {
  const theme = useTheme();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const result = await readApplication();
      console.log("applications result", result);

      if (result.success) {
        setApplications(result.data || []);
      } else {
        console.error(result.message);
      }
    };

    fetchApplications();
  }, []);

  const chartData = useMemo(() => {
    const categoryCount = Object.fromEntries(categories.map((cat) => [cat, 0]));

    applications.forEach((app) => {
      const cat = app.category || "Other";

      if (categoryCount[cat] !== undefined) {
        categoryCount[cat] += 1;
      } else {
        categoryCount["Other"] += 1;
      }
    });

    return categories.map((cat) => categoryCount[cat]);
  }, [applications]);

  const priorityByCategory = useMemo(() => {
    const counts = Object.fromEntries(
      categories.map((cat) => [
        cat,
        {
          1: 0,
          2: 0,
          3: 0,
        },
      ]),
    );

    applications.forEach((app) => {
      const cat = app.category || "Other";
      const priority = Number(app.priority);

      if (!counts[cat]) {
        counts["Other"][3] += 1;
        return;
      }

      if (priority === 1 || priority === 2 || priority === 3) {
        counts[cat][priority] += 1;
      }
    });

    return {
      priority1: categories.map((cat) => counts[cat][1]),
      priority2: categories.map((cat) => counts[cat][2]),
      priority3: categories.map((cat) => counts[cat][3]),
    };
  }, [applications]);

  return (
    <Box sx={{ p: 3, color: "primary.main" }}>
      <Typography variant="h6" gutterBottom textAlign="center">
        Statistics Overview
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Box sx={{ flex: "1 1 300px", p: 2, maxWidth: 500 }}>
          <Typography variant="subtitle1" gutterBottom textAlign="center">
            Applications by Category
          </Typography>

          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: categories,
                tickLabelInterval: (_, index) => index % 3 === 0,
              },
            ]}
            series={[
              {
                data: chartData,
                label: "Applications",
                color: theme.palette.primary.main,
              },
            ]}
            height={300}
          />
        </Box>

        <Box sx={{ flex: "1 1 300px", p: 2, maxWidth: 600 }}>
          <Typography variant="subtitle1" gutterBottom textAlign="center">
            Priority Distribution by Category
          </Typography>

          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: categories,
                tickLabelInterval: (_, index) => index % 3 === 0,
              },
            ]}
            series={[
              {
                data: priorityByCategory.priority1,
                label: "Priority 1",
                color: "#f44336",
              },
              {
                data: priorityByCategory.priority2,
                label: "Priority 2",
                color: "#ff9800",
              },
              {
                data: priorityByCategory.priority3,
                label: "Priority 3",
                color: "#ffc107",
              },
            ]}
            height={300}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StatisticReports;
