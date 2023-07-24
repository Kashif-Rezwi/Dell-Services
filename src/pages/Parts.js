import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFetchGet from "../hooks/useFetchGet";
import { BsLaptop } from "react-icons/bs";
import "../components/styles/parts.css";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useThrottle } from "../hooks/useThrottle";
import axios from "axios";

function Parts() {
  const { isLoading, data, error, fetchData } = useFetchGet();
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");

  const userData = useSelector((store) => store);
  const { token } = userData;

  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_URL}/parts`;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    fetchData(url, config);
  }, []);

  // geting input data for Search functionalities
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // this is a function for searching different differemt location in new delhi from our api
  const handleQuery = useCallback((query) => {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    if (query) {
      const url = `${process.env.REACT_APP_BASE_URL}/parts/?q=${query}`;
      axios
        .get(url, config)
        .then((res) => {
          setSearchData(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      setSearchData([]);
    }
  }, []);

  // here i have used useThrottle hook for limiting the api request.
  let throttleValue = useThrottle(search, 2000);

  // here in the useEffect  handleQuery(throttleValue) is called.
  useEffect(() => {
    handleQuery(throttleValue);
  }, [throttleValue]);

  return (
    <section className="parts-div">
      <Box className="parts-header">
        <Typography
          textAlign={"left"}
          component="h1"
          variant="h4"
          color={"#0e0e0e"}
          fontWeight={"300"}
          marginBottom={"20px"}
        >
          Parts
        </Typography>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <IconButton type="button" sx={{ p: "5px10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Parts Here"
            inputProps={{ "aria-label": "search parts here" }}
            value={search}
            onChange={handleChange}
          />
        </Paper>
      </Box>
      <Box className="all-parts">
        {!isLoading ? (
          searchData.length > 0 ? (
            searchData?.map((item, idx) => {
              const { part_id, part_name } = item;
              return (
                <Link to={`/parts/${part_id}`}>
                  <Box key={idx}>
                    <Typography textAlign={"center"} fontSize={"14px"}>
                      <BsLaptop />
                    </Typography>
                    <Typography textAlign={"center"} fontSize={"14px"}>
                      Part Id : {part_id}
                    </Typography>
                    <Typography textAlign={"center"} fontSize={"14px"}>
                      Part Name : {part_name}
                    </Typography>
                  </Box>
                </Link>
              );
            })
          ) : (
            data?.map((item, idx) => {
              const { part_id, part_name } = item;
              return (
                <Link to={`/parts/${part_id}`}>
                  <Box key={idx}>
                    <Typography textAlign={"center"} fontSize={"14px"}>
                      <BsLaptop />
                    </Typography>
                    <Typography textAlign={"center"} fontSize={"14px"}>
                      Part Id : {part_id}
                    </Typography>
                    <Typography textAlign={"center"} fontSize={"14px"}>
                      Part Name : {part_name}
                    </Typography>
                  </Box>
                </Link>
              );
            })
          )
        ) : (
          <Box className="progress-bar">
            <CircularProgress />
          </Box>
        )}
      </Box>
    </section>
  );
}

export default Parts;
