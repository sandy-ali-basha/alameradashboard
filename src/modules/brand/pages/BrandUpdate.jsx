import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";
import { colorStore } from "store/ColorsStore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import { TextFieldStyled } from "components/styled/TextField";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { _Brand } from "api/brand/brand";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
let schema = yup.object().shape({
  fr: yup.object().shape({
    name: yup.string().required("France name is required"),
  }),
});

const BrandUpdate = ({ id }) => {
  const { t } = useTranslation("index");
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState ,setValue} = useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    _axios
      .get("/brand/" + editedID, {
        headers: {
          translations: true,
        },
      })
      .then((res) => {
        setData(res.data?.data);
        const fetchedData = res.data?.data;
        setData(fetchedData);
        if (fetchedData) {
          setValue(
            "tr.name",
            fetchedData?.translations.find((t) => t.locale === "tr")?.name || ""
          );
          setValue(
            "ar.name",
            fetchedData?.translations.find((t) => t.locale === "ar")?.name || ""
          );
          setValue(
            "fr.name",
            fetchedData?.translations.find((t) => t.locale === "fr")?.name || ""
          );
        }
      });
  }, [id, editedID,setValue]);

  const details = [
    {
      head: t("arabic name"),
      type: "text",
      placeholder: t("ar.name"),
      name: "ar.name",
      register: "ar.name",
      error: "ar.name",
      helperText: "ar.name",
    },
    {
      head: t("France name"),
      type: "text",
      placeholder: t("fr.name"),
      name: "fr.name",
      register: "fr.name",
      error: "fr.name",
      helperText: "fr.name",
    },
    {
      head: t("turkish name"),
      type: "text",
      placeholder: t("tr.name"),
      name: "tr.name",
      register: "tr.name",
      error: "tr.name",
      helperText: "tr.name",
    },
  ];

  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Brand
      .update({
        editedID: editedID,
        formData: data,
      })
      .catch((err) => {
        setLoading(false);
      })
      .then((res) => {
        if (res.code === 200) {
          handleClose();
        }
        setLoading(false);
      });
  }

  const hanldeUpdate = (input) => {
    mutate(input);
    setLoading(true);
  };

  return (
    <>
      {loading && <Loader />}
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle sx={{ color: "primary.main" }}>
          {t("Edit Row")}
        </DialogTitle>
        {!!data && (
          <>
            <Grid container component="form" key={id}>
              {details?.map((item, index) => (
                <Grid key={index} item md={6} xs={12} sx={{ p: 1 }}>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography
                      sx={{ margin: "0 0 8px 8px" }}
                      color="text.main"
                      variant="body2"
                    >
                      {item.head}
                    </Typography>
                  </Box>
                  <TextFieldStyled
                    sx={{ width: "100%" }}
                    type={item.type}
                    placeholder={item.placeholder}
                    defaultValue={item.defaultValue}
                    name={item.name}
                    {...register(item.register)}
                    error={errors[item.error]?.message}
                    helperText={errors[item.helperText]?.message || ""}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "primary.main" }}>
            {t("Cancel")}
          </Button>
          {loading && <Loader />}

          <ButtonLoader
            name={t("Submit")}
            onClick={() => handleSubmit(hanldeUpdate)()}
            type="save"
            loading={loading}
            disableOnLoading
          >
            {t("Submit")}
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BrandUpdate;
