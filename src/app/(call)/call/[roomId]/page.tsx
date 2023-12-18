"use client";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef, useState } from "react";
import {
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
  MdCallEnd,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  addChatMessageSelectedHead,
  addUserContactNew,
  offCall,
} from "@/redux/features/chat/chat.slice";
import {
  CallStatus,
  CallType,
  ImageDefault,
  MessageCallStatus,
  MessageType,
} from "@/types/contants.type";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  useCreateChatMessageMutation,
  useLazyGetTokenCallQuery,
} from "@/redux/features/chat/chat.service";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { v4 as uuidv4 } from "uuid";
import { calculateTimeSeconds } from "@/utils/calculate-time.util";
import { CreateChatMessagesRequest } from "@/types/request.type";
import { setLocalStorageItem } from "@/utils/localstorage.util";

const CallPage = () => {
  const user = useAppSelector((selector) => selector.auth.user);
  const call = useAppSelector((selector) => selector.chat.call);
  const rejectedCall = useAppSelector((selector) => selector.chat.rejectedCall);
  const clientStomp = useAppSelector((selector) => selector.global.clientStomp);
  const dispatch = useDispatch();
  const [openVideo, setOpenVideo] = useState(true);
  const [muteMic, setMuteMic] = useState(false);
  const [muteCam, setMuteCam] = useState(false);
  const [acceptCall, setAcceptCall] = useState(false);
  const [getTokenCall] = useLazyGetTokenCallQuery();
  const [tokenCall, setTokenCall] = useState("");
  const [zgVar, setZgVar] = useState<ZegoExpressEngine | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [publishStream, setPublishStream] = useState("");
  const [muteCamRemote, setMuteCamRemote] = useState(true);
  // const [muteMicRemote, setMuteMicRemote] = useState(false);
  const [timeCall, setTimeCall] = useState(0);
  const timeRef = useRef<any>();

  useEffect(() => {
    if (rejectedCall) {
      if (zgVar && localStream && publishStream && call) {
        zgVar.destroyStream(localStream);
        zgVar.stopPublishingStream(publishStream);
        zgVar.logoutRoom(call.roomId);
      }
      if (clientStomp && call) {
        if (call.status === CallStatus.OUT_GOING) {
          const message: CreateChatMessagesRequest = {
            recieverId: call.user.id || "",
            message: "",
            type: MessageType.CALL,
            call: {
              duration: timeCall,
              status: acceptCall
                ? MessageCallStatus.SUCCESS
                : rejectedCall
                ? MessageCallStatus.REJECTED
                : MessageCallStatus.MISSED,
              type: call.callType,
            },
          };
          setLocalStorageItem("messageCall", message);
        }

        window.close();
      }
    }
  }, [rejectedCall]);

  useEffect(() => {
    if (zgVar && localStream) {
      zgVar.mutePublishStreamVideo(localStream, muteCam);
      // const videoTrack = localStream.getVideoTracks()[0];
      // if (videoTrack) {
      //   videoTrack.enabled = !muteCam;
      // }
    }
    setOpenVideo(!muteCam);
  }, [muteCam]);

  useEffect(() => {
    if (zgVar && localStream) {
      zgVar.mutePublishStreamAudio(localStream, muteMic);
    }
  }, [muteMic]);

  useEffect(() => {
    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const startCall = async () => {
      if (call && user) {
        const appId: number = parseInt(process.env.ZEGO_APP_ID as string);
        const serverSercet: string = process.env.ZEGO_SERVER_SECRET as string;
        const zg = new ZegoExpressEngine(appId, serverSercet);
        setZgVar(zg);

        zg.on("remoteCameraStatusUpdate", (streamId, status) => {
          setMuteCamRemote(status === "MUTE");
        });

        // zg.on("remoteMicStatusUpdate", (streamId, status) => {
        //   setMuteMicRemote(status==="MUTE")
        // });

        zg.on(
          "roomStreamUpdate",
          async (roomId, updateType, streamList, extendedData) => {
            if (updateType === "ADD") {
              const rmStream = document.getElementById("remote-stream");
              const el = document.createElement(
                call.callType === CallType.VIDEO ? "video" : "audio"
              );
              el.id = streamList[0].streamID;
              el.autoplay = true;
              el.muted = false;
              if (el instanceof HTMLVideoElement) el.playsInline = true;
              if (rmStream) rmStream.appendChild(el);

              zg.startPlayingStream(streamList[0].streamID, {
                audio: true,
                video: true,
              }).then((stream) => {
                if (stream) {
                  el.srcObject = stream;
                  timeRef.current = setInterval(() => {
                    setTimeCall((prev) => prev + 1);
                  }, 1000);
                }
              });
            } else if (
              updateType === "DELETE" &&
              zg &&
              localStream &&
              streamList[0].streamID
            ) {
              zg.destroyStream(localStream);
              zg.stopPublishingStream(streamList[0].streamID);
              zg.logoutRoom(call.roomId);
              dispatch(offCall());
            }
          }
        );
        const result = await zg.loginRoom(
          call.roomId,
          tokenCall,
          {
            userID: user.id,
            userName: user.display,
          },
          { userUpdate: true }
        );
        if (result) {
          const _localStream = await zg.createStream({
            camera: {
              audio: true,
              video: call.callType === CallType.VIDEO,
            },
          });
          const localStreamEl = document.getElementById("local-stream");

          const element = document.createElement(
            call.callType === CallType.VIDEO ? "video" : "audio"
          );
          element.autoplay = true;
          element.muted = true;
          if (element instanceof HTMLVideoElement) element.playsInline = true;

          if (localStreamEl) localStreamEl.appendChild(element);

          element.srcObject = _localStream;

          const streamId = new Date().getTime().toString();
          setPublishStream(streamId);
          setLocalStream(_localStream);
          zg.startPublishingStream(streamId, _localStream);
        }
      }
    };
    if (tokenCall) {
      startCall();
    }
  }, [tokenCall]);

  useEffect(() => {
    const fetchGetTokenCall = async () => {
      const rs = await getTokenCall().unwrap();
      if (rs.code === 200) {
        setTokenCall(rs.data.token);
      }
    };
    if (user) {
      fetchGetTokenCall();
    }
  }, [user, getTokenCall]);

  useEffect(() => {
    if (clientStomp && clientStomp.connected && call && user) {
      if (call.status === CallStatus.OUT_GOING) {
        const request = {
          type: call.callType,
          roomId: call.roomId,
          to: call.user.id,
          from: {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            display: user.display,
            avatar: user.avatar,
            poster: user.poster,
          },
        };
        clientStomp.publish({
          destination: "/app/outgoing-call",
          body: JSON.stringify(request),
        });

        clientStomp.subscribe(`/user/${user.id}/topic/accept-call`, () => {
          setAcceptCall(true);
        });
      } else if (call?.status === CallStatus.IN_COMING) {
        setTimeout(() => {
          setAcceptCall(true);
        }, 1000);
      }
    }
  }, [clientStomp, call, user]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (clientStomp && call) {
        if (!rejectedCall) {
          clientStomp.publish({
            destination: "/app/reject-incoming-call",
            body: call.user.id,
          });
        }

        if (call.status === CallStatus.OUT_GOING) {
          const message: CreateChatMessagesRequest = {
            recieverId: call.user.id || "",
            message: "",
            type: MessageType.CALL,
            call: {
              duration: timeCall,
              status: acceptCall
                ? MessageCallStatus.SUCCESS
                : rejectedCall
                ? MessageCallStatus.REJECTED
                : MessageCallStatus.MISSED,
              type: call.callType,
            },
          };
          setLocalStorageItem("messageCall", message);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [acceptCall, call, clientStomp, rejectedCall, timeCall]);

  const handleCloseCall = () => {
    if (zgVar && localStream && publishStream && call) {
      zgVar.destroyStream(localStream);
      zgVar.stopPublishingStream(publishStream);
      zgVar.logoutRoom(call.roomId);
    }
    if (clientStomp && call) {
      window.close();
    }
  };

  if (!call) return <></>;

  if (!user) return <></>;

  return (
    <div className="call-wrapper">
      {call.callType === CallType.VIDEO && (
        <div
          className={`call-video ${openVideo ? "is-active" : ""}`}
          onClick={() => setOpenVideo((prev) => !prev)}>
          <div className="action">
            {openVideo ? <FiChevronRight /> : <FiChevronLeft />}
          </div>
          {muteCam && (
            <div className="call-info">
              <img
                className="avatar"
                src={user.avatar || ImageDefault.AVATAR}
                alt=""
              />
            </div>
          )}
          <div id="local-stream" className={`${muteCam ? "hidden" : ""}`}></div>
        </div>
      )}
      <div className="call-main">
        {(call.callType !== CallType.VIDEO ||
          (call.callType === CallType.VIDEO && muteCamRemote)) && (
          <div className="call-info">
            <img
              className="avatar"
              src={call.user.avatar || ImageDefault.AVATAR}
              alt=""
            />
            <span className="display-name">{call.user.display}</span>
            <span className="status">
              {acceptCall ? calculateTimeSeconds(timeCall) : "Đang gọi"}
            </span>
          </div>
        )}
        <div
          id="remote-stream"
          className={`${muteCamRemote ? "hidden" : ""}`}></div>
      </div>
      <div className="call-action">
        {call.callType === CallType.VIDEO && (
          <div
            className={`action-item ${muteCam ? "is-active" : ""}`}
            onClick={() => setMuteCam((prev) => !prev)}>
            {muteCam ? <MdVideocamOff /> : <MdVideocam />}
          </div>
        )}
        <div
          className={`action-item ${muteMic ? "is-active" : ""}`}
          onClick={() => setMuteMic((prev) => !prev)}>
          {muteMic ? <MdMicOff /> : <MdMic />}
        </div>
        <div className="action-item is-red" onClick={handleCloseCall}>
          <MdCallEnd />
        </div>
      </div>
    </div>
  );
};

export default CallPage;
