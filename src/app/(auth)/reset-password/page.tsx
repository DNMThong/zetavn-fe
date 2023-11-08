import { RadioButton } from "@/components/checkbox";
import { Input } from "@/components/input";
import { FakeNavbar } from "@/components/navbar";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import FormResetPassword from "./_components/FormResetPassword";

export const metadata: Metadata = {
  title: "Zetavn | Xác nhận mật khẩu mới",
  description: "Zetavn xác nhận mật khẩu mới",
};

const ResetPasswordPage = () => {
  return (
    <>
      <FakeNavbar />
      <div className="container">
        {/* <!--Container--> */}
        <div className="login-container is-centered">
          <div className="columns is-vcentered">
            <div className="column">
              <h2 className="form-title has-text-centered">Đặt lại mật khẩu</h2>
              <h3 className="form-subtitle has-text-centered">
                Hãy nhập mật khẩu của bạn ở đây.
              </h3>

              {/* <!--Form--> */}
              <FormResetPassword />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
