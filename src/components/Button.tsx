import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  title: string;
  onPress: () => void;
  bold?: boolean;
  fontSize?: number;
  round?: boolean;
};

export default function Button({ title, onPress, bold = true, fontSize, round = false }: ButtonProps) {
  // Combine class names conditionally
  const textStyle = bold ? styles.bold : styles.normal;
  const roundedStyle = round ? styles.rounded : "";

  return (
    <button
      className={`${styles.button} ${roundedStyle}`}
      onClick={onPress}
      style={{ fontSize: fontSize ? `${fontSize}px` : "inherit" }}
    >
      {title}
    </button>
  );
}
