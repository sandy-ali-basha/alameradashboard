import React, { useMemo } from "react";
import {
  Typography,
  Box,
  Button,
  // TextField,
  Chip,
  Checkbox,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import Loader from "components/shared/Loader";
import ProductUpdate from "./ProductUpdate";
import DeleteDialog from "../components/Dialog";
import AddImages from "./AddImages";
import ProductAttr from "./ProductAttr";
import AddImagesSlider from "./AddImagesSlider";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ChangeStatus from "../components/ChangeStatus";
import ProductMenu from "../components/productMenu";
import { useProductIndex } from "../hooks/useProductsIndex";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteSweep } from "@mui/icons-material";
import { BoxStyled } from "components/styled/BoxStyled";
import UpdateRegionPrice from "./UpdateRegionPrice";
import { useMediaQuery } from "@mui/material";
import ProductColors from "./product variants/ProductColors";

const ProductIndex = () => {
  const {
    handleDelete,
    handleImagesSlider,
    handleCat,
    handleCreate,
    OpenDelete,
    open,
    openAttr,
    openImagesSlider,
    product_attr,
    handleView,
    handleEdit,
    handleAddImages,
    isLoading,
    id,
    editedID,
    // setCityFilter,
    // setBrandFilter,
    navigate,
    setOpen,
    setOpenImagesSlider,
    handleUpdatePrice,
    setOpenDelete,
    setOpenAttr,
    filteredData,
    t,
    selectedRowIds,
    handleSelectChange,
    BulkDelete,
    loading,
    updatePrice,
    setUpdatePrice,
    productName,
    handleUpdateColors,
    openVariants,
    setOpenVariants,
    updateAll
  } = useProductIndex();

  const rows = useMemo(() => {
    return filteredData.map((product) => ({
      select: product.id,
      id: product.id,
      name: product.name ?? "Null",
      brand: product.brand?.name ?? "Null",
      sku: product.sku ?? "Null",
      price: product.price ?? "Null",
      comparePrice:
        product.compare_price > 0 ? product.compare_price : "no sale",
      quantity: product.quantity ?? "Null",
      // city: product.cities?.state[0]?.name ?? "Null",
      status: product.status,
      purchasable: product.purchasable,
      // region: product.region_name,
      actions: product,
    }));
  }, [filteredData]); // Dependency array
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  // Define columns for the DataGrid

  const gridColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "select",
      headerName: "",
      width: "50",
      renderCell: (params) => (
        <Checkbox
          checked={selectedRowIds.includes(params.row.id)}
          onChange={(e) => handleSelectChange(e, params.row.id)}
        />
      ),
    },
    {
      field: "name",
      headerName: "Product Name",
      width: 250,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
    },
    {
      field: "sku",
      headerName: "SKU",
      width: 70,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "comparePrice",
      headerName: "Compare Price",
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            color: "text.main",
            backgroundColor: params.value !== 'no sale' ? "primary.lighter" : "",
          }}
        />
      ),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
    },
    // {
    //   field: "city",
    //   headerName: "City",
    //   width: 100,
    // },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <ChangeStatus
          id={params.row.id}
          action={params.row.status === "active" && "change-status"}
        >
          {params.row.status}
        </ChangeStatus>
      ),
    },
    // {
    //   field: "purchasable",
    //   headerName: "purchasable",
    //   width: 100,
    //   renderCell: (params) => (
    //     <ChangeStatusPurshasable
    //       id={params.row.id}
    //       currentStatus={params.row.purchasable}
    //     >
    //       {params.row.purchasable}
    //     </ChangeStatusPurshasable>
    //   ),
    // },
    // {
    //   field: "region",
    //   headerName: "region",
    //   width: 100,
    // },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <ProductMenu
          product={params.value}
          count={params.value ? params.value.length : 0}
          page={1}
          handleEdit={handleEdit}
          handleView={handleView}
          handleAddImages={handleAddImages}
          handleImagesSlider={handleImagesSlider}
          handleUpdateColors={handleUpdateColors}
          handleUpdatePrice={params.row.region ? handleUpdatePrice : false}
          handleDelete={handleDelete}
          handleCat={handleCat}
          navigate={navigate}
        />
      ),
    },
  ];

  return isLoading ? (
    <Loader />
  ) : (
    <Box>
      {editedID && <ProductUpdate id={editedID} />}
      {id && <AddImages id={id} open={open} setOpen={setOpen} />}
      {id && (
        <AddImagesSlider
          id={id}
          open={openImagesSlider}
          setOpen={setOpenImagesSlider}
        />
      )}
      {id && <DeleteDialog id={id} open={OpenDelete} setOpen={setOpenDelete} />}
      {id && <ProductColors  id={id} open={openVariants} setOpen={setOpenVariants} />}
      {id && (
        <ProductAttr
          id={id}
          open={openAttr}
          setOpen={setOpenAttr}
          attr={product_attr}
        />
      )}

      {id && (
        <UpdateRegionPrice
          id={id}
          productName={productName}
          open={updatePrice}
          setOpen={setUpdatePrice}
        />
      )}

      <BoxStyled
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
          width: isSmallScreen ? "95vw" : `calc(100% - 40px)`,
        }}
      >
        <Typography variant="h5" sx={{ color: "text.main" }}>
          {t("products")}
        </Typography>

        <Box>
          {selectedRowIds.length > 0 && (
            <Tooltip title="Delete selected products">
              <IconButton
                variant="contained"
                color="secondary"
                onClick={() => BulkDelete()}
                disabled={loading}
              >
                {loading ? <CircularProgress /> : <DeleteSweep />}
              </IconButton>
            </Tooltip>
          )}
          <Button
            startIcon={<AddRoundedIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New product")}
          </Button>
        </Box>
      </BoxStyled>

      <BoxStyled
        sx={{
          display: "flex",
          flexGrow: 1,
          width: isSmallScreen ? "95vw" : `calc(100% - 40px)`,
          overflow: "scroll",
          scrollbarWidth: "none",
          py: 0,
          border: "none",
          borderRadius: 3,
        }}
      >
        <DataGrid
          sx={{
            "&.MuiDataGrid-root": {
              backgroundColor: "card.main", // Match body background
              color: "text.main",
              border: "none",
              "--DataGrid-containerBackground": "card.main",
              "--DataGrid-pinnedBackground": "card.main",
              "--unstable_DataGrid-overlayBackground": "card.main",
              minWidth: "800px",
            },
          }}
          autoHeight
          rows={rows}
          columns={gridColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
        />
      </BoxStyled>
    </Box>
  );
};

export default ProductIndex;
