
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
import { _Orders } from "api/orders/orders";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
const schema = yup.object().shape({
  tr: yup.object().shape({
    name: yup.string().required("Turkish name is required"),
  }),
  ar: yup.object().shape({
    name: yup.string().required("Arabic name is required"),
  }),
  fr: yup.object().shape({
    name: yup.string().required("France name is required"),
  }),
});

const OrdersUpdate = ({ id }) => {
  const { t } = useTranslation("index");
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    _axios.get('/orders/'+ editedID).then((res) => {
      // setData(res.data?.orders);
        setData(res.data?.data);
    });
  }, [id,editedID]);
  const languages = [
  { code: "ar", name: "Arabic" },
    { code: "tr", name: "Turkish" },
    { code: "fr", name: "France" },
  ];

  const details = languages.map((lang, index) => ({
    head: t("name"+ lang.name.toLowerCase()),
    type: "text",
    placeholder: t("name"),
    register: lang.code+".name",
    defaultValue: data?.translations[index]?.name,
  }));
  
  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const { mutate } = useMutation((data) => createPost(data))

  async function createPost(data) {
    _Orders.update({
      editedID: editedID,
      formData: data,
    }).catch(err => {
      setLoading(false)
    }).then(() => {
      setLoading(false)
      // handleClose()
    })
  }

  const hanldeUpdate = (input) => {
    mutate(input);
    setLoading(true);
  }

  return (
    <>
      {loading && <Loader />}
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle sx={{ color: "text.main" }}>{t("Edit Row")}</DialogTitle>
        {!!data && (
          <>
            <Grid container component="form" key={id}>
              {details?.map((item, index) => {
                const error = errors?.[item.register.split(".")[0]]?.name;
                return (
                  <Grid key={index} item md={6} xs={12} sx={{ p: 1 }}>
                    <Box sx={{ margin: "0 0 8px 5px" }}>
                      <Typography  variant="body1" color="text.main">{item.head}</Typography>
                    </Box>
                    <TextFieldStyled
                      sx={{ width: "100%" }}
                      type={item.type}
                      placeholder={item.placeholder}
                      defaultValue={item.defaultValue}
                      name={item.register}
                      {...register(item.register)}
                      error={!!error}
                      helperText={error?.message || ""}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "text.main" }}>
            {t("Cancel")}
          </Button>
          {loading && <Loader />}

          <ButtonLoader name={t("Submit")}
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

export default OrdersUpdate;

