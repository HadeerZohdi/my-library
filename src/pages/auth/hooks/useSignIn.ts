import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
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
  const { setUserState, userState } = useUserStore();

  const handleChangeForm = (name: string) => (event: any) => {
    setFormData((old: any) => ({
      ...old,
      [name]: event.target.value,
    }));
  };

  const handleOnSubmitForm = async (e: any) => {
    e.preventDefault();
    if (!formData.email) {
      return message.error("Please enter your email");
    }
    if (!formData.password) {
      return message.error("Please enter your password");
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      if (auth.currentUser) {
        let User = {
          email: auth.currentUser.email,
          userId: auth.currentUser.uid,
        };
        localStorage.setItem("@my-library", JSON.stringify(User));
        setUserState(User);
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      //@ts-ignore
      message.error(error);
      setLoading(false);
    }
  };

  return { loading, formData, handleChangeForm, handleOnSubmitForm };
};

export default useSignIn;
