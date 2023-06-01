import React, { useMemo } from "react";
import "./style.css";
import useSignIn from "./hooks/useSignIn";
import { Link } from "react-router-dom";
import { Spin } from "antd";

const Signin = () => {
  const { loading, formData, handleChangeForm, handleOnSubmitForm } =
    useSignIn();

  const handleFormView = useMemo(() => {
    return (
      <div className="w-100 h-100">
        <div className="bg-image-auth"></div>
        <div className="form-wrap mx-auto bg-white p-4">
          <h6 className="text-center">Sign in</h6>
          <p className="text-center text-secondary">
            enter your email and password and start using your library!
          </p>
          <form
            onSubmit={handleOnSubmitForm}
            className="d-flex flex-column gap-3 mt-4"
          >
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                value={formData?.email}
                onChange={handleChangeForm("email")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={formData?.password}
                onChange={handleChangeForm("password")}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: "20px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#F7A920",
                color: "white",
                border: "none",
                alignSelf: "right",
              }}
            >
              {loading ? <Spin /> : "Submit"}
            </button>

            <p className="text-center text-secondary">
              New to My Library?{" "}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }, [loading, formData]);

  return <>{handleFormView}</>;
};

export default Signin;
