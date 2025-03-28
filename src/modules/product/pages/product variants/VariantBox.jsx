import { useState } from "react";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { _axios } from "interceptor/http-config";

const VariantBox = ({ variant, onDelete, lastOne }) => {
  const [hover, setHover] = useState(false);

  const handleDelete = async () => {
    try {
      await _axios.delete(`/product/variants/${variant.id}`).then((res) => {
        if (res.data.code === 200) {
          onDelete(); // Call parent function to remove from UI
        }
      });
    } catch (error) {
      console.error("Failed to delete variant:", error);
    }
  };

  return (
    <Box
      sx={{
        border: 1,
        color: "text.main",
        borderRadius: 2,
        p: 1,
        position: "relative",
        mx: 1,
        "&:hover .delete-btn": { display: "flex" }, // Show button on hover
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Delete Button (Hidden by Default, Shown on Hover) */}
      {!lastOne && (
        <IconButton
          className="delete-btn"
          onClick={handleDelete}
          sx={{
            display: hover ? "flex" : "none", // Control visibility
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgba(255,255,255,0.8)", // Semi-transparent background
            "&:hover": { bgcolor: "rgba(255,255,255,1)" },
          }}
        >
          <Delete sx={{ color: "red" }} />
        </IconButton>
      )}
      {/* Variant SKU */}
      <Typography variant="body1" sx={{ mb: 1 }}>
        {variant.sku}
      </Typography>

      {/* Variant Options */}
      {variant.options?.map((option, optionIdx) => (
        <Chip
          key={`${variant.id}-${optionIdx}`}
          sx={{ color: "text.main", mr: 1 }}
          label={option}
          color="primary"
          variant="outlined"
        />
      ))}
    </Box>
  );
};

export default VariantBox;
