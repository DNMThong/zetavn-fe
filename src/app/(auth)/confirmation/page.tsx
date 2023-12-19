"use client";
import { ConfirmationDesc } from "@/components/confirmation";
import { FakeNavbar } from "@/components/navbar";
import { PageLoader } from "@/components/pageloader";
import { useSendConfirmationEmailMutation } from "@/redux/features/auth/auth.service";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ConfirmationPage = () => {
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [sendConfirmationEmail] = useSendConfirmationEmailMutation();
  const router = useRouter();

  useEffect(() => {
    const fetchSendConfirmationEmail = async () => {
      try {
        const response = await sendConfirmationEmail(
          params.get("u") || ""
        ).unwrap();

        if (response.code === 200) {
          setLoading(false);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSendConfirmationEmail();
  }, [params, router, sendConfirmationEmail]);

  if (loading) return <PageLoader />;
  return (
    <>
      <FakeNavbar />
      <div className="container">
        <ConfirmationDesc
          image="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
          title="Xác nhận tài khoản của bạn"
          content1="Tài khoản của bạn cần xác thực email để có thể tiếp tục sử dụng."
          content2=" Chúng tôi đã gửi một email xác nhận vào email của bạn vui lòng kiểm tra và xác nhận"
        />
      </div>
    </>
  );
};

export default ConfirmationPage;
