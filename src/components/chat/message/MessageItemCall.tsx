import { MessageCall } from "@/types/chat.type";
import { CallType, MessageCallStatus } from "@/types/contants.type";
import { calculateTimeSeconds } from "@/utils/calculate-time.util";
import React from "react";
import { BsFillTelephoneFill, BsFillTelephoneXFill } from "react-icons/bs";
import { MdCallMissed, MdMissedVideoCall, MdVideoCall } from "react-icons/md";

interface MessageItemCallProps {
  data: MessageCall;
  isSent: boolean;
}

const MessageItemCall = ({ data, isSent }: MessageItemCallProps) => {
  return (
    <div className="message-content message-call">
      <div
        className={`mc-icon ${
          (data.status === MessageCallStatus.MISSED ||
            data.status === MessageCallStatus.REJECTED) &&
          !isSent
            ? "is-missed"
            : ""
        }`}>
        {data.type === CallType.VOICE && (
          <>
            {data.status === MessageCallStatus.MISSED && (
              <BsFillTelephoneXFill />
            )}
            {data.status === MessageCallStatus.REJECTED && (
              <BsFillTelephoneXFill />
            )}
            {data.status === MessageCallStatus.SUCCESS && (
              <BsFillTelephoneFill />
            )}
          </>
        )}

        {data.type === CallType.VIDEO && (
          <>
            {data.status === MessageCallStatus.MISSED && <MdMissedVideoCall />}
            {data.status === MessageCallStatus.REJECTED && (
              <MdMissedVideoCall />
            )}
            {data.status === MessageCallStatus.SUCCESS && <MdVideoCall />}
          </>
        )}
      </div>
      <div className="mc-left">
        {data.status === MessageCallStatus.SUCCESS && (
          <>
            <span className="mcl-title">
              {data.type === CallType.VIDEO && "Cuộc gọi video"}
              {data.type === CallType.VOICE && "Cuộc gọi thoại"}
            </span>
            <span className="mcl-content">
              {calculateTimeSeconds(data.duration)}
            </span>
          </>
        )}
        {data.status === MessageCallStatus.MISSED && (
          <>
            <span className="mcl-title">
              {data.type === CallType.VIDEO &&
                (isSent ? "Cuộc gọi video" : "Đã bỏ lỡ cuộc gọi video")}
              {data.type === CallType.VOICE &&
                (isSent ? "Cuộc gọi thoại" : "Đã bỏ lỡ cuộc gọi thoại")}
            </span>
          </>
        )}
        {data.status === MessageCallStatus.REJECTED && (
          <>
            <span className="mcl-title">
              {data.type === CallType.VIDEO &&
                (isSent ? "Cuộc gọi video" : "Đã bỏ lỡ cuộc gọi video")}
              {data.type === CallType.VOICE && 
                (isSent ? "Cuộc gọi thoại" : "Đã bỏ lỡ cuộc gọi thoại")}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageItemCall;
