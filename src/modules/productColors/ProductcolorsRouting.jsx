
import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductcolorsComponent from "./ProductcolorsComponent";
import ProductcolorsIndex from "./pages/ProductcolorsIndex";
import ProductcolorsCreate from "./pages/ProductcolorsCreate";

const ProductcolorsRouting = () => {
  return (
    <Routes>
      <Route element={<ProductcolorsComponent />}>
        <Route path="/" element={<ProductcolorsIndex />} />
        <Route path="/create" element={<ProductcolorsCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default ProductcolorsRouting;
