import React from "react";

export type SpacerType = {
  height?: number;
  size?: "extraExtraLarge" | "extraLarge" | "large" | "medium" | "small" | "extraSmall" | "extraExtraSmall";
  width?: number;
};

export const SpacerVertical: React.FC<SpacerType> = ({ height, size, width }) => {
  const sizeValue =
    size === "extraExtraLarge"
      ? 90
      : size === "extraLarge"
      ? 70
      : size === "large"
      ? 50
      : size === "medium"
      ? 30
      : size === "small"
      ? 15
      : size === "extraSmall"
      ? 10
      : size === "extraExtraSmall"
      ? 5
      : height;

  const style = {
    height: sizeValue || 0, // Use 0 as a fallback if no height or size is specified
    width: width || "100%", // Default to full width if no specific width is given
    display: "block", // Ensure the div behaves as a block element
  };

  return <div style={style} />;
};
