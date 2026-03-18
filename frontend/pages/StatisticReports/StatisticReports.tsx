import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Typography, useTheme } from "@mui/material";

const StatisticReports = () => {
  const theme = useTheme(); // för att hämta primary.main
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

  const categorySearchData = [320, 180, 220, 260, 140, 200, 160, 90];
  const responsesPerCategory = [50, 30, 40, 35, 25, 45, 20, 15];

  return (
    <Box sx={{ p: 3, color: "primary.main" }}>
      <Typography variant="h6" gutterBottom textAlign="center">
        Statistics Overview
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center", // centrerar charts horisontellt
          gap: 4, // lite space mellan charts
        }}
      >
        {/* Bar Chart */}
        <Box sx={{ flex: "1 1 300px", p: 2, maxWidth: 500 }}>
          <Typography variant="subtitle1" gutterBottom textAlign="center">
            Searches by Category
          </Typography>

          <BarChart
            xAxis={[{ scaleType: "band", data: categories }]}
            series={[
              {
                data: categorySearchData,
                label: "Search Count",
                color: theme.palette.primary.main,
              },
            ]}
            height={250}
          />
        </Box>

        {/* Line Chart */}
        <Box sx={{ flex: "1 1 300px", p: 2, maxWidth: 500 }}>
          <Typography variant="subtitle1" gutterBottom textAlign="center">
            Responses Received by Category
          </Typography>

          <LineChart
            xAxis={[{ scaleType: "band", data: categories }]}
            series={[
              {
                data: responsesPerCategory,
                showMark: true,
                label: "Responses",
                color: theme.palette.primary.main, // 👈 färg på staplar
              },
            ]}
            height={250}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StatisticReports;
