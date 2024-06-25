import { Task } from "@/types/Task";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { status as Status } from "@/lib/constants";
import { BellRing, ChevronDown, ChevronsDown, ChevronsUp } from "lucide-react";
import { useState } from "react";

const statusIcons = {
  low: <ChevronDown size={20} />,
  medium: <ChevronsDown size={20} />,
  high: <ChevronsUp size={20} />,
  urgent: <BellRing size={20} />,
};

const TaskCard: React.FC<Task> = ({
  _id,
  title,
  description,
  status,
  priority,
  dueDate,
  createdAt,
  updatedAt,
  handleStatusChange,
}) => {
  const isExpired = dueDate * 1000 < Date.now() / 1000;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card
      className={`${isExpired && "opacity-60"}`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription
          className={` transition-all ease-in-out duration-300 ${
            !isOpen ? "max-h-10 truncate" : "max-h-full"
          }`}
        >
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Select
          onValueChange={(newValue) =>
            handleStatusChange(
              _id,
              newValue as "todo" | "progress" | "completed"
            )
          }
        >
          <SelectTrigger
            disabled={isExpired}
            className="border capitalize px-4 py-2 rounded-md w-32 flex justify-between items-center"
          >
            <SelectValue placeholder={status} className="capitalize" />
          </SelectTrigger>
          <SelectContent>
            {Status.map((status) => (
              <SelectItem value={status} className="capitalize">
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex justify-around items-center gap-x-4">
          <span>
            {new Date(dueDate * 1000).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            })}
          </span>
          {statusIcons[priority]}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
