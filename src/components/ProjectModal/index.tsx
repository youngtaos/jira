import { Button, Drawer, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "components/ErrorBox";
import { UserSelect } from "components/UserSelect";

import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useProjectModal,
  useProjectsQueryKey,
} from "screens/projecr-list/util";
import { useAddProject, useEditProject } from "utils/project";

export const ProjectModal = () => {
  const {
    projectModalOpen,
    closeCreate,
    closeEdit,
    editingProject,
    editingProjectId,
  } = useProjectModal();
  const useMutateProject = editingProjectId ? useEditProject : useAddProject;
  const close = editingProjectId ? closeEdit : closeCreate;
  const queryKey = useProjectsQueryKey();
  const { mutateAsync, isLoading, error } = useMutateProject(queryKey);
  const title = editingProjectId ? "编辑项目" : "创建项目";
  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);
  return (
    <Drawer
      forceRender={true}
      width={"100%"}
      open={projectModalOpen}
      onClose={close}
    >
      <h1>{title}</h1>
      <ErrorBox error={error}></ErrorBox>
      <Form
        form={form}
        initialValues={{ name: "", organization: "", personId: "" }}
        layout={"vertical"}
        style={{ width: "40rem" }}
        onFinish={onFinish}
      >
        <Form.Item
          label={"名称"}
          name={"name"}
          rules={[{ required: true, message: "请输入项目名称" }]}
        >
          <Input placeholder="请输入项目名称"></Input>
        </Form.Item>
        <Form.Item
          label={"部门"}
          name={"organization"}
          rules={[{ required: true, message: "请输入部门名称" }]}
        >
          <Input placeholder="请输入部门名称"></Input>
        </Form.Item>
        <Form.Item label={"负责人"} name={"personId"}>
          <UserSelect defaultOptionName={"负责人"}></UserSelect>
        </Form.Item>
        <Form.Item>
          <Button loading={isLoading} type={"primary"} htmlType={"submit"}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
