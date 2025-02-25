import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardComponent from "./DashboardComponent";
import DashboardIndex from "./pages/DashboardIndex";
import AdminRouting from "modules/admin/AdminRouting";
import TermsRouting from "modules/Terms/TermsRouting";
import ProductRouting from "modules/product/ProductRouting";
import BrandRouting from "modules/brand/BrandRouting";
import Product_typeRouting from "modules/product_type/Product_typeRouting";
import Product_attributesRouting from "modules/product_attributes/Product_attributesRouting";
import NotFound from "components/NotFound";
import OrdersRouting from "modules/orders/OrdersRouting";
import DiscountsRouting from "modules/discounts/DiscountsRouting";
import HomeRouting from "modules/home/HomeRouting";
import CustomersRouting from "modules/customers/CustomersRouting";

const DashboardRouting = () => {
  return (
    <Routes>
      {
        <Route element={<DashboardComponent />}>
          <Route path="/" element={<DashboardIndex />} />
          <Route path="/admin/*" element={<AdminRouting />} />
          <Route path="/terms/*" element={<TermsRouting />} />
          <Route path="/product/*" element={<ProductRouting />} />
          <Route path="/customers/*" element={<CustomersRouting />} />
          <Route path="/brands/*" element={<BrandRouting />} />
          <Route path="/orders/*" element={<OrdersRouting />} />
          <Route path="/discounts/*" element={<DiscountsRouting />} />
          {/* // eslint-disable-next-line react/jsx-pascal-case */}
          <Route path="/product_type/*" element={<Product_typeRouting />} />

          <Route
            path="/products/categories/*"
            // eslint-disable-next-line react/jsx-pascal-case
            element={<Product_attributesRouting />}
          />
          <Route path="/home/*" element={<HomeRouting />} />
        </Route>
      }

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default DashboardRouting;
