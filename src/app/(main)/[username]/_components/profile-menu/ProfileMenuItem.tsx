import { useRouter } from "next/navigation";
import React from "react";

interface ProfileMenuItemProps {
   id?: string;
   title: string;
   href: string;
   className?: string;
   onClick?: (e: any) => void;
}

const ProfileMenuItem = ({
   id,
   title,
   href,
   className,
   onClick,
}: ProfileMenuItemProps) => {
   return (
      <div
         id={id}
         className={`button has-min-width ${className}`}
         onClick={onClick}
         data-href={href}
      >
         {title}
      </div>
   );
};

export default ProfileMenuItem;
