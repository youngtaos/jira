import { useMemo } from "react"
import { useLocation } from "react-router"
import { useDebounce } from "utils"
import { useProject, useProjectDetail } from "utils/project"
import { useTaskDetail } from "utils/task"
import { useUrlQueryParam } from "utils/url"

export const useProjectIdInUrl = () => {
    const { pathname } = useLocation()
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

export const useProjectInUrl = () => useProjectDetail(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTaskSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId'])
    const projectId = useProjectIdInUrl()
    const debouncedName = useDebounce(param.name, 200)
    return useMemo(() => ({
        projectId, typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: debouncedName
    }), [projectId, param.typeId, param.processorId, param.tagId, debouncedName])
}

export const useTasksQueryKey = () => ['tasks', useTaskSearchParams()]

export const useTaskModal = () => {
    const [{ edtingTaskId }, setEdtingTaskId] = useUrlQueryParam(["edtingTaskId"])
    const { data: taskDetail, isLoading } = useTaskDetail(Number(edtingTaskId))
    const startEdit = (id: number) => {
        setEdtingTaskId({ edtingTaskId: id })
    }
    const close = () => {
        setEdtingTaskId({ edtingTaskId: undefined })
    }
    return {
        edtingTaskId,
        taskDetail,
        startEdit,
        close,
        isLoading
    }
}
