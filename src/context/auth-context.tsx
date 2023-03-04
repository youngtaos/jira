import { Spin, Typography } from "antd";
import ErrorPage from "components/ErroPage";
import { DevTools } from "jira-dev-tool";
import React, { ReactNode, useState } from "react";
import { useQueryClient } from "react-query";
import { http } from "request";
import { user } from "types";

import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import * as auth from "../auth-provider";

interface formType {
  username: string;
  password: string;
}

const BoostrapUser = async () => {
  let user = null;
  let token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: user | null;
      register: (form: formType) => Promise<void>;
      login: (form: formType) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<user | null>();
  const queryClient = useQueryClient();

  //point free
  const login = (form: formType) => auth.login(form).then(setUser);
  const register = (form: formType) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
    });

  useMount(() => {
    run(BoostrapUser());
  });

  if (isIdle || isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size={"large"}></Spin>
      </div>
    );
  }

  if (isError) {
    return <ErrorPage error={error}></ErrorPage>;
  }
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
