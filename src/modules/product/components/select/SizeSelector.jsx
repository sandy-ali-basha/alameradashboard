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

const SizeSelector = ({
  selectedSizes,
  setSelectedSizes,
  errors,
  notMultible,
}) => {
  const [Sizes, setSizes] = useState([]);

  useEffect(() => {
    _axios.get("product_options/value/2").then((res) => {
      console.log("product_options_values", res);
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
            multiple={!notMultible} // Default is multiple, unless `notMultible` is true
            value={notMultible ? selectedSizes || "" : selectedSizes} // Handle single/multiple
            onChange={(e) =>
              setSelectedSizes(notMultible ? e.target.value : e.target.value)
            }
            renderValue={(selected) =>
              Array.isArray(selected)
                ? selected
                    .map(
                      (sizeId) => Sizes.find((size) => size.id === sizeId)?.name
                    )
                    .join(", ")
                : Sizes.find((size) => size.id === selected)?.name
            }
          >
            {Sizes.map((size) => (
              <MenuItem key={size.id} value={size.id}>
                {!notMultible && (
                  <Checkbox
                    size="small"
                    checked={selectedSizes.includes(size.id)}
                  />
                )}
                <ListItemText primary={size.name} />
              </MenuItem>
            ))}
          </Select>

          <FormHelperText error>{errors?.size_id?.message}</FormHelperText>
        </FormControl>
      ) : (
        <Typography variant="body2" color="text.main">
          No sizes available
        </Typography>
      )}
    </>
  );
};

export default SizeSelector;
