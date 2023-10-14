import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchWidget = () => {
  return (
    <div className="navbar-item">
      <div id="global-search" className="control">
        <input
          id="tipue_drop_input"
          className="input is-rounded"
          type="text"
          placeholder="Search"
          required
        />
        <span id="clear-search" className="reset-search">
          <FiX />
        </span>
        <span className="search-icon">
          <FiSearch />
        </span>
        <div id="tipue_drop_content" className="tipue-drop-content" />
      </div>
    </div>
  );
};

export default SearchWidget;
