"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { getActivity } from "@/actions/signUpDatabase";

type StateObject = {
  firstName: string;
  lastName: string;
  action: string;
  time: string;
};
type ContextState = {
  userActivity: StateObject[];
  setUserActivity: Dispatch<SetStateAction<StateObject[]>>;
};

export const ActivityContext = createContext<ContextState | undefined>(
  undefined,
);

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [userActivity, setUserActivity] = useState<StateObject[]>([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getActivity();
      if (data) setUserActivity(data);
    };
    getData();
  }, []);

  return (
    <ActivityContext.Provider value={{ userActivity, setUserActivity }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const content = useContext(ActivityContext);
  if (content === undefined) {
    throw new Error("No Activity Has Happened Yet");
  }

  return content;
}
