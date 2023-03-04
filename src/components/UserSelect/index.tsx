import { IdSelect } from "components/IdSelect";
import React from "react";
import { useUser } from "utils/user";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUser();
  return <IdSelect options={users || []} {...props}></IdSelect>;
};
