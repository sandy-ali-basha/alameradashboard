import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "modules/dashboard/DashboardComponent";

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open" || prop !== "hoverd",
})(({ theme, open, hoverd }) => ({
  width: drawerWidth,
  zIndex: "1200",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  height: 'calc(100vh - 16px)',
  overflowY:'scroll',

  "& .MuiDrawer-paper": {
    height: 'calc(100vh - 16px)',
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  ...(!open &&
    hoverd && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
  ...(!open &&
    !hoverd && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  height: 'calc(100vh - 16px)',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  height: 'calc(100vh - 16px)',
  overflowY: 'scroll',
  scrollbarWidth: 'none',
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
