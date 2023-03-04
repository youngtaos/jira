import List from "./list";
import SearchPanel from "./SearchPanel";
import { useMemo, useState } from "react";
import { useDebounce } from "utils";
import { Button, Row, Typography } from "antd";
import { useProject } from "utils/project";
import { useUser } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectModal, useProjectSearchParams } from "./util";
import { useDispatch } from "react-redux/es/exports";
import { projectListAction } from "./projectListSlice";
import { ErrorBox } from "components/ErrorBox";

export interface projectType {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
  pin: boolean;
}
export interface paramType {
  name: string;
  personId: string;
}
export const ProjectListScreen = () => {
  const [param, setParam] = useProjectSearchParams();
  const deboucedParam = useDebounce(param, 200);
  const { open } = useProjectModal();
  const { isLoading, error, data: list } = useProject(deboucedParam);
  const { data: users } = useUser();
  console.log("list", list);

  return (
    <div>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>项目列表</h1>
        <Button onClick={open}>创建项目</Button>
      </Row>
      <SearchPanel setParam={setParam} users={users || []} param={param} />
      <ErrorBox error={error} />
      <List
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      ></List>
    </div>
  );
};

ProjectListScreen.whyDidYouRender = true;
