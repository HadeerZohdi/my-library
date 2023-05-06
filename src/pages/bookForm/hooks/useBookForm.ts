import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { message } from "antd";
import { auth, db } from "../../../firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useUserStore } from "../../../store/userContext";

const initialState: booksDataInterface = {
  // id: Math.random(),
  title: "",
  author: "",
  readingStatus: "",
  pageCount: null, // for reading progress
  currentlyReading: null,
  bookType: "", // eBook or paper pack
  cover: "",
  category: "",
  description: "",
};

interface booksDataInterface {
  // id: number;
  title: string;
  author: string;
  readingStatus: string;
  pageCount: number | null; // for reading progress
  currentlyReading: number | null;
  bookType?: string; // eBook or paper pack
  cover?: string;
  category?: string;
  description?: string;
  notes?: string;
  review?: string;
}
const useBookForm = () => {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<booksDataInterface | any>();
  const [countError, setCountError] = useState(false);

  const navigate = useNavigate();
  const { userState } = useUserStore();

  const booksCollection = collection(db, "users");
  const location = useLocation();
  const openBook = location.state;

  const currUser: any = localStorage.getItem("@my-library");
  let User = JSON.parse(currUser);
  let userID = User?.userId;

  const docRef = doc(db, "users", userID);
  const colRef = collection(docRef, "books");

  const handleChangeForm = (name: string) => (event: any) => {
    setFormData((old: any) => ({
      ...old,
      [name]: event?.target ? event?.target?.value : event,
    }));
  };

  const handleChangeImg = (url: string) => {
    setFormData((old: any) => ({ ...old, cover: url }));
  };

  const getItemById = async () => {
    setIsEdit(true);
    // const book = doc(db, "books", openBook.id);
    const book = doc(colRef, openBook.id);
    const response = (await getDoc(book)).data();
    setFormData(response);
  };

  // Add a book
  const onAddBook = async (e: any) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.readingStatus) {
      message.error("Please fill all required fields *");
      return;
    }

    if (parseInt(formData?.currentlyReading) > parseInt(formData?.pageCount)) {
      return message.error(
        "Currently Reading Page must be less than Total Page Count"
      );
    }

    if (isEdit === true) {
      setLoading(true);
      // const book = doc(db, "books", openBook.id);
      const book = doc(colRef, openBook.id);
      const body = { ...formData };
      await updateDoc(book, body);
      setLoading(false);
      setIsEdit(false);
      navigate("/my-library");
    } else {
      setLoading(true);
      // await addDoc(booksCollection, formData);

      const bookData = { ...formData, id: docRef.id };
      await addDoc(colRef, {
        ...bookData,
      });

      setLoading(false);
      message.success("Book Added Successfully");
      setFormData(initialState);
      navigate("/my-library");
    }
  };

  useEffect(() => {
    if (openBook) getItemById();
  }, [openBook]);

  useEffect(() => {
    if (
      formData?.currentlyReading &&
      formData?.currentlyReading === formData?.pageCount
    ) {
      setFormData((old: any) => ({ ...old, readingStatus: "Finish" }));
    }
  }, [
    formData?.currentlyReading,
    formData?.pageCount,
    formData?.readingStatus,
  ]);

  return {
    loading,
    formData,
    handleChangeForm,
    handleChangeImg,
    onAddBook,
    navigate,
    countError,
  };
};

export default useBookForm;
