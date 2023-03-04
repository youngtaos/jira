import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObj, subset } from "utils";

/**
 * 
 * @param keys 
 * @returns 
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [stateKeys] = useState(keys);
    return [
        useMemo(
            () => subset(Object.fromEntries(searchParams), stateKeys) as {
                [key in K]: string
            },
            [searchParams, stateKeys]
        ), (param: Partial<{ [key in K]: unknown }>) => {
            const o = cleanObj({ ...Object.fromEntries(searchParams), ...param }) as URLSearchParams;
            return setSearchParams(o)
        }] as const
}

export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (params: { [key in string]: unknown }) => {
        const o = cleanObj({
            ...Object.fromEntries(searchParams),
            ...params
        }) as URLSearchParamsInit;
        return setSearchParams(o)
    }
}