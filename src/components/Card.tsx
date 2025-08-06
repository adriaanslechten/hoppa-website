// components/Card.js
import React from "react";
import styles from "./Card.module.css";
import HalfButton from "./HalfButton"; // Ensure this points to where HalfButton is located
import { SpacerVertical } from "./Spacer";

export type CardProps = {
  title: string;
  description: string;
  onButtonClick?: () => void;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, description, onButtonClick, onClick, children }) => {
  return (
    <div className={styles.card} onClick={onClick} style={{ cursor: "pointer" }}>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
      {onButtonClick && (
        <>
          <SpacerVertical size="small" />
          <HalfButton title="Learn More" onPress={onButtonClick} bold={true} round={true} />
        </>
      )}
    </div>
  );
};

export default Card;
