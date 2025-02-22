import {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Brand_pages } from "api/brand_pages/brand_pages";

let schema = yup.object().shape({
  tr: yup.object().shape({
    name: yup.string().required("Turkish name is required"),
    text: yup.string().required("Turkish name is required"),
  }),
  ar: yup.object().shape({
    name: yup.string().required("Arabic name is required"),
    text: yup.string().required("Arabic Text is required"),
  }),
  fr: yup.object().shape({
    name: yup.string().required("France name is required"),
    text: yup.string().required("France Text is required"),
  }),
});

export const useBrand_pageCreate = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control, reset } =
    useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));
  const [details, setDetails] = useState([]);
  const [language, setLanguage] = useState("fr");

  async function createPost(data) {
    _Brand_pages
      .post(data, setLoading)
      .then((res) => {

        if (res?.code === 200) navigate(-1);
        setLoading(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleCancel = () => navigate(-1);

  const handleReset = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
    reset();
  };
  const params = useParams();
  const hanldeCreate = (input) => {
    const inputWithBrandId = { ...input, brand_id: params?.id };
    mutate(inputWithBrandId);
    setLoading(true);
  };

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
    control,
    language,
    setLanguage,
  };
};
