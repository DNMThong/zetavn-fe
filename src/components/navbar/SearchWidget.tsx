"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { UserShort } from "@/types/user.type";
import { removeDiacritics } from "@/utils/search.util";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { KeyboardEvent, useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchWidgetProps {
  classNameWapper: string;
  onClose?: () => void;
  mobile?: boolean;
}

const SearchWidget = ({
  classNameWapper,
  onClose,
  mobile = false,
}: SearchWidgetProps) => {
  const friends = useAppSelector((selector) => selector.auth.friends);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<UserShort[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (searchValue) {
      const query = removeDiacritics(searchValue.toLowerCase());
      const suggestionFriends = friends.filter((item) => {
        const keyword = removeDiacritics(item.display.toLowerCase());
        return keyword.includes(query);
      });
      setSuggestions(suggestionFriends);
    } else {
      setSuggestions([]);
    }
  }, [searchValue, friends]);

  const handleCloseSearch = () => {
    setSearchValue("");
    if (onClose) {
      onClose();
    }
  };

  const handleSeeMore = () => {
    router.push(`/search?q=${searchValue}&o=all&p=1`);
    setSearchValue("");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      router.push(`/search?q=${searchValue}&o=all&p=1`);
      setSearchValue("");
    }
  };

  return (
    <div className={classNameWapper}>
      <div className="control">
        <input
          autoComplete="off"
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          id={mobile ? "tipue_drop_input_mobile" : "tipue_drop_input"}
          className="input is-rounded"
          type="text"
          placeholder="Tìm kiếm"
          value={searchValue}
        />

        {mobile ? (
          <>
            <div className="form-icon">
              <FiSearch />
            </div>
            <div className="close-icon" onClick={handleCloseSearch}>
              <FiX />
            </div>
          </>
        ) : (
          <>
            {searchValue && (
              <span className="reset-search" onClick={handleCloseSearch}>
                <FiX />
              </span>
            )}
            <span className="search-icon">
              <FiSearch />
            </span>
          </>
        )}

        {searchValue && (
          <div
            id={mobile ? "tipue_drop_content_mobile" : "tipue_drop_content"}
            className="tipue-drop-content">
            <div className="tipue_drop_box">
              <div id="tipue_drop_wrapper">
                {suggestions.map((suggestion) => (
                  <Link
                    href={`/${suggestion.username}`}
                    key={suggestion.id + suggestion.display}>
                    <div className="tipue_drop_item">
                      <div className="tipue_drop_left">
                        <Image
                          src={suggestion.avatar || ""}
                          alt=""
                          width={300}
                          height={300}
                          className="tipue_drop_image"
                        />
                      </div>
                      <div className="tipue_drop_right">
                        {suggestion.display}
                        {/* <div>
                          <small>Influencer, PARIS</small>
                        </div> */}
                      </div>
                    </div>
                  </Link>
                ))}
                <div onClick={handleSeeMore} className="tipue_drop_item_other">
                  <div className="searchIcon">
                    <FiSearch />
                  </div>
                  <span>Tìm kiếm {searchValue}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchWidget;
