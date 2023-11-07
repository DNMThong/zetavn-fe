import React from "react";

interface OverlayProps {
   overlayClassName: string;
   children?: React.ReactNode;
}

const Overlay = ({ overlayClassName, children }: OverlayProps) => {
   return <div className={overlayClassName}>{children}</div>;
};

export default Overlay;
