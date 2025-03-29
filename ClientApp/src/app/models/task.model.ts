import { Project } from './project.model';
import { User } from './user.model';

export enum TaskPriority {
    Low,
    Medium,
    High,
    Critical
}

export enum TaskStatus {
    Todo,
    InProgress,
    Review,
    Completed
}

export interface TaskItem {
    id?: number;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    createdDate: Date;
    dueDate?: Date;
    projectId: number;
    project?: Project;
    assignedToId?: number;
    assignedTo?: User;
} 