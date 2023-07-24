import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { LogoutRequestAction } from "../../../redux/authentication/actions";
import { useNavigate } from "react-router-dom";
import categories from "../../../utils/categories";

export default function AccountMenu({ userData }) {
  const { firstName, lastName, token } = userData;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = categories();
  const list = options.map((item, idx) => {
    const { icon, name, route } = item;
    return (
      <MenuItem key={idx} disablePadding onClick={() => navigate(route)}>
        <ListItemIcon>{icon}</ListItemIcon>
        {name}
      </MenuItem>
    );
  });

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }} />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> {`${firstName} ${lastName} ` || "My Account"}
        </MenuItem>
        <Divider />

        {token && list}

        <MenuItem
          onClick={() => {
            dispatch(LogoutRequestAction());
            navigate("/signin");
            handleClose();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
