import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { TaskTypeSelect } from "components/taskTypeSelect";
import { UserSelect } from "components/UserSelect";
import React, { useEffect } from "react";
import { useDeleteTask, useEditTask } from "utils/task";
import { useTaskModal, useTasksQueryKey } from "./util";

export const TaskModal = () => {
  const { isLoading, startEdit, close, taskDetail, edtingTaskId } =
    useTaskModal();
  const { mutateAsync: editTask } = useEditTask(useTasksQueryKey());
  const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey());
  console.log(taskDetail);
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue(taskDetail);
  }, [form, taskDetail]);
  const onOk = async () => {
    await editTask({ ...taskDetail, ...form.getFieldsValue() });
    close();
  };
  const onCancel = () => {
    form.resetFields();
    close();
  };
  const startDelete = () => {
    Modal.confirm({
      content: "你确定要删除?",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteTask({ id: Number(edtingTaskId) });
        close();
      },
    });
  };
  return (
    <Modal
      open={!!edtingTaskId}
      okText="确定"
      cancelText="取消"
      title="编辑任务"
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form form={form} initialValues={taskDetail}>
        <Form.Item name={"name"} label={"任务名"}>
          <Input value={taskDetail?.name} />
        </Form.Item>
        <Form.Item name={"note"} label={"备注"}>
          <Input value={taskDetail?.note} />
        </Form.Item>
        <Form.Item name={"processorId"} label={"经办人"}>
          <UserSelect
            value={taskDetail?.processorId}
            defaultOptionName={"经办人"}
          />
        </Form.Item>
        <Form.Item name={"typeId"} label={"状态"}>
          <TaskTypeSelect
            value={taskDetail?.typeId}
            defaultOptionName={"状态"}
          />
        </Form.Item>
        <Button type={"text"} onClick={startDelete}>
          删除
        </Button>
      </Form>
    </Modal>
  );
};
