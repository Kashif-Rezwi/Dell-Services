import React from "react";
import AccountMenu from "./account-menu/AccountMenu";
import SignInMenu from "./sign-in-menu/SignInMenu";
import DrawerRight from "./drawer-right/DrawerRight";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const userData = useSelector((store) => store);
  const { token } = userData;
  const navigate = useNavigate();

  return (
    <nav>
      <div onClick={() => navigate("/")}>
        <img src={"./Images/logo.png"} alt="logo" />
        <p>Services</p>
      </div>

      <div>{!token ? <SignInMenu /> : <AccountMenu userData={userData} />}</div>
      <div>
        <DrawerRight userData={userData} />
      </div>
    </nav>
  );
}

export default Navbar;
