import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout";
import Home from "./pages/home";
import MyLibrary from "./pages/myLibrary";
import HowToUse from "./pages/howToUse";
import ViewBook from "./pages/viewBook";
import AddBook from "./pages/bookForm";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/my-library", element: <MyLibrary /> },
      { path: "/how-to-use", element: <HowToUse /> },
      { path: "/view-book/:bookId", element: <ViewBook /> },
      { path: "/book-form", element: <AddBook /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
