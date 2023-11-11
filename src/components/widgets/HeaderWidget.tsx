import React from "react";

interface HeaderWidgetProps {
   header: string;
   children: React.ReactNode;
}

const HeaderWidget = ({ header, children }: HeaderWidgetProps) => {
   return (
      <div className="box-heading">
         <h4>{header}</h4>
         {children}
      </div>
   );
};

export default HeaderWidget;
