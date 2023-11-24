import React from "react";

interface AvatarButtonProps {
   id?: string;
   className: string;
   dataPlacement: string;
   dataModal?: string;
   dataTitle: string;
   children: React.ReactNode;
   show: boolean;
   onClick?: any;
   style?: any;
   tooltipId?: string;
   tooltipContent?: string;
}

const AvatarButton = ({
   id,
   className,
   dataPlacement,
   dataTitle,
   tooltipId,
   tooltipContent,
   children,
   show,
   onClick,
   style,
}: AvatarButtonProps) => {
   return (
      <div
         id={id}
         className={`pop-button has-tooltip ${className} ${
            show ? "is-active" : ""
         }`}
         data-tooltip-content={tooltipContent}
         data-tooltip-id={tooltipId}
         data-placement={dataPlacement}
         data-title={dataTitle}
         onClick={onClick}
         style={style}
      >
         {children}
      </div>
   );
};

export default AvatarButton;
