import React, { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Box, Chip, Dialog, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { _Product } from "api/product/product";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import ColorSelector from "../components/select/ColorSelector";
import { ColorLensOutlined } from "@mui/icons-material";
import SizeSelector from "../components/select/SizeSelector";

const ProductColors = ({ id, open, setOpen, OldVariant, notDialog }) => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);

  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [alert, setALert] = useState([]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  async function handleUpdate() {
    const data = {
      options: [
        {
          size: selectedSizes,
          color: selectedValue,
        },
      ],
    };
    _Product
      .variant({
        editedID: id,
        formData: data,
      })
      .catch((err) => {
        setLoading(false);
        setALert("failed to add colors");
      })
      .then((res) => {
        if (res?.code === 200) setOpen(false);
        setLoading(false);
      });
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "text.main" }}>
          {t("Products Colors And Sizes")}
        </DialogTitle>
        <Box sx={{ width: "50%", margin: "auto" }}>
          <ColorLensOutlined sx={{ color: "primary.light", size: "2rem" }} />
        </Box>
        <Grid container component="form" key={id}>
          <Grid item xs={12} sx={{ p: 1 }}>
            {OldVariant && (
              <Typography variant="body1">Current Variants</Typography>
            )}
            {OldVariant?.map((val, idx) => (
              <Chip
                variant="outlined"
                sx={{ m: 1 }}
                label={val?.name}
                key={idx}
              />
            ))}
            <ColorSelector
              selectedColors={selectedValue}
              setSelectedColors={setSelectedValue}
            />
            <SizeSelector
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
            />
          </Grid>
        </Grid>

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "text.main" }}>
            {t("Cancel")}
          </Button>
          {loading && <Loader />}

          <ButtonLoader
            name={t("Submit")}
            onClick={() => handleUpdate()}
            type="save"
            loading={loading}
            disableOnLoading
          >
            {t("Submit")}
          </ButtonLoader>
          {alert.length > 0 &&
            alert.map((item, idx) => (
              <Alert sx={{ mt: 1 }} key={idx} severity="info">
                {item}
              </Alert>
            ))}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductColors;
