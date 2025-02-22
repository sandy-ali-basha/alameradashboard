import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Careers } from "api/careers/careers";
import { _axios } from "interceptor/http-config";

const schema = yup.object().shape({
  category_id: yup.number().required("Category ID is required"),
  requisition_no: yup.string().required("Requisition number is required"),
  time_type: yup.string().required("time is required"),
  tr: yup.object().shape({
    vacancy_name: yup.string().required("Turkish vacancy name is required"),
    country: yup.string().required("Turkish country is required"),
    description: yup.string().required("Turkish description is required"),
    location: yup.string().required("Turkish location is required"),
    about_us: yup.string().required("Turkish about us is required"),
  }),
  ar: yup.object().shape({
    vacancy_name: yup.string().required("Arabic vacancy name is required"),
    country: yup.string().required("Arabic country is required"),
    description: yup.string().required("Arabic description is required"),
    location: yup.string().required("Arabic location is required"),
    about_us: yup.string().required("Arabic about us is required"),
  }),
  fr: yup.object().shape({
    vacancy_name: yup.string().required("France vacancy name is required"),
    country: yup.string().required("France country is required"),
    description: yup.string().required("France description is required"),
    location: yup.string().required("France location is required"),
    about_us: yup.string().required("France about us is required"),
  }),
});

export const useCareersCreate = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;
  console.log("errors", errors);
  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Careers
      .post(data, setLoading)
      .then((res) => {
        if (res.code === 200) navigate(-1);
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
  };
  const [careersCategoriesData, setCareersCategoriesData] = useState();

  useEffect(() => {
    _axios.get("/careers_categories").then((res) => {
      setCareersCategoriesData(res?.data?.data?.careers_categories);
    });
  }, []);
  const hanldeCreate = (input) => {
    mutate(input);
    setLoading(true);
  };
  const detailsAR = [
    {
      head: t("vacancy name"),
      type: "text",
      placeholder: t("vacancy name"),
      name: "vacancy_name",
      register: "vacancy_name",
      error: "vacancy_name",
      helperText: "vacancy_name",
    },
    {
      head: t("country"),
      type: "text",
      placeholder: t("country"),
      name: "country",
      register: "country",
      error: "country",
      helperText: "country",
    },
    {
      head: t("location"),
      type: "text",
      placeholder: t("location"),
      name: "location",
      register: "location",
      error: "location",
      helperText: "location",
    },
  ];
  const detailsEN = [
    {
      head: t("vacancy name"),
      type: "text",
      placeholder: t("vacancy name"),
      name: "vacancy_name",
      register: "vacancy_name",
      error: "vacancy_name",
      helperText: "vacancy_name",
    },
    {
      head: t("country"),
      type: "text",
      placeholder: t("country"),
      name: "country",
      register: "country",
      error: "country",
      helperText: "country",
    },

    {
      head: t("location"),
      type: "text",
      placeholder: t("location"),
      name: "location",
      register: "location",
      error: "location",
      helperText: "location",
    },
  ];
  const detailstr = [
    {
      head: t("vacancy name"),
      type: "text",
      placeholder: t("vacancy name"),
      name: "vacancy_name",
      register: "vacancy_name",
      error: "vacancy_name",
      helperText: "vacancy_name",
    },
    {
      head: t("country"),
      type: "text",
      placeholder: t("country"),
      name: "country",
      register: "country",
      error: "country",
      helperText: "country",
    },

    {
      head: t("location"),
      type: "text",
      placeholder: t("location"),
      name: "location",
      register: "location",
      error: "location",
      helperText: "location",
    },
  ];

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
    detailsAR,
    detailsEN,
    detailstr,
    careersCategoriesData,
  };
};
