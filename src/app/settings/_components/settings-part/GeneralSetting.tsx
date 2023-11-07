"use client";
import { RadioButton } from "@/components/checkbox";
import { Input, InputDate, InputHasIcon, TextArea } from "@/components/input";
import {
   useLazyGetUserQuery,
   useUpdateUserInfoMutation,
} from "@/redux/features/user/user.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Gender, SettingsTab } from "@/types/contants.type";
import { UserProfile } from "@/types/user.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { format } from "date-fns";
import {
   FiBook,
   FiMail,
   FiMapPin,
   FiPhone,
   FiUser,
   FiUsers,
} from "react-icons/fi";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/auth.slice";
import { setSessionData } from "@/utils/session.util";

interface IFormValues {
   firstName: string;
   lastName: string;
   gender: Gender;
   birthday: Date;
   email: string;
   username?: string;
   aboutMe?: string;
   livesIn?: string;
   worksAt?: string;
   studiedAt?: string;
   phone?: string;
}
const schema = yup.object({
   firstName: yup.string().required("Vui lòng nhập họ"),
   lastName: yup.string().required("Vui lòng nhập tên"),
   gender: yup
      .string()
      .oneOf<Gender>(Object.values(Gender))
      .default(Gender.MALE),
   birthday: yup.date().required("Vui lòng chọn ngày sinh"),
   phone: yup.string(),
   username: yup.string(),
   aboutMe: yup.string(),
   livesIn: yup.string(),
   worksAt: yup.string(),
   studiedAt: yup.string(),
   email: yup.string().required(),
});

const defaultValues: IFormValues = {
   firstName: "",
   lastName: "",
   gender: Gender.MALE,
   birthday: new Date(),
   email: "",
   username: "",
   aboutMe: "",
   livesIn: "",
   worksAt: "",
   studiedAt: "",
   phone: "",
};

const GeneralSetting = () => {
   const user = useAppSelector((selector) => selector.auth.user);
   const dispatch = useAppDispatch();
   const { control, handleSubmit, reset } = useForm<IFormValues>({
      defaultValues: defaultValues,
      resolver: yupResolver(schema),
      mode: "all",
   });
   const searchParams = useSearchParams();
   const tabQuery = searchParams.get("tab");
   const [showAdvance, setShowAdvance] = useState<boolean>(false);
   const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();
   const handleClickShowAdvance = (e: any) => {
      e.preventDefault();
      setShowAdvance((prev) => !prev);
   };
   const onSubmit: SubmitHandler<IFormValues> = async (values) => {
      const {
         email,
         firstName,
         lastName,
         gender,
         birthday,
         username,
         aboutMe,
         livesIn,
         worksAt,
         studiedAt,
         phone,
      } = values;

      try {
         const response = await updateUserInfo({
            userId: user?.id as string,
            info: {
               email,
               firstName,
               lastName,
               genderEnum: gender as string,
               birthday: birthday.toLocaleDateString("en-GB"),
               username: username as string,
               aboutMe: aboutMe as string,
               livesAt: livesIn as string,
               worksAt: worksAt as string,
               studiedAt: studiedAt as string,
               phone: phone as string,
            },
         }).unwrap();
         const { code, status, message, data } = response;
         if (code === 200) {
            toast.success("Cập nhật thông tin tài khoản cá nhân thành công!");
            setSessionData("userLogin", data);
            dispatch(setUser(data));
            reset({
               firstName: data?.firstName || "",
               lastName: data?.lastName || "",
               gender: data?.information?.genderEnum,
               birthday:
                  new Date(
                     data?.information?.birthday.split("/").reverse().join("-")
                  ) || "",
               username: data?.username === user?.id ? "" : data?.username,
               aboutMe: data?.information?.aboutMe || "",
               livesIn: data?.information?.livesAt || "",
               worksAt: data?.information?.worksAt || "",
               studiedAt: data?.information?.studiedAt || "",
               phone: data?.phone || "",
               email: data?.email || "",
            });
         } else if (code === 409 && status === "CONFLICT") {
            toast.info("Cập nhật thất bại!");
         } else {
            reset({
               firstName: user?.firstName || "",
               lastName: user?.lastName || "",
               gender: user?.information?.genderEnum,
               birthday:
                  new Date(
                     user?.information?.birthday.split("/").reverse().join("-")
                  ) || "",
               username: user?.username === user?.id ? "" : user?.username,
               aboutMe: user?.information?.aboutMe || "",
               livesIn: user?.information?.livesAt || "",
               worksAt: user?.information?.worksAt || "",
               studiedAt: user?.information?.studiedAt || "",
               phone: user?.phone || "",
               email: user?.email || "",
            });
            toast.error("Đã có lỗi xảy ra vui lòng thử lại");
         }
         console.log(response);
      } catch (e) {}
   };

   useEffect(() => {
      if (user) {
         console.log(
            "🚀 ~ file: GeneralSetting.tsx:169 ~ useEffect ~ user:",
            user
         );
         const date = new Date(
            user.information?.birthday.split("/").reverse().join("-") // Chuyển định dạng thành "yyyy-MM-dd"
         );
         reset({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            gender: (user?.information?.genderEnum as Gender) || Gender.MALE,
            birthday: date || "",
            username: user?.username === user?.id ? "" : user?.username,
            aboutMe: user?.information?.aboutMe || "",
            livesIn: user?.information?.livesAt || "",
            worksAt: user?.information?.worksAt || "",
            studiedAt: user?.information?.studiedAt || "",
            phone: user?.phone || "",
            email: user?.email || "",
         });
      }
   }, [reset, user]);

   return (
      <div
         id="general-settings"
         className={`settings-section ${
            tabQuery === SettingsTab.GENERAL ? "is-active" : ""
         }`}
      >
         <div className="settings-panel">
            <div className="title-wrap">
               <a className="mobile-sidebar-trigger">
                  <i data-feather="menu"></i>
               </a>
               <h2>General Settings</h2>
            </div>

            <div className="settings-form-wrapper">
               <div className="settings-form">
                  <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                     <div className="columns is-multiline">
                        <div className="column is-6">
                           {/* <!--Field--> */}
                           <InputHasIcon
                              control={control}
                              name="firstName"
                              label="Họ"
                              placeholder="Tên của bạn..."
                           >
                              <FiUser></FiUser>
                           </InputHasIcon>
                           {/* <!--Field--> */}
                           <InputHasIcon
                              control={control}
                              name="email"
                              label="Email"
                              placeholder="Email của bạn..."
                           >
                              <FiMail></FiMail>
                           </InputHasIcon>
                        </div>

                        <div className="column is-6">
                           {/* <!--Field--> */}
                           <InputHasIcon
                              control={control}
                              name="lastName"
                              label="Tên"
                              placeholder="Tên của bạn..."
                           >
                              <FiUser></FiUser>
                           </InputHasIcon>
                           <InputHasIcon
                              control={control}
                              name="phone"
                              label="Số điện thoại"
                              placeholder="Số điện thoại"
                           >
                              <FiUser></FiUser>
                           </InputHasIcon>
                        </div>

                        <div className="column is-6">
                           {/* <!--Field--> */}
                           <InputHasIcon
                              control={control}
                              name="username"
                              label="Tên tài khoản"
                              placeholder="Tên tài khoản"
                           >
                              <FiUser></FiUser>
                           </InputHasIcon>
                        </div>

                        <div className="column is-12">
                           {/* <!--Field--> */}
                           <div className="form-text">
                              <p>
                                 Be sure to fill out your location settings.
                                 This will help us suggest you relevant friends
                                 and places you could like.
                              </p>
                           </div>
                        </div>

                        {showAdvance && (
                           <>
                              <div className="column is-12">
                                 {/* <!--Field--> */}
                                 <TextArea
                                    control={control}
                                    name="aboutMe"
                                    label="Giới thiệu bản thân"
                                    placeholder="Giới thiệu về bản thân của bạn..."
                                 ></TextArea>
                              </div>
                              <div className="column is-12">
                                 {/* <!--Field--> */}
                                 <InputHasIcon
                                    control={control}
                                    name="livesIn"
                                    label="Nơi sống"
                                    placeholder="Đang sống tại..."
                                 >
                                    <FiMapPin></FiMapPin>
                                 </InputHasIcon>
                              </div>
                              <div className="column is-12">
                                 {/* <!--Field--> */}
                                 <InputHasIcon
                                    control={control}
                                    name="worksAt"
                                    label="Nơi làm việc"
                                    placeholder="Nơi bạn làm việc..."
                                 >
                                    <FiUser></FiUser>
                                 </InputHasIcon>
                              </div>
                              <div className="column is-12">
                                 {/* <!--Field--> */}
                                 <InputHasIcon
                                    control={control}
                                    name="studiedAt"
                                    label="Học tại"
                                    placeholder="Nơi bạn học..."
                                 >
                                    <FiMapPin></FiMapPin>
                                 </InputHasIcon>
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
                           </>
                        )}
                        <div className="column is-12">
                           <div className="buttons">
                              <button
                                 type="submit"
                                 className={`button is-solid accent-button form-button}`}
                              >
                                 Save Changes
                              </button>
                              <button
                                 className="button is-light form-button"
                                 onClick={handleClickShowAdvance}
                              >
                                 {!!showAdvance ? "Hide Advanced" : "Advanced"}
                              </button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>

               <div className="illustration">
                  <img
                     className="light-image"
                     src="assets/img/illustrations/settings/1.svg"
                     alt=""
                  />
                  <img
                     className="dark-image"
                     src="assets/img/illustrations/settings/1-dark.svg"
                     alt=""
                  />
                  <p>
                     If you would like to learn more about general settings, you
                     can read about it in the <a>user guide</a>.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default GeneralSetting;
