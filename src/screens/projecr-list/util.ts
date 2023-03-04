import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProjectDetail } from "utils/project";
import { useUrlQueryParam } from "utils/url"

export const useProjectSearchParams = () => {
    const [keys, setKeys] = useState<("name" | "personId")[]>([
        "name",
        "personId",
    ]);
    const [param, setParam] = useUrlQueryParam(keys);
    return [useMemo(() => {
        return {
            ...param,
            personId: Number(param.personId) || undefined,
        };
    }, [param]), setParam] as const
}

export const useProjectsQueryKey = () => {
    const [params] = useProjectSearchParams()
    const queryKey = ['projects', params]
    return queryKey
}

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])

    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
        'editingProjectId'
    ])
    const { data: editingProject, isLoading } = useProjectDetail(Number(editingProjectId))

    const open = () => setProjectCreate({ projectCreate: true })
    const closeCreate = () => {
        setProjectCreate({ projectCreate: undefined })
    }
    const closeEdit = () => {
        setEditingProjectId({ editingProjectId: undefined })
    }
    const startEdit = (id: Number) => setEditingProjectId({ editingProjectId: id })

    return {
        projectModalOpen: projectCreate === 'true' || !!editingProjectId,
        open,
        closeCreate,
        closeEdit,
        startEdit,
        editingProject,
        isLoading,
        editingProjectId
    }
}