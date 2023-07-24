import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Logout } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { FaRegUser } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignInMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            ml: 2,
            borderRadius: "0px",
            padding: "15px 10px",
            fontSize: "16px",
            height: "100%",
          }}
          aria-controls={open ? "sign-in-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <FaRegUser style={{ margin: "0px 5px" }} />
          Sign In
          <MdKeyboardArrowDown
            style={{
              transform: `rotate(${anchorEl ? -180 : 0}deg)`,
              transition: "transform 0.3s ease",
            }}
          />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="sign-in-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        style={{}}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0.5,
          },
        }}
      >
        <div style={{ padding: "0px 10px" }}>
          <p>Welcome to Dell</p>
        </div>
        <div style={{ margin: "10px 0px", padding: "0px 10px" }}>
          <Button
            style={{ width: "100%" }}
            variant="contained"
            disableElevation
            onClick={() => {
              handleClose();
              navigate("/signin");
            }}
          >
            Sign In
          </Button>
        </div>
        <div style={{ padding: "0px 10px" }}>
          <Button
            variant="outlined"
            onClick={() => {
              handleClose();
              navigate("/register");
            }}
          >
            Create an Account
          </Button>
        </div>
      </Menu>
    </React.Fragment>
  );
}
