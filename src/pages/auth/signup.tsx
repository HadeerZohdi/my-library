import React, { useMemo, useState } from "react";
import "./style.css";
import useSignUp from "./hooks/useSignUp";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import AppUsage from "../../components/appUsage";
import { Button } from "react-bootstrap";

const Signup = () => {
  const [openModal, setOpenModal] = useState(false);

  const { loading, formData, handleChangeForm, handleOnSubmitForm } =
    useSignUp();

  const handleFormView = useMemo(() => {
    return (
      <div className="w-100 h-100">
        <div className="bg-image-auth"></div>
        <div className="form-wrap mx-auto bg-white p-4">
          <h6 className="text-center">Sign up</h6>
          <p className="text-center text-secondary">
            sign up with your email and create your own library!
          </p>

          <form
            onSubmit={handleOnSubmitForm}
            className="d-flex flex-column gap-3 mt-4"
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                className="form-control"
                placeholder="Name"
                name="name"
                value={formData?.name}
                onChange={handleChangeForm("name")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email address
                <span className="text-danger ms-1">*</span>
              </label>
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
              <label htmlFor="password">
                Password
                <span className="text-danger ms-1">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={formData?.password}
                onChange={handleChangeForm("password")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password
                <span className="text-danger ms-1">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData?.confirmPassword}
                onChange={handleChangeForm("confirmPassword")}
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

            <Button
              variant="link"
              onClick={() => setOpenModal(true)}
              style={{
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#4169e1",
                color: "white",
                border: "none",
                alignSelf: "right",
                textDecoration: "none",
              }}
            >
              How to Use
            </Button>
            <p className="text-center text-secondary">
              Have an account?{" "}
              <Link to="/signin" style={{ textDecoration: "none" }}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }, [loading, formData, openModal]);

  return (
    <>
      <AppUsage openModal={openModal} setOpenModal={setOpenModal} />
      {handleFormView}
    </>
  );
};

export default Signup;
