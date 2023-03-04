import { Typography } from "antd";
import { ErrorBox } from "components/ErrorBox";
import { DevTools } from "jira-dev-tool";
import React from "react";

const ErrorPage = ({ error }: { error: Error | null }) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ErrorBox error={error}></ErrorBox>
      <DevTools />
    </div>
  );
};

export default ErrorPage;
