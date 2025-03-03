import React, { memo, useMemo } from "react";
import { DrawerHeader } from "../styled/DrawerHeader";
import Vector from "assets/images/logolightSmall.png";

import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import RenderLogo from "./RenderLogo";
import { navStore } from "store/settingsStore";

const SideBarHeader = ({ hoverd }) => {
  const [open, setOpen] = navStore((state) => [state.open, state.setOpen]);

  return (
    <DrawerHeader
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {open || hoverd ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            transition: "0.8s ease",
            animationDelay: "500ms",
          }}
        >
          <RenderLogo />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: `url('${Vector}')`,
            backgroundSize: "cover",
            transition: "0.6s ease",
            animationDelay: "500ms",
            backgroundRepeat: "no-repeat",
          }}
        ><RenderLogo /></Box>
      )}
  
    </DrawerHeader>
  );
};

export default memo(SideBarHeader);
