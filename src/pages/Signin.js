import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../components/styles/signin.css";
import { Container, CssBaseline } from "@mui/material";
import useFetchPost from "../hooks/useFetchPost";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  AuthFailureAction,
  AuthRequestAction,
  AuthSuccessAction,
} from "../redux/authentication/actions";

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

function Signin() {
  const { isLoading, data, error, fetchData } = useFetchPost();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const isValidate = handleFormValidation(data);

    if (isValidate) {
      toast.info("Please fill in all required fields!");
    } else {
      const url = `${process.env.REACT_APP_BASE_URL}/login/`;
      fetchData(url, userData);
    }
  };

  const handleFormValidation = (data) => {
    // Check if required fields are filled
    const email = data.get("email");
    const password = data.get("password");

    return !email || !password;
  };

  useEffect(() => {
    if (data?.status === "User login successfully.") {
      //auth post success action
      dispatch(AuthSuccessAction(data));
      toast.success(data.status);
      formRef.current.reset();
      navigate("/");
    }

    if (data?.status === "Wrong Credentials!") {
      toast.error(data.status);
    }

    if (data?.status === "User not exists!") {
      toast.error(data.status);
    }

    if (error) {
      toast.error("Something went wrong!");
    }
  }, [data]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container className="signin" component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="inner-signin">
          <Typography
            textAlign={"center"}
            component="h1"
            variant="h4"
            color={"#0e0e0e"}
            fontWeight={"300"}
          >
            Sign in
          </Typography>
          <Box
            ref={formRef}
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Typography fontSize={"14px"}>
              Don't remember your password?{" "}
              <Link to={"/reset-password"}>Create or Reset password</Link>
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, padding: "12px" }}
            >
              Sign In
            </Button>

            <Typography fontSize={"14px"}>
              Don't have a Dell account?{" "}
              <Link to={"/register"}>Create an account</Link>
            </Typography>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Signin;
