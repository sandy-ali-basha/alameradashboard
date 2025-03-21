import { Typography, Box, Button, Grid } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import React from "react";
import Loader from "components/shared/Loader";
import ButtonAction from "components/shared/ButtonAction";
import { useBrandCreate } from "../hooks/useBrandCreate";
import ButtonLoader from "components/shared/ButtonLoader";
const BrandCreate = () => {
  const {
    handleCancel,
    hanldeCreate,
    register,
    handleSubmit,
    handleReset,
    loading,
    t,
    errors,
    details,
  } = useBrandCreate();

  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: 1 }} variant="h5">
        {t("Create Brand}")}
      </Typography>
      <BoxStyled sx={{ px: 2 }}>
        <Box component="form">
          <Grid container spacing={2}>
            {/* * //details */}
            <Grid item md={12} xs={12} sx={{ p: 1 }}>
              <Typography
                sx={{ margin: "0 0 8px 8px" }}
                color="text.main"
                variant="body2"
              >
                turkish name
              </Typography>

              <TextFieldStyled
                sx={{ width: "100%" }}
                type={"text"}
                placeholder={"turkish Name"}
                defaultValue=""
                {...register("tr.name")}
                error={errors?.tr?.name}
                helperText={errors?.tr?.name?.message || ""}
              />
            </Grid>
            <Grid item md={12} xs={12} sx={{ p: 1 }}>
              <Typography
                sx={{ margin: "0 0 8px 8px" }}
                color="text.main"
                variant="body2"
              >
                Arabic name
              </Typography>
              <TextFieldStyled
                sx={{ width: "100%" }}
                type={"text"}
                placeholder={"Arabic Name"}
                defaultValue=""
                {...register("ar.name")}
                error={errors?.ar?.name}
                helperText={errors?.ar?.name?.message || ""}
              />
            </Grid>
            <Grid item md={12} xs={12} sx={{ p: 1 }}>
              <Typography
                sx={{ margin: "0 0 8px 8px" }}
                color="text.main"
                variant="body2"
              >
                France name
              </Typography>
              <TextFieldStyled
                sx={{ width: "100%" }}
                type={"text"}
                placeholder={"France Name"}
                defaultValue=""
                {...register("fr.name")}
                error={errors?.en?.name}
                helperText={errors?.en?.name?.message || ""}
              />
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            mt: "20px",
            display: "flex",
            justifyContent: "flex-end",
            columnGap: "15px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "120px",
              borderColor: "origin.main",
              color: "text.main",
              "&:hover": {
                borderColor: "origin.main",
              },
            }}
            onClick={handleCancel}
          >
            {t("Cancel")}
          </Button>
          <ButtonAction name={t("Reset")} onClick={handleReset} type="reset" />
          <ButtonLoader
            name={t("Submit")}
            onClick={() => handleSubmit(hanldeCreate)()}
            type="submit"
            loading={loading}
            disableOnLoading
          >
            {t("Submit")}
          </ButtonLoader>
        </Box>
      </BoxStyled>
    </Box>
  );
};

export default BrandCreate;
