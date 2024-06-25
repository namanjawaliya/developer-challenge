import React, { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { priorities, status } from "@/lib/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { TaskAddModal as TaskAddModalType } from "@/types/TaskAddModal";

const TaskAddModal: React.FC<TaskAddModalType> = ({
  isOpen,
  handleClose,
  getTasks,
}) => {
  const defaultFormData = {
    title: "",
    description: "",
    status: "todo",
    priority: "low",
    dueDate: Math.floor(Date.now() / 1000),
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [error, setError] = useState<string | null>(null);

  const addTask = async () => {
    try {
      const response = await fetch("/api/tasks/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setError(null);
        handleClose();
        setFormData(defaultFormData);
        await getTasks();
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addTask();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            {error && <p className="text-red-500 my-2 text-left">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title" className="text-left">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description" className="text-left">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="status" className="text-left">
                  Status
                </Label>
                <Select
                  onValueChange={(newValue) =>
                    setFormData({ ...formData, status: newValue })
                  }
                >
                  <SelectTrigger
                    id="status"
                    className="border capitalize px-4 py-2 rounded-md flex justify-between items-center w-full"
                  >
                    <SelectValue
                      placeholder={status[0]}
                      className="capitalize"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {status.map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        className="capitalize"
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="priority" className="text-left">
                  Priority
                </Label>
                <Select
                  onValueChange={(newValue) =>
                    setFormData({ ...formData, priority: newValue })
                  }
                >
                  <SelectTrigger
                    id="priority"
                    className="border capitalize px-4 py-2 rounded-md flex justify-between items-center w-full"
                  >
                    <SelectValue
                      placeholder={priorities[0]}
                      className="capitalize"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem
                        key={priority}
                        value={priority}
                        className="capitalize"
                      >
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="due-date" className="text-left">
                  Due Date
                </Label>
                <Popover>
                  <PopoverTrigger id="due-date" asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dueDate ? (
                        new Date(formData.dueDate * 1000).toLocaleDateString()
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={new Date(formData.dueDate * 1000)}
                      onSelect={(e) => {
                        if (e) {
                          setFormData({
                            ...formData,
                            dueDate: Math.floor(new Date(e).getTime() / 1000),
                          });
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mt-4">
                <Button type="submit">Add</Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TaskAddModal;
