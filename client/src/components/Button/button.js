import React from "react";
import { Link } from "react-router-dom";
import SvgIcon from "../SvgIcon/SvgIcon";
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
      <div className="px-2 inline">{children}</div>
      {rightIcon && <>{rightIcon}</>}
    </Comp>
  );
};

export default Button;
