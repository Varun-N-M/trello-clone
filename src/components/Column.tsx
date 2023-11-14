"use client";

import { useStateStore } from "@/zustand/StateStore";
import { nanoid } from "nanoid";
import Image from "next/image";
import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import { Tasks } from "./Tasks";
import Textarea from "@mui/joy/Textarea";
import { IoCloseSharp } from "react-icons/io5";
import Input from "@mui/joy/Input";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Popover } from "@mui/material";

interface columnProps {
  index: any;
  column: {
    id: string;
    title: string;
    tasksId: string[];
  };
  tasks: any;
}

export const Column = ({ column, tasks, index }: columnProps) => {
  const [anchorEl0, setAnchorEl0] = useState<HTMLButtonElement | null>(null);
  const [anchorEl1, setAnchorEl1] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl0(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl0(null);
  };

  const open = Boolean(anchorEl0);
  const id = open ? "simple-popover" : undefined;

  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? "simple-popover" : undefined;

  const { state, setState } = useStateStore();

  const [content, setContent] = useState("");
  const [manageState, setManageState] = useState("createTask");
  const [colTitleState, setColTitleState] = useState("button");
  const [localTitle, setLocalTitle] = useState(column.title);

  const createNewTask = () => {
    if (content.trim() !== "") {
      const taskId = nanoid();
      const newTask = {
        id: taskId,
        content: content,
      };
      const newState = {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: newTask,
        },
        columns: {
          ...state.columns,
          [column.id]: {
            ...state.columns[column.id],
            taskIds: [...state.columns[column.id].taskIds, taskId],
          },
        },
      };
      setState(newState);
      setManageState("createTask");
      setContent("");
    }
  };

  const submit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      titleUpdate();
    } else if (e.key === "Escape") {
      setColTitleState("button");
    }
  };

  const titleUpdate = () => {
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [column.id]: {
          ...state.columns[column.id],
          title: localTitle,
        },
      },
    };
    setState(newState);
    setColTitleState("button");
  };

  const deleteColumn = () => {
    if (window.confirm("Are you sure you want to delete this column?")) {
      const { columns } = state;
      const { [column.id]: columnToRemove, ...remainingColumns } = columns;

      const updatedColumnsOrder = state.columnsOrder.filter(
        (colId: string) => colId !== column.id
      );

      const newState = {
        ...state,
        columns: remainingColumns,
        columnsOrder: updatedColumnsOrder,
      };
      setState(newState);
    }
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="h-full ml-3 "
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className={`bg-[#101204] text-[#989ea2] h-fit w-[270px] px-3 py-1 rounded-xl ${
              snapshot.isDragging ? "rotate-2 bg-[#101204]/80" : ""
            }`}
          >
            <div
              className="flex items-center gap-1 px-1 pt-1 mb-1"
              {...provided.dragHandleProps}
            >
              <div className="w-full">
                <button
                  className="text-left font-bold w-full outline-none px-2 py-1 rounded-lg hover:bg-white/25"
                  onClick={handleClick1}
                >
                  {column.title.substring(0, 15)}
                </button>
                <Popover
                  id={id1}
                  open={open1}
                  anchorEl={anchorEl1}
                  onClose={handleClose1}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  style={{ borderRadius: "10px" }}
                >
                  <div className="bg-[#1D2125] text-[#9EACBA] w-screen max-w-[200px] border border-gray-800">
                    <Input
                      value={localTitle}
                      onChange={(e) => setLocalTitle(e.target.value)}
                      style={{
                        color: "#9EACBA",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      autoFocus
                      placeholder="Enter list title"
                      onKeyDown={submit}
                    />
                  </div>
                </Popover>
              </div>
              <div>
                <button
                  className="ml-auto hover:bg-white/25 p-2 rounded-lg mt-2"
                  onClick={handleClick}
                >
                  <SlOptions size={14} />
                </button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl0}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  className="mt-2 "
                >
                  <div className="bg-[#1D2125] text-[#9EACBA] w-screen max-w-[170px] border border-gray-800">
                    <button
                      className="basic-button w-full justify-between"
                      onClick={() => setManageState("addTask")}
                    >
                      Add card
                      <span className="-rotate-90"></span>
                    </button>
                    <button
                      className="basic-button w-full justify-between"
                      onClick={deleteColumn}
                    >
                      Delete
                      <span className="-rotate-90"></span>
                    </button>
                  </div>
                </Popover>
              </div>
            </div>
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  className="my-2"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks?.map((task: any, index: any) => (
                    <Tasks
                      key={task.id}
                      task={task}
                      index={index}
                      column={column}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {manageState === "createTask" ? (
              <div className="flex py-2">
                <button
                  className="flex items-center text-[#9DABB9] font-bold text-sm"
                  onClick={() => setManageState("addTask")}
                >
                  <LuPlus size={18} />
                  <span className="ml-1">Add a card</span>
                </button>
                <button className="ml-auto mt-1">
                  <Image
                    src="/template.svg"
                    height={20}
                    width={20}
                    alt="template"
                    className="invert"
                  />
                </button>
              </div>
            ) : (
              <div className="">
                <div
                  className="h-screen w-screen absolute z-10 top-0 right-0 left-0 cursor-pointer"
                  onClick={() => setManageState("createTask")}
                />
                <div className="relative z-20">
                  <Textarea
                    minRows={3}
                    autoFocus
                    style={{
                      backgroundColor: "#22272B",
                      color: "#989ea2",
                      border: "none",
                    }}
                    placeholder="Enter a title for this card..."
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <div className="mt-2 w-full flex flex-row">
                    <button
                      onClick={createNewTask}
                      className="px-3 py-2 bg-[#579DFF] text-gray-800 font-semibold rounded-sm"
                    >
                      Add card
                    </button>
                    <button
                      className="ml-auto"
                      onClick={() => setManageState("createTask")}
                    >
                      <IoCloseSharp size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
