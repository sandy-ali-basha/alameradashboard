import React, { useState } from "react";
import { Drawer } from "../styled/Drawer";
import { Box, Collapse, useMediaQuery } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBarHeader from "./SideBarHeader";
import SideBarLink from "./SideBarLink";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  AdminPanelSettingsRounded,
  CategoryRounded,
  ColorLensRounded,
  DiscountRounded,
  GavelRounded,
  HomeRounded,
  Inventory,
  ShoppingCartCheckout,
  ShoppingCartCheckoutRounded,
  StorefrontRounded,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import { navStore } from "store/settingsStore";
import { drawerWidth } from "modules/dashboard/DashboardComponent";

const SideBar = () => {
  const { t } = useTranslation("sidebar");
  const [hovered, setHovered] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [open, setOpen] = navStore((state) => [state.open, state.setOpen]);

  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleToggleSection = (sectionName) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };
  const role = localStorage.getItem("role");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const links = [
    {
      name: t("Admin"),
      link: "/dashboard/admin",
      icon: <AdminPanelSettingsRounded />,
    },

    {
      name: t("Products"),
      link: "/dashboard/product",
      icon: <Inventory />,
    },
    {
      name: t("Product Types"),
      link: "/dashboard/product_type",
      icon: <ColorLensRounded />,
    },
    {
      name: t("Categories"),
      link: "/dashboard/products/categories",
      icon: <CategoryRounded />,
    },

    {
      name: t("Brands"),
      link: "/dashboard/brands",
      icon: <StorefrontRounded />,
    },
    {
      name: t("orders"),
      link: "/dashboard/orders",
      icon: <ShoppingCartCheckoutRounded />,
    },

    {
      name: t("discounts"),
      link: "/dashboard/discounts",
      icon: <DiscountRounded />,
    },

    {
      name: t("terms"),
      link: "/dashboard/terms",
      icon: <GavelRounded />,
    },

    {
      name: t("Home"),
      link: "/dashboard/home",
      icon: <HomeRounded color={"secondary.main"} />,
    },
    {
      name: t("customers"),
      link: "/dashboard/customers",
      icon: <HomeRounded color={"secondary.main"} />,
    },
  ];
  const website_admin = [
    {
      name: t("terms"),
      link: "/dashboard/terms",
      icon: <GavelRounded />,
    },
    {
      name: t("Home"),
      link: "/dashboard/home",
      icon: <HomeRounded color={"secondary.main"} />,
    },
  ];
  const orders_admin = [
    {
      name: t("orders"),
      link: "/dashboard/orders",
      icon: <ShoppingCartCheckout />,
    },
  ];
  const ecommerce_admin = [
    {
      name: t("Products"),
      icon: <CategoryRounded />,
      subOptions: [
        { name: t("Products"), link: "/dashboard/product" },
        { name: t("Categories"), link: "/dashboard/products/categories" },
        { name: t("Product Type"), link: "/dashboard/product_type" },
      ],
    },

    {
      name: t("Brands"),
      link: "/dashboard/brands",
      icon: <StorefrontRounded />,
    },
    {
      name: t("orders"),
      link: "/dashboard/orders",
      icon: <ShoppingCartCheckout />,
    },

    {
      name: t("discounts"),
      link: "/dashboard/discounts",
      icon: <DiscountRounded />,
    },
  ];

  const returnLinks = () => {
    if (role === "super_admin") return links;
    if (role === "website_admin") return website_admin;
    if (role === "ecommerce_admin") return ecommerce_admin;
    if (role === "order_admin") return orders_admin;
    else return [];
  };
  const theme = useTheme();
  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={() => setOpen(false)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        "& .MuiDrawer-paper": {
          boxShadow: 3,
          borderRadius: 3,
          m: isMobile ? "4px" : "8px",
          borderRight: "none",
          width: isMobile ? drawerWidth : open ? drawerWidth : 72,
          background:theme.palette.background.navBg
        },
      }}
    >
      <SideBarHeader
        open={open}
        setOpen={setOpen}
        hovered={hovered ? "true" : ""}
      />
      <Box
        sx={{
          padding: isMobile ? "0px 8px" : "0px 12px",
          display: "flex",
          flexDirection: "column",
          rowGap: "4px",
        }}
      >
        {returnLinks().map((link, index) => (
          <React.Fragment key={index}>
            {link.subOptions ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleToggleSection(link.name)}
                >
                  <SideBarLink
                    text={t(link.name)}
                    icon={link.icon}
                    open={open || hovered}
                  />
                  {openSections[link.name] ? (
                    <ExpandLessIcon sx={{ color: "primary.contrastText" }} />
                  ) : (
                    <ExpandMoreIcon sx={{ color: "primary.contrastText" }} />
                  )}
                </Box>
                <Collapse
                  in={openSections[link.name]}
                  timeout="auto"
                  unmountOnExit
                >
                  {link.subOptions.map((subOption, subIndex) => (
                    <NavLink to={subOption.link} key={subIndex}>
                      {({ isActive }) => (
                        <SideBarLink
                          style={{ paddingTop: "5px" }}
                          text={t(subOption.name)}
                          active={isActive}
                          icon={null}
                          open={open || hovered}
                        />
                      )}
                    </NavLink>
                  ))}
                </Collapse>
              </>
            ) : (
              <NavLink to={link.link} key={index}>
                {({ isActive }) => (
                  <SideBarLink
                    text={t(link.name)}
                    active={isActive}
                    icon={link.icon}
                    open={open || hovered}
                  />
                )}
              </NavLink>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Drawer>
  );
};

export default SideBar;
