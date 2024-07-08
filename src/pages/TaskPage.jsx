import TaskCard from "@/components/TaskCard";
import api from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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
  return loading ? (
    <div>loading...</div>
  ) : (
    <>
      <div>
        {tasks.map((task) => {
          if (task.isPinned) {
            return (
              <div key={task._id}>
                <TaskCard task={task} />
              </div>
            );
          }
          return;
        })}
      </div>

      <div>
        {tasks.map((task) => {
          if (!task.isPinned) {
            return (
              <div key={task._id}>
                <TaskCard task={task} />
              </div>
            );
          }
          return;
        })}
      </div>
      <Outlet />
    </>
  );
}

export default TaskPage;
