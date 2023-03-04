import { useEffect } from "react";
import { useHttp } from "request";
import { user } from "types";
import { cleanObj } from "utils";
import { useAsync } from "./useAsync";

export const useUser = (param?: Partial<user>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<user[]>();

    useEffect(() => {
        run(client("users", { data: cleanObj(param || {}) }));
    }, [param]);

    return result;
}