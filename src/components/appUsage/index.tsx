import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const AppUsage = ({ openModal, setOpenModal }: Props) => {
  return (
    <Modal open={openModal} onCancel={() => setOpenModal(false)} footer={null}>
      <h5 className="text-center my-3">How To Use</h5>
      <div className="w-100 rounded shadow-sm p-3 d-flex flex-column">
        <p>
          This simple application is your digital tool for storing and tracking
          your reading progress, setting your reading goals, saving notes and
          reviews of books you read.
          <br />
          The home page shows the latest added 5 books, and your current reading
          list. The Library page shows all books you have added.
        </p>

        <div className="w-100">
          <h6>How does My Library work?</h6>
          <p>
            Start with adding a book, whether the book is a hard copy or a pdf
            version, you can fill in all data about your book for better
            progress tracking or just fill in the required inputs. You can also
            delete or edit a book.
          </p>
        </div>

        <div className="w-100">
          <h6>Can I upload my books?</h6>
          <p>
            No, the purpose of this application is to track your readings, set
            your reading goals, and save your notes and reviews for later.
          </p>
        </div>

        <div className="w-100">
          <h6>How can I track my reading progress?</h6>
          <p>
            You can track reading a specific book by adding the total page count
            and your current reading page.
            <br />
            You can update your Reading Status input or Current Reading Page
            input several times from Home's or Library's tables directly to
            track your progress.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AppUsage;
