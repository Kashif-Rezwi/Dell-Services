import React, { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

function SubmitOTP({ userData, setIsOtpSent }) {
  const [otp, setOtp] = useState("");

  const handleChange = (newValue) => {
    // Check if the value is a positive number and has a maximum of 4 digits
    if (/^\d{0,4}$/.test(newValue)) {
      setOtp(newValue);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUserData = { ...userData, otp };
    const { status } = await verifyOtp(newUserData);
    console.log({ status });
    setOtp("");

    if (status) {
      toast.success("User register successfully.");
      return navigate("/");
    } else {
      return toast.error("Invalid OTP!");
    }
  };

  const verifyOtp = async (userData) => {
    const url = `${process.env.REACT_APP_BASE_URL}/register/user-verification`;
    try {
      const response = await axios.post(url, userData);
      return response.data;
    } catch (error) {
      console.error("Error in verifyOtp:", error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <MuiOtpInput value={otp} length={4} onChange={handleChange} />
      <Button
        sx={{ margin: "20px auto", width: "100%" }}
        type="submit"
        variant="contained"
        disabled={otp.length !== 4}
      >
        Submit
      </Button>

      <Typography
        m={"10px 0px 20px 0px"}
        textAlign={"center"}
        fontSize={"14px"}
      >
        Want to try again?{" "}
        <Link onClick={() => setIsOtpSent(false)}>Click here!</Link>
      </Typography>
    </form>
  );
}

export default SubmitOTP;
