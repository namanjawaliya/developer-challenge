"use client";

import TaskAddModal from "@/components/Tasks/TaskAddModal";
import TasksSection from "@/components/Tasks/TasksSection";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/Task";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const page = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isTaskAddModalOpen, setIsTaskAddModalOpen] = useState(false);

  const getTasks = async () => {
    try {
      const data = await fetch("/api/tasks/get-tasks");
      const tasks = await data.json();
      setTaskList(tasks.tasks);
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getTasks();
    };

    fetchData();
  }, []);
  const handleStatusChange = async (
    id: string,
    updatedStatus: "todo" | "progress" | "review" | "completed"
  ) => {
    console.log("Sent: ", { id, updatedStatus });
    try {
      const response = await fetch("/api/tasks/update-task-status", {
        method: "POST",
        body: JSON.stringify({
          taskId: id,
          status: updatedStatus,
        }),
      });
      await getTasks();
    } catch (error) {
      console.error({ error });
    }
  };

  const handleModalClose = () => {
    setIsTaskAddModalOpen((prev) => !prev);
  };

  return (
    <div className="pt-4 px-4 lg:px-40 lg:pt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold lg:text-2xl lg:font-bold">
          Tasks
        </h2>
        <Button
          className="flex items-center justify-between gap-2"
          onClick={() => setIsTaskAddModalOpen((prev) => !prev)}
        >
          <PlusIcon size={20} />
          <span>Add</span>
        </Button>
      </div>
      <TasksSection
        id="todo"
        title="To Do"
        tasks={taskList?.filter((task) => task.status === "todo")}
        handleStatusChange={handleStatusChange}
      />
      <TasksSection
        id="progress"
        title="In Progress"
        tasks={taskList?.filter((task) => task.status === "progress")}
        handleStatusChange={handleStatusChange}
      />
      <TasksSection
        id="completed"
        title="Completed"
        tasks={taskList?.filter((task) => task.status === "completed")}
        handleStatusChange={handleStatusChange}
      />

      <TaskAddModal
        isOpen={isTaskAddModalOpen}
        handleClose={handleModalClose}
        getTasks={getTasks}
      />
    </div>
  );
};

export default page;
