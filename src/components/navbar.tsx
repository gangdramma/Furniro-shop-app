import React from "react";
import MainLogo from "../assets/images/logo";
import { useAuth } from "../modules/auth/auth-context";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div>
      <MainLogo />
    </div>
  );
};

export default Navbar;
