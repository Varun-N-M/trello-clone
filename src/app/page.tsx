"use client";

import { Hero, SecondaryHeader, Sidebar } from "@/components";
import { useStateStore } from "@/zustand/StateStore";
import { DragDropContext } from "react-beautiful-dnd";

export default function Home() {
  const { state, setState } = useStateStore();

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(state.columnsOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnsOrder: newColumnOrder,
      };

      setState(newState);
      return;
    }

    const home = state.columns[source.droppableId];
    const foreign = state.columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...home,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    const startTaskIds = Array.from(home.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...home,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(foreign.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...foreign,
      taskIds: finishTaskIds,
    };
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };

  return (
    <main className="flex flex-row flex-1 overflow-auto">
      <Sidebar />
      <div className="flex flex-col relative">
        <SecondaryHeader />
        <DragDropContext onDragEnd={onDragEnd}>
          <Hero />
        </DragDropContext>
      </div>
    </main>
  );
}
