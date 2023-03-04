import { Button, Dropdown, MenuProps, Modal, Space } from "antd";
import React from "react";
import { Kanban } from "types";
import { useDeleteKanban } from "utils/kanban";
import { useKanbansQueryKey } from "./util";

export const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: deletekanban } = useDeleteKanban(useKanbansQueryKey());
  const startDelete = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      content: "确定删除吗",
      async onOk() {
        await deletekanban({ id: kanban.id });
      },
    });
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button type={"link"} onClick={startDelete}>
          删除
        </Button>
      ),
    },
  ];
  return (
    <>
      <Dropdown menu={{ items }}>
        <a>
          <Space>……</Space>
        </a>
      </Dropdown>
    </>
  );
};
