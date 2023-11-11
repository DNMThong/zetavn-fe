import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface TooltipProps {
   id: string;
   content?: string;
   className?: string;
   children?: React.ReactNode;
   place?: any;
   variant?: any;
}

const Tooltip = ({
   id,
   content,
   children,
   className,
   place,
   variant,
}: TooltipProps) => {
   return (
      <ReactTooltip
         place={place}
         variant={variant}
         className={className}
         data-tooltip-id={id}
         data-tooltip-content={content}
      ></ReactTooltip>
   );
};

export default Tooltip;
