import React from "react";
import { paramType } from ".";
import { Input, Select, Form } from "antd";
import styles from "./styles.module.scss";
import { UserSelect } from "components/UserSelect";
import { projectType, user } from "types";

interface SearchPanelProps {
  users: user[];
  param: Partial<Pick<projectType, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}
const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <div className={styles.shearchWrapper}>
      <Form layout={"inline"}>
        <Form.Item>
          <Input
            placeholder="项目名"
            type="text"
            value={param.name}
            onChange={(val) => setParam({ ...param, name: val.target.value })}
          />
        </Form.Item>
        <Form.Item>
          <UserSelect
            value={param.personId}
            onChange={(value) => setParam({ ...param, personId: value })}
            defaultOptionName="负责人"
          ></UserSelect>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SearchPanel;
