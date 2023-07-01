import React, { useCallback, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userContext";

const BaseScreen: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { userState, setUserState } = useUserStore();

  const User = localStorage.getItem("@my-library");

  const handleUserData = useCallback(() => {
    if (User) {
      setUserState(User);
      return <Navigate to="/home" />;
    } else {
      return <Navigate to="/signin" />;
    }
    // return push("/dashboard");
  }, []);

  useEffect(() => {
    handleUserData();
  }, [handleUserData, userState, User]);

  return <h1 className="text-4xl font-bold underline">Hello world!</h1>;
};

export default BaseScreen;
