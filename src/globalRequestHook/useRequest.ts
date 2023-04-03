import { useEffect, useState } from "react";
import { message } from "antd";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

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

  const booksCollection = collection(db, "books");

  // Get all books from firebase
  const getAllBooks = async () => {
    setLoading(true);
    const response = await getDocs(booksCollection);
    setBooksData(
      response.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
    );
    setLoading(false);
  };

  // Delete a book
  const onDeleteBook = async (id: string) => {
    setLoading(true);
    const book = doc(db, "books", id);
    await deleteDoc(book);
    getAllBooks();
    setLoading(false);
    message.success("Book Deleted Successfully");
  };

  // edit curretlyReading page
  const updateCurrentReading = async (e: any, item: any) => {
    if (item.currentlyReading === e.target.value) return;
    setReadingLoading(true);
    const book = doc(db, "books", item.id);
    const body = { ...item, currentlyReading: e.target.value };

    await updateDoc(book, body);
    // fetching data after update
    const response = await getDocs(booksCollection);
    setBooksData(
      response.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
    );
    setReadingLoading(false);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return {
    loading,
    readingLoading,
    booksData,
    onDeleteBook,
    updateCurrentReading,
  };
};

export default useRequest;
