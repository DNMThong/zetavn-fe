import useClickOutside from "@/hooks/useClickOutside";
import React from "react";
import { FiMoreVertical } from "react-icons/fi";

interface WidgetDropdownProps {
   wclassName?: string;
   dropdownClassName?: string;
   dropdownContentClassName?: string;
   children?: React.ReactNode;
   button?: any;
}

const WidgetDropdown = ({
   wclassName,
   dropdownClassName,
   dropdownContentClassName,
   children,
   button,
}: WidgetDropdownProps) => {
   const { show, setShow, nodeRefChild, nodeRefParent } =
      useClickOutside(false);

   const handleShowDropdown = () => {
      setShow((prev) => !prev);
   };
   return (
      <div
         className={`dropdown is-spaced dropdown-trigger ${wclassName} ${
            show ? "is-active" : ""
         }`}
         onClick={handleShowDropdown}
         ref={nodeRefParent}
      >
         <div>
            <div className="button">{button || <FiMoreVertical />}</div>
         </div>
         <div
            className={`dropdown-menu ${dropdownClassName}`}
            role="menu"
            ref={nodeRefChild}
         >
            <div className={`dropdown-content ${dropdownContentClassName}`}>
               {children}
            </div>
         </div>
      </div>
   );
};

export default WidgetDropdown;
