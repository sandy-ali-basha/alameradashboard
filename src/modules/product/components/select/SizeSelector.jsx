import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Box,
  FormHelperText,
} from "@mui/material";
import { _axios } from "interceptor/http-config";

const SizeSelector = ({ selectedSizes, setSelectedSizes, errors }) => {
  const [Sizes, setSizes] = useState([]);

  useEffect(() => {
    _axios.get("product_options/value/2").then((res) => {
        console.log("product_options_values",res)
      setSizes(res?.data?.data?.product_options_values || []);
    });
  }, []);

  return (
    <>
      {Sizes.length > 0 ? (
        <FormControl fullWidth>
          <Box sx={{ margin: "0 0 8px 5px" }}>
            <Typography color="text.main">Size</Typography>
          </Box>
          <Select
            labelId="size-label"
            id="size"
            multiple
            value={selectedSizes}
            onChange={(e) => setSelectedSizes(e.target.value)}
            renderValue={(selected) =>
              selected
                .map((sizeId) => Sizes.find((size) => size.id === sizeId)?.name)
                .join(", ")
            }
          >
            {Sizes.map((size) => (
              <MenuItem color="text.main" key={size.id} value={size.id}>
                <Checkbox color="text.main" size="small" checked={selectedSizes.includes(size.id)} />
                <ListItemText color="text.main" primary={size.name} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{errors?.size_id?.message}</FormHelperText>
        </FormControl>
      ) : (
        <Typography variant="body2" color="text.main">No sizes available</Typography>
      )}
    </>
  );
};

export default SizeSelector;
