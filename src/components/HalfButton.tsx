// components/HalfButton.js
import React from "react";
import styles from "./HalfButton.module.css";

type ButtonProps = {
  title: string;
  onPress: () => void;
  bold?: boolean;
  fontSize?: number;
  round?: boolean;
};

export default function HalfButton({ title, onPress, bold = true, fontSize, round = false }: ButtonProps) {
  // Combine class names conditionally
  const textStyle = bold ? styles.bold : styles.normal;
  const roundedStyle = round ? styles.rounded : "";

  return (
    <button
      className={`${styles.button} ${textStyle} ${roundedStyle}`}
      onClick={onPress}
      style={{ fontSize: fontSize ? `${fontSize}px` : "inherit" }}
    >
      {title}
    </button>
  );
}
