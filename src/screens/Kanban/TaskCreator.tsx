import { Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useAddTask } from "utils/kanban";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";

export const TaskCreator = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const projectId = useProjectIdInUrl();
  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    setInputMode(false);
    setName("");
  };
  const toggle = () => setInputMode(true);
  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  });
  if (!inputMode)
    return (
      <span
        onClick={toggle}
        style={{
          background: "#0A4BAB",
          padding: "5px",
          borderRadius: ".25rem",
          color: "white",
          marginTop: "1rem",
          display: "inline-block",
          cursor: "pointer",
          fontSize: 14,
          float: "right",
        }}
      >
        +新建任务
      </span>
    );
  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={"需要做些什么"}
        onPressEnter={submit}
        autoFocus={true}
        onChange={(e) => setName(e.target.value)}
      />
    </Card>
  );
};
