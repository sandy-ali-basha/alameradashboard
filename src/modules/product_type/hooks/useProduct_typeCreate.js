
import { useEffect, useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Product_type } from "api/product_type/product_type";

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
export const useProduct_typeCreate = () => {
  const { t } = useTranslation("index")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } = useForm(formOptions)
  const { errors } = formState
  const { mutate } = useMutation((data) => createPost(data))

  async function createPost(data) {
    _Product_type
      .post(data, setLoading)
      .then(res => {
        if (res.code === 200) navigate(-1)
        setLoading(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleCancel = () => navigate(-1)

  const handleReset = () => {
    const form = document.querySelector('form');
    if (form) form.reset()
  }

  const hanldeCreate = (input) => {
    mutate(input);
    setLoading(true);
  }

  const languages = [
  { code: "ar", name: "Arabic" },
    { code: "tr", name: "Turkish" },
    { code: "fr", name: "France" },
  ];

  const details = languages.map((lang, index) => ({
    head: t(`name ${lang.name.toLowerCase()}`),
    type: "text",
    placeholder: t("name"),
    register: `${lang.code}.name`,
  }));

  return {
    handleCancel,
    handleReset,
    hanldeCreate,
    register,
    handleSubmit,
    setValue,
    loading,
    t,
    errors,
    details,
    control,
  };
};

