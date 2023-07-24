import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "../components/styles/register.css";
import {
  CircularProgress,
  Container,
  FormControl,
  FormLabel,
} from "@mui/material";
import SubmitOTP from "../components/submit-otp/SubmitOTP";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetchPost from "../hooks/useFetchPost";
import { useEffect, useRef, useState } from "react";

function Copyright(props) {
  return (
    <Typography
      fontSize={"14px"}
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Dell Services
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function Register() {
  const [isChecked, setIsChecked] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { isLoading, data, error, fetchData } = useFetchPost();
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValidate = handleFormValidation();

    if (isValidate) {
      toast.info("Please fill in all required fields!");
    } else {
      const data = new FormData(event.currentTarget);
      const userData = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      };
      const url = `${process.env.REACT_APP_BASE_URL}/register/`;
      fetchData(url, userData);
      console.log(data);

      setIsChecked(false);
      formRef.current.reset();
    }
  };

  const handleFormValidation = () => {
    // Check if required fields are filled
    const firstName = formRef.current.firstName.value.trim();
    const lastName = formRef.current.lastName.value.trim();
    const email = formRef.current.email.value.trim();
    const password = formRef.current.password.value.trim();

    return !firstName || !lastName || !email || !password;
  };

  useEffect(() => {
    if (data === "Invalid recipients email id!") {
      return toast.error(data);
    }

    if (data?.msg === "User Verification OTP sent successfully.") {
      toast.success(data?.msg);
      setIsOtpSent(true);
    }
  }, [data]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container className="register" component="main" maxWidth="xs">
        {!isLoading ? (
          !isOtpSent ? (
            <Box className="inner-register">
              <Typography
                component="h1"
                variant="h4"
                color={"#0e0e0e"}
                fontWeight={"300"}
                textAlign={"center"}
              >
                Create Your Account
              </Typography>

              <Typography
                m={"10px 0px 20px 0px"}
                textAlign={"center"}
                fontSize={"14px"}
              >
                Already have an account? <Link to={"/signin"}>Sign In</Link>
              </Typography>

              <Box
                ref={formRef}
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel
                        style={{
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          value="allowExtraEmails"
                          size="small"
                          color="primary"
                          checked={isChecked} // Set the checked state of the Checkbox
                          onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        Yes, I would like Dell to send me email communications.
                      </FormLabel>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, padding: "12px" }}
                >
                  Create Account
                </Button>
              </Box>
            </Box>
          ) : (
            <Box className="otp-div">
              <Typography
                component="h1"
                variant="h4"
                color={"#0e0e0e"}
                fontWeight={"300"}
                textAlign={"center"}
              >
                Verify Your Account
              </Typography>

              <Typography
                m={"10px 0px 20px 0px"}
                textAlign={"center"}
                fontSize={"14px"}
              >
                haven't you received any emails? Check spam.
              </Typography>
              <Box className="otp">
                <SubmitOTP
                  userData={data?.userDetails}
                  setIsOtpSent={setIsOtpSent}
                />
              </Box>
            </Box>
          )
        ) : (
          <Box className="progress-bar">
            <CircularProgress />
          </Box>
        )}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Register;
