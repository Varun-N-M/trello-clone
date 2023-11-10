"use client";

import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import Textarea from "@mui/joy/Textarea";
import { useStateStore } from "@/zustand/StateStore";
import { Draggable } from "react-beautiful-dnd";

interface TaskProps {
  column: {
    id: string;
    title: string;
    tasksId: string[];
  };
  task: {
    id: string;
    content: string;
  };
  index: any;
}

export const Tasks = ({ task, index, column }: TaskProps) => {
  const { state, setState } = useStateStore();

  const [manageState, setManageState] = useState("editTask");
  const [localContent, setLocalContent] = useState(task.content);

  const submit = () => {
    if (localContent.trim() !== "") {
      const newState = {
        ...state,
        tasks: {
          ...state.tasks,
          [task.id]: {
            ...state.tasks[task.id],
            content: localContent,
          },
        },
      };
      setState(newState);
      setManageState("editTask");
    }
  };

  const close = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setManageState("editTask");
      setLocalContent(task.content);
    }
  };

  const deleteTask = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const { tasks, columns } = state;
      const { [task.id]: taskToRemove, ...remainingTasks } = tasks;

      const updatedTaskIds = state.columns[column.id].taskIds.filter(
        (taskId:string) => taskId !== task.id
      );

      const newState = {
        ...state,
        tasks: remainingTasks,
        columns: {
          ...state.columns,
          [column.id]: {
            ...state.columns[column.id],
            taskIds: updatedTaskIds,
          },
        },
      };
      setState(newState);
    }
  };

  return (
    <div className="">
      {manageState === "editTask" ? (
        <Draggable draggableId={task.id} index={index}>
          {(provided) => (
            <div
              className="flex justify-between items-center bg-[#22272B] text-gray-300 rounded-lg px-2 py-2 h-10 mb-2 group"
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              {task.content.substring(0, 15) + "..."}
              <button
                className="hidden group-hover:flex hover:bg-gray-500/25 p-2 rounded-full"
                onClick={() => setManageState("openEdit")}
              >
                <FiEdit2 size={15} />
              </button>
            </div>
          )}
        </Draggable>
      ) : (
        <div className="">
          <div
            className="h-screen w-screen absolute z-10 top-0 right-0 left-0 cursor-pointer"
            onClick={() => setManageState("editTask")}
          />
          <div className="relative z-20">
            <Textarea
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              minRows={3}
              autoFocus
              style={{
                backgroundColor: "#22272B",
                color: "#989ea2",
                border: "none",
              }}
              onKeyDown={close}
              placeholder="Enter a title for this card..."
            />
            <div className="my-2 w-full flex flex-row justify-between">
              <button
                className="px-5 py-2 bg-[#579DFF] text-gray-800 font-semibold rounded-md"
                onClick={submit}
              >
                Save
              </button>
              <button
                className="px-5 py-2 bg-[#579DFF] text-gray-800 font-semibold rounded-md"
                onClick={deleteTask}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
