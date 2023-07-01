import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./layout";
import Home from "./pages/home";
import MyLibrary from "./pages/myLibrary";
import AddBook from "./pages/bookForm";
import Signin from "./pages/auth/signin";
import Signup from "./pages/auth/signup";
import { AuthProvider } from "./store/authContext";
import { UserProvider } from "./store/userContext";
import "./index.css";

const User = localStorage.getItem("@my-library");

const router = createBrowserRouter([
  {
    path: "/",
    element: User ? <AppLayout /> : <Navigate to="signin" />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/my-library", element: <MyLibrary /> },
      { path: "/book-form", element: <AddBook /> },
    ],
  },
  { path: "signin", element: <Signin /> },
  { path: "signup", element: <Signup /> },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
