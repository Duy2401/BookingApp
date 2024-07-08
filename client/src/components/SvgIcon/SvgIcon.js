import React from "react";

const SvgIcon = ({
  icon: Icon,
  width,
  height,
  fill = "currentColor",
  ...props
}) => <Icon width={width} height={height} fill={fill} {...props} />;

export default SvgIcon;
