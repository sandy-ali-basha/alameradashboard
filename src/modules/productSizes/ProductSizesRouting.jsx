
import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductSizesComponent from "./ProductSizesComponent";
import ProductSizesIndex from "./pages/ProductSizesIndex";
import ProductSizesCreate from "./pages/ProductSizesCreate";

const ProductSizesRouting = () => {
  return (
    <Routes>
      <Route element={<ProductSizesComponent />}>
        <Route path="/" element={<ProductSizesIndex />} />
        <Route path="/create" element={<ProductSizesCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default ProductSizesRouting;
