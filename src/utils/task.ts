import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "request";
import { Task } from "types";
import { SortProps } from "./kanban";
import { useDeleteConfig, useEditConfig, useReorderTaskConfig } from "./useOptimisticUpdate";

export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp();
    return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }))
}

export const useTaskDetail = (id?: number) => {
    const client = useHttp();
    return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`), {
        enabled: !!id
    })
}

export const useEditTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation((param: Partial<Task>) => client(`tasks/${param.id}`, {
        method: 'PATCH',
        data: param
    }),
        useEditConfig(queryKey)
    )
}

export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(({ id }: { id: number }) => client(`tasks/${id}`, {
        method: 'DELETE'
    }), useDeleteConfig(queryKey))
}

export const useReorderTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation((params: SortProps) => {
        return client("tasks/reorder", {
            data: params,
            method: "POST",
        });
    }, useReorderTaskConfig(queryKey));
};
