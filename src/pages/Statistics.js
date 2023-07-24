import { Box, Typography } from "@mui/material";
import React from "react";
import "../components/styles/statistics.css";

function Statistics() {
  return (
    <section className="statistics-div">
      <Box className="statistics-header">
        <Typography
          textAlign={"left"}
          component="h1"
          variant="h4"
          color={"#0e0e0e"}
          fontWeight={"300"}
          marginBottom={"20px"}
        >
          Statistics
        </Typography>
      </Box>
    </section>
  );
}

export default Statistics;
