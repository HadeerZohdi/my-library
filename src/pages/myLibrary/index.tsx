import { useMemo } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { Spin, Table, InputNumber, Select } from "antd";
import useRequest from "../../globalRequestHook/useRequest";
import ProgressBar from "../../components/ProgressBar";
import imagePlaceholder from "../../assets/placeholder.png";
import "../style.css";

const MyLibrary = () => {
  const {
    loading,
    readingLoading,
    booksData,
    onDeleteBook,
    updateCurrentReading,
    updateReadingStatus,
  } = useRequest();

  const navigate = useNavigate();

  function columsGenerator() {
    return [
      {
        title: "#",
        key: "indx",
        render: (item: any, record: any, indx: any) => <p>{indx + 1}</p>,
      },
      {
        title: "Book Cover",
        dataIndex: "cover",
        key: "cover",
        render: (cover: string) => (
          <div className="cover-img-div">
            {cover ? (
              <img src={cover} alt="cover" className="cover-img " />
            ) : (
              <img src={imagePlaceholder} alt="cover" className="cover-img " />
            )}
          </div>
        ),
      },
      {
        title: "Book Title",
        dataIndex: "title",
        key: "title",
        sorter: {
          compare: (a: { title: string }, b: { title: string }) =>
            a.title > b.title ? 1 : -1,
          multible: 0,
        },
        render: (title: string) => (
          <p className="text-[var(--black-color-11)] font-medium">{title}</p>
        ),
      },
      {
        title: "Author",
        dataIndex: "author",
        key: "author",
        sorter: {
          compare: (a: { author: string }, b: { author: string }) =>
            a.author > b.author ? 1 : -1,
          multible: 0,
        },
        render: (author: string) => (
          <p className="text-[var(--black-color-11)] font-medium">{author}</p>
        ),
      },

      {
        title: "Type",
        dataIndex: "bookType",
        key: "bookType",
        render: (bookType: string) => (
          <p className="text-[var(--gray-color-6b)]">{bookType}</p>
        ),
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        render: (category: string) => (
          <p className="text-[var(--gray-color-6b)]">{category}</p>
        ),
      },
      {
        title: "Reading Status",
        dataIndex: "",
        key: "",
        render: (item: any) => (
          <Select
            placeholder="Reading Status"
            showArrow
            allowClear
            style={{ width: "100%" }}
            value={item.readingStatus}
            // onChange={handleChangeForm("readingStatus")}
            onChange={(e) => updateReadingStatus(e, item)}
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
        ),
      },
      {
        title: "Page Count",
        dataIndex: "pageCount",
        key: "pageCount",
        render: (pageCount: number) => (
          <p className="text-[var(--gray-color-6b)]">{pageCount}</p>
        ),
      },
      {
        title: "Reading Page",
        dataIndex: "",
        key: "",
        editable: true,
        render: (item: any) => {
          if (readingLoading) {
            return <Spin />;
          } else {
            return (
              <InputNumber
                disabled={!item.pageCount || item.pageCount == 0}
                min={1}
                defaultValue={null}
                controls={false}
                type="number"
                style={{ width: "60px" }}
                value={item.currentlyReading}
                // onChange={(e) => updateCurrentReading(e, item)}
                onBlur={(e) => updateCurrentReading(e, item)}
                onPressEnter={(e) => updateCurrentReading(e, item)}
              />
            );
          }
        },
      },

      {
        title: "Reading Progress",
        key: "progress",
        render: (item: any) => {
          let percent = (item?.currentlyReading / item?.pageCount) * 100;
          return (
            <ProgressBar
              progressPercent={item.readingStatus === "Finish" ? 100 : percent}
            />
          );
        },
      },

      {
        title: "",
        key: "edit",
        render: (item: any) => (
          <p
            onClick={() => {
              navigate("/book-form", { state: item });
            }}
            className="cursor-pointer link-primary text-decoration-underline"
          >
            <small>Edit</small>
          </p>
        ),
      },
      {
        title: "",
        key: "delete",
        render: (item: any) => (
          <p
            onClick={() => onDeleteBook(item.id)}
            className="cursor-pointer link-danger text-decoration-underline"
          >
            <small>Delete</small>
          </p>
        ),
      },
    ];
  }

  const handleLibraryView = useMemo(() => {
    return (
      <div className="w-100 min-vh-100 p-4 d-flex flex-column align-items-center">
        <div className="w-100 mb-4 d-flex align-items-center justify-content-between">
          <h6 className="mb-2">MyLibrary</h6>
          <Button
            onClick={() => navigate("/book-form")}
            className="btn btn-success"
            style={{
              backgroundColor: "#F7A920",
              width: "150px",
              border: "none",
            }}
          >
            Add a Book
          </Button>
        </div>

        <div className="h-100 w-100 overflow-auto shadow-sm rounded">
          {loading ? (
            <div className="w-100 py-4 d-flex justify-content-center align-items-center">
              <Spin />
            </div>
          ) : (
            <Table
              pagination={false}
              columns={columsGenerator()}
              dataSource={booksData}
            />
          )}
        </div>
      </div>
    );
  }, [loading, booksData]);

  return <>{handleLibraryView}</>;
};

export default MyLibrary;

// item.readingStatus === "Finish" ||
//                   parseInt(item.currentlyReading) > parseInt(item.pageCount)
//                     ? item.pageCount
//                     : item.readingStatus === "Plan to read"
//                     ? 0
//                     :

// (item.pageCount != null &&
//   parseInt(item.currentlyReading) === parseInt(item.pageCount)) ||
// parseInt(item.currentlyReading) > parseInt(item.pageCount)
//   ? "Finish"
//   : parseInt(item.currentlyReading) == 0
//   ? "Plan to read"
//   :
