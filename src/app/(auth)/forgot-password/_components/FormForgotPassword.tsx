"use client";
import { Input } from "@/components/input";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useForgotPasswordMutation,
  useLoginMutation,
} from "@/redux/features/auth/auth.service";
import { useAppDispatch } from "@/redux/hooks";
import {
  setAccessToken,
  setCredentials,
} from "@/redux/features/auth/auth.slice";
import { useRouter } from "next/navigation";
import { setSessionData } from "@/utils/session.util";
import { toast } from "react-toastify";

interface IFormValues {
  email: string;
}

const schema = yup.object({
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Vui lòng nhập đúng định dạng email"),
});

const FormForgotPassword = () => {
  const { control, handleSubmit, reset } = useForm<IFormValues>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
    mode: "all",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const response = await forgotPassword(data.email).unwrap();
    if (response.code === 200) {
      reset({
        email: "",
      });
      toast.success("Vui lòng kiểm tra email để xác nhận lấy lại mật khẩu", {
        autoClose: false,
      });
    } else {
      toast.warning("Đã có lỗi xảy ra vui lòng kiểm tra lại");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="login-form"
      autoComplete="off">
      <div className="form-panel">
        <Input
          control={control}
          name="email"
          label="Email"
          placeholder="Địa chỉ email của bạn..."
        />
      </div>
      <div className="buttons mt-10">
        <button
          type="submit"
          className={`button is-solid primary-button is-fullwidth ${
            isLoading ? "is-loading" : "raised"
          }`}>
          Tiếp tục
        </button>
      </div>

      <div className="account-link has-text-centered">
        <Link href="/login">Bạn có muốn quay lại đăng nhập? Đăng nhập</Link>
      </div>
    </form>
  );
};

export default FormForgotPassword;
