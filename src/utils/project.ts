import { QueryClient, QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useHttp } from "request";
import { useProjectSearchParams } from "screens/projecr-list/util";
import { projectType } from "types";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./useOptimisticUpdate";


export const useProject = (param?: Partial<projectType>) => {
    const client = useHttp();
    return useQuery<projectType[]>(['projects', param], () => client('projects', { data: param }))
}

export const useEditProject = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation((param: Partial<projectType>) => client(`projects/${param.id}`, {
        method: 'PATCH',
        data: param
    }),
        useEditConfig(queryKey)
    )
}

export const useAddProject = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation((param: Partial<projectType>) => client(`projects`, {
        data: param,
        method: 'POST'
    }), useAddConfig(queryKey))
}

export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(({ id }: { id: number }) => client(`projects/${id}`, {
        method: 'DELETE'
    }), useDeleteConfig(queryKey))
}

export const useProjectDetail = (id?: number) => {
    const client = useHttp();
    return useQuery<projectType>(['project', { id }], () => client(`projects/${id}`), {
        enabled: !!id
    })
}