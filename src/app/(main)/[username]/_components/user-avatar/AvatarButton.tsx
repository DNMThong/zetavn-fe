import React from "react";
import { PlacesType, Tooltip } from "react-tooltip";

interface AvatarButtonProps {
   id?: string;
   className: string;
   dataPlacement: PlacesType;
   dataModal?: string;
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
         onClick={onClick}
         style={style}
      >
         {children}
         <Tooltip id={tooltipId} place={dataPlacement}></Tooltip>
      </div>
   );
};

export default AvatarButton;
