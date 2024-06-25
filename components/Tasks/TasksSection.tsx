import { TasksSection as TaskSectionType } from "@/types/TasksSection";
import React from "react";
import TaskCard from "@/components/Tasks/TaskCard";
import { Task as TaskType } from "@/types/Task";
import { GhostIcon } from "lucide-react";

const TasksSection: React.FC<TaskSectionType> = ({
  id,
  title,
  tasks,
  handleStatusChange,
}) => {
  return (
    <section className="mt-4 font-semibold">
      <h2 className="my-4">{title}</h2>

      {tasks.length > 0 ? (
        <div className="flex flex-col gap-4">
          {tasks
            .sort((a, b) => a.dueDate - b.dueDate)
            .map((task: TaskType) => (
              <TaskCard
                {...task}
                handleStatusChange={handleStatusChange}
                key={task._id}
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center opacity-80">
          <GhostIcon size={20} />
          <p>Only ghosts are here!</p>
        </div>
      )}
    </section>
  );
};

export default TasksSection;
