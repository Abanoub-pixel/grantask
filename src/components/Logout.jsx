import { Button } from "@mui/material";
import React from "react";
import AppContext from "../AppContext";
const LogOut = () => {
  const { setUser } = React.useContext(AppContext);
  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return <Button sx={{ margin:3}} variant="text" onClick={handleLogOut}>Logout</Button>;
};

export default LogOut;
