import { useState, useCallback, useEffect } from "react";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useUserStore } from "../../../store/userContext";

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { setUserState, userState } = useUserStore();

  const handleChangeForm = (name: string) => (event: any) => {
    setFormData((old: any) => ({
      ...old,
      [name]: event.target.value,
    }));
  };

  const handleOnSubmitForm = useCallback(
    async (e: any) => {
      e.preventDefault();
      if (!formData.email) {
        return message.error("Please enter your email");
      }
      if (!formData.password) {
        return message.error("Please enter your password");
      }

      try {
        setLoading(true);
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        if (auth.currentUser) {
          let User = {
            email: auth.currentUser.email,
            userId: auth.currentUser.uid,
          };
          localStorage.setItem("@my-library", JSON.stringify(User));
          setUserState(User);
          setLoading(false);
          navigate("/", { replace: true });
          window.location.reload();
        }
      } catch (error: any) {
        message.error(error);
        setLoading(false);
      }
    },
    [formData, navigate, userState]
  );

  return { loading, formData, handleChangeForm, handleOnSubmitForm };
};

export default useSignIn;
