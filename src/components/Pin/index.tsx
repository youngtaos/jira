import React from "react";
import { Rate } from "antd";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Pin = ({ checked, onCheckedChange, ...rest }: PinProps) => {
  //!!num写法就是表示num本身，只不过强制转换成了Boolean类型
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...rest}
    ></Rate>
  );
};
