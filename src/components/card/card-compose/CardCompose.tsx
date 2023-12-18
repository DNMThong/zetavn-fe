"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { useEffect, useState } from "react";
import { AccessModifierDropdown } from "../../dropdowns";
import {
  FiBell,
  FiCamera,
  FiEdit3,
  FiImage,
  FiLink2,
  FiMoreHorizontal,
  FiMoreVertical,
  FiSearch,
  FiSmile,
  FiTag,
  FiVideo,
  FiX,
} from "react-icons/fi";
import Image from "next/image";
import CardComposeActivity from "./CardComposeActivity";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addTextContent,
  closeActivities,
  openActivities,
  resetState,
  setOpenActivities,
} from "@/redux/features/post/post.slice";
import MoodDisplay from "./MoodDisplay";
import CardComposeTextarea from "./CardComposeTextarea";
import EmojiPicker from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react/dist/types/exposedTypes";
import CardComposeUploadPhoto from "./CardComposeUploadPhoto";
import FeedUpload from "./PhotosUploadDisplay";
import PhotosUploadDisplay from "./PhotosUploadDisplay";
import {
  useCreatePostMutation,
  useLazyGetPostsNewsFeedQuery,
} from "@/redux/features/post/post.service";
import { ImageDefault, PostAccessModifier } from "@/types/contants.type";
import { toast } from "react-toastify";
import {
  useUploadFileMutation,
  useUploadImageBase64Mutation,
  useUploadVideoBase64Mutation,
} from "@/redux/features/upload/upload.service";
import { Media, PostNewsfeed } from "@/types/post.type";
import { PhotosUploadPlaceload } from "@/components/placeloads";
import { addNewsfeedHead, setNewsfeed } from "@/redux/features/auth/auth.slice";
import CardComposeUploadVideo from "./CardComposeUploadVideo";
import ReactPlayer from "react-player";
import VideoUploadDisplay from "./VideoUploadDisplay";
import VideoUploadPlaceload from "@/components/placeloads/VideoUploadPlaceload";

const ComposeCard = () => {
  const { show, setShow, nodeRefParent, nodeRefChild } = useClickOutside();
  const {
    activityMood,
    textContent,
    photos,
    accessModifier,
    photosLoading,
    video,
    videoLoading,
  } = useAppSelector((selector) => selector.post);
  const user = useAppSelector((selector) => selector.auth.user);
  const dispatch = useAppDispatch();
  const [showMoreOption, setShowMoreOption] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [createPost, { isLoading: isLoadingCreatePost }] =
    useCreatePostMutation();
  const [uploadImageBase64, { isLoading: isLoadingUploadPhoto }] =
    useUploadImageBase64Mutation();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchPostsNewsFeed] = useLazyGetPostsNewsFeedQuery();
  const [uploadVideBase64] = useUploadVideoBase64Mutation();

  const handleOpenComposeCard = () => {
    setShow(true);
  };
  const handleCloseComposeCard = () => {
    setShow(false);
    setShowMoreOption(false);
    dispatch(resetState());
  };
  const handleOpenActivities = () => {
    dispatch(openActivities());
    setShow(true);
  };

  const handleOpenEmojiPicker = () => {
    setShowEmojiPicker(true);
  };

  const handleCloseEmojiPicker = () => {
    setShowEmojiPicker(false);
  };

  const handleOpenMoreOption = () => {
    setShowMoreOption(true);
    setShow(true);
    dispatch(closeActivities());
  };

  const handleEmojiClick = (emoji: EmojiClickData) => {
    dispatch(addTextContent(emoji.emoji));
  };

  const handleShowPhoto = () => {
    setShow(true);
  };

  const handleUploadPost = async () => {
    setIsLoading(true);
    try {
      let medias: Media[] = [];
      if (photos.length > 0) {
        const responseImage = await uploadImageBase64(photos).unwrap();
        console.log(responseImage);
        if (responseImage.code === 201) {
          medias = responseImage.data.map((photo) => ({
            mediaPath: photo.url,
            mediaType: photo.type,
          }));
        } else {
          toast.warn("Đã có lỗi xảy ra vui lòng thử lại");
        }
      } else if (video) {
        const responseVideo = await uploadVideBase64([video]).unwrap();
        if (responseVideo.code === 201) {
          medias = [
            {
              mediaPath: responseVideo.data[0].url,
              mediaType: responseVideo.data[0].type,
            },
          ];
          console.log(responseVideo);
        }
      }

      const response = await createPost({
        content: textContent,
        accessModifier,
        activityId: activityMood?.detail.id,
        medias,
      }).unwrap();
      if (response?.code === 201) {
        console.log(response);
        handleCloseComposeCard();
        toast.success("Tạo bài viết thành công");
        const responseNewsFeed = await fetchPostsNewsFeed({
          pageNumber: 0,
          pageSize: 5,
        }).unwrap();
        if (responseNewsFeed.code === 200) {
          const { data } = responseNewsFeed;
          dispatch(setNewsfeed(data.data));
        }
      } else {
        toast.warn("Đã có lỗi xảy ra vui lòng thử lại");
      }
    } catch (err) {
      toast.error("Tạo bài viết thất bại vui lòng thử lại");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (activityMood) {
      dispatch(setOpenActivities(false));
    }
  }, [activityMood, dispatch]);

  useEffect(() => {
    const overlay = document.querySelector(".app-overlay");
    if (show) {
      overlay?.classList.add("is-active");
    } else {
      overlay?.classList.remove("is-active");
      setShowMoreOption(false);
    }
  }, [show]);

  return (
    <div
      id="compose-card"
      className={`card is-new-content ${show ? "is-highlighted" : ""}`}>
      {/* <!-- Top tabs --> */}
      <div className="tabs-wrapper" ref={nodeRefChild}>
        <div className="tabs is-boxed is-fullwidth">
          <ul>
            <li className="is-active">
              <a>
                <span className="icon is-small">
                  <FiEdit3 />
                </span>
                <span>Bài đăng</span>
              </a>
            </li>
            <li>
              <a className="modal-trigger" data-modal="albums-help-modal">
                <span className="icon is-small">
                  <FiImage />
                </span>
                <span>Albums</span>
              </a>
            </li>
            <li>
              <a className="modal-trigger" data-modal="videos-help-modal">
                <span className="icon is-small">
                  <FiVideo />
                </span>
                <span>Video</span>
              </a>
            </li>
            {/* <!-- Close X button --> */}
            <li className="close-wrap" onClick={handleCloseComposeCard}>
              <span className="close-publish">
                <FiX />
              </span>
            </li>
          </ul>
        </div>

        {/* <!-- Tab content --> */}
        <div className="tab-content">
          {/* <!-- Compose form --> */}
          <div className="compose">
            <div className="compose-form">
              <img
                style={{ objectFit: "cover" }}
                src={user?.avatar || ImageDefault.AVATAR}
                alt=""
              />
              <div
                className="control"
                ref={nodeRefParent}
                onClick={handleOpenComposeCard}>
                <CardComposeTextarea />
              </div>
            </div>

            {activityMood && <MoodDisplay activityMood={activityMood} />}

            {/* Dislay photo upload */}
            <div id="feed-upload" className="feed-upload">
              {photos.length > 0 && <PhotosUploadDisplay photos={photos} />}
              {photos.length <= 0 && photosLoading > 0 && (
                <div className="upload-wrap">
                  <PhotosUploadPlaceload amount={photosLoading} />
                </div>
              )}
              {/* Display video upload */}
              {video && (
                <div className="upload-wrap">
                  <VideoUploadDisplay video={video} />
                </div>
              )}
              {!video && videoLoading && (
                <div className="upload-wrap">
                  <VideoUploadPlaceload />
                </div>
              )}
            </div>

            <div
              id="tag-suboption"
              className="is-autocomplete is-suboption is-hidden">
              {/* <!-- Tag friends suboption --> */}
              <div id="tag-list" className="tag-list"></div>
              <div className="control">
                <input
                  id="users-autocpl"
                  type="text"
                  className="input"
                  placeholder="Who are you with?"
                />
                <div className="icon">
                  <FiSearch />
                </div>
                <div className="close-icon is-main">
                  <FiX />
                </div>
              </div>
            </div>
            {/* <!-- /Tag friends suboption --> */}

            {/* <!-- Activities suboption --> */}
            <CardComposeActivity />
            {/* <!-- /Activities suboption --> */}

            {/* <!-- Emoji suboption --> */}
            <div
              className={`is-autocomplete is-suboption ${
                showEmojiPicker ? "" : "is-hidden"
              }`}>
              {showEmojiPicker && (
                <div className="emoji-picker-post">
                  <button
                    className="btn-close-emoji-picker"
                    onClick={handleCloseEmojiPicker}>
                    <FiX />
                  </button>
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>

            {/* <!-- Link suboption --> */}
            <div
              id="link-suboption"
              className="is-autocomplete is-suboption is-hidden">
              <div
                id="link-autocpl-wrapper"
                className="control is-location-wrapper has-margin">
                <input
                  id="link-autocpl"
                  type="text"
                  className="input"
                  placeholder="Enter the link URL"
                />
                <div className="icon">
                  <FiLink2 />
                </div>
                <div className="close-icon is-main">
                  <FiX />
                </div>
              </div>
            </div>

            {/* <!-- GIF suboption --> */}
            <div
              id="gif-suboption"
              className="is-autocomplete is-suboption is-hidden">
              <div
                id="gif-autocpl-wrapper"
                className="control is-gif-wrapper has-margin">
                <input
                  id="gif-autocpl"
                  type="text"
                  className="input"
                  placeholder="Search a GIF to add"
                  autoFocus
                />
                <div className="icon">
                  <FiSearch />
                </div>
                <div className="close-icon is-main">
                  <FiX />
                </div>
                <div className="gif-dropdown">
                  <div className="inner">
                    <div className="gif-block">
                      <img
                        src="https://via.placeholder.com/478x344"
                        data-demo-src="/img/demo/gif/1.gif"
                        alt=""
                      />
                      <img
                        src="https://via.placeholder.com/478x344"
                        data-demo-src="/img/demo/gif/2.gif"
                        alt=""
                      />
                      <img
                        src="https://via.placeholder.com/478x344"
                        data-demo-src="/img/demo/gif/3.gif"
                        alt=""
                      />
                      <img
                        src="https://via.placeholder.com/478x344"
                        data-demo-src="/img/demo/gif/4.gif"
                        alt=""
                      />
                    </div>
                    <div className="gif-block">
                      <img
                        src="https://via.placeholder.com/478x344"
                        data-demo-src="/img/demo/gif/5.gif"
                        alt=""
                      />
                      <img
                        src="https://via.placeholder.com/478x344"
                        data-demo-src="/img/demo/gif/6.gif"
                        alt=""
                      />
                      <img
                        src="https://via.placeholder.com/478x344"
                        data-demo-src="/img/demo/gif/7.gif"
                        alt=""
                      />
                      <img
                        src="https://via.placeholder.com/478x344"
                        data-demo-src="/img/demo/gif/8.gif"
                        alt=""
                      />
                    </div>
                    <div className="gif-block">
                      <img
                        src="https://via.placeholder.com/478x344"
                        data-demo-src="/img/demo/gif/9.gif"
                        alt=""
                      />
                      <img
                        src="https://via.placeholder.com/478x344"
                        data-demo-src="/img/demo/gif/10.gif"
                        alt=""
                      />
                      <img
                        src="https://via.placeholder.com/478x344"
                        data-demo-src="/img/demo/gif/11.gif"
                        alt=""
                      />
                      <img
                        src="https://via.placeholder.com/478x344"
                        data-demo-src="/img/demo/gif/12.gif"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /Compose form --> */}

          {/* <!-- General extended options --> */}
          <div
            id="extended-options"
            className={`compose-options  ${showMoreOption ? "" : "is-hidden"}`}>
            <div className="columns is-multiline is-full">
              {/* <!-- Upload action --> */}
              <div className="column is-6 is-narrower">
                <CardComposeUploadPhoto
                  className="is-centered"
                  title="Ảnh"
                  onClick={handleShowPhoto}
                />
              </div>
              {/* <!-- Mood action --> */}
              <div className="column is-6 is-narrower">
                <div
                  id="extended-show-activities"
                  onClick={handleOpenActivities}
                  className="compose-option is-centered">
                  <img src="/img/icons/emoji/emoji-1.svg" alt="" />
                  <span>Hoạt động</span>
                </div>
              </div>
              {/* Upload video ction */}
              <div className="column is-6 is-narrower">
                <CardComposeUploadVideo title="Video"></CardComposeUploadVideo>
              </div>
              {/* <!-- Tag friends action --> */}
              {/* <div className="column is-6 is-narrower">
                <div
                  id="open-tag-suboption"
                  className="compose-option is-centered">
                  <FiTag />
                  <span>Gắn thẻ bạn bè</span>
                </div>
              </div> */}
              {/* <!-- Post location action --> */}
              <div className="column is-6 is-narrower">
                <div
                  id="open-location-suboption"
                  className="compose-option is-centered"
                  onClick={handleOpenEmojiPicker}>
                  <FiSmile />
                  <span>Emoji</span>
                </div>
              </div>
              {/* <!-- Share link action --> */}
              <div className="column is-6 is-narrower">
                <div
                  id="open-link-suboption"
                  className="compose-option is-centered">
                  <FiLink2 />
                  <span>Chia sẽ đường dẫn</span>
                </div>
              </div>
              {/* <!-- Post GIF action --> */}
              <div className="column is-6 is-narrower">
                <div
                  id="open-gif-suboption"
                  className="compose-option is-centered">
                  <FiImage />
                  <span>Đăng GIF</span>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /General extended options --> */}

          {/* <!-- General basic options --> */}
          <div
            id="basic-options"
            className={`compose-options ${showMoreOption ? "is-hidden" : ""}`}>
            {/* <!-- Upload action --> */}
            <CardComposeUploadPhoto title="Ảnh" onClick={handleShowPhoto} />
            {/* <!-- Mood action --> */}
            <div
              id="show-activities"
              className="compose-option"
              onClick={handleOpenActivities}>
              <img src="/img/icons/emoji/emoji-1.svg" alt="" />
              <span>Hoạt động</span>
            </div>
            {/* <!-- Expand action --> */}
            <div
              id="open-extended-options"
              className="compose-option"
              onClick={handleOpenMoreOption}>
              <FiMoreHorizontal />
            </div>
          </div>
          {/* <!-- /General basic options --> */}

          {/* <!-- Hidden Options --> */}
          <div className="hidden-options">
            <div className="target-channels">
              {/* <!-- Publication Channel --> */}
              <div className="channel">
                <div className="round-checkbox is-small">
                  <div>
                    <input
                      type="checkbox"
                      id="checkbox-1"
                      // defaultChecked={true}
                      checked
                      readOnly
                    />
                    <label htmlFor="checkbox-1"></label>
                  </div>
                </div>
                <div className="channel-icon">
                  <FiBell />
                </div>
                <div className="channel-name">Bảng Tin Hoạt Động</div>
                {/* <!-- Dropdown menu --> */}
                <AccessModifierDropdown />
              </div>
              {/* <!-- Publication Channel --> */}
            </div>

            {/* <!-- Friends list --> */}
          </div>
          {/* <!-- Footer buttons --> */}
          <div className="more-wrap">
            {/* <!-- View more button --> */}
            <button
              id="show-compose-friends"
              type="button"
              className="button is-more"
              aria-haspopup="true">
              <FiMoreVertical />
              <span>Xem thêm</span>
            </button>
            {/* <!-- Publish button --> */}
            <button
              id="publish-button"
              type="button"
              disabled={!textContent}
              onClick={handleUploadPost}
              className={`button is-solid accent-button is-fullwidth ${
                textContent ? "" : "is-disabled"
              } ${isLoading ? "is-loading" : ""}`}>
              Bài đăng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeCard;
