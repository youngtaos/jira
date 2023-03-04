import React from "react";
import { Kanban } from "types";
import { useTasks } from "utils/task";
import { useTaskIcon } from "utils/taskIcon";
import styles from "./styles.module.scss";
import { useTaskModal, useTaskSearchParams } from "./util";
import { CheckSquareFilled, MinusSquareFilled } from "@ant-design/icons";
import { Card, Row } from "antd";
import { TaskCreator } from "./TaskCreator";
import { TaskModal } from "./TaskModal";
import { Mark } from "./Mark";
import { More } from "./More";
import { Drag, Drop, DropChild } from "components/DragAndDrop";

const TaskIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskIcon();
  const name = taskTypes?.find((taskTypes) => taskTypes.id === id)?.name;
  if (!name) {
    return null;
  }
  return name === "task" ? (
    <CheckSquareFilled style={{ color: "green" }} />
  ) : (
    <MinusSquareFilled style={{ color: "red" }} />
  );
};

export const KanbanItem = React.forwardRef<HTMLDivElement, { kanban: Kanban }>(
  ({ kanban, ...props }, ref) => {
    const { data: allTasks } = useTasks(useTaskSearchParams());
    const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
    const { name: keyword } = useTaskSearchParams();
    const { startEdit } = useTaskModal();
    return (
      <div className={styles.kanbanItem} {...props} ref={ref}>
        <Row
          align={"stretch"}
          justify={"space-between"}
          style={{ paddingRight: "1rem" }}
        >
          <h3>{kanban.name}</h3>
          <More kanban={kanban} />
        </Row>

        <div className={styles.taskContainer}>
          <Drop
            type={"ROW"}
            direction={"vertical"}
            droppableId={String(kanban.id)}
          >
            <DropChild>
              {tasks?.map((task, index) => {
                return (
                  <Drag
                    key={task.id}
                    index={index}
                    draggableId={"task" + task.id}
                  >
                    <div>
                      <Card
                        key={task.id}
                        style={{ marginBottom: ".5rem", cursor: "pointer" }}
                        onClick={() => {
                          startEdit(task.id);
                        }}
                      >
                        <Mark name={task.name} keyword={keyword}></Mark>
                        <div>
                          <TaskIcon id={task.typeId} />
                        </div>
                      </Card>
                    </div>
                  </Drag>
                );
              })}
            </DropChild>
          </Drop>
          <TaskCreator kanbanId={kanban.id} />
        </div>
        <TaskModal />
      </div>
    );
  }
);
