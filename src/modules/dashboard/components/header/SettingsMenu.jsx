import * as React from "react";
import Box from "@mui/material/Box";

import { IconButton, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { _AuthApi } from "api/auth";
import { useTranslation } from "react-i18next";

import LogoutIcon from "@mui/icons-material/Logout";
import { navStore, settingsStore } from "store/settingsStore";
const SettingsMenu = ({  hoverd }) => {
  const { t } = useTranslation("settingMenu");
  const [open, setOpen] = navStore((state) => [state.open, state.setOpen]);

  const [mode] = settingsStore((state) => [state.setMode, state.mode]);
  const [direction] = settingsStore((state) => [
    state.direction,  
    state.setDirection,
  ]);

  const logOut = (input) => {
    _AuthApi.destroyToken(input);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "110px",
          justifyContent: "space-around",
        }}
      >
        <IconButton
          onClick={logOut}
          sx={{
            color: "primary.contrastText",
          }}
        >
          <Tooltip title={direction === "ltr" ? t("Logout") : t("تسجيل خروج")}>
            {mode === "dark" ? (
              <LogoutIcon sx={{ color: "primary.contrastText" }}></LogoutIcon>
            ) : (
              <LogoutIcon sx={{ color: "primary.contrastText" }}></LogoutIcon>
            )}
          </Tooltip>
        </IconButton>
        <Typography
          variant="body1"
          sx={{
            textDecoration: "none",
            opacity: open || hoverd ? 1 : 0,

            color: "primary.contrastText",
          }}
        >
          {t("Logout")}
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default React.memo(SettingsMenu);
