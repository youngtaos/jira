import { Button, Input } from "antd";
import { TaskTypeSelect } from "components/taskTypeSelect";
import { UserSelect } from "components/UserSelect";
import React from "react";
import { useSetUrlSearchParam } from "utils/url";
import { useTaskSearchParams } from "./util";
import styles from "./styles.module.scss";

export const SearchPanel = () => {
  const searchParams = useTaskSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };
  return (
    <div className={styles.panelContainer}>
      <div>
        <Input
          style={{ width: "20rem" }}
          placeholder="任务名"
          value={searchParams.name}
          onChange={(e) => setSearchParams({ name: e.target.value })}
        />
        <UserSelect
          defaultOptionName="经办人"
          value={searchParams.processorId}
          onChange={(value) => {
            setSearchParams({ processorId: value });
            console.log(value);
          }}
        />
        <TaskTypeSelect
          defaultOptionName="类型"
          value={searchParams.typeId}
          onChange={(value) => setSearchParams({ typeId: value })}
        />
      </div>
      <Button onClick={reset}>清除筛选器</Button>
    </div>
  );
};
