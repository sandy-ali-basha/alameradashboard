import { Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import React from "react";
import { AppBar } from "../styled/AppBar";
import SettingsMenu from "./SettingsMenu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { navStore, settingsStore } from "store/settingsStore";
import { Menu } from "@mui/icons-material";

const Header = () => {
  const [open, setOpen] = navStore((state) => [state.open, state.setOpen]);

  const [setMode, mode] = settingsStore((state) => [state.setMode, state.mode]);

  const toggleOpen = () => setOpen(!open);

  return (
    <AppBar
      sx={{
        boxShadow: "0px 4px 18px 0px rgba(47, 43, 61, 0.1)",
        borderRadius: 3,
      }}
      position="fixed"
      open={open}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <IconButton onClick={toggleOpen}>
            <Menu />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            columnGap: "10px",
            marginRight: "20px",
          }}
        >
          <IconButton
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            sx={{
              color: "primary.contrastText",
            }}
          >
            <Tooltip title={mode === "dark" ? "light mode" : "dark mode"}>
              {mode === "dark" ? (
                <LightModeIcon sx={{ color: "primary.contrastText" }} />
              ) : (
                <DarkModeIcon sx={{ color: "primary.contrastText" }} />
              )}
            </Tooltip>
          </IconButton>
          <SettingsMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
