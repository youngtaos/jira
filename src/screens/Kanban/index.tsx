import React, { useCallback } from "react";
import { useDocumentTitle } from "utils";
import { useKanbans, useReorderKanban } from "utils/kanban";
import { KanbanItem } from "./kanItem";
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTaskSearchParams,
  useTasksQueryKey,
} from "./util";
import styles from "./styles.module.scss";
import { SearchPanel } from "./shearchPanel";
import { useReorderTask, useTasks } from "utils/task";
import { Spin } from "antd";
import { KanbanCreator } from "./kanbanCreator";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/DragAndDrop";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: kanbans = [] } = useKanbans(useKanbanSearchParams());
  const { data: currentProject } = useProjectInUrl();
  const { isLoading: isLoading1 } = useKanbans();
  const { isLoading: isLoading2 } = useTasks();
  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.wrapper}>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />

        {isLoading1 || isLoading2 ? (
          <Spin />
        ) : (
          <div className={styles.kanbanContainer}>
            <Drop
              type={"COLUMN"}
              direction={"horizontal"}
              droppableId={"kanban"}
            >
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => {
                  return (
                    <Drag
                      key={kanban.id}
                      draggableId={"kanban" + kanban.id}
                      index={index}
                    >
                      <KanbanItem key={kanban.id} kanban={kanban}></KanbanItem>
                    </Drag>
                  );
                })}
              </DropChild>
            </Drop>
            <KanbanCreator />
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  const { data: allTasks = [] } = useTasks(useTaskSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );
};
