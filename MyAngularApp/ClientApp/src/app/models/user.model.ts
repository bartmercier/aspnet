import { Project } from './project.model';
import { TaskItem } from './task.model';

export interface User {
    id?: number;
    name: string;
    email: string;
    role: string;
    createdDate?: Date;
    projects?: Project[];
    assignedTasks?: TaskItem[];
} 