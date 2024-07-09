import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "./ui/checkbox";
import { Info, Pencil, Pin, PinOff, Trash2 } from "lucide-react";
import api from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import EditTask from "./EditTask";
import Todos from "./Todos";
import { useToast } from "./ui/use-toast";

const TaskCard = ({
  setTask,
  task,
  children,
  id,
  editTaskMode,
  setEditTaskMode,
  handleTaskChange,
  handleUpdateButton,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  async function handlePinned() {
    try {
      const response = await api.patch(`/tasks/${task._id}`, {
        isPinned: !task.isPinned,
      });
      if (!task.isPinned) {
        toast({
          title: "pined",
          description: "Your task was pined",
          style: {
            backgroundColor: "lightgreen",
          },
        });
      } else {
        toast({
          title: "unpined",
          description: "Your task was unpined",
          style: {
            backgroundColor: "lightgreen",
          },
        });
      }
      setTask(response.data);
    } catch (error) {
      console.error("unsuccessful to handlePinned", error);
    }
  }

  async function handleDeleteTask() {
    try {
      const response = await api.delete(`/tasks/${task._id}`);
      console.log("Task deleted");
      navigate("/task");
      toast({
        title: "Deleted",
        description: "Your task was deleted",
        variant: "destructive",
      });
    } catch (error) {
      console.error("unsuccessful to handleDeleteTask", error);
    }
  }

  return editTaskMode ? (
    <EditTask
      task={task}
      handlePinned={handlePinned}
      handleDeleteTask={handleDeleteTask}
      handleTaskChange={handleTaskChange}
      handleUpdateButton={handleUpdateButton}
    >
      {children}
    </EditTask>
  ) : (
    <Card className="border border-solid border-mongo-light-green m-8 rounded-3xl">
      <CardHeader>
        <div onClick={handlePinned} className="flex justify-end cursor-pointer">
          {task.isPinned ? <PinOff strokeWidth={1} /> : <Pin strokeWidth={1} />}
        </div>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{task.body}</p>
        <div>{children}</div>
        <div className="flex justify-end gap-2">
          {!id ? (
            <Info
              onClick={() => navigate(`${task._id}`)}
              strokeWidth={1}
              className="hover:text-mongo-light-green cursor-pointer"
            />
          ) : (
            <Button
              onClick={() => setEditTaskMode(true)}
              variant="ghost"
              size="icon"
            >
              <Pencil strokeWidth={1} />
            </Button>
          )}
          <AlertDialog>
            <AlertDialogTrigger>
              <div className="hover:text-red-600">
                <Trash2 strokeWidth={1} />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col justify-start">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your Task and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600"
                  onClick={handleDeleteTask}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
