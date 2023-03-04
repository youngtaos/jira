import { useQuery } from "react-query";
import { useHttp } from "request"
import { TaskIcon } from "types";

export const useTaskIcon = () => {
    const client = useHttp();
    return useQuery<TaskIcon[]>(['taskTypes'],
        () => client('taskTypes'))
}