export type Task = {
  _id: string;
  title: string;
  description?: string;
  status: "todo" | "progress" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: number;
  createdAt: number;
  updatedAt: number;
  handleStatusChange: (
    id: string,
    updatedStatus: "todo" | "progress" | "completed"
  ) => void;
};
