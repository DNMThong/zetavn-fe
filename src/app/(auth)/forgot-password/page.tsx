import { FakeNavbar } from "@/components/navbar";
import { Metadata } from "next";
import React from "react";
import FormForgotPassword from "./_components/FormForgotPassword";

export const metadata: Metadata = {
  title: "Zetavn | Quên mật khẩu",
  description: "Zetavn quên mật khẩu",
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
                src="/img/illustrations/login/forgot-password.png"
                alt=""
              />
              <img
                className="dark-image login-image"
                src="/img/illustrations/login/forgot-password.png"
                alt=""
              />
            </div>
            <div className="column is-6">
              <h2 className="form-title">Quên mật khẩu</h2>
              <h3 className="form-subtitle">
                Nhập thông tin để lấy lại mật khẩu
              </h3>

              {/* <!--Form--> */}
              <FormForgotPassword />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
