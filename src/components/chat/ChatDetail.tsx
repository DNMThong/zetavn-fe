"use client";
import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCall, setOpenChatDetails } from "@/redux/features/chat/chat.slice";
import { CallStatus, CallType, ImageDefault } from "@/types/contants.type";
import { useRouter } from "next/navigation";
import { generateShortId } from "@/utils/random.util";

const ChatDetail = () => {
  const { openChatDetails, userContactSelected } = useAppSelector(
    (selector) => selector.chat
  );
  const dispatch = useAppDispatch();
  const handleCloseChatDetails = () => {
    dispatch(setOpenChatDetails(false));
  };

  const router = useRouter();

  const handleVoiceCall = () => {
    if (userContactSelected) {
      const randomId = generateShortId(5);
      const { isOnline, ...userCall } = userContactSelected;
      dispatch(
        setCall({
          user: userCall,
          status: CallStatus.OUT_GOING,
          callType: CallType.VOICE,
          roomId: randomId,
        })
      );
      window.open(
        `/call/${randomId}`,
        "_blank",
        `height=${screen.availHeight},width=${screen.availWidth}`
      );
    }
  };

  const handleVideoCall = () => {
    if (userContactSelected) {
      const randomId = generateShortId(5);
      const { isOnline, ...userCall } = userContactSelected;
      dispatch(
        setCall({
          user: userCall,
          status: CallStatus.OUT_GOING,
          callType: CallType.VIDEO,
          roomId: randomId,
        })
      );
      window.open(
        `/call/${randomId}`,
        "_blank",
        `height=${screen.availHeight},width=${screen.availWidth}`
      );
    }
  };

  return (
    <div
      id="chat-panel"
      className={`chat-panel ${openChatDetails ? "is-opened" : ""}`}>
      <div className="panel-inner">
        {userContactSelected && (
          <>
            <div className="panel-header">
              <h3>Thông tin</h3>
              <div className="panel-close" onClick={handleCloseChatDetails}>
                <FiX />
              </div>
            </div>
            <div className="panel-body is-user-details">
              <div className="panel-body-inner">
                <div className="subheader">
                  <div className="action-icon" onClick={handleVoiceCall}>
                    <i className="mdi mdi-phone"></i>
                  </div>
                  <div className="action-icon" onClick={handleVideoCall}>
                    <i className="mdi mdi-video"></i>
                  </div>
                  <div className="action-icon">
                    <i className="mdi mdi-microphone"></i>
                  </div>
                  {/* {{> user-details-dropdown}} */}
                </div>

                <div className="details-avatar">
                  <img
                    src={userContactSelected?.avatar || ImageDefault.AVATAR}
                    alt=""
                  />
                  <div className="call-me">
                    <i className="mdi mdi-phone"></i>
                  </div>
                </div>

                <div className="user-meta has-text-centered">
                  <h3>{userContactSelected?.display}</h3>
                  {/* <h4>IOS Developer</h4> */}
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

                {/* <div className="user-about">
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
        </div> */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatDetail;
