import { User } from './user.model';
import { TaskItem } from './task.model';

export interface Project {
    id?: number;
    name: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    userId: number;
    user?: User;
    tasks?: TaskItem[];
} 