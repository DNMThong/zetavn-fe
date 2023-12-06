"use client";
import {
  offCall,
  setCall,
  setIncomingCall,
} from "@/redux/features/chat/chat.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CallType, ImageDefault } from "@/types/contants.type";
import React, { useEffect, useState } from "react";
import { IoCall, IoVideocam, IoCloseOutline } from "react-icons/io5";

const IncomingCallModal = () => {
  const incomingCall = useAppSelector((selector) => selector.chat.incomingCall);
  const clientStomp = useAppSelector((selector) => selector.global.clientStomp);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleRejectIncomingCall = () => {
    if (clientStomp && incomingCall) {
      dispatch(offCall());
      clientStomp.publish({
        destination: "/app/reject-incoming-call",
        body: incomingCall.user.id,
      });
    }
  };

  const handleAcceptIncomingCall = () => {
    if (clientStomp && incomingCall) {
      dispatch(setCall(incomingCall));
      dispatch(setIncomingCall(null));
      window.open(
        `/call/${incomingCall.roomId}`,
        "_blank",
        `height=${screen.availHeight},width=${screen.availWidth}`
      );

      clientStomp.publish({
        destination: "/app/accept-incoming-call",
        body: incomingCall.user.id,
      });
    }
  };

  useEffect(() => {
    if (incomingCall) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [incomingCall]);

  return (
    <div
      className={`modal incoming-call-modal is-xsmall has-light-bg ${
        open ? "is-active" : ""
      }`}>
      <div className="modal-background"></div>
      {incomingCall && (
        <div className="modal-content">
          <div className="card">
            <div className="card-content">
              <button
                className="btn-close-incoming"
                onClick={handleRejectIncomingCall}>
                <IoCloseOutline />
              </button>
              <div className="content">
                <div className="content-img">
                  <img
                    src={incomingCall.user.avatar || ImageDefault.AVATAR}
                    alt=""
                  />
                </div>
                <span className="content-title">
                  {incomingCall.user.display} đang gọi cho bạn
                </span>
                <span className="content-desc">
                  Cuộc gọi sẽ bắt đầu khi bạn chấp nhận
                </span>
              </div>
              <div className="action">
                <div
                  className="action-item cancel"
                  onClick={handleRejectIncomingCall}>
                  <IoCloseOutline />
                </div>
                <div
                  className="action-item success"
                  onClick={handleAcceptIncomingCall}>
                  {incomingCall.callType === CallType.VOICE && <IoCall />}
                  {incomingCall.callType === CallType.VIDEO && <IoVideocam />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomingCallModal;
