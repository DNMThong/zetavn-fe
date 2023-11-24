"use client";
import { Input, InputDate } from "@/components/input";
import Link from "next/link";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { RadioButton } from "@/components/checkbox";
import { Gender } from "@/types/contants.type";
import { useRegisterMutation } from "@/redux/features/auth/auth.service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
  birthday: Date;
}

const schema = yup.object({
  firstName: yup.string().required("Vui lòng nhập họ"),
  lastName: yup.string().required("Vui lòng nhập tên"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Vui lòng nhập đúng định dạng email"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: yup
    .string()
    .required("Vui lòng xác nhận lại mật khẩu")
    .oneOf([yup.ref("password"), ""], "Mật khẩu xác nhận không khớp"),
  gender: yup
    .string()
    .oneOf<Gender>(Object.values(Gender))
    .default(Gender.MALE),
  birthday: yup.date().required("Vui lòng chọn ngày sinh"),
});

const defaultValues: IFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: Gender.MALE,
  birthday: new Date(),
};

const FormRegister = () => {
  const { control, handleSubmit, reset } = useForm<IFormValues>({
    defaultValues: defaultValues,
    // resolver: yupResolver(schema),
    mode: "all",
  });
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormValues> = async (values) => {
    console.log(values);
    // const { email, firstName, lastName, password, gender, birthday } = values;
    // try {
    //   const response = await register({
    //     email,
    //     firstName,
    //     lastName,
    //     password,
    //     gender,
    //     birthday: birthday.toISOString(),
    //   }).unwrap();
    //   const { code, status, message, data } = response;
    //   if (code === 200) {
    //     router.push(`/confirmation?u=${data.id}`);
    //   } else if (code === 409 && status === "CONFLICT") {
    //     toast.info("Email này đã được dùng!!!");
    //   } else {
    //     reset(defaultValues);
    //     toast.error("Đã có lỗi xảy ra vui lòng thử lại");
    //   }
    // } catch (err) {
    //   reset(defaultValues);
    //   toast.error("Đã có lỗi xảy ra vui lòng thử lại");
    //   console.log(err);
    // }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="login-form"
      style={{ margin: "0 auto" }}
      autoComplete="off">
      <div className="form-panel">
        <div className="columns is-multiline">
          <div className="column is-6">
            <Input
              control={control}
              name="firstName"
              label="Họ"
              placeholder="Họ của bạn..."
            />
          </div>
          <div className="column is-6">
            <Input
              control={control}
              name="lastName"
              label="Tên"
              placeholder="Tên của bạn..."
            />
          </div>
          <div className="column is-12">
            <Input
              control={control}
              name="email"
              label="Email"
              placeholder="Địa chỉ email của bạn..."
            />
          </div>
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
          <div className="column is-12">
            <InputDate
              control={control}
              placeholder="DD/MM/YYYY"
              name="birthday"
              label="Ngày sinh"
            />
          </div>

          <div className="column is-12">
            <div className="field">
              <label>Giới tính</label>
              <div className="is-flex">
                <RadioButton
                  control={control}
                  label="Nam"
                  name="gender"
                  value={Gender.MALE}
                />
                <RadioButton
                  control={control}
                  label="Nữ"
                  name="gender"
                  value={Gender.FEMALE}
                />
                <RadioButton
                  control={control}
                  label="Khác"
                  name="gender"
                  value={Gender.OTHER}
                />
              </div>
            </div>
          </div>

          {/* <div className="column is-12">
                  <div className="field is-flex">
                    <div className="switch-block">
                      <label className="f-switch">
                        <input type="checkbox" className="is-switch" />
                        <i></i>
                      </label>
                      <div className="meta">
                        <p>Subscribe to Newsletter?</p>
                      </div>
                    </div>
                  </div>
                </div> */}
        </div>
      </div>

      <div className="buttons mt-5">
        <button
          type="submit"
          className={`button is-solid primary-button is-fullwidth ${
            isLoading ? "is-loading" : "raised"
          }`}>
          Tạo tài khoản
        </button>
      </div>

      <div className="account-link has-text-centered">
        <Link href="/login">Bạn đã có tài khoản? Đăng nhập</Link>
      </div>
    </form>
  );
};

export default FormRegister;
