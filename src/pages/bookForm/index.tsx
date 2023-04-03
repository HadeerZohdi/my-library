import { useMemo } from "react";
import { Button } from "react-bootstrap";
import { Select, Spin, Input } from "antd";
import UploadPhoto from "../../components/UploadPhoto";
import useBookForm from "./hooks/useBookForm";

const AddBook = () => {
  const {
    loading,
    formData,
    handleChangeForm,
    handleChangeImg,
    onAddBook,
    navigate,
    countError,
    handleCountError,
  } = useBookForm();

  const handleFormView = useMemo(() => {
    if (loading) {
      return <Spin />;
    } else {
      return (
        <div className="min-vh-100 w-100 py-4 d-flex flex-column align-items-center justify-content-center">
          <form className="w-75 p-4 d-flex flex-column rounded shadow-sm">
            {/* Cover */}
            <div className="w-100 my-1 d-flex flex-column flex-sm-row align-items-start justify-content-between">
              <div className="d-flex flex-column align-items-start">
                <label htmlFor="title" className="my-2">
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
                  <label htmlFor="title" className="my-2">
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
                  <label htmlFor="author" className="my-2">
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
                <label htmlFor="pageCount" className="my-2">
                  Page Count
                </label>
                <Input
                  type="number"
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
                <label htmlFor="pageCount" className="my-2">
                  Currently Reading Page
                </label>

                <div className="w-100 d-flex flex-column">
                  <Input
                    type="number"
                    name="pageCount"
                    id="pageCount"
                    placeholder="Currently Reading"
                    allowClear
                    value={formData?.currentlyReading}
                    onChange={handleChangeForm("currentlyReading")}
                    onInput={handleCountError}
                    className="py-2 px-3"
                  />
                </div>
                {countError && (
                  <small className="text-danger">
                    Currently reading page must be less that total page count
                  </small>
                )}
              </div>
            </div>

            {/* Reading Status */}
            <div className="w-100 my-1 d-flex flex-column align-items-start">
              <label htmlFor="readingStatus" className="my-2">
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
                <label htmlFor="category" className="my-2">
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
                      value: "PaperPack",
                      label: "PaperPack",
                    },
                  ]}
                />
              </div>
            </div>

            {/* description */}
            <div className="w-100 my-1 d-flex flex-column align-items-start">
              <label htmlFor="description" className="my-2">
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

            {/* Buttons */}
            <div className="w-100 d-flex align-items-center justify-content-end mt-4">
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
