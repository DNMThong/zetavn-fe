import Link from "next/link";
import React from "react";

interface ConfirmationDescProps {
  image: string;
  title: string;
  content1: string;
  content2?: any;
}

const ConfirmationDesc = ({
  image,
  title,
  content1,
  content2,
}: ConfirmationDescProps) => {
  return (
    <div className="confirmation-email">
      <img src={image} alt="" />
      <h2 className="title">{title}</h2>
      <p className="text-content">{content1}</p>
      {content2 && <p className="text-content">{content2}</p>}
    </div>
  );
};

export default ConfirmationDesc;
