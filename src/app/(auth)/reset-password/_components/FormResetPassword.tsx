"use client";
import { Input, InputDate } from "@/components/input";
import Link from "next/link";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { RadioButton } from "@/components/checkbox";
import { Gender } from "@/types/contants.type";
import {
  useRegisterMutation,
  useResetPasswordMutation,
} from "@/redux/features/auth/auth.service";
import { toast } from "react-toastify";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface IFormValues {
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: yup
    .string()
    .required("Vui lòng xác nhận lại mật khẩu")
    .oneOf([yup.ref("password"), ""], "Mật khẩu xác nhận không khớp"),
});

const defaultValues: IFormValues = {
  password: "",
  confirmPassword: "",
};

const FormResetPassword = () => {
  const { control, handleSubmit, reset } = useForm<IFormValues>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
    mode: "all",
  });
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const params = useSearchParams();

  const onSubmit: SubmitHandler<IFormValues> = async (values) => {
    const response = await resetPassword({
      token: params.get("t") || "",
      password: values.password,
    }).unwrap();
    if (response.code === 200) {
      toast.success("Đặt lại mật khẩu thành công");
      router.push("/login");
    } else {
      toast.warning("Đã có lỗi xảy ra vui lòng xác nhận lại");
      router.push("/forgot-password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="login-form"
      style={{ margin: "0 auto" }}
      autoComplete="off">
      <div className="form-panel">
        <div className="columns is-multiline">
          <div className="column is-12">
            <Input
              control={control}
              name="password"
              type="password"
              label="Mật khẩu"
              placeholder="Mật khẩu của bạn..."
            />
          </div>
          <div className="column is-12">
            <Input
              control={control}
              name="confirmPassword"
              type="password"
              label="Xác nhận mật khẩu"
              placeholder="Xác nhận lại mật khẩu..."
            />
          </div>
        </div>
      </div>

      <div className="buttons mt-5">
        <button
          type="submit"
          className={`button is-solid primary-button is-fullwidth ${
            isLoading ? "is-loading" : "raised"
          }`}>
          Đặt lại mật khẩu
        </button>
      </div>
    </form>
  );
};

export default FormResetPassword;
