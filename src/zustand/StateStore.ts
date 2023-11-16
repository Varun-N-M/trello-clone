import { colRef, db } from "@/firebase";
import { data } from "@/structure";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { create } from "zustand";

interface StateType {
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

// export const useStateStore = create<stateType>((set) => ({
//   state: data,
//   setState: (newState: any) => {
//     set({ state: newState });
//   },
// }));

export const useStateStore = create<StateType>((set) => {
  const userCollectionRef = collection(db, "user");
  const userId = "bXDCzt9rQ0ixwXkYyYdG"; // Replace with the actual user ID
  const fetchUserData = async () => {
    const userDocRef = doc(userCollectionRef, userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data();
    }

    return null;
  };

  // Initial fetch of data from Firestore
  const existingUserData = fetchUserData();

  return {
    state: existingUserData || data,
    setState: async (newState: any) => {
      const userDocRef = doc(userCollectionRef, userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // If the document exists, update it
        await setDoc(userDocRef, newState);
      } else {
        // If the document doesn't exist, create it
        await addDoc(userCollectionRef, { ...newState, userId });
      }

      // Update the local Zustand state
      set({ state: newState });
    },
  };
});
