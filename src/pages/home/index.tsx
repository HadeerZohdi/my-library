import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import BookList from "./partials/bookList";

import "../style.css";
import { useUserStore } from "../../store/userContext";

const Home = () => {
  const { userState } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className="w-100 min-vh-100 py-4 d-flex flex-column align-items-center">
      <div className="w-75 my-3 d-flex flex-column align-items-center">
        <h6 className="mb-3">Hi, {userState?.name}!</h6>
        <h6 className="mb-3">Reading a new book? Awesome!</h6>
        <Button
          onClick={() => navigate("/book-form")}
          className="btn btn-success"
          style={{
            backgroundColor: "#F7A920",
            width: "200px",
            border: "none",
          }}
        >
          Add a Book
        </Button>
      </div>

      <BookList />
    </div>
  );
};

export default Home;
