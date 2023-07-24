import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchGet from "../hooks/useFetchGet";
import { useSelector } from "react-redux";
import "../components/styles/singlePartPage.css";

function SinglePartPage() {
  const { part_id } = useParams();
  const { isLoading, data, error, fetchData } = useFetchGet();
  const userData = useSelector((store) => store);
  const { token } = userData;

  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_URL}/parts/${part_id}`;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    fetchData(url, config);
  }, [part_id]);

  return (
    <section className="singlePartPage-div">
      <Box className="singlePartPage-header">
        <Typography
          textAlign={"left"}
          component="h1"
          variant="h4"
          color={"#0e0e0e"}
          fontWeight={"300"}
          marginBottom={"20px"}
        >
          Part Description
        </Typography>
        {!isLoading && data?.length > 0 ? (
          <Box>
            <Typography
              textAlign={"left"}
              component="h2"
              variant="h5"
              fontWeight={"400"}
            >
              Part id: {data[0]?.part_id}
            </Typography>

            <Typography
              textAlign={"left"}
              component="h2"
              variant="h5"
              fontWeight={"400"}
            >
              Part id: {data[0]?.part_name}
            </Typography>

            <Typography
              textAlign={"left"}
              component="h2"
              variant="h5"
              fontWeight={"400"}
            >
              {/* Specifications: {data[0]?.specifications} */}
            </Typography>

            <Typography
              textAlign={"left"}
              component="h2"
              variant="h5"
              fontWeight={"400"}
            >
              {/* Part id: {data[0]?.known_issues_recalls} */}
            </Typography>

            <Typography
              textAlign={"left"}
              component="h2"
              variant="h5"
              fontWeight={"400"}
            >
              Installation Instructions: {data[0]?.installation_instructions}
            </Typography>

            <Typography
              textAlign={"left"}
              component="h2"
              variant="h5"
              fontWeight={"400"}
            >
              Troubleshooting Instructions:{" "}
              {data[0]?.troubleshooting_instructions}
            </Typography>
          </Box>
        ) : (
          <Box className="progress-bar">
            <CircularProgress />
          </Box>
        )}
      </Box>
    </section>
  );
}

export default SinglePartPage;
