"use client";
import { Input } from "@/components/input";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "@/redux/features/auth/auth.service";
import { useAppDispatch } from "@/redux/hooks";
import {
  setAccessToken,
  setCredentials,
} from "@/redux/features/auth/auth.slice";
import { useRouter } from "next/navigation";
import { setSessionData } from "@/utils/session.util";

interface IFormValues {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Vui lòng nhập đúng định dạng email"),
  password: yup.string().required("Vui lòng nhập password"),
});

const FormLogin = () => {
  const { control, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "all",
  });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  console.log("loading", isLoading);

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const { email, password } = data;
    try {
      const response = await login({
        username: email,
        password,
      }).unwrap();
      const {
        code,
        data: { userInfo, access_token },
      } = response;
      if (code === 200) {
        setSessionData("userLogin", userInfo);
        dispatch(setAccessToken(access_token));
        router.push("/");
      }
    } catch (err) {
      console.log(err);
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
        <Input
          control={control}
          name="password"
          type="password"
          label="Mật khẩu"
          placeholder="Mật khẩu của bạn..."
        />
        <div className="field is-flex">
          <Link href="#">Quên mật khẩu?</Link>
        </div>
      </div>

      <div className="buttons">
        <button
          type="submit"
          className={`button is-solid primary-button is-fullwidth ${
            isLoading ? "is-loading" : "raised"
          }`}>
          Đăng nhập
        </button>
      </div>

      <div className="account-link has-text-centered">
        <Link href="/register">Bạn chưa có tài khoản? Đăng ký</Link>
      </div>
    </form>
  );
};

export default FormLogin;
