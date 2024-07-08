import React, { useState } from "react";
import { CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import api from "@/lib/utils";

function Todos({
  task,
  handleTodoCheck,
  handleDeleteTodo,
  
  setTask,
}) {
  const [newTodo, setNewTodo] = useState("");

  function handleNewTodoChange(e) {
    setNewTodo(e.target.value);
  }

  async function createNewTodo(e) {
    e.preventDefault();
    let updatedTask;
    try {
      setTask((prev) => {
        updatedTask = { ...prev };
        const todoList = updatedTask.todoList;
        todoList.push({ title: newTodo });
        updatedTask.todoList = todoList;
        return updatedTask;
      });
      const response = await api.patch(`/tasks/${task._id}`, updatedTask);
      console.log("todo added");
      setNewTodo("")
    } catch (error) {
      console.error("unsuccsesful to add to do");
    }
  }

  return (
    <CardContent className="px-0 py-6">
      {task.todoList.map((todo, index) => {
        return (
          <div className="flex justify-between items-center" key={todo._id}>
            <div className="flex gap-2 items-center">
              <Checkbox
                onClick={() => handleTodoCheck(todo._id)}
                checked={todo.isComplete}
                id={todo.title}
              />
              <label htmlFor={todo.title}>{todo.title}</label>
            </div>
            <div className="flex mx-2 gap-2">
              <Trash2
                onClick={() => handleDeleteTodo(todo._id)}
                className="m-0 hover:text-red-600 cursor-pointer"
                size={16}
              />
            </div>
          </div>
        );
      })}
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
    </CardContent>
  );
}

export default Todos;
