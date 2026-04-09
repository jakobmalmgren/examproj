import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { readApplication } from "../../apis/readApplication";
import type { Application } from "../../../sharedTypes/sharedTypes";
import { checkAuthenticated } from "../../utils/utils";

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
    checkAuthenticated();
    const fetchApplications = async () => {
      const result = await readApplication();

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

    applications.forEach((app: Application) => {
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
      categories.map((cat) => [cat, { 1: 0, 2: 0, 3: 0 }]),
    );

    applications.forEach((app: Application) => {
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
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        minHeight: {
          xs: "calc(100vh - 56px - 80px)",
          sm: "calc(100vh - 64px - 80px)",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 3, sm: 4, md: 6 },
        px: { xs: 2, sm: 3 },

        mt: { xs: "56px", sm: "64px" },
        mb: { xs: "110px", sm: "120px" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", xl: "row" },
          justifyContent: "center",
          alignItems: "stretch",
          gap: { xs: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            bgcolor: "white",
            borderRadius: 2,
            p: { xs: 1.5, sm: 2, md: 3 },
            boxShadow: 2,
          }}
        >
          <Typography variant="subtitle1" gutterBottom textAlign="center">
            Applications by Category
          </Typography>

          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: categories,
                tickLabelInterval: (_, index) => index % 2 === 0,
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

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            bgcolor: "white",
            borderRadius: 2,
            p: { xs: 1.5, sm: 2, md: 3 },
            boxShadow: 2,
          }}
        >
          <Typography variant="subtitle1" gutterBottom textAlign="center">
            Priority Distribution by Category
          </Typography>

          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: categories,
                tickLabelInterval: (_, index) => index % 2 === 0,
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
