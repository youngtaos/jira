import { useAuth } from "context/auth-context";
import React, { useState } from "react";
import { ProjectListScreen } from "screens/projecr-list";
import { Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import styles from "./styles.module.scss";
import logo from "../static/logo.png";
import { resetRoute, useDocumentTitle } from "utils";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { ProjectScreen } from "screens/propject";
import { ProjectModal } from "components/ProjectModal";
import { ProjectPopover } from "components/ProjectPopover";

const AuthenticatedApp = () => {
  useDocumentTitle("Jira主页面", false);
  return (
    <div className={styles.wrapper}>
      <Router>
        <PageHeader />
        <div className={styles.nav}></div>
        <div className={styles.main}>
          <Routes>
            <Route path={"projects"} element={<ProjectListScreen />}></Route>
            <Route
              path={"projects/:projectId/*"}
              element={<ProjectScreen />}
            ></Route>
            <Route path="/" element={<Navigate to={"/projects"} />}></Route>
          </Routes>
        </div>
        <ProjectModal></ProjectModal>
      </Router>
    </div>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  const items: MenuProps["items"] = [
    {
      label: <a onClick={logout}>登出</a>,
      key: "0",
    },
  ];
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Button type={"link"} onClick={resetRoute}>
          <img src={logo} alt=""></img>
        </Button>
        <ProjectPopover></ProjectPopover>
        <span>用户</span>
      </div>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type={"link"} onClick={(e) => e.preventDefault()}>
          <Space>
            <span>你好, {user?.name}</span>
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default AuthenticatedApp;
