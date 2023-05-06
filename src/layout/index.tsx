import { Outlet } from "react-router";
import { Carousel } from "antd";
import Navbar from "./navbar/Navbar";
import "./style.css";
import QuotesCarousel from "./QuotesCarousel";
import { useUserStore } from "../store/userContext";
import logo from "../assets/my-library-fav.png";

import { auth } from "../firebase";

const AppLayout = () => {
  const { userState } = useUserStore();

  return (
    <div className="app d-flex">
      <div className="bg-image h-auto d-none d-sm-flex w-25">
        <div className="quotes">
          <div className="user-library ">
            <img src={logo} alt="logo" className="w-25" />
            <h6 className="mt-2"> {`${userState?.name}'s Library`}</h6>
          </div>

          <div className="quotes-wrap">
            <QuotesCarousel />
          </div>
        </div>
      </div>

      <div className="body-width">
        <div className="bg-image-mobile w-100 d-flex d-sm-none">
          {/* <div className="quotes-mobile">
            <QuotesCarousel />
          </div> */}
          <div className="user-library ">
            <img src={logo} alt="logo" className="w-25" />
            <h6 className="mt-2"> {`${userState?.name}'s Library`}</h6>
          </div>
        </div>

        <div className="content-body">
          <Navbar />
          <Outlet />
        </div>

        <div className="w-100 d-flex flex-column flex-sm-row align-items-center justify-content-between bg-light shadow-lg px-4 py-2 flex-shrink-0">
          <small>
            Developed by: <span className="fw-bolder">Hadeer Zohdi</span>
          </small>
          <small>
            Contact:{" "}
            <a className="fw-bolder" href="mailto:hadeer.zohdi@gmail.com">
              hadeer.zohdi@gmail.com
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
