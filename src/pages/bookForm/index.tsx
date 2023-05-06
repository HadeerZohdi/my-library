import { useMemo } from "react";
import { Button } from "react-bootstrap";
import { Select, Spin, Input, Tooltip } from "antd";
import UploadPhoto from "../../components/UploadPhoto";
import useBookForm from "./hooks/useBookForm";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const AddBook = () => {
  const {
    loading,
    formData,
    handleChangeForm,
    handleChangeImg,
    onAddBook,
    navigate,
    countError,
  } = useBookForm();

  const handleFormView = useMemo(() => {
    if (loading) {
      return <Spin />;
    } else {
      return (
        <div className="min-vh-100 w-100 py-4 d-flex flex-column align-items-center justify-content-center">
          <form className="w-75 p-4 d-flex flex-column rounded shadow-sm">
            <h5>Book Information</h5>
            {/* Cover */}
            <div className="w-100 my-1 d-flex flex-column flex-sm-row align-items-start justify-content-between">
              <div className="d-flex flex-column align-items-start">
                <label htmlFor="title" className="my-2 fw-semibold">
                  Book Cover
                </label>

                <UploadPhoto
                  handleChangeImg={handleChangeImg}
                  image={formData?.cover}
                />
              </div>

              <div className="w-100 ms-sm-4 d-flex flex-column align-items-start">
                {/* Title */}
                <div className="w-100 my-1 d-flex flex-column align-items-start">
                  <label htmlFor="title" className="my-2 fw-semibold">
                    Book Title <span className="text-danger">*</span>
                  </label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Book Title"
                    allowClear
                    value={formData?.title}
                    onChange={handleChangeForm("title")}
                    className="py-2 px-3"
                  />
                </div>

                {/* Author */}
                <div className="w-100 my-1 d-flex flex-column align-items-start">
                  <label htmlFor="author" className="my-2 fw-semibold">
                    Book Author <span className="text-danger">*</span>
                  </label>
                  <Input
                    type="text"
                    name="author"
                    id="author"
                    placeholder="Book Author"
                    allowClear
                    value={formData?.author}
                    onChange={handleChangeForm("author")}
                    className="py-2 px-3"
                  />
                </div>
              </div>
            </div>

            <div className="my-1 d-flex flex-column flex-sm-row align-items-start justify-content-between">
              {/* Page Count */}
              <div className="w-100 me-sm-3 my-1 d-flex flex-column align-items-start">
                <label htmlFor="pageCount" className="my-2 fw-semibold">
                  Page Count
                </label>
                <Input
                  // type="number"
                  name="pageCount"
                  id="pageCount"
                  placeholder="Totla Page Count"
                  allowClear
                  value={formData?.pageCount}
                  onChange={handleChangeForm("pageCount")}
                  className="py-2 px-3"
                />
              </div>

              {/* Currently Reading */}
              <div className="w-100 my-1 d-flex flex-column align-items-start">
                <label htmlFor="currentlyReading" className="my-2 fw-semibold">
                  Currently Reading Page
                </label>

                <div className="w-100 d-flex flex-column">
                  <Input
                    // type="number"
                    name="currentlyReading"
                    id="currentlyReading"
                    placeholder="Currently Reading"
                    allowClear
                    value={
                      formData?.readingStatus === "Finish"
                        ? formData?.pageCount
                        : formData?.currentlyReading
                    }
                    onChange={handleChangeForm("currentlyReading")}
                    className="py-2 px-3"
                  />
                </div>

                <small className="text-muted ms-1">
                  Must be less that total page count
                </small>
              </div>
            </div>

            {/* Reading Status */}
            <div className="w-100 mb-1 d-flex flex-column align-items-start">
              <label htmlFor="readingStatus" className="my-2 fw-semibold">
                Reading Status <span className="text-danger">*</span>
              </label>
              <Select
                placeholder="Reading Status"
                showArrow
                allowClear
                style={{ width: "100%" }}
                value={formData?.readingStatus}
                onChange={handleChangeForm("readingStatus")}
                options={[
                  {
                    value: "Reading",
                    label: "Reading",
                  },
                  {
                    value: "Finish",
                    label: "Finish",
                  },
                  {
                    value: "Plan to read",
                    label: "Plan to read",
                  },
                ]}
              />
            </div>

            {/* Category */}
            <div className="w-100 my-1 d-flex flex-column flex-sm-row align-items-center justify-content-between">
              <div className="w-100 me-sm-3 d-flex flex-column align-items-start">
                <label htmlFor="category" className="my-2 fw-semibold">
                  Category
                </label>
                <Select
                  placeholder="Categories"
                  showArrow
                  allowClear
                  style={{ width: "100%" }}
                  value={formData?.category}
                  onChange={handleChangeForm("category")}
                  options={[
                    {
                      value: "Novel",
                      label: "Novel",
                    },
                    {
                      value: "Fiction",
                      label: "Fiction",
                    },
                    {
                      value: "Academic",
                      label: "Academic",
                    },
                    {
                      value: "Other",
                      label: "Other",
                    },
                  ]}
                />
              </div>

              {/* Book Type */}
              <div className="w-100 d-flex flex-column align-items-start">
                <label htmlFor="bookType" className="my-2">
                  Book Type
                </label>

                <Select
                  placeholder="Book Type"
                  showArrow
                  allowClear
                  style={{ width: "100%" }}
                  value={formData?.bookType}
                  onChange={handleChangeForm("bookType")}
                  options={[
                    {
                      value: "eBook",
                      label: "eBook",
                    },
                    {
                      value: "Hard Copy",
                      label: "Hard Copy",
                    },
                  ]}
                />
              </div>
            </div>

            {/* description */}
            <div className="w-100 my-1 d-flex flex-column align-items-start">
              <label htmlFor="description" className="my-2 fw-semibold">
                Description
              </label>
              <Input.TextArea
                name="description"
                id="description"
                allowClear
                placeholder="Book Description"
                value={formData?.description}
                onChange={handleChangeForm("description")}
                className="py-2 px-3"
              />
            </div>

            {/* Your Ideas Corner */}
            <div className="w-100 my-4 d-flex flex-column align-items-start border-top py-3">
              <h5>Your Ideas Corner</h5>

              {/* Notes/Quotes */}
              <div className="w-100 my-1 d-flex flex-column align-items-start">
                <label
                  htmlFor="notes"
                  className="my-2 fw-semibold d-flex align-items-center"
                >
                  Quotes and Notes
                  <Tooltip
                    title="memorize important things!"
                    className="mx-2 cursor-pointer"
                  >
                    <ExclamationCircleOutlined />
                  </Tooltip>
                </label>
                <Input.TextArea
                  name="notes"
                  id="notes"
                  allowClear
                  placeholder="save your favorite quotes and notes about your book"
                  value={formData?.notes}
                  onChange={handleChangeForm("notes")}
                  className="py-2 px-3"
                />
              </div>

              {/* Review */}
              <div className="w-100 my-1 d-flex flex-column align-items-start">
                <label
                  htmlFor="review"
                  className="my-2 fw-semibold d-flex align-items-center"
                >
                  Book Review
                  <Tooltip
                    title="save your review and share later with your friends"
                    className="mx-2 cursor-pointer"
                  >
                    <ExclamationCircleOutlined />
                  </Tooltip>
                </label>
                <Input.TextArea
                  name="review"
                  id="review"
                  allowClear
                  placeholder="Book Review"
                  value={formData?.review}
                  onChange={handleChangeForm("review")}
                  className="py-2 px-3"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="w-100 d-flex align-items-center justify-content-end mt-1">
              <Button
                onClick={() => navigate(-1)}
                className="btn btn-danger"
                style={{
                  backgroundColor: "#a92635",
                  border: "none",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={onAddBook}
                className="btn btn-success ms-2"
                style={{
                  backgroundColor: "#F7A920",
                  width: "100px",
                  border: "none",
                }}
              >
                {loading ? <Spin /> : "Save"}
              </Button>
            </div>
          </form>
        </div>
      );
    }
  }, [loading, formData, countError]);

  return <>{handleFormView}</>;
};

export default AddBook;
