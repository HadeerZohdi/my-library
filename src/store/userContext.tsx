import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface State {
  email: string;
  userId: string;
  name: string;
}

const initialState = {
  email: "",
  userId: "",
  name: "",
};

const UserStore = createContext({
  userState: initialState,
  setUserState: (state: any) => state,
});

export const useUserStore = () => {
  return useContext(UserStore);
};

export const UserProvider = ({ children }: any) => {
  const [userState, setUserState] = useState<State>(initialState);

  interface value {
    userState: State;
    setUserState: Dispatch<
      SetStateAction<{
        email: string;
        userId: string;
        name: string;
      }>
    >;
  }

  useEffect(() => {
    if (!userState?.userId) {
      const User: any = localStorage.getItem("@my-library");
      const userData = JSON.parse(User);

      setUserState({
        email: userData?.email,
        userId: userData?.userId,
        name: userData?.name,
      });
    }
  }, [userState.userId]);

  const value: value = {
    userState,
    setUserState,
  };

  return <UserStore.Provider value={value}>{children}</UserStore.Provider>;
};
