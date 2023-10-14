import React from "react";
import {
  FiCode,
  FiFileText,
  FiMonitor,
  FiPlus,
  FiServer,
} from "react-icons/fi";

const ComposeAddDropdown = () => {
  return (
    <div className="dropdown compose-dropdown is-spaced is-accent is-up dropdown-trigger">
      <div>
        <div className="add-button">
          <div className="button-inner">
            <FiPlus />
          </div>
        </div>
      </div>
      <div className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <a href="#" className="dropdown-item">
            <div className="media">
              <FiCode />
              <div className="media-content">
                <h3>Code snippet</h3>
                <small>Add and paste a code snippet.</small>
              </div>
            </div>
          </a>
          <a className="dropdown-item">
            <div className="media">
              <FiFileText />
              <div className="media-content">
                <h3>Note</h3>
                <small>Add and paste a note.</small>
              </div>
            </div>
          </a>
          <hr className="dropdown-divider" />
          <a className="dropdown-item">
            <div className="media">
              <FiServer />
              <div className="media-content">
                <h3>Remote file</h3>
                <small>Add a file from a remote drive.</small>
              </div>
            </div>
          </a>
          <a className="dropdown-item">
            <div className="media">
              <FiMonitor />
              <div className="media-content">
                <h3>Local file</h3>
                <small>Add a file from your computer.</small>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComposeAddDropdown;
