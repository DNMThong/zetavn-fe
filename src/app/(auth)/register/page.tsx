import { RadioButton } from "@/components/checkbox";
import { Input } from "@/components/input";
import { FakeNavbar } from "@/components/navbar";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import FormRegister from "./_components/FormRegister";

export const metadata: Metadata = {
   title: "Zetavn | Register",
   description: "Zetavn register",
};

const RegisterPage = () => {
   return (
      <>
         <FakeNavbar />
         <div className="container">
            {/* <!--Container--> */}
            <div className="login-container is-centered">
               <div className="columns is-vcentered">
                  <div className="column">
                     <h2 className="form-title has-text-centered">Chào bạn!</h2>
                     <h3 className="form-subtitle has-text-centered">
                        Hãy tạo tài khoản của bạn ở đây.
                     </h3>

                     {/* <!--Form--> */}
                     <FormRegister />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default RegisterPage;
