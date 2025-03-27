import {
  Typography,
  Box,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { BoxStyled } from "components/styled/BoxStyled";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { useProductcolors } from "hooks/productcolors/useProductcolors";
import DeleteDialog from "../components/Dialog";

const ProductcolorsIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useProductcolors();
  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const columns = useMemo(() => {
    return [
      t("name"),
      t("name ar"),
      t("name en"),
      t("name kr"),
      t("operations"),
    ];
  }, [t]);

  const rows = useMemo(() => {
    return data?.data?.product_options_values?.map((productcolors, id) => (
      <TableRow sx={{ height: "65px" }} key={productcolors.id} hover>
        <TableCell sx={{ minWidth: 50 }}>
          {productcolors?.name ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {productcolors?.translations?.find((t) => t.locale === "ar")?.name ??
            "Null"}
        </TableCell>

        <TableCell sx={{ minWidth: 50 }}>
          {productcolors?.translations?.find((t) => t.locale === "fr")?.name ??
            "Null"}
        </TableCell>

        <TableCell sx={{ minWidth: 50 }}>
          {productcolors?.translations?.find((t) => t.locale === "tr")?.name ??
            "Null"}
        </TableCell>

        <TableCell
          align="center"
          sx={{
            minWidth: { md: 200, xs: 100 },
          }}
        >
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={productcolors?.id} count={count} page={page} />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  }, [data, count, direction, page]);

  const handleCreate = () => navigate("create");

  return (
    <>
      {isLoading && <Loader />}

      <Box
        sx={{
          width: { sl: "300px" },
          backgroundColor: { xs: "background.main" },
          ml: { xs: "0px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            px: 3,
          }}
        >
          <Typography sx={{ color: "text.main" }} variant="h5">
            {t("productcolors")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New productcolors")}
          </Button>
        </Box>

        <BoxStyled sx={{ px: "10px" }}>
          <Table
            columns={columns}
            rows={rows}
            page={page}
            setPage={setPage}
            count={Math.ceil(data?.pagination?.total / count)}
          />
        </BoxStyled>
      </Box>
    </>
  );
};

export default ProductcolorsIndex;
