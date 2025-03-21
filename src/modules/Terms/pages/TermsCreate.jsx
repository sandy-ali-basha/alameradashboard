import React from "react";
import {
  Typography,
  Box,
  Button,
  Grid,
  // FormControl,
  // FormLabel,
  // RadioGroup,
  // FormControlLabel,
  // Radio,
} from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import Loader from "components/shared/Loader";
// import ButtonAction from "components/shared/ButtonAction";
import { useTermsCreate } from "../hooks/useTermsCreate";
import ButtonLoader from "components/shared/ButtonLoader";
import EditorInput from "components/shared/EditorInput";

const TermsCreate = () => {
  const {
    handleCancel,
    hanldeCreate,
    register,
    handleSubmit,
    // handleReset,
    loading,
    t,
    errors,
    control,
    // details,
    setValue,
  } = useTermsCreate();

  // const [language, setLanguage] = useState(localStorage.getItem("i18nextLng"));

  // const handleLanguageChange = (event) => {
  //   const selectedLanguage = event.target.value;
  //   setLanguage(selectedLanguage);
  //   localStorage.setItem("i18nextLng", selectedLanguage);
  // };

  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: 1 }} variant="h5">
        {t("Create New Term")}
      </Typography>
      <BoxStyled sx={{ px: 2 }}>
        <Grid container component="form">
          <Grid item md={12} xs={12} sx={{ p: 1 }}>
            <Typography sx={{ margin: "0 0 8px 8px" }} variant="body1" color="text.secondary">
              name arabic
            </Typography>
            <TextFieldStyled
              sx={{ width: "100%" }}
              type={"text"}
              placeholder="name"
              defaultValue=""
              {...register(`ar.name`)}
              error={!!errors.ar?.name}
              helperText={errors.ar?.name?.message || ""}
            />
          </Grid>
          <Grid item xs={12} sx={{ p: 1 }}>
            <Box sx={{ margin: "0 0 8px 5px" }}>
              <Typography variant="body1" color="text.secondary" sx={{ color: "text.main" }}>
                {t("text arabic")}
              </Typography>
            </Box>
            <EditorInput
              control={control}
              register={register}
              name={"ar.text"}
              setValue={setValue}
              errors={errors?.ar?.text?.message}
            />
          </Grid>
          <Grid item md={12} xs={12} sx={{ p: 1 }}>
            <Typography sx={{ margin: "0 0 8px 8px" }} variant="body1" color="text.secondary">
              Name Turkish
            </Typography>
            <TextFieldStyled
              sx={{ width: "100%" }}
              type={"text"}
              placeholder="name"
              defaultValue=""
              {...register(`tr.name`)}
              error={!!errors.tr?.name}
              helperText={errors.tr?.name?.message || ""}
            />
          </Grid>
          <Grid item xs={12} sx={{ p: 1 }}>
            <Box sx={{ margin: "0 0 8px 5px" }}>
              <Typography variant="body1" color="text.secondary" sx={{ color: "text.main" }}>
                {t("text turkish")}
              </Typography>
            </Box>
            <EditorInput
              control={control}
              register={register}
              name={"tr.text"}
              setValue={setValue}
              errors={errors?.tr?.text?.message}
            />
          </Grid>
          <Grid item md={12} xs={12} sx={{ p: 1 }}>
            <Typography sx={{ margin: "0 0 8px 8px" }} variant="body1" color="text.secondary">
              Name France
            </Typography>
            <TextFieldStyled
              sx={{ width: "100%" }}
              type={"text"}
              placeholder="name"
              defaultValue=""
              {...register(`fr.name`)}
              error={!!errors.fr?.name}
              helperText={errors.fr?.name?.message || ""}
            />
          </Grid>
          <Grid item xs={12} sx={{ p: 1 }}>
            <Box sx={{ margin: "0 0 8px 5px" }}>
              <Typography variant="body1" color="text.secondary" sx={{ color: "text.main" }}>
                {t("text France")}
              </Typography>
            </Box>
            <EditorInput
              control={control}
              register={register}
              name={"fr.text"}
              setValue={setValue}
              errors={!!errors?.fr?.text}
            />
          </Grid>
        </Grid>
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

export default TermsCreate;
