import { IdSelect } from "components/IdSelect";
import React from "react";
import { useTasks } from "utils/task";
import { useTaskIcon } from "utils/taskIcon";
import { useUser } from "utils/user";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: taskstype } = useTaskIcon();
  return <IdSelect options={taskstype || []} {...props}></IdSelect>;
};
