import { Outlet } from "react-router";
import { Carousel } from "antd";
import Navbar from "./navbar/Navbar";
import "./style.css";

const AppLayout = () => {
  return (
    <div className="app d-flex">
      <div className="bg-image h-auto d-none d-sm-flex w-25"></div>

      <div className="body-width">
        <div className="bg-image-mobile w-100 h-25 d-flex d-sm-none"></div>
        <div className="content-body">
          <Navbar />
          <Outlet />

          <div className="w-100 d-flex justify-content-center py-2 bg-light shadow-lg">
            <small>
              Developed by: <span className="fw-bolder">Hadeer Zohdi</span>{" "}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
