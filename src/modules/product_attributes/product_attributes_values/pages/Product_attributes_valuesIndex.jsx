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
import React, { useMemo, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
// import ChangeStatus from "../components/ChangeStatus";
import { useProduct_attributes_values } from "hooks/product_attributes_values/useProduct_attributes_values";
import Product_attributes_valuesUpdate from "./Product_attributes_valuesUpdate";
import DeleteDialog from "../components/Dialog";
import { Image, PhotoAlbum } from "@mui/icons-material";
import AddImage from "../components/AddImage";

const Product_attributes_valuesIndex = () => {
  const { t } = useTranslation("index");
  const params = useParams();
  const { data, page, setPage, isLoading, count } =
    useProduct_attributes_values(params.id);

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);
  const [id, setID] = useState();
  const [open, setOpen] = useState();

  const columns = useMemo(() => {
    return [
      t("value arabic"),
      t("value turkish"),
      t("value France"),
      t("image"),
      t("operations"),
    ];
  }, [t]);

  // const handleView = useCallback(
  //   (id) => {
  //     navigate("view/" + id);
  //   },
  //   [navigate]
  // );
  const handleEdit = useCallback(
    (id) => {
      setEditedID(id);
    },
    [setEditedID]
  );
  const handleAddImages = useCallback((id) => {
    setID(id);
    setOpen(true);
  }, []);
  const rows = useMemo(() => {
    return data?.data?.product_attributes_values?.map(
      (product_attributes_values, id) => (
        <TableRow
          sx={{ height: "65px" }}
          key={product_attributes_values.id}
          hover
        >
          <TableCell sx={{ minWidth: 50 }}>
            {product_attributes_values?.translations[0]?.value ?? "Null"}
          </TableCell>
          <TableCell sx={{ minWidth: 50 }}>
            {product_attributes_values?.translations[1]?.value ?? "Null"}
          </TableCell>
          <TableCell sx={{ minWidth: 50 }}>
            {product_attributes_values?.translations[1]?.value ?? "Null"}
          </TableCell>
          <TableCell sx={{ minWidth: 50 }}>
          <img src={product_attributes_values?.image ?? "Null"} alt="" style={{width:'50px'}}/>
           
          </TableCell>
          {/* <TableCell sx={{ minWidth: 120 }} align="center">
            <ChangeStatus
              id={product_attributes_values.id}
              action={
                product_attributes_values.status === "active" && "change-status"
              }
            >
              {product_attributes_values.status === "Active"
                ? t("Active")
                : t("Not Active")}
            </ChangeStatus>
          </TableCell> */}

          <TableCell
            align="center"
            sx={{
              minWidth: {md:200 ,xs:100},
            }}
          >
            <IconButton
              onClick={() => handleAddImages(product_attributes_values?.id)}
            >
              <Tooltip title={"اضافة صورة"}>
                <PhotoAlbum sx={{ color: "text.main" }} />
              </Tooltip>
            </IconButton>
            <IconButton
              onClick={() => handleEdit(product_attributes_values?.id)}
            >
              <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                <ModeTwoToneIcon sx={{ color: "text.main" }} />
              </Tooltip>
            </IconButton>
            <IconButton>
              <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
                <DeleteDialog
                  id={product_attributes_values?.id}
                  count={count}
                  page={page}
                />
              </Tooltip>
            </IconButton>
          </TableCell>
        </TableRow>
      )
    );
  }, [data, count, direction, handleEdit, page]);

  const handleCreate = () => navigate("create");

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <Product_attributes_valuesUpdate id={editedID} />}
      {id && <AddImage id={id} open={open} setOpen={setOpen} />}
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
            {t("values")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New values")}
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

export default Product_attributes_valuesIndex;
