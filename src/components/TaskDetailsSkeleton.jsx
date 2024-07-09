import React from "react";
import { Skeleton } from "./ui/skeleton";

function TaskDetailsSkeleton() {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="">
        <Skeleton className="h-[550px] w-[300px] sm:w-[350px] rounded-3xl" />
      </div>
    </div>
  );
}

export default TaskDetailsSkeleton;
