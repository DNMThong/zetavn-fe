"use client";
import React, { FC, useRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { useController } from "react-hook-form";
import { FiCheck, FiX } from "react-icons/fi";

registerLocale("vi", vi);

interface InputDateProps {
  name: string;
  label?: string;
  id?: string;
  placeholder?: string;
  control: any;
}

const InputDate = ({
  id,
  name,
  label,
  placeholder,
  control,
}: InputDateProps) => {
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
        <DatePicker
          locale={vi}
          dateFormat="dd/MM/yyyy"
          wrapperClassName="custom-date-picker"
          placeholderText={placeholder}
          className="input"
          selected={field.value}
          {...field}
        />
        <div className="error-icon">
          <FiX />
        </div>
      </div>
      {error && <span className="msg-error">{error.message}</span>}
    </div>
  );
};

export default InputDate;
