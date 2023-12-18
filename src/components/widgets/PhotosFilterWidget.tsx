import React from "react";
import { DropdownItem, WidgetDropdown } from "../dropdowns";
import useClickOutside from "@/hooks/useClickOutside";
import {
  FiBell,
  FiBookOpen,
  FiChevronDown,
  FiClock,
  FiCoffee,
  FiHeart,
  FiSearch,
  FiTag,
} from "react-icons/fi";

interface IDropdownItem {
  icon: any;
  href: string;
  title: string;
  subTitle: string;
}

const dropdownItems: IDropdownItem[] = [
  {
    icon: FiTag,
    href: "#",
    title: "Ảnh đã được gắn tag",
    subTitle: "Ảnh có được gắn tag với người dùng này.",
  },
  {
    icon: FiClock,
    href: "#",
    title: "Mới nhất",
    subTitle: "Xem những bức ảnh mới nhất.",
  },
  {
    icon: FiHeart,
    href: "#",
    title: "Phổ biến",
    subTitle: "Xem những bức ảnh phổ biến.",
  },
  {
    icon: FiBookOpen,
    href: "#",
    title: "Bộ sưu tập",
    subTitle: "Xem tất cả các bộ sưu tập",
  },
];

const PhotosFilterWidget = () => {
  return (
    <>
      <div className="box-heading">
        <WidgetDropdown
          wclassName="photos-dropdown is-neutral"
          button={
            <>
              <span>Tất cả ảnh</span>
              <FiChevronDown />
            </>
          }>
          {dropdownItems.map((item, index) => {
            return (
              <DropdownItem
                key={index}
                href={item.href}
                title={item.title}
                subTitle={item.subTitle}>
                {<item.icon />}
              </DropdownItem>
            );
          })}
          <hr className="dropdown-divider" />
          <a className="dropdown-item modal-trigger" data-modal="albums-modal">
            <div className="media">
              <i data-feather="plus"></i>
              <div className="media-content">
                <h3>Thêm ảnh</h3>
                <small>Tải ảnh lên.</small>
              </div>
            </div>
          </a>
        </WidgetDropdown>

        <div className="button-wrap">
          <button type="button" className="button is-active">
            Mới nhất
          </button>
          <button type="button" className="button">
            Bộ sưu tập
          </button>
        </div>
      </div>
    </>
  );
};

export default PhotosFilterWidget;
