import { Task } from "@/types/Task";

export type TasksSection = {
  id: string;
  title: string;
  tasks: Task[];
  handleStatusChange: (
    id: string,
    updatedStatus: "todo" | "progress" | "completed"
  ) => void;
};
