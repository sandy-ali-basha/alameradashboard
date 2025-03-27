import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Product } from "api/product/product";
import { _axios } from "interceptor/http-config";
import { useSettings } from "hooks/settings/useSettings";

// import { _Regions } from "api/regions/regions";

let schema = yup.object().shape({
  brand_id: yup.string().trim().required("brand is required"),
  product_type_id: yup.string().trim().required("product type is required"),
  status: yup.string().trim().required("status is required"),
  price: yup.number().required("price is required"),
  qty: yup.number().required("qty is required"),
  sku: yup.string().trim().required("sku is required"),
  tr: yup.object().shape({
    name: yup.string().required("Turkish name name is required"),
    description: yup.string().required("Turkish description is required"),
  }),
});

export const useProductCreate = ({ setNewProductId }) => {
  // const [cities, setCiteies] = useState([]);
  // const [regions, setRegions] = useState([]);

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [brands, setBrand] = useState(null);
  const [selectedRegion, setSelectedRegions] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [producttypes, setproducttypes] = useState(null);

  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const { data: point_price } = useSettings();

  const navigate = useNavigate();
  const formOptions = {
    resolver: yupResolver(schema),
    defaultValues: {
      points: 0, // Set the initial value for "points"
      product_type_id: 1,
    },
  };
  const { register, handleSubmit, formState, setValue, control, reset, watch } =
    useForm(formOptions);
  const { errors } = formState;
  const price = watch("price"); // Watch for changes in the "price" field

  useEffect(() => {
    // Update the "points" field whenever "price" or "point_price" changes
    if (price && point_price) {
      setValue(
        "points",
        Math.round(price / point_price?.data?.point_price?.value) // تقريب القيمة
      );
    } else {
      setValue("points", 0);
    }
  }, [price, point_price, setValue]);

  useEffect(() => {
    _axios.get("/brand").then((res) => {
      setLoading(false);
      setBrand(res?.data?.data?.brands);
    });
    _axios.get("/product_type").then((res) => {
      setLoading(false);
      setproducttypes(res?.data?.data?.producttypes);
    });
  }, [setValue, setproducttypes]);

  const details = [
    {
      head: t("name"),
      type: "text",
      placeholder: t("name"),
      name: "tr.name",
      register: "tr.name",
      error: "tr.name",
      helperText: "tr.name",
    },
  ];

  const generalDetails = [
    {
      head: t("price before sale"),
      type: "number",
      placeholder: "compare price",
      name: "compare_price",
      register: "compare_price",
      error: "compare_price",
      helperText: "compare_price",
    },
    {
      head: t("price"),
      type: "number",
      placeholder: "price",
      name: "price",
      register: "price",
      error: "price",
      helperText: "price",
    },
    {
      head: t("sku"),
      type: "text",
      placeholder: "sku",
      name: "sku",
      register: "sku",
      error: "sku",
      helperText: "sku",
    },
    {
      head: t("qty"),
      type: "number",
      placeholder: "qty",
      name: "qty",
      register: "qty",
      error: "qty",
      helperText: "qty",
    },
  ];
  const Discription = [
    {
      head: t("Description"),
      type: "text",
      placeholder: t("Description"),
      name: "tr.description",
      register: "tr.description",
      error: "tr.description",
      helperText: "tr.description",
    },
  ];

  const handleCancel = () => navigate(-1);

  const handleReset = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
    reset();
  };

  const hanldeCreate = (input) => {
      const productData = {
        ...input,
        city_id: 1, // Current city_id for each request
        description: input?.tr?.description || "",
        points: 0,
        options: [
          {
            size: selectedSizes,
            color: selectedColors,
          },
        ],
      };

      // Return the promise for this POST request
      return _Product
        .post(productData, setLoading)
        .then((res) => res.code === 200 && navigate(-1));
  };

  // useMemo(() => {
  //   _cities.index().then((response) => {
  //     if (response.code === 200) {
  //       setCiteies(response.data);
  //     }
  //   });
  //   _Regions.index().then((response) => {
  //     if (response.code === 200) {
  //       setRegions(response.data);
  //     }
  //   });
  // }, []);

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
    generalDetails,
    control,
    brands,
    producttypes,
    Discription,
    // cities,
    // regions,
    selectedCities,
    setSelectedCities,
    selectedRegion,
    setSelectedRegions,
    selectedSizes,
    setSelectedSizes,
    selectedColors,
    setSelectedColors,
  };
};
