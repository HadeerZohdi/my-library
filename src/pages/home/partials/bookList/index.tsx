import { useMemo } from "react";
import { InputNumber, Spin, Table } from "antd";
import { useNavigate } from "react-router";
import useRequest from "../../../../globalRequestHook/useRequest";
import ProgressBar from "../../../../components/ProgressBar";

const BookList: React.FC = () => {
  const {
    loading,
    booksData,
    readingLoading,
    onDeleteBook,
    updateCurrentReading,
  } = useRequest();
  const navigate = useNavigate();

  let timer: any;

  // function debounce(func: (e: any, item: any) => void, timeout = 300) {
  //   let timer: any;
  //   return (...args: any) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => func, timeout);
  //   };
  // }

  // const processChange = debounce((e: any, item: any) =>
  //   updateCurrentReading(e, item)
  // );

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
            <img src={cover} alt="cover" className="cover-img " />
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
        dataIndex: "readingStatus",
        key: "readingStatus",
        render: (readingStatus: string) => (
          <p className="text-[var(--gray-color-6b)]">{readingStatus}</p>
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
                min={1}
                defaultValue={1}
                controls={false}
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
          return <ProgressBar progressPercent={percent} />;
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

  const handleHomeBookListView = useMemo(() => {
    return (
      <div className="w-100 py-4 px-4 px-sm-5 d-flex flex-column">
        <div className="w-100 d-flex flex-column">
          <h5 className="mb-4">Recently Added Books</h5>

          <div className="overflow-auto shadow-sm rounded">
            {loading ? (
              <div className="w-100 py-4 d-flex justify-content-center align-items-center">
                <Spin />
              </div>
            ) : (
              <Table
                pagination={false}
                columns={columsGenerator()}
                dataSource={booksData.slice(0, 5)}
              />
            )}
          </div>
        </div>

        <div className="w-100 mt-5 d-flex flex-column">
          <h5 className="mb-4">Currently Reading Books</h5>

          <div className="overflow-auto shadow-sm rounded">
            {loading ? (
              <div className="w-100 d-flex justify-content-center align-items-center">
                <Spin />
              </div>
            ) : (
              <Table
                pagination={false}
                columns={columsGenerator()}
                dataSource={booksData?.filter(
                  (item) => item?.readingStatus === "Reading"
                )}
              />
            )}
          </div>
        </div>
      </div>
    );
  }, [loading, booksData, readingLoading]);

  return <>{handleHomeBookListView}</>;
};

export default BookList;
