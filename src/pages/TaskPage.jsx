import TaskCard from "@/components/TaskCard";
import TasksSkeleton from "@/components/TasksSkeleton";
import { Input } from "@/components/ui/input";
import api from "@/lib/utils";

import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get("/tasks/");
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("error fetching tasks", error);
      }
    }
    fetchTasks();
  }, [tasks]);
  return (
    <>
      <div className="flex justify-center ">
        <Input
          onClick={() => navigate("create")}
          className="w-2/3 shadow-md"
          placeholder={"New Task..."}
        />
      </div>
      {loading ? (
        <TasksSkeleton />
      ) : (
        <>
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks
              .filter((task) => task.isPinned)
              .map((task) => (
                <div key={task._id}>
                  <TaskCard task={task} />
                </div>
              ))}
          </div>

          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks
              .filter((task) => !task.isPinned)
              .map((task) => (
                <div key={task._id}>
                  <TaskCard task={task} />
                </div>
              ))}
          </div>
          <Outlet />
        </>
      )}
    </>
  );
}

export default TaskPage;
