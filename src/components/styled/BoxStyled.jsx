import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const BoxStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette?.card?.main,
  borderRadius: 11,
  padding: "15px 10px",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0.25rem 1.125rem 0 rgba(47, 43, 61, 0.16)"
      : "0px 4px 18px 0px rgba(47, 43, 61, 0.1)",
}));

// border: 1px solid ${theme.palette.borderColor.light} ;
