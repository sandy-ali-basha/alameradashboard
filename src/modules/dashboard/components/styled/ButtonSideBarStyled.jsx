import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const ButtonSideBarStyled = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  backgroundColor: "inherit",
  textDecoration: "none",
  minWidth: "20px",
  color: theme.palette.primary?.contrastText,
  display: "flex",
  justifyContent: "start",
  padding: "2px 16px",
  borderRadius: "8px",
  alignItems: "center",
  minHeight: 50,
  columnGap: 3,

  "& .MuiSvgIcon-root": {
    transition: "250ms",
  },
  ...(active && {
    color: theme.palette.text.main,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.background.main
        : theme.palette.background.main,
  }),
}));
