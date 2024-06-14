import React from "react";

const Button = ({ leftIcon, rightIcon, children, onClick, ...props }) => {
  return (
    <button type="button" onClick={onClick} {...props}>
      {leftIcon && <>{leftIcon}</>}
      <span className="px-2">{children}</span>
      {rightIcon && <>{rightIcon}</>}
    </button>
  );
};

export default Button;
