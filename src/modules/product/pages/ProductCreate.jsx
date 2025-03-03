import React, { useState } from "react";
import { Grid, Button, Stepper, Step, StepLabel, Box } from "@mui/material";
import CreateProductDetails from "../components/CreateProductDetails";
import AddImages from "./AddImages";
import AddImagesSlider from "./AddImagesSlider";
import ProductAttr from "./ProductAttr";
import ProductFeatures from "./ProductFeatures";
import ProductdetailsCreate from "../ProductDetails/pages/ProductdetailsCreate";

const steps = [
  "Create Product Details",
  "Upload Images",
  "Add Attributes",
  "Add Features",
  "Finalize Product",
];

const ProductCreate = () => {
  const [newProductId, setNewProductId] = useState();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CreateProductDetails setNewProductId={setNewProductId} />
      </Grid>
      {/* <Grid item xs={12}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>

      <Grid item xs={12}>
        {activeStep === 0 && (
          <CreateProductDetails setNewProductId={setNewProductId} />
        )}

        {activeStep === 1 && <ProductAttr id={newProductId} notDialog={true} />}
        {activeStep === 2 && <AddImages id={newProductId} notDialog={true} />}
        {activeStep === 3 && (
          <AddImagesSlider id={newProductId} notDialog={true} />
        )}
        {activeStep === 4 && <ProductFeatures id={newProductId} />}
        {activeStep === 5 && (
          <ProductdetailsCreate id={newProductId} isCreateProduct={true} />
        )}
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={
              newProductId ? activeStep === steps.length : true
            }
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Grid> */}
    </Grid>
  );
};

export default ProductCreate;
