import { useAuth } from "context/auth-context";
import React from "react";
import { Button, Input, Form } from "antd";
import { useAsync } from "utils/useAsync";

interface RegisterScreenProps {
  setError: (error: Error) => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ setError }) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwError: true });
  const handleSubmit = ({
    cpassword,
    ...value
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== value.password) {
      setError(new Error("请确认两次输入的密码相同"));
      return;
    }
    run(register(value)).catch((error: Error) => {
      setError(error);
    });
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id="username" placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" id="password" placeholder="密码" />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请再次确认密码" }]}
      >
        <Input type="cpassword" id="cpassword" placeholder="确认密码" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" loading={isLoading}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
