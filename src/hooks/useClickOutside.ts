import { useState, useRef, useEffect, RefObject, Dispatch } from "react";

type ReturnUseClickOutside = {
  show: boolean;
  setShow: Dispatch<React.SetStateAction<boolean>>;
  nodeRefParent: RefObject<HTMLDivElement>;
  nodeRefChild: RefObject<HTMLDivElement>;
};

const useClickOutside = (initialValue?: boolean): ReturnUseClickOutside => {
  const [show, setShow] = useState<boolean>(initialValue || false);
  const nodeRefParent = useRef<HTMLDivElement>(null);
  const nodeRefChild = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const elClick = e.target as HTMLElement;

      if (nodeRefParent.current && !nodeRefParent.current.contains(elClick)) {
        if (
          nodeRefChild.current &&
          !nodeRefChild.current.contains(elClick) &&
          document.body.contains(elClick)
        ) {
          setShow(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return { show, setShow, nodeRefParent, nodeRefChild };
};

export default useClickOutside;
