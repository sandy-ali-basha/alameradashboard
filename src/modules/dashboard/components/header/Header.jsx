import { Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import React from "react";
import { AppBar } from "../styled/AppBar";
import SettingsMenu from "./SettingsMenu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import Qatar from "assets/icons/qatar.png";
import Uk from "assets/icons/uk.png";

const Header = ({ open }) => {
  const { i18n, t } = useTranslation("header");

  const [setMode, mode] = settingsStore((state) => [state.setMode, state.mode]);
  const [direction, setDirection] = settingsStore((state) => [
    state.direction,
    state.setDirection,
  ]);

  const toggleLang = () => {
    setDirection(direction === "ltr" ? "rtl" : "ltr");
    i18n.changeLanguage(direction === "ltr" ? "ar" : "fr");
  };

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
        <Box></Box>
        <Box
          sx={{
            display: "flex",
            columnGap: "10px",
            marginRight: "20px",
          }}
        >
          {/* <IconButton sx={{ width: "39px" }} onClick={toggleLang}>
            <Tooltip
              title={
                direction === "ltr"
                  ? t("arabic language")
                  : t("France language")
              }
            >
              {direction === "ltr" ? (
                <img src={Qatar} width="100%" alt="AR" />
              ) : (
                <img src={Uk} width="100%" alt="UK" />
              )}
            </Tooltip>
          </IconButton> */}
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
          {/* <IconButton>
            <NotificationsRoundedIcon sx={{ color: "darkGray.main" }} />
          </IconButton> */}
          <SettingsMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
