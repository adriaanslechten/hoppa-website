// components/Chip.js
import React from "react";
import styles from "./Chip.module.css"; // Make sure to create this CSS file

interface ChipProps {
  label: string;
  value: string | number;
}

const Chip: React.FC<ChipProps> = ({ label, value }) => {
  return (
    <div className={styles.chip}>
      {label}: {value}
    </div>
  );
};

export default Chip;
