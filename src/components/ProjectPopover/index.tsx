import { Button, Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useProjectModal } from "screens/projecr-list/util";
import { useProject } from "utils/project";

export const ProjectPopover = () => {
  const { open } = useProjectModal();
  const { data, isLoading } = useProject();
  const pinProject = data?.filter((project) => project.pin);
  const content = () => {
    return (
      <div style={{ width: "30rem" }}>
        <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
        <List>
          {pinProject?.map((item) => (
            <List.Item key={item.id}>
              <h3 style={{ fontWeight: "bold" }}>{item.name}</h3>
            </List.Item>
          ))}
        </List>
        <Divider></Divider>
        <Button type={"link"} style={{ padding: 0 }} onClick={open}>
          创建项目
        </Button>
      </div>
    );
  };
  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};
