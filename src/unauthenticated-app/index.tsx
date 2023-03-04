import React, { useState } from "react";
import LoginScreen from "./Login";
import RegisterScreen from "./Register";
import { Button, Card, Divider, Typography } from "antd";
import styles from "./styles.module.scss";
import logo from "../../src/static/logo.png";
import { useDocumentTitle } from "utils";

const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  useDocumentTitle("登录注册页面", false);
  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.cat}>
          {isRegister ? (
            <img src="https://robohash.org/73?set=set4" alt="" />
          ) : (
            <img src="https://robohash.org/3?set=set4" alt="" />
          )}
        </div>
        {error ? (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null}
        <div className={styles.shadow}></div>
        {isRegister ? (
          <RegisterScreen setError={setError} />
        ) : (
          <LoginScreen setError={setError} />
        )}
        <Divider />
        <Button
          type={"link"}
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >
          {isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
        </Button>
      </Card>
    </div>
  );
};

export default UnauthenticatedApp;
