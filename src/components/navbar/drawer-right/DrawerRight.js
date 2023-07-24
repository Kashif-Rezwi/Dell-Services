import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/navbar.css";
import { Avatar, IconButton, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import categories from "../../../utils/categories";
import { Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { LogoutRequestAction } from "../../../redux/authentication/actions";

export default function DrawerRight({ userData }) {
  const { firstName, lastName, email, token } = userData;
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const dispatch = useDispatch();
  const options = categories();
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const list = options.map((item, idx) => {
    const { icon, name, route } = item;
    return (
      <ListItem key={idx} disablePadding onClick={() => navigate(route)}>
        <ListItemButton>
          <ListItemIcon sx={{ fontSize: "30px", marginLeft: "4px" }}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <div>
      <IconButton
        sx={{ padding: "0px" }}
        color="primary"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon
          sx={{
            color: "#187fba",
            fontSize: "30px",
          }}
        />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 280 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box className="drawer-top">
            <div className="logo">
              <img src="./Images/logo.png" alt="logo" />
              <p>Services</p>
            </div>
            <IconButton color="primary">
              <CloseIcon />
            </IconButton>
          </Box>
          {!token ? (
            <Box className="sign-in-options">
              <Button
                variant="contained"
                disableElevation
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
              <Button variant="outlined" onClick={() => navigate("/register")}>
                Create an Account
              </Button>
            </Box>
          ) : (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar />
                </ListItemIcon>
                <ListItemText primary={email} />
              </ListItemButton>
            </ListItem>
          )}
          {token && (
            <>
              <List>{list}</List>
              <ListItem
                disablePadding
                onClick={() => {
                  dispatch(LogoutRequestAction());
                  navigate("/signin");
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Logout sx={{ fontSize: "30px", marginLeft: "4px" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
