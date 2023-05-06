import { useEffect, useState } from "react";
import axios from "axios";

interface quotes {
  author: string;
  quote: string;
}

const useQuotes = () => {
  const [quotes, setQuotes] = useState<quotes[]>([
    {
      author: "",
      quote: "",
    },
  ]);

  const handleGetQuotes = async () => {
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/quotes?category=life&limit=6`,
      {
        headers: {
          "X-Api-Key": "wBABlp7DPiTdRWPRL041yw==10OO7Ih8ILUGtkAf",
        },
      }
    );
    setQuotes(response.data);
  };

  useEffect(() => {
    handleGetQuotes();
  }, []);

  return { quotes };
};

export default useQuotes;
