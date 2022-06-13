import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/sagas/userSaga";
import DarkMode from "./DarkMode";

export default function Header({ userEmail }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
    enqueueSnackbar("See you soon 👋", { variant: "success" });
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "#5a5d60a1" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: 2 }}
              href="/todopage"
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              WELLCOME {userEmail}
            </Typography>
            {/* <DarkMode sx={{ mx: "auto" }} /> */}
            <Button
              color="inherit"
              onClick={() => {
                handleLogout();
              }}
            >
              Log out{" "}
              <span>
                <LogoutIcon sx={{ ml: 1 }} />
              </span>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
