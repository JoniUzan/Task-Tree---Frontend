import React, { useRef } from "react";
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
import { Label } from "@radix-ui/react-dropdown-menu";

function EditTask({
  task,
  handlePinned,
  children,
  handleDeleteTask,
  handleTaskChange,
  handleUpdateButton,
}) {
  return (
    <Card className="border border-solid border-mongo-light-green m-8 rounded-3xl">
      <CardHeader>
        <div onClick={handlePinned} className="flex justify-end cursor-pointer">
          {task.isPinned ? <PinOff strokeWidth={1} /> : <Pin strokeWidth={1} />}
        </div>
        <CardTitle>
          <Label
            className="text-sm text-blue-text font-sofia-sans font-normal"
            htmlFor="title"
          >
            Title
          </Label>
          <Input
            id="title"
            name="title"
            onChange={(e) => handleTaskChange(e)}
            value={task.title}
          />
        </CardTitle>
        <CardDescription>
          <Label
            className="text-sm text-blue-text font-sofia-sans"
            htmlFor="description"
          >
            Description
          </Label>
          <Input
            id="description"
            name="description"
            value={task.description}
            onChange={(e) => handleTaskChange(e)}
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label
          className="text-sm text-blue-text font-sofia-sans font-normal"
          htmlFor="body"
        >
          Body
        </Label>
        <Input
          id="body"
          name="body"
          value={task.body}
          onChange={(e) => handleTaskChange(e)}
        />
        <div>{children}</div>
        <div className="flex justify-end gap-2">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                onClick={() => setEditTaskMode(true)}
                variant="ghost"
                size="icon"
              >
                <Pencil strokeWidth={1} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col justify-start">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently update
                  your Task and change your data on our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-mongo-light-green"
                  onClick={handleUpdateButton}
                >
                  Update
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

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
}

export default EditTask;
