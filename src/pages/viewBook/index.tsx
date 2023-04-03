import { Button } from "react-bootstrap";
import { useParams } from "react-router";

const ViewBook = () => {
  const { bookId } = useParams();

  return (
    <div className="w-100 py-4 d-flex">
      <div>book</div>

      {/* Buttons */}
      <div className="min-vh-100 w-100 d-flex align-items-center justify-content-end mt-4">
        <Button
          className="btn btn-danger"
          style={{
            backgroundColor: "#a92635",
            border: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          // onClick={() => onEidtBook(bookId)}
          className="btn btn-success ms-2"
          style={{
            backgroundColor: "#26a99a",
            width: "100px",
            border: "none",
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ViewBook;
