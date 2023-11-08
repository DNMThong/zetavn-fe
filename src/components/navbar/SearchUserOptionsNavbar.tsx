import { SearchUserOption } from "@/types/contants.type";
import React from "react";

interface SearchUserOptionsNavbarProps {
  option: SearchUserOption;
  setOption: (option: SearchUserOption) => void;
  totalElement: number;
}

const optionsNavbar = [
  {
    title: "Tất cả",
    value: SearchUserOption.ALL,
  },
  {
    title: "Bạn bè",
    value: SearchUserOption.FRIENDS,
  },
  {
    title: "Người lạ",
    value: SearchUserOption.STRANGERS,
  },
];

const SearchUserOptionsNavbar = ({
  option,
  setOption,
  totalElement,
}: SearchUserOptionsNavbarProps) => {
  return (
    <div className="options-nav no-shadow">
      <div className="container is-fluid">
        <div className="nav-inner is-friends">
          <div className="option-tabs is-friends">
            {optionsNavbar.map((item) => (
              <a
                className={`option-tab ${
                  item.value === option ? "is-active" : ""
                }`}
                key={item.value}
                onClick={(e) => {
                  e.preventDefault();
                  setOption(item.value);
                }}>
                <span>{item.title}</span>
              </a>
            ))}
            <div className="option-naver"></div>
          </div>
          <div className="end-group">
            <div className="nav-item is-friend-count">
              {totalElement} kết quả
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUserOptionsNavbar;
