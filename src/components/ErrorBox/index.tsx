import { Typography } from "antd";
import React from "react";

//类型守卫
const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type="danger">{error?.message}</Typography.Text>;
  } else {
    return null;
  }
};
