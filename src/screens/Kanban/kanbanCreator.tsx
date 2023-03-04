import { Input } from "antd";
import React, { useState } from "react";
import { useAddKanban } from "utils/kanban";
import styles from "./styles.module.scss";
import { useKanbansQueryKey, useProjectIdInUrl } from "./util";

export const KanbanCreator = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const queryKey = useKanbansQueryKey();
  const { mutateAsync: addKanban } = useAddKanban(queryKey);
  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };
  return (
    <div className={styles.kanbanItem}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onPressEnter={submit}
        placeholder={"新建看板"}
      />
    </div>
  );
};
