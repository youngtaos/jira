import { Button, Form, Input, Typography } from "antd";
import ErrorPage from "components/ErroPage";
import { ErrorBox } from "components/ErrorBox";
import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { useAsync } from "utils/useAsync";

interface LoginScreenProps {
  setError: (error: Error) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ setError }) => {
  const { login, user } = useAuth();
  const { run, isLoading, error } = useAsync(undefined, { throwError: true });
  const handleSubmit = (value: { username: string; password: string }) => {
    run(login(value)).catch((error: Error) => {
      setError(error);
    });
  };

  return (
    <Form onFinish={handleSubmit}>
      <ErrorBox error={error} />
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
      <Form.Item>
        <Button htmlType="submit" type="primary" loading={isLoading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
