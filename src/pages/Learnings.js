import { Box, Typography } from "@mui/material";
import React from "react";
import "../components/styles/learnings.css";

function Learnings() {
  return (
    <section className="learings-div">
      <Box className="learings-header">
        <Typography
          textAlign={"left"}
          component="h1"
          variant="h4"
          color={"#0e0e0e"}
          fontWeight={"300"}
          marginBottom={"20px"}
        >
          Learnings
        </Typography>
      </Box>
    </section>
  );
}

export default Learnings;
