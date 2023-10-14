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
}

const Input = ({
  label,
  name,
  placeholder,
  type = "text",
  id,
  control,
}: InputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  return (
    <div className="field">
      {label && <label htmlFor={id || name}>{label}</label>}
      <div className={`control has-validation ${error ? "has-error" : ""}`}>
        <input
          type={type}
          className="input"
          id={id || name}
          placeholder={placeholder}
          {...field}
        />
        <div className="error-icon">
          <FiX />
        </div>
        {/* <div className="success-icon">
          <i data-feather="check"></i>
          <FiCheck />
        </div> */}
      </div>
      {error && <span className="msg-error">{error.message}</span>}
    </div>
  );
};

export default Input;
