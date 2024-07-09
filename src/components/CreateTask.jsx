import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Todos from "./Todos";
import { Button } from "./ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Description } from "@radix-ui/react-dialog";
import api from "@/lib/utils";
import { useToast } from "./ui/use-toast";

function CreateTask() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    body: "",
  });
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleDialogClose = (isOpen) => {
    if (!isOpen) {
      navigate(-1); // Navigate back one page
    }
  };

  function handleTaskChange(e) {
    setNewTask((prev) => {
      const name = e.target.name;
      const updetedTask = { ...prev };
      updetedTask[name] = e.target.value;
      return updetedTask;
    });
    console.log(newTask);
  }

  async function handleTodoCheck(index) {
    setNewTask((prev) => {
      const updatedTask = { ...prev };
      updatedTask.todoList[index].isComplete =
        !updatedTask.todoList[index].isComplete;
      return updatedTask;
    });
  }

  async function handleDeleteTodo(index) {
    setNewTask((prev) => {
      const updatedTask = { ...prev };
      const todoList = [...updatedTask.todoList];
      todoList.splice(index, 1); // Remove the todo item at the specified index
      updatedTask.todoList = todoList;
      return updatedTask;
    });
  }

  function handleNewTodoChange(e) {
    setNewTodo(e.target.value);
  }

  async function createNewTodo(e) {
    e.preventDefault();
    let updatedTask;

    setNewTask((prev) => {
      updatedTask = { ...prev };
      const todoList = updatedTask.todoList || [];
      todoList.push({ title: newTodo });
      updatedTask.todoList = todoList;
      return updatedTask;
    });
    setNewTodo("");
  }

  async function handleAddTaskButton() {
    try {
      const response = await api.post(`/tasks/create`, newTask);
      console.log("task added succsesfuly");
      toast({
        title: "Created",
        description: "New task was created",
        style: {
          backgroundColor: "lightgreen",
        },
      });
      navigate(-1);
    } catch (error) {
      console.error("unsuccsesful to add task");
      toast({
        title: "Error",
        description:
          "Unsuccessful to create new task make sure to fill out all the fields",
        variant: "destructive",
      });
    }
  }
  return (
    <Dialog defaultOpen={true} onOpenChange={handleDialogClose} className="p-8">
      <DialogTitle></DialogTitle>
      <DialogHeader></DialogHeader>
      <DialogDescription></DialogDescription>
      <DialogContent>
        <form action="">
          <Label
            className="text-sm text-blue-text font-sofia-sans font-normal"
            htmlFor="title"
          >
            Title
          </Label>
          <Input
            id="title"
            name="title"
            onChange={handleTaskChange}
            value={newTask.title}
            required
          />
          <Label
            className="text-sm text-blue-text font-sofia-sans font-normal"
            htmlFor="description"
          >
            Description
          </Label>
          <Input
            id="description"
            name="description"
            onChange={handleTaskChange}
            value={newTask.description}
            required
          />
          <Label
            className="text-sm text-blue-text font-sofia-sans font-normal"
            htmlFor="body"
          >
            Body
          </Label>
          <Input
            id="body"
            name="body"
            onChange={handleTaskChange}
            value={newTask.body}
            required
          />
        </form>
        {newTask.todoList
          ? newTask.todoList.map((todo, index) => {
              return (
                <div
                  className="flex justify-between items-center"
                  key={todo._id}
                >
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      onClick={() => handleTodoCheck(index)}
                      checked={todo.isComplete}
                      id={todo.title}
                    />
                    <label htmlFor={todo.title}>{todo.title}</label>
                  </div>
                  <div className="flex mx-2 gap-2">
                    <Trash2
                      onClick={() => handleDeleteTodo(index)}
                      className="m-0 hover:text-red-600 cursor-pointer"
                      size={16}
                    />
                  </div>
                </div>
              );
            })
          : null}

        <div className="mt-4">
          <form onSubmit={(e) => createNewTodo(e, newTodo)}>
            <Label>Add new todo</Label>
            <div className="flex gap-2 items-center">
              <Input value={newTodo} onChange={handleNewTodoChange} />
              <Button type="submit" variant="ghost" size="icon">
                <Plus />
              </Button>
            </div>
          </form>
        </div>

        <Button onClick={handleAddTaskButton}>Add Task</Button>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTask;
