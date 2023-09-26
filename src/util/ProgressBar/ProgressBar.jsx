import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ value }) => {
  if (value > 100) {
    value = 100;
  }

  if (value < 0) {
    value = 0;
  }

  return (
    <div className="progress-bar">
      <div className="fill" style={{ width: value + "%" }}></div>
    </div>
  );
};

export default ProgressBar;
