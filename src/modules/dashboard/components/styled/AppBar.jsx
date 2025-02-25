import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { drawerWidth } from "modules/dashboard/DashboardComponent";

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin", "left"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  minHeight:'40px',
  margin:'8px',
  backdropFilter:'blur(3px)',
  ...(open && {
    right: 0,
    width: `calc(100% - ${drawerWidth}px - 32px)`,
    transition: theme.transitions.create(["width", "margin", "left"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
