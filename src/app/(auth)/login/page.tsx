import { FakeNavbar } from "@/components/navbar";
import { Metadata } from "next";
import React from "react";
import FormLogin from "./_components/FormLogin";

export const metadata: Metadata = {
  title: "Zetavn | Đăng nhập",
  description: "Zetavn đăng nhập",
};

const LoginPage = () => {
  return (
    <>
      <FakeNavbar />

      <div className="container">
        {/* <!--Container--> */}
        <div className="login-container">
          <div className="columns is-vcentered">
            <div className="column is-6 image-column">
              {/* <!--Illustration--> */}
              <img
                className="light-image login-image"
                src="/img/illustrations/login/login.svg"
                alt=""
              />
              <img
                className="dark-image login-image"
                src="/img/illustrations/login/login-dark.svg"
                alt=""
              />
            </div>
            <div className="column is-6">
              <h2 className="form-title">Chào mừng bạn đã trở lại</h2>
              <h3 className="form-subtitle">
                Nhập thông tin đăng nhập để đăng nhập
              </h3>

              {/* <!--Form--> */}
              <FormLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
