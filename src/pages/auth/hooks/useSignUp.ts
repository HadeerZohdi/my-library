import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../store/authContext";
import { message } from "antd";
import { useUserStore } from "../../../store/userContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //@ts-ignore
  // const { signUp } = useAuth();
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
    if (!formData.password || !formData.confirmPassword) {
      return message.error("Password and Confirm Password can not be empty");
    }

    if (formData.confirmPassword !== formData.password) {
      return message.error("Passwords do not match");
    }

    try {
      setLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      ).then((cred) => {
        const docRef = setDoc(doc(db, "users", cred.user.uid), {
          email: formData?.email,
          name: formData?.name,
          userId: cred.user.uid,
        });

        let User = {
          name: formData?.name,
          email: cred.user.email,
          userId: cred.user.uid,
        };
        localStorage.setItem("@my-library", JSON.stringify(User));
        setUserState(User);
        navigate("/", { replace: true });
        window.location.reload();
      });

      // if (response.user) {
      //   let User = { ...response.user };
      //   localStorage.setItem("@my-library", JSON.stringify(User));
      //   setUserState(User);
      //   navigate("/");
      // }
    } catch (error) {
      //@ts-ignore
      message.error(error?.message);
      setLoading(false);
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   if (!userState?.email) {
  //     const User: any = localStorage.getItem("@my-library");
  //     const userData = JSON.parse(User);
  //     setUserState(userData);
  //   }
  // }, [userState]);

  return { loading, formData, handleChangeForm, handleOnSubmitForm };
};

export default useSignUp;
