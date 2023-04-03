import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { message } from "antd";
import { db } from "../../../firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const initialState: booksDataInterface = {
  id: "",
  title: "",
  author: "",
  readingStatus: "",
  pageCount: undefined, // for reading progress
  currentlyReading: undefined,
  bookType: "", // eBook or paper pack
  cover: "",
  category: "",
  description: "",
};

interface booksDataInterface {
  id: string;
  title: string;
  author: string;
  readingStatus: string;
  pageCount: number | undefined; // for reading progress
  currentlyReading: number | undefined;
  bookType?: string; // eBook or paper pack
  cover?: string;
  category?: string;
  description?: string;
}
const useBookForm = () => {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<booksDataInterface | any>();
  const [countError, setCountError] = useState(false);

  const navigate = useNavigate();
  const booksCollection = collection(db, "books");
  const location = useLocation();
  const openBook = location.state;

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
    const book = doc(db, "books", openBook.id);
    const response = await getDoc(book);
    setFormData(response.data());
  };

  // Add a book
  const onAddBook = async (e: any) => {
    e.preventDefault();
    if (!formData?.title || !formData.author || !formData.readingStatus) {
      message.error("Please fill all required fields *");
      return;
    }
    if (isEdit === true) {
      setLoading(true);
      const book = doc(db, "books", openBook.id);
      const body = { ...formData };
      await updateDoc(book, body);
      setLoading(false);
      setIsEdit(false);
      navigate("/my-library");
    } else {
      setLoading(true);
      await addDoc(booksCollection, formData);
      setLoading(false);
      message.success("Book Added Successfully");
      setFormData(initialState);
      navigate("/my-library");
    }
  };

  const handleCountError = () => {
    if (formData?.pageCount < formData?.currentlyReading) {
      setCountError(true);
    } else {
      setCountError(false);
    }
  };

  useEffect(() => {
    if (openBook) getItemById();
  }, [openBook]);

  return {
    loading,
    formData,
    handleChangeForm,
    handleChangeImg,
    onAddBook,
    navigate,
    countError,
    handleCountError,
  };
};

export default useBookForm;
