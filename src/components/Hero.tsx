"use client";

import React, { Fragment, useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import Input from "@mui/joy/Input";
import { IoCloseSharp } from "react-icons/io5";
import { Transition, Dialog } from "@headlessui/react";
import { nanoid } from "nanoid";
import { useStateStore } from "@/zustand/StateStore";
import { Column } from "./Column";
import { Droppable } from "react-beautiful-dnd";
import { collection, getDoc,doc } from "firebase/firestore";
import { db } from "@/firebase";

export const Hero = () => {
  const { state, setState } = useStateStore();
  const [manageState, setManageState] = useState("addList");
  const [isOpen, setIsOpen] = useState(false);
  const [colTitle, setColTitle] = useState("");

  const closeModal = () => {
    setIsOpen(false);
    setManageState("addList");
  };

  const createNewColumn = () => {
    if (colTitle.trim() !== "") {
      const colId = nanoid();
      const newCol = {
        id: colId,
        title: colTitle,
        taskIds: [],
      };
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [colId]: newCol,
        },
        columnsOrder: [...state.columnsOrder, colId],
      };
      setState(newState);
      setManageState("addList");
      setColTitle("");
    }
  };

  const handleSubmit = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key ==="Enter"){
      createNewColumn()
    }
  }

  useEffect(() => {
    const userCollectionRef = collection(db, "user");
    const userId = "bXDCzt9rQ0ixwXkYyYdG";
    const fetchDataFromFirestore = async () => {
      // Replace "user" with your actual Firestore collection name
      const userDocRef = doc(userCollectionRef, userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // If the document exists, use its data
        const userData = userDocSnap.data();
        setState(userData);
      }
    };

    fetchDataFromFirestore();
  }, []);

  return (
    <div className="relative w-screen h-screen max-lg:pt-[150px] lg:pt-28 pb-4">
      <div className="overflow-auto flex flex-row h-full px-4">
        <Droppable droppableId="all-cols" type="column" direction="horizontal">
          {(provided) => (
            <div
              className="flex flex-row"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {state.columnsOrder?.map((colId: string,index:any) => {
                const column = state.columns[colId];
                const tasks = column?.taskIds?.map(
                  (taskId: string) => state.tasks[taskId]
                );
                return <Column key={column.id} column={column} tasks={tasks} index={index}/>;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {manageState === "addList" ? (
          <button
            onClick={() => {
              setManageState("openState");
              setIsOpen(true);
            }}
            className="bg-white/20 hover:bg-white/10 text-white ml-3 h-fit font-semibold min-w-[270px] flex items-center px-3 py-3 rounded-xl"
          >
            <LuPlus size={18} /> Add another list
          </button>
        ) : (
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 ">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-sm rounded-xl bg-[#101204] text-[#9EACBA] px-4 py-5 transform  align-middle shadow-xl transition-all">
                      <Input
                        style={{
                          color: "white",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onChange={(e) => setColTitle(e.target.value)}
                        autoFocus
                        placeholder="Enter list title"
                        onKeyDown={handleSubmit}
                      />
                      <div className="mt-4 w-full flex flex-row">
                        <button
                          className="px-2 py-1 bg-[#579DFF] text-gray-800 font-semibold rounded-sm"
                          onClick={createNewColumn}
                        >
                          Add list
                        </button>
                        <button
                          className="ml-auto"
                          onClick={() => setManageState("addList")}
                        >
                          <IoCloseSharp />
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        )}
      </div>
    </div>
  );
};
