import React from "react";
import { Link } from "react-router-dom";
const Button = ({
  to,
  href,
  leftIcon,
  rightIcon,
  children,
  onClick,
  ...props
}) => {
  let Comp = "button";
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  return (
    <Comp type="button" onClick={onClick} {...props}>
      {leftIcon && <>{leftIcon}</>}
      <span className="px-2">{children}</span>
      {rightIcon && <>{rightIcon}</>}
    </Comp>
  );
};

export default Button;
