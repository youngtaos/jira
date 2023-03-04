import { Layout, Menu } from "antd";
import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { EpicScreen } from "screens/EpicScreen";
import { KanbanScreen } from "screens/Kanban";
import styles from "./styles.module.scss";

const useRouteType = () => {
  const res = useLocation().pathname.split("/");
  return res[res.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <div className={styles.wrapper}>
      <div className={styles.aside}>
        <Menu mode={"inline"}>
          <Menu.Item>
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className={styles.main}>
        <Routes>
          <Route path={"/kanban"} element={<KanbanScreen />}></Route>
          <Route path={"/epic"} element={<EpicScreen />}></Route>
          <Route
            path="/"
            element={
              <Navigate
                to={window.location.pathname + "/kanban"}
                replace={true}
              />
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
};
