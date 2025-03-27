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

const ColorSelector = ({ selectedColors, setSelectedColors, errors }) => {
  const [Colors, setColors] = useState([]);

  useEffect(() => {
    _axios.get("/product_options/value/1").then((res) => {
      setColors(res?.data?.data?.product_options_values || []);
    });
  }, []);

  return (
    <>
      {Colors.length > 0 ? (
        <FormControl fullWidth>
          <Box sx={{ margin: "0 0 8px 5px" }}>
            <Typography color="text.main">Color</Typography>
          </Box>
          <Select
            labelId="color-label"
            id="color"
            multiple
            value={selectedColors}
            onChange={(e) => setSelectedColors(e.target.value)}
            renderValue={(selected) =>
              selected
                .map(
                  (colorId) =>
                    Colors.find((color) => color.id === colorId)?.name
                )
                .join(", ")
            }
          >
            {Colors.map((color) => (
              <MenuItem key={color.id} value={color.id}>
                <Checkbox
                  size="small"
                  checked={selectedColors.includes(color.id)}
                />
                <ListItemText primary={color.name} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{errors?.color_id?.message}</FormHelperText>
        </FormControl>
      ) : (
        <Typography variant="body2" color="text.main">
          No colors available
        </Typography>
      )}
    </>
  );
};

export default ColorSelector;
