import { useCallback, useContext, useEffect, useState } from "react";
import { message } from "antd";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useUserStore } from "../store/userContext";

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

const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const [readingLoading, setReadingLoading] = useState(false);
  const [booksData, setBooksData] = useState<booksDataInterface[]>([]);

  const { userState, setUserState } = useUserStore();
  // const booksCollection = collection(db, "books");

  const currUser: any = localStorage.getItem("@my-library");
  let User = JSON.parse(currUser);
  let userID = User?.userId;

  const docRef = doc(db, "users", userID);
  const colRef = collection(docRef, "books");

  // Get user data
  const getUserData = useCallback(async () => {
    const col = collection(db, "users");
    const user = doc(col, userID);
    const userData = (await getDoc(user)).data();
    if (userData) {
      setUserState(userData);
      localStorage.setItem("@my-library", JSON.stringify(userData));
    }
  }, [userID]);

  // Get all books from firebase
  const getAllBooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getDocs(colRef);
      setBooksData(
        response?.docs?.map((doc: any) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  }, [booksData, userID]);

  // Delete a book
  const onDeleteBook = async (id: string) => {
    setLoading(true);
    // const book = doc(db, "books", id);
    const book = doc(colRef, id);

    await deleteDoc(book);
    getAllBooks();
    setLoading(false);
    message.success("Book Deleted Successfully");
  };

  // edit curretlyReading page
  const updateCurrentReading = useCallback(
    async (e: any, item: any) => {
      if (item.currentlyReading === e.target.value) return;
      setReadingLoading(true);

      if (parseInt(e.target.value) >= parseInt(item.pageCount)) {
        item.readingStatus = "Finish";
        e.target.value = item.pageCount;
      } else if (e.target.value == 0) {
        item.readingStatus = "Plan to read";
      } else {
        item.readingStatus = "Reading";
      }

      const book = doc(colRef, item.id);
      const body = { ...item, currentlyReading: e.target.value };

      await updateDoc(book, body);
      // fetching data after update
      const response = await getDocs(colRef);
      setBooksData(
        response.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      );
      setReadingLoading(false);
    },
    [booksData]
  );

  // edit reading status
  const updateReadingStatus = useCallback(
    async (e: any, item: any) => {
      if (item.readingStatus === e) return;
      // const book = doc(db, "books", item.id);

      if (e === "Finish") {
        item.currentlyReading = item.pageCount;
      }
      if (e === "Plan to read") {
        item.currentlyReading = 0;
      }

      const book = doc(colRef, item.id);
      const body = { ...item, readingStatus: e };
      await updateDoc(book, body);

      // fetching data after update
      const response = await getDocs(colRef);
      setBooksData(
        response.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      );
    },
    [booksData]
  );

  useEffect(() => {
    getUserData();
    getAllBooks();
  }, []);

  return {
    loading,
    readingLoading,
    booksData,
    onDeleteBook,
    updateCurrentReading,
    updateReadingStatus,
    getUserData,
  };
};

export default useRequest;
