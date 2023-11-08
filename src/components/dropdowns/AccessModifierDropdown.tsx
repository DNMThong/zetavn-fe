"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { setAccessModifier } from "@/redux/features/post/post.slice";
import { useAppDispatch } from "@/redux/hooks";
import { PostAccessModifier } from "@/types/contants.type";
import { useState, useEffect } from "react";
import {
  FiGlobe,
  FiUser,
  FiUsers,
  FiMeh,
  FiSmile,
  FiChevronDown,
} from "react-icons/fi";
interface IAccessModifier {
  icon: any;
  iconSelector: any;
  title: string;
  desc: string;
  value: PostAccessModifier;
}

const dataDropdown: IAccessModifier[] = [
  {
    icon: FiGlobe,
    iconSelector: FiGlobe,
    title: "Công khai",
    desc: "Mọi người có thể thấy.",
    value: PostAccessModifier.PUBLIC,
  },
  {
    icon: FiUsers,
    iconSelector: FiSmile,
    title: "Bạn bè",
    desc: "Chỉ có bạn bè mới có thể thấy.",
    value: PostAccessModifier.FRIENDS,
  },
  {
    icon: FiUser,
    iconSelector: FiMeh,
    title: "Riêng tư",
    desc: "Chỉ mình bạn có thể thấy.",
    value: PostAccessModifier.PRIVATE,
  },
];

const AccessModifierDropdown = () => {
  const { show, setShow, nodeRefParent, nodeRefChild } = useClickOutside();
  const [selectorDropdown, setSelectorDropdown] = useState<IAccessModifier>(
    dataDropdown[1]
  );
  const dispatch = useAppDispatch();

  const handleSelectorDropdown = (item: IAccessModifier) => {
    setSelectorDropdown(item);
    setShow(false);
    dispatch(setAccessModifier(item.value));
  };

  return (
    <div
      className={`dropdown is-spaced is-modern is-right is-neutral dropdown-trigger ${
        show ? "is-active" : ""
      }`}>
      <div onClick={() => setShow((prev) => !prev)} ref={nodeRefParent}>
        <button className="button" aria-haspopup="true">
          {<selectorDropdown.iconSelector className="main-icon" />}
          <span>{selectorDropdown.title}</span>
          <FiChevronDown className="caret" />
        </button>
      </div>
      <div className="dropdown-menu" role="menu" ref={nodeRefChild}>
        <div className="dropdown-content">
          {dataDropdown.map((item: IAccessModifier) => (
            <a
              className="dropdown-item"
              key={item.title}
              onClick={() => handleSelectorDropdown(item)}>
              <div className="media">
                {<item.icon />}
                <div className="media-content">
                  <h3>{item.title}</h3>
                  <small>{item.desc}</small>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessModifierDropdown;
