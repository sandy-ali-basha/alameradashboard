import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { _Product } from "api/product/product";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import ColorSelector from "../../components/select/ColorSelector";
import SizeSelector from "../../components/select/SizeSelector";
import { ColorLensOutlined, PlusOne } from "@mui/icons-material";
import { _axios } from "interceptor/http-config";
import VariantBox from "./VariantBox";

const ProductColors = ({ id, open, setOpen }) => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [alert, setAlert] = useState([]);
  const [variants, setVariants] = useState([]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSelectedValue([]);
    setSelectedSizes([]);
  }, [setOpen]);
  const fetchVariants = useCallback(async () => {
    try {
      const res = await _axios.get(`/product/variants/${id}`, {
        headers: { translations: "yes" },
      });
      setVariants(res.data?.data?.variants || []);
    } catch (error) {
      console.error("Failed to fetch variants:", error);
    }
  }, [id]); // ✅ `fetchVariants` is now stable

  async function handleUpdate() {
    setLoading(true);
    const data = {
      options: [
        {
          size: selectedSizes.length > 0 ? selectedSizes : [selectedSizes],
          color: selectedValue.length > 0 ? selectedValue : [selectedValue],
        },
      ],
    };

    try {
      const res = await _Product.variant({
        editedID: id,
        formData: data,
      });
      if (res?.code === 200) {
        fetchVariants();
      }
    } catch (err) {
      setAlert(["Failed to add colors"]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVariants();
  }, [fetchVariants, id]); // ✅ No infinite loop

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ color: "text.main" }}>
        {t("Products Colors And Sizes")}
      </DialogTitle>

      <Grid container component="form" key={id}>
        <Grid item xs={12} sx={{ p: 2 }}>
          {variants.length > 0 && (
            <Box>
              <Typography variant="body1" sx={{ mb: 1, color: "text.main" }}>
                {t("Current Variants")}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 2 }}>
                {variants.map((variant) => (
                  <VariantBox
                    key={variant.id}
                    variant={variant}
                    onDelete={fetchVariants}
                    lastOne={variants.length === 1}
                  />
                ))}
              </Box>
            </Box>
          )}
          <Grid container spacing={1}>
            <Grid item md="5" xs="12">
              <ColorSelector
                notMultible
                selectedColors={selectedValue}
                setSelectedColors={setSelectedValue}
              />
            </Grid>
            <Grid item md="5" xs="12">
              <SizeSelector
                notMultible
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
              />
            </Grid>
            <Grid
              item
              md="2"
              xs="12"
              sx={{
                display: "flex",
                alignItems: "end",
                justifyContent: "end",
                pb:1
              }}
            >
              <ButtonLoader
                name={t("Submit")}
                onClick={handleUpdate}
                type="save"
                loading={loading}
                disableOnLoading
                sx={{ m: "auto" }}
              >
                {t("Add")}
              </ButtonLoader>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "text.main" }}>
          {t("close")}
        </Button>

        {loading ? <Loader /> : null}

        {alert.length > 0 &&
          alert.map((item, idx) => (
            <Alert key={idx} severity="info" sx={{ mt: 1 }}>
              {item}
            </Alert>
          ))}
      </DialogActions>
    </Dialog>
  );
};

export default ProductColors;
