import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface DropdownItemProps {
   href?: string;
   className?: string;
   children: React.ReactNode;
   title: string;
   subTitle: string;
   onClick?: () => void;
}

const DropdownItem = ({
   href,
   className,
   children,
   title,
   subTitle,
   onClick,
}: DropdownItemProps) => {
   return (
      <Link
         href={href || "#"}
         className={`dropdown-item ${className}`}
         onClick={onClick}
      >
         <div className="media">
            {children}
            <div className="media-content">
               <h3>{title}</h3>
               <small>{subTitle}</small>
            </div>
         </div>
      </Link>
   );
};

export default DropdownItem;
