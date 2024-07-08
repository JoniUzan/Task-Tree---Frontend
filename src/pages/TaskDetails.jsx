import TaskCard from "@/components/TaskCard";
import Todos from "@/components/Todos";
import { CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import api from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import React, { Children, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TaskDetails() {
  const [task, setTask] = useState(null);

  const navigate = useNavigate();

  const [editTaskMode, setEditTaskMode] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await api.get(`/tasks/details/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error("error fetching task", error);
      }
    }
    fetchTask();
  }, []);

  async function handleTodoCheck(todoId) {
    try {
      let updatedTask;
      setTask((prev) => {
        updatedTask = { ...prev };
        const todoList = updatedTask.todoList.map((todo) => {
          if (todo._id === todoId) {
            return { ...todo, isComplete: !todo.isComplete };
          }
          return todo;
        });
        updatedTask.todoList = todoList;
        return updatedTask;
      });
      const response = await api.patch(`/tasks/${task._id}`, updatedTask);
      console.log("todo updated");
    } catch (error) {
      console.error("unsuccsesful to update to do");
    }
  }

  const handleDialogClose = (isOpen) => {
    if (!isOpen) {
      navigate(-1); // Navigate back one page
    }
  };

  function handleTaskChange(e) {
    // console.log(e.target.name);
    setTask((prev) => {
      const name = e.target.name;
      const value = e.target.value;
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleUpdateButton() {
    try {
      const response = await api.patch(`/tasks/${task._id}`, task);
      console.log("Task updated");
      navigate(-1);
    } catch (error) {
      console.error("error updated task", error);
    }
  }
  async function handleDeleteTodo(todoId) {
    try {
      let updatedTask;
      setTask((prev) => {
        updatedTask = { ...prev };

        const todoList = updatedTask.todoList.filter((todo) => {
          return todo._id !== todoId;
        });

        updatedTask.todoList = todoList;
        return updatedTask;
      });
      const response = await api.patch(`/tasks/${task._id}`, updatedTask);
      console.log("todo deleted");
    } catch (error) {
      console.error("unsuccsesful to delete to do");
    }
  }

  
  return (
    <>
      <Dialog defaultOpen={true} onOpenChange={handleDialogClose}>
        <DialogTitle></DialogTitle>
        <DialogHeader></DialogHeader>
        <DialogDescription></DialogDescription>
        <DialogContent>
          {!task ? (
            <div>loading</div>
          ) : (
            <TaskCard
              setTask={setTask}
              task={task}
              id={id}
              editTaskMode={editTaskMode}
              setEditTaskMode={setEditTaskMode}
              handleTaskChange={handleTaskChange}
              handleUpdateButton={handleUpdateButton}
            >
              <Todos
                
                handleDeleteTodo={handleDeleteTodo}
                task={task}
                editTaskMode={editTaskMode}
                handleTodoCheck={handleTodoCheck}
                setTask={setTask}
              />
            </TaskCard>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TaskDetails;
