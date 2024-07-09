import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function TasksSkeleton() {
  return (
    <div className="flex justify-center items-center min-h-screen mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <Skeleton className="h-[250px] w-[300px] sm:w-[350px] rounded-3xl" />
        <Skeleton className="h-[250px] w-[300px] sm:w-[350px] rounded-3xl" />
        <Skeleton className="h-[250px] w-[300px] sm:w-[350px] rounded-3xl" />
        <Skeleton className="h-[250px] w-[300px] sm:w-[350px] rounded-3xl" />
        <Skeleton className="h-[250px] w-[300px] sm:w-[350px] rounded-3xl" />
        <Skeleton className="h-[250px] w-[300px] sm:w-[350px] rounded-3xl" />
        <Skeleton className="h-[250px] w-[300px] sm:w-[350px] rounded-3xl" />
        <Skeleton className="h-[250px] w-[300px] sm:w-[350px] rounded-3xl" />
        <Skeleton className="h-[250px] w-[300px] sm:w-[350px] rounded-3xl" />
       
      </div>
    </div>
  );
}

export default TasksSkeleton;
