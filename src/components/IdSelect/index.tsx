import { Select } from "antd";
import React from "react";

type SelectType = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<
    SelectType,
    "value" | "onChange" | "defaultOptionName" | "options"
  > {
  value?: string | number | null | undefined;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

//value可以传入多种类型的值
//onChange只会回调number|undefined类型
//当isNaN(Number(value))为true时，代表选择默认类型
//当选择默认类型的时候，onChange会回调undefined

const toNumber = (value: unknown) => {
  return isNaN(Number(value)) ? 0 : Number(value);
};

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option value={option.id} key={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};
