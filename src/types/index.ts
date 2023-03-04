export interface user {
    name: string;
    id: number;
    email: string;
    title: string;
    organization: string;
    token: string;
}
export interface projectType {
    id: number;
    name: string;
    personId: number;
    organization: string;
    created: number;
    pin: boolean;
}

export interface Task {
    id: number;
    name: string;
    processorId: number;
    projectId: number;
    //任务组
    epicId: number;
    kanbanId: number;
    //bug / task
    typeId: number;
    note: string;
}

export interface Kanban {
    id: number;
    name: string;
    projectId: number;
}

export interface TaskIcon {
    id: number;
    name: string;
}
