import React from "react";
import { FiX } from "react-icons/fi";

const ChatDetail = () => {
  return (
    <div id="chat-panel" className="chat-panel is-opened">
      <div className="panel-inner">
        <div className="panel-header">
          <h3>Details</h3>
          <div className="panel-close">
            <FiX />
          </div>
        </div>
        <div className="panel-body is-user-details">
          <div className="panel-body-inner">
            <div className="subheader">
              <div className="action-icon">
                <i className="mdi mdi-video"></i>
              </div>
              <div className="action-icon">
                <i className="mdi mdi-camera"></i>
              </div>
              <div className="action-icon">
                <i className="mdi mdi-microphone"></i>
              </div>
              {/* {{> user-details-dropdown}} */}
            </div>

            <div className="details-avatar">
              <img src="https://via.placeholder.com/300x300" alt="" />
              <div className="call-me">
                <i className="mdi mdi-phone"></i>
              </div>
            </div>

            <div className="user-meta has-text-centered">
              <h3>Dan Walker</h3>
              <h4>IOS Developer</h4>
            </div>

            <div className="user-badges">
              <div className="hexagon is-red">
                <div>
                  <i className="mdi mdi-heart"></i>
                </div>
              </div>
              <div className="hexagon is-green">
                <div>
                  <i className="mdi mdi-dog"></i>
                </div>
              </div>
              <div className="hexagon is-accent">
                <div>
                  <i className="mdi mdi-flash"></i>
                </div>
              </div>
              <div className="hexagon is-blue">
                <div>
                  <i className="mdi mdi-briefcase"></i>
                </div>
              </div>
            </div>

            <div className="user-about">
              <label>About Me</label>
              <div className="about-block">
                <i className="mdi mdi-domain"></i>
                <div className="about-text">
                  <span>Works at</span>
                  <span>
                    <a className="is-inverted" href="#">
                      WebSmash Inc.
                    </a>
                  </span>
                </div>
              </div>
              <div className="about-block">
                <i className="mdi mdi-school"></i>
                <div className="about-text">
                  <span>Studied at</span>
                  <span>
                    <a className="is-inverted" href="#">
                      Riverdale University
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
