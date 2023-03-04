import {
  Button,
  Dropdown,
  MenuProps,
  Modal,
  Space,
  Table,
  TableProps,
} from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/Pin";
import { useDeleteProject, useEditProject } from "utils/project";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { useState } from "react";
import { projectType } from "types";

interface user {
  name: string;
  id: number;
}

interface ListProps extends TableProps<projectType> {
  users: user[];
  refresh?: () => void;
}

const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey());
  const { open, startEdit } = useProjectModal();
  const [currentId, setCurrentId] = useState(0);
  const { mutate: deleteMutate } = useDeleteProject(useProjectsQueryKey());

  const confirmDeleteProject = (id: number) => {
    console.log("curid", currentId);
    Modal.confirm({
      title: "确定删除该项目吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteMutate({ id });
      },
    });
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button
          type={"link"}
          onClick={() => {
            startEdit(currentId);
          }}
        >
          编辑
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button
          type={"link"}
          onClick={() => {
            confirmDeleteProject(currentId);
          }}
        >
          删除
        </Button>
      ),
    },
  ];
  return (
    <Table
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={(pin) => {
                  mutate({ id: project.id, pin });
                }}
              ></Pin>
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span key={value}>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span key={value}>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "未知"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Dropdown menu={{ items }}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentId(project.id);
                  }}
                >
                  <Space>……</Space>
                </a>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
};

export default List;
