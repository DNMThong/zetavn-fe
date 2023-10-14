"use client";
import useClickOutside from "@/hooks/useClickOutside";
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
}

const dataDropdown: IAccessModifier[] = [
  {
    icon: FiGlobe,
    iconSelector: FiGlobe,
    title: "Public",
    desc: "Anyone can see this publication.",
  },
  {
    icon: FiUsers,
    iconSelector: FiSmile,
    title: "Friends",
    desc: "Only friends can see this publication.",
  },
  {
    icon: FiUser,
    iconSelector: FiMeh,
    title: "Private",
    desc: "Only you can see this publication.",
  },
];

const AccessModifierDropdown = () => {
  const { show, setShow, nodeRefParent, nodeRefChild } = useClickOutside();
  const [selectorDropdown, setSelectorDropdown] = useState<IAccessModifier>({
    icon: FiUsers,
    iconSelector: FiSmile,
    title: "Friends",
    desc: "Only friends can see this publication.",
  });

  const handleSelectorDropdown = (item: IAccessModifier) => {
    setSelectorDropdown(item);
    setShow(false);
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
