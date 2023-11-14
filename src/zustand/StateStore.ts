import { data } from "@/structure";
import { create } from "zustand";

interface stateType {
  state: any;
  setState: (state: any) => void;
}

// export const useStateStore = create<stateType>((set) => {
//   const initialData =
//     JSON.parse(localStorage.getItem("trelloAppState") || "null") || data;
//   return {
//     state: initialData,
//     setState: (newState: any) => {
//       set({ state: newState });
//       localStorage.setItem("trelloAppState", JSON.stringify(newState));
//     },
//   };
// });

export const useStateStore = create<stateType>((set) => ({
  state: data,
  setState: (newState: any) => {
    set({ state: newState });
  },
}));
