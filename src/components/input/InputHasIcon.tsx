"use client";
import React from "react";
import {
   UseFormRegister,
   useController,
   UseControllerProps,
} from "react-hook-form";
import { FiCheck, FiX } from "react-icons/fi";

// has-validation has-success has-error

interface InputProps {
   name: string;
   label?: string;
   id?: string;
   placeholder?: string;
   type?: "text" | "password" | "date";
   control: any;
   children: React.ReactNode;
}

const InputHasIcon = ({
   label,
   name,
   placeholder,
   type = "text",
   id,
   control,
   children,
}: InputProps) => {
   const {
      field,
      fieldState: { error },
   } = useController({
      name,
      control,
   });
   return (
      <div className="field field-group">
         {label && <label htmlFor={id || name}>{label}</label>}
         <div
            className={`control has-icon has-validation ${
               error ? "has-error" : ""
            }`}
         >
            <input
               autoComplete="off"
               type={type}
               className="input is-fade"
               id={id || name}
               placeholder={placeholder}
               {...field}
            />
            {children && <div className="form-icon">{children}</div>}
            <div className="error-icon">
               <FiX />
            </div>
         </div>
         {error && (
            <span className="msg-error" style={{ paddingLeft: "40px" }}>
               {error.message}
            </span>
         )}
      </div>
   );
};

export default InputHasIcon;
