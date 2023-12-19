"use client";
import { ConfirmationDesc } from "@/components/confirmation";
import { FakeNavbar } from "@/components/navbar";
import { PageLoader } from "@/components/pageloader";
import {
  useConfirmationEmailMutation,
  useSendConfirmationEmailMutation,
} from "@/redux/features/auth/auth.service";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ConfirmationEmail = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const params = useSearchParams();
  const [confirmationEmail] = useConfirmationEmailMutation();

  useEffect(() => {
    const fetchConfirmationEmail = async () => {
      try {
        const response = await confirmationEmail(
          params.get("t") || ""
        ).unwrap();

        if (response.code === 200) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchConfirmationEmail();
  }, [confirmationEmail, params]);

  if (loading) return <PageLoader />;
  return (
    <>
      <FakeNavbar />
      <div className="container">
        {success ? (
          <ConfirmationDesc
            image="https://cdn-icons-png.flaticon.com/512/10628/10628908.png"
            title="Thành công"
            content1="Tài khoản của bạn đã xác thực thành công."
            content2={
              <>
                Bạn có thể đăng nhập và sử dụng tài khoản mình{" "}
                <Link href="/login">đăng nhập</Link>
              </>
            }
          />
        ) : (
          <ConfirmationDesc
            image="https://cdn-icons-png.flaticon.com/512/9247/9247838.png"
            title="Thất bại"
            content1="Tài khoản của bạn xác thực không thành công."
            content2={<>Bạn có thể thử xác thực lại</>}
          />
        )}
      </div>
    </>
  );
};

export default ConfirmationEmail;
